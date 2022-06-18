import React, { useEffect, useState, useContext, useRef } from 'react';
import { roundDigit, parseCityFromDataArray, convertAccuracyToString, checkCoords } from '../Lib';
import { getIDBVal, setIDBVal, delIDBVal, getAllIDBVals, WeatherData, FavouriteCity, setUserSettings, 
        getUserSettings, addToFavourites, delSingleCity, getFavoriteCitiesList } from '../IDBModule';
import { Link, useLocation } from 'react-router-dom';
import { setWeatherData, setFavourites, setGeneral, setUni, setLang } from '../store/reducer';
import { AppContext } from '../store/context';
import MainChart from '../components/MainChart';
import Parser from '../Parser';
import CityDB from '../CityDB';
import getLangPack from '../LangPack';
import ForecastSection from '../components/ForecastSection';
import CurrentWeather from '../components/CurrentWeather';
import Indicators from '../components/Indicators';
import SunChart from '../components/SunChart';
import CircleIndicators from '../components/CircleIndicators';
import SideMenu from '../components/SideMenu';
import Search from '../components/Icons/Search';
import Clear from '../components/Icons/Clear';
import Delete from '../components/Icons/Delete';
import Favourites from '../components/Icons/Favourites';
import BurgerMenu from '../components/Icons/BurgerMenu';
import Footer from '../components/Footer';
import Logo from '../components/Icons/Logo';
import '../styles/Main.scss';
import '../styles/SideMenu.scss';

const parser: Parser = new Parser();
const cityDB: CityDB = new CityDB();

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Main() {
  let query = useQuery();
  let qLat = checkCoords(query.get('lat'), 1);
  let qLon = checkCoords(query.get('lon'), 2);
  console.log(`init la: ${qLat} init ln: ${qLon}`);
  const [ menuState, setMenuState ] = useState<boolean>(false);
  const { state, dispatch } = useContext(AppContext);
  const [ searchResult, setSearchResult ] = useState<Array<any>>([]);
  const [ searchString, setSearchString ] = useState<string>('');
  const [ urlParams, setUrlParams ] = useState({lat: qLat, lon: qLon});
  const [ newFavouriteCityName, setNewFavouriteCityName ] = useState<string>(state.general.cityName);
  const [ addFavouriteCityWrapper, setAddFavouriteCityWrapper ] = useState<boolean>(false);
  const [ onlineStatus, setOnlineStatus ] = useState<boolean>(window.navigator.onLine);
  const [ searchFocusState, setSearchFocusState ] = useState<string>('Search-focus-off');
  const [ loaderState, setLoaderState ] = useState<boolean>(true);
  const addFavRef = useRef<any>(null);
  const addSideMenuRef = useRef<any>(null);

  useEffect(() => {
    let touchstartX = 0
    let touchendX = 0
    
    const checkDirection = () => {
      if (touchendX < touchstartX) {
        if ((touchstartX - touchendX) > 100) setMenuState(true);
      };
      if (touchendX > touchstartX) {
        if ((touchendX - touchstartX) > 100) setMenuState(false);
      };
      //if (touchendX < touchstartX) setMenuState(true);
      //if (touchendX > touchstartX) setMenuState(false);
    }
    const handleClickOutside = (event: any) => {
      if (addFavRef.current && !addFavRef.current.contains(event.target)) {
        setAddFavouriteCityWrapper(false);
      };
      if (addSideMenuRef.current && !addSideMenuRef.current.contains(event.target)) {
        setMenuState(false);
      };
    };
    document.addEventListener('click', handleClickOutside , true);

    document.addEventListener('touchstart', e => {
      touchstartX = e.changedTouches[0].screenX;
    })
    
    document.addEventListener('touchend', e => {
      touchendX = e.changedTouches[0].screenX;
      checkDirection();
    })

    window.addEventListener('offline', () => {
      setOnlineStatus(false);
    });
    window.addEventListener('online', () => {
      setOnlineStatus(true);
    });
    dataManager();
    //Очищаем indexedDB от слишком старых данных
    getAllIDBVals().then(allVals => {
      const now: number = Date.now();
      const timeLimit: number = 1000 * 60 * 60 * 24;//'Возраст' данных в миллисекундах, после которого они будут считаться устаревшими
      if (allVals && allVals.length > 0) allVals.forEach(val => {
        if ((now - val.date) > timeLimit){
          delIDBVal(val.id);
        };
      });
    });
    //Получаем список избранных городов из indexedDB
    getFavoriteCitiesList().then(resultList => {
      if (resultList) dispatch(setFavourites(resultList));
    });
    return () => {
      document.removeEventListener('click', handleClickOutside , true);
    };
  }, [onlineStatus, urlParams, addFavRef, addSideMenuRef]);
  ///Async main func
  const dataManager = async () => {

    //Данные из IndexedDB отсутствуют
    const onStoreDataMissing = async (allFavList: Array<any>, favouriteCityIndex: any, acc: number, idbGeoKey: string) => {
      const res = await parser.parseWeatherData(lat, lon);
      let cityName: string = '';
      if  (favouriteCityIndex >= 0) cityName = allFavList[favouriteCityIndex].cityName;
      else {
        const geoRes = await parser.parseNameByGeo(lat, lon);
        cityName = parseCityFromDataArray(geoRes, state.lang.code);
      };
      dispatch(setWeatherData({data: res, lastUpdate: Date.now()}));
      dispatch(setGeneral({lat: lat, lon: lon, cityName: cityName, acc: acc}));
      setLoaderState(false);
      setNewFavouriteCityName(cityName);
      let extendedDataToSave: any = res;
      extendedDataToSave.cityName = cityName;
      let dataToSave: WeatherData = { date: Date.now(), data: extendedDataToSave, cityName: cityName, id:  idbGeoKey };
      setIDBVal(idbGeoKey, dataToSave);
    };
    //Были получены данные из IndexedDB
    const onStoreDataExist = async (storeResult: any, allFavList: Array<any>, favouriteCityIndex: any, acc: number, idbGeoKey: string) => {
      const now: number = Date.now();
      console.log('st data exist');
      //Если есть название города в избранном - переписываем его оттуда
      let cityName = favouriteCityIndex >= 0 ? allFavList[favouriteCityIndex].cityName : storeResult.data.cityName;
      console.log('st exist cityNAme ' + cityName);
      console.log('City name# ' + cityName);
      console.log(storeResult);
      //Данные в БД слишком старые, загружаем актуальные
      if ((now - storeResult.date) > 60000) {
        const res = await parser.parseWeatherData(lat, lon);
        dispatch(setWeatherData({data: res, lastUpdate: Date.now()}));
        dispatch(setGeneral({lat: lat, lon: lon, cityName: cityName, acc: acc}));
        setLoaderState(false);
        let extendedDataToSave: any = res;
        extendedDataToSave.cityName = cityName;
        let dataToSave: WeatherData = { date: Date.now(), data: extendedDataToSave, cityName: cityName, id:  idbGeoKey};
        setIDBVal(idbGeoKey, dataToSave);
      }
      //Данные в БД актуальны
      else {
        dispatch(setWeatherData({data: storeResult.data, lastUpdate: storeResult.date}));
        dispatch(setGeneral({lat: lat, lon: lon, cityName: cityName, acc: acc}));
        setLoaderState(false);
      }
      setNewFavouriteCityName(cityName);
    };
    //Получен объект Position, можно установить широту/долготу
    const onSuccesGeoPos = async (pos: any) => {
      lat = roundDigit(pos.coords.latitude, 1000);
      lon = roundDigit(pos.coords.longitude, 1000);
      let acc: number = Math.round(pos.coords.accuracy);
      //'Геоключ' для работы с IndexedDB
      const idbGeoKey: string = `${lat}::${lon}`;
      //Ищем в списке избранных городов запись с коррдинатами, совпадающими с текущими
      const favouriteCityIndex = allFavList.findIndex((f: FavouriteCity) => f.lat === lat && f.lon === lon);
      //Проверяем, есть ли у нас сохраненные данные о погоде в indexedDB по 'геоключу'
      const storeResult = await getIDBVal(idbGeoKey);
      storeResult ?  onStoreDataExist(storeResult, allFavList, favouriteCityIndex, acc, idbGeoKey): onStoreDataMissing(allFavList, favouriteCityIndex, acc, idbGeoKey);
    }
    const onGetLinkParams = async (lat: any, lon: any) => {
      lat = roundDigit(lat, 1000);
      lon = roundDigit(lon, 1000);
      let acc: number = 1;
      //'Геоключ' для работы с IndexedDB
      const idbGeoKey: string = `${lat}::${lon}`;
      //Ищем в списке избранных городов запись с коррдинатами, совпадающими с текущими
      const favouriteCityIndex = allFavList.findIndex((f: FavouriteCity) => f.lat === lat && f.lon === lon);
      //Проверяем, есть ли у нас сохраненные данные о погоде в indexedDB по 'геоключу'
      const storeResult = await getIDBVal(idbGeoKey);
      storeResult ?  onStoreDataExist(storeResult, allFavList, favouriteCityIndex, acc, idbGeoKey): onStoreDataMissing(allFavList, favouriteCityIndex, acc, idbGeoKey);
    }
    //Получаем настройки пользователя из IndexedDB и обновляем состояние
    const userSettings = await getUserSettings('user');
    
    if (userSettings) {
      let needUpdate = false;
      let newGenUni = userSettings.units ? userSettings.units: state.uni.gen;
      let newWindUni = userSettings.windSpeedUnits ? userSettings.windSpeedUnits: state.uni.wind;
      let newPressUni = userSettings.pressUnits ? userSettings.pressUnits: state.uni.press;
      let newLang = userSettings.lang ? userSettings.lang: state.lang.code;
      if (userSettings.units) needUpdate = needUpdate ? needUpdate: true;
      if (userSettings.windSpeedUnits) needUpdate = needUpdate ? needUpdate: true;
      if (userSettings.pressUnits) needUpdate = needUpdate ? needUpdate: true;
      if (userSettings.lang) needUpdate = needUpdate ? needUpdate: true;
      if (needUpdate) {
        dispatch(setUni({gen: newGenUni, wind: newWindUni, press: newPressUni}));
        dispatch(setLang({code: newLang}));
      };
    };
    //Получаем список избранных городов
    const allFavList = await getFavoriteCitiesList();
    //Устанавливаем значения широты и долготы по умолчанию
    let lat: number = urlParams.lat ? urlParams.lat: state.general.lat;
    let lon: number = urlParams.lon ? urlParams.lon: state.general.lon;
    let acc: number = 0;
    //Проверяем, есть ли подключение к сети Интернет
    if (onlineStatus){
      //onGetLinkParams(lat, lon);
      if (qLat && qLon){
        onGetLinkParams(urlParams.lat, urlParams.lon);
      }
      else {
        //Если можно определить геолокацию пользователя
        if (navigator.geolocation){
          navigator.geolocation.getCurrentPosition(onSuccesGeoPos);
        }
        else {
          //'Геоключ' для работы с IndexedDB
          const idbGeoKey: string = `${lat}::${lon}`;
          //Ищем в списке избранных городов запись с коррдинатами, совпадающими с текущими
          const favouriteCityIndex = allFavList.findIndex((f: FavouriteCity) => f.lat === lat && f.lon === lon);
          //Проверяем, есть ли у нас сохраненные данные о погоде в indexedDB по 'геоключу'
          const storeResult = await getIDBVal(idbGeoKey);
          storeResult ?  onStoreDataExist(storeResult, allFavList, favouriteCityIndex, acc, idbGeoKey): onStoreDataMissing(allFavList, favouriteCityIndex, acc, idbGeoKey);
        };
      };
    }
    else {
      //Если подключения к Интернету нет
      let age: number = 0;
      let dataFromIndexedDb: any = null;
      //Поиск самых свежих данных в indexedDB, запись их в 'состояние'
      const allVals = await getAllIDBVals();
      if (allVals && allVals.length > 0) allVals.forEach(val => {
        if (val.date > age){
          age = val.date;
          dataFromIndexedDb = val.data;
        };
      });
      if (age > 0) {
        const favouriteCityIndex = allFavList.findIndex((f: FavouriteCity) => f.lat === dataFromIndexedDb.lat && f.lon === dataFromIndexedDb.lon);
        const cityName: string = favouriteCityIndex >= 0 ? allFavList[favouriteCityIndex].cityName : dataFromIndexedDb.cityName;
        dispatch(setWeatherData({data: dataFromIndexedDb, lastUpdate: state.weather.lastUpdate}));
        dispatch(setGeneral({lat: dataFromIndexedDb.lat, lon: dataFromIndexedDb.lon, cityName: cityName, acc: acc}));
        setLoaderState(false);
      };
    };
  }

  const onSearch = (e: any) => {
    const resultCityArray: Array<any> = cityDB.findCity(e.target.value, state.lang.code);
    setSearchString(e.target.value);
    setSearchResult(resultCityArray);
  }
  const onClearSearchString = () => {
    setSearchString('');
    setSearchResult([]);
  }
  const addToFavouriteList = () => {
    addFavouriteCityWrapper ? setAddFavouriteCityWrapper(false): setAddFavouriteCityWrapper(true);
  }
  const onDelFromFav = (c: any) => {
    delSingleCity(c);
    let indexToDel = state.favourites.findIndex((item: FavouriteCity) => item.cityName === c);
    if (indexToDel >= 0){
      let tempFavourites: Array<FavouriteCity> = state.favourites.slice();
      tempFavourites.splice(indexToDel, 1);
      dispatch(setFavourites(tempFavourites));
    }
  }
  const onSetNewFavCityName = (e: any) => {
    setNewFavouriteCityName(e.target.value);
  }
  const onConfirmAddToFavourites = () => {
    const newFavourite: FavouriteCity = {cityName: newFavouriteCityName, lat: state.general.lat, lon: state.general.lon};
    //Проверяем, чтобы название избранного города содержало хотя бы 1 символ
    if (newFavouriteCityName.length > 0){
      //Проверяем, нет ли в избранном города с таким же именем
      const isExistInList: any = state.favourites.find((item: FavouriteCity) => item.cityName === newFavouriteCityName);
      getFavoriteCitiesList().then(favList => {
        //Проверяем, нет ли в избранном города с такими же координатами
        const isExistByGeoCoords = favList.find((f: FavouriteCity) => f.lat === newFavourite.lat && f.lon === newFavourite.lon);
        if (!isExistInList && !isExistByGeoCoords){
          let tempFavourites: Array<FavouriteCity> = state.favourites.slice();
          tempFavourites.push(newFavourite);
          dispatch(setFavourites(tempFavourites));
          addToFavourites(newFavouriteCityName, newFavourite);
          setAddFavouriteCityWrapper(false);
        };
      });
    }
  }
  const onShowSideMenu = () => {
    const newState = menuState ? false: true;
    setMenuState(newState);
  }
  const onBlurSearchString = () => {
    setSearchFocusState('Search-focus-off');
    setTimeout(() => {
      setSearchResult([]);
    }, 100);
  }
  const onFavCityListClick = (el: any) => {
    setUrlParams({lat: el.lat, lon: el.lon});
    onShowSideMenu();
  }

  let searchResultBlock = null;
  if (searchResult.length > 0 ){
    searchResultBlock = searchResult.map((el, i) => {
      const result = <li key={el.id}><Link to={`/?lat=${el.lat}&lon=${el.lon}`} onClick={() => {
        setUrlParams({lat: el.lat, lon: el.lon});
        onClearSearchString();}}>{el.name}, {el.region}</Link></li>;
      return result;
    });
    searchResultBlock = <ul className='Search-result-wrapper'>{searchResultBlock}</ul>;
  };
  let lang = getLangPack(state.lang.code);
  let dayTimeWrapper = 'Night_wrapper';//Стиль контейнера-обёртки текущей погоды
  if (state.weather.data){//Определяем, какое сейчас время суток
    const now = Math.round(Date.now() / 1000);
    const twilightDur: number = 30 * 60;//Продолжительность сумерек в секундах
    if ((now > state.weather.data.current.sunrise - twilightDur) && (now < state.weather.data.current.sunrise + twilightDur)) dayTimeWrapper = 'Morning_twilight_wrapper';
    else if ((now >= state.weather.data.current.sunrise + twilightDur) && (now <= state.weather.data.current.sunset - twilightDur)) dayTimeWrapper = 'Day_wrapper';
    else if ((now > state.weather.data.current.sunset - twilightDur) && (now < state.weather.data.current.sunset + twilightDur)) dayTimeWrapper = 'Evening_twilight_wrapper';
  };
  let accStringVal = convertAccuracyToString(state.general.acc, lang, state.uni.gen);
  let fcl;
  if (state.favourites.length > 0){
    const list = state.favourites.map((el: any, i: number) => {
      const result = <div key={i} className='Side-delete-wrapper'><Link to={`/?lat=${el.lat}&lon=${el.lon}`} onClick={() => onFavCityListClick(el)}>{el.cityName}</Link>
      <div onClick={() => {onDelFromFav(el.cityName)}}><Delete wrapper='Side-delete-icon' /></div></div>;
      return result;
    });
    fcl = <div><h4>{lang.lib.info.favourites}</h4>
              <div className='Side-Mebu-List-Container'>
                {list}
              </div>
          </div>;
  };

  let loader;
  if (loaderState){
    loader = <div className='Main-Loader-Wrapper'>
      <div className='Main-Loader-Container'>
        <Logo wrapper='Main-Loader'/>
      </div>
    </div>;
  }
  return (
    <div className='App'>
      {loader}
      <div ref={addSideMenuRef}>
        <SideMenu open={menuState} lat={urlParams.lat} lon={urlParams.lon} parser={parser} cityList={fcl} onlineState={onlineStatus}/>
      </div>
      <main className='Main-wrapper'>
        <div className={dayTimeWrapper}>
          <div className={`Main-current-weather-wrapper `}>
            <div className='Search-wrapper'>
              <div onClick={onShowSideMenu}>
                <BurgerMenu wrapper='Head-icon'/>
              </div>
              <div>
                <div className={`Search ${searchFocusState}`} onFocus={() => setSearchFocusState('Search-focus-on')} onBlur={onBlurSearchString}>
                  <Search wrapper={'Search-icon'}/>
                  <input value={searchString} placeholder={`${lang.lib.info.city}...`} onChange={onSearch} autoComplete='none' className='Search-input'/>
                  <div onClick={onClearSearchString}><Clear wrapper='Search-clear' /></div>
                </div>
                {searchResultBlock}
                <div ref={addFavRef} className={addFavouriteCityWrapper ? 'AddFavouriteCityWrapperVisible': 'AddFavouriteCityWrapperHidden'}>
                  <h4>{lang.lib.info.addToFavourites}</h4>
                  <input value={newFavouriteCityName} placeholder={`${lang.lib.info.city}...`} onChange={onSetNewFavCityName} autoComplete='none' className='Input-favourites'/>
                  <div onClick={onConfirmAddToFavourites} className='Confirm-button'>{lang.lib.info.done}</div>
                </div>
              </div>
              <div onClick={addToFavouriteList}>
                  <Favourites wrapper='Head-icon'/>
              </div>
              </div>
              <CurrentWeather />
              <Indicators />
              <SunChart />
              <CircleIndicators />
              <MainChart />
            </div>
          </div>
          <ForecastSection />
      </main>
      <Footer acc={accStringVal} lang={lang} />
    </div>
  );
}

export default Main;
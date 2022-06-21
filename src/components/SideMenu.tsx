import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../store/context';
import { parseCityFromDataArray } from '../Lib';
import { setUserSettings } from '../IDBModule';
import { setGeneral, setUni, setLang } from '../store/reducer';
import Temperature from './Icons/Temperature';
import Wind from './Icons/Wind';
import Press from './Icons/Press';
import Arrow from './Icons/Arrow';
import getLangPack, { getListOfLanguages } from '../LangPack';
import '../styles/SideMenu.scss';

function SideMenu(props: any) {
    const { state, dispatch } = useContext(AppContext);
    const [ selectState, setSelectState ]  = useState(false);
    const lanSelectRef = useRef<any>(null);
    const lang = getLangPack(state.lang.code);
    const lat = props.lat ? props.lat: state.general.lat;
    const lon = props.lon ? props.lon: state.general.lon;
    const parser = props.parser;
    const cl = props.cityList;
    const onlineState = props.onlineState;

    useEffect(() => {
        const handleClickOutside = (event: any) => {
          if (lanSelectRef.current && !lanSelectRef.current.contains(event.target)) {
            setSelectState(false);
          };
        };
        document.addEventListener('click', handleClickOutside , true);
        return () => {
          document.removeEventListener('click', handleClickOutside , true);
        };
      }, [lanSelectRef]);

    const setUnits = (e: any) => {//Устанавливает основные еденицы измерения (C/F, метрические/имперские)
        const u: string = (e.target.title === 'C') ? 'metric': 'imperial';
        if (state.uni.gen !== u) {
          dispatch(setUni({gen: u, wind: state.uni.wind, press: state.uni.press}));
          setUserSettings('user', {units: u, windSpeedUnit: state.uni.wind, pressUnits: state.uni.press, lang: state.lang.code});
        }
    }
    const setWindUnits = (e: any) => {//Устанавливает еденицы измерения скорости ветра
        if (state.uni.wind !== e.target.title) {
          dispatch(setUni({gen: state.uni.gen, wind: e.target.title, press: state.uni.press}));
          setUserSettings('user', {units: state.uni.gen, windSpeedUnits: e.target.title, pressUnits: state.uni.press, lang: state.lang.code});
        } 
    };
    const setPressUnits = (e: any) => {//Устанавливает еденицы измерения атмосферного давления
        if (state.uni.press !== e.target.title ) {
          dispatch(setUni({gen: state.uni.gen, wind: state.uni.wind, press: e.target.title}));
          setUserSettings('user', {units: state.uni.gen, windSpeedUnit: state.uni.wind, pressUnits: e.target.title, lang: state.lang.code});
        }
    };
    const onSelectLangClick = () => {
        console.log('Click clack')
        selectState ? setSelectState(false): setSelectState(true);
    };
    const setNewLang = async (langCode: string) => {
        if (selectState) setSelectState(false);
        if (state.lang.code !== langCode) {
            dispatch(setLang({code: langCode}));
            if (onlineState){
                const geoRes = await parser.parseNameByGeo(lat, lon);
                let cityName = parseCityFromDataArray(geoRes, langCode);
                dispatch(setGeneral({lat: state.general.lat, lon: state.general.lon, cityName: cityName, acc: state.general.acc}));
            };
            setUserSettings('user', {units: state.uni.gen, windSpeedUnit: state.uni.wind, pressUnits: state.uni.press, lang: langCode});
        };
    }
    /* Определяем стили для кнопок с еденицами измерения */
    let mainUnitsClassName = [state.uni.gen === 'metric' ? 'Side-Menu-Button-Active': 'Side-Menu-Button', 
                              state.uni.gen === 'imperial' ? 'Side-Menu-Button-Active': 'Side-Menu-Button'];
    let windSpeedUnitsClassName = [state.uni.wind === 'second' ? 'Side-Menu-Button-Active': 'Side-Menu-Button', 
                                   state.uni.wind === 'hour' ? 'Side-Menu-Button-Active': 'Side-Menu-Button',
                                   state.uni.wind === 'knots' ? 'Side-Menu-Button-Active': 'Side-Menu-Button'];
    let pressUnitsClassName = [state.uni.press === 'hpa' ? 'Side-Menu-Button-Active': 'Side-Menu-Button', 
                               state.uni.press === 'hg' ? 'Side-Menu-Button-Active': 'Side-Menu-Button'];
    
    let langOptions = getListOfLanguages().map((el) => {
        return <li key={el.code} onClick={() => setNewLang(el.code)}>{el.label}</li>;
    });
    let langOptionsList =selectState ? <ul className='Lang-selector-ul'>{langOptions}</ul>: <ul className='Lang-selector-ul Lang-selector-ul-hide'>{langOptions}</ul>;
    let selectLanguage = <div onClick={onSelectLangClick} onBlur={onSelectLangClick} className='Side-menu-select-wrapper'>
            {lang.label}
            <Arrow wrapper={selectState ? 'Select-arrow-icon-reverse': 'Select-arrow-icon'} />
        </div>;
    let styleClass = props.open ? "Side-menu-wrapper-open": "Side-menu-wrapper";
    let windSpeedTitles: Array<string> = (state.uni.gen === 'metric') ? [
        lang.lib.units.metric.windUnit.second, 
        lang.lib.units.metric.windUnit.hour, 
        lang.lib.units.metric.windUnit.knots]: 
       [
        lang.lib.units.imperial.windUnit.second, 
        lang.lib.units.imperial.windUnit.hour, 
        lang.lib.units.imperial.windUnit.knots];
    return (
        <div className={styleClass}>
            <div className='Lang-selector-wrapper' ref={lanSelectRef}>
                {selectLanguage}
                {langOptionsList}
            </div>
            <div>
                <Temperature wrapper={"Icon-menu"}/>
                <button title={'C'} onClick={setUnits} className={`${mainUnitsClassName[0]} Side-Menu-Button-First-Row`}>
                    С°
                </button>
                <button title={'F'} onClick={setUnits} className={`${mainUnitsClassName[1]} Side-Menu-Button-First-Row`}>
                    F°
                </button>
            </div>
            <div>
                <Press wrapper={"Icon-menu"}/>
                <button title={'hpa'} onClick={setPressUnits} className={`${pressUnitsClassName[0]} Side-Menu-Button-Third-Row`}>
                    {lang.lib.units[state.uni.gen].press.hpa}
                </button>
                <button title={'hg'} onClick={setPressUnits} className={`${pressUnitsClassName[1]} Side-Menu-Button-Third-Row`}>
                    {lang.lib.units[state.uni.gen].press.hg}
                </button>
            </div>
            <div>
                <Wind wrapper={"Icon-menu"}/>
                <button title={'second'} onClick={setWindUnits} className={`${windSpeedUnitsClassName[0]} Side-Menu-Button-Second-Row`}>
                    {windSpeedTitles[0]}
                </button>
                <button title={'hour'} onClick={setWindUnits} className={`${windSpeedUnitsClassName[1]} Side-Menu-Button-Second-Row`}>
                    {windSpeedTitles[1]}
                </button>
                <button title={'knots'} onClick={setWindUnits} className={`${windSpeedUnitsClassName[2]} Side-Menu-Button-Second-Row`}>
                    {windSpeedTitles[2]}
                </button>
            </div>
            {cl}
        </div>
    );
  }
  export default SideMenu;
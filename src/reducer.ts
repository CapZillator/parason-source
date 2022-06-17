import React from 'react';

interface AppContextProps {
  state: any;
  dispatch: ({ type }: { type: string }) => void;
}
export const ContextApp = React.createContext({} as AppContextProps);

export const initData: any = {
  weather: 0,
  lastUpdate: 0,
  lat: 53.92,
  lon: 27.56,
  units: 'metric',
  windSpeedUnits: 'second',
  pressUnits: 'hpa',
  lang: 'ru',
  cityName: 'Минск',
  posAcc: 0,
  favourites: []
};//Значения по умолчанию

export function reducer(state: any, action: any){
  switch (action.type){
    //Записываем данные в случае, если пользователь сообщил свои координаты
    case 'setData': return {weather: action.weather, lastUpdate: Date.now(), lat: action.lat, lon: action.lon, units: state.units, windSpeedUnits: state.windSpeedUnits, pressUnits: state.pressUnits, lang: state.lang, cityName: action.cityName, posAcc: action.posAcc, favourites: state.favourites};
    //Записываем данные с координатами пользователя по умолчанию
    case 'setDefaultData': return {weather: action.weather, lastUpdate: Date.now(), lat: state.lat, lon: state.lon, units: state.units, windSpeedUnits: state.windSpeedUnits, pressUnits: state.pressUnits, lang: state.lang, cityName: action.cityName, posAcc: state.posAcc, favourites: state.favourites};
    //Устанавливаем основные единицы измерения (метрические/английские)
    case 'setUnit': return {weather: state.weather, lastUpdate: state.lastUpdate, lat: state.lat, lon: state.lon, units: action.units, windSpeedUnits: state.windSpeedUnits, pressUnits: state.pressUnits, lang: state.lang, cityName: state.cityName, posAcc: state.posAcc, favourites: state.favourites};
    //Устанавливаем единицы измерения скорости ветра
    case 'setWindSpeedUnit': return {weather: state.weather, lastUpdate: state.lastUpdate, lat: state.lat, lon: state.lon, units: state.units, windSpeedUnits: action.windSpeedUnits, pressUnits: state.pressUnits, lang: state.lang, cityName: state.cityName, posAcc: state.posAcc, favourites: state.favourites};
    //Устанавливаем единицы измерения атмосферного давления
    case 'setPressUnit': return {weather: state.weather, lastUpdate: state.lastUpdate, lat: state.lat, lon: state.lon, units: state.units, windSpeedUnits: state.windSpeedUnits, pressUnits: action.pressUnits, lang: state.lang, cityName: state.cityName, posAcc: state.posAcc, favourites: state.favourites};
    //Устанавливаем все единицы измерения (основные, ветер, давление)
    case 'setAllUnits': return {weather: state.weather, lastUpdate: state.lastUpdate, lat: state.lat, lon: state.lon, units: action.units, windSpeedUnits: action.windSpeedUnits, pressUnits: action.pressUnits, lang: state.lang, cityName: state.cityName, posAcc: state.posAcc, favourites: state.favourites};
    //Обновляем список избранных городов
    case 'setFavourites': return {weather: state.weather, lastUpdate: state.lastUpdate, lat: state.lat, lon: state.lon, units: state.units, windSpeedUnits: state.windSpeedUnits, pressUnits: state.pressUnits, lang: state.lang, cityName: state.cityName, posAcc: state.posAcc, favourites: action.favourites};
    default: throw new Error();
  }
}

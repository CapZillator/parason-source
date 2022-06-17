import React from 'react';
import { AppActions } from './actions';
import { FavouriteCity } from '../IDBModule';
/*
    //weather: 0,
    //lastUpdate: 0,
    lat: 53.92,
    lon: 27.56,
    //units: 'metric',
    //windSpeedUnits: 'second',
    //pressUnits: 'hpa',
    lang: 'ru',
    cityName: 'Минск',
    posAcc: 0,
    favourites: []
*/
export interface AppState {
    uni: Uni,//Еденицы измерения
    lang: Lang,//Язык приложения
    weather: Weather,//Данные о погоде
    general: General,//Общие свойства
    favourites: FavouriteCity[]//Избранные города
}
export interface Lang {
    code: string
}
export interface Units {
    main: string,
    windSpeed: string,
    press: string
}
export interface Weather {
    data: any,
    lastUpdate: number
}
export interface General {
    lat: number,
    lon: number,
    acc: number,
    cityName: string
}
export interface Uni {
    gen: string,
    wind: string,
    press: string,
}

export const initData: AppState = {
    uni: {gen: 'metric', wind: 'second', press: 'hpa'},
    lang: {code: 'ru'},
    weather: {data: null, lastUpdate: 0},
    general: {lat: 53.92, lon: 27.56, acc: 0, cityName: 'Минск'},
    favourites: []
};


export const AppContext = React.createContext<{
    state: AppState;
    dispatch: React.Dispatch<AppActions>;
    }>({
        state: initData,
        dispatch: () => undefined,
    });
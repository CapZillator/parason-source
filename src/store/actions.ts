import { Weather, General, Lang, Uni } from './context';
import { FavouriteCity } from '../IDBModule';

export enum ActionType {
    SetWeatherData,
    SetFavourites,
    SetGeneral,
    SetLang,
    SetUni
}
export interface SetWeatherData {
    type: ActionType.SetWeatherData;
    payload: Weather;
}
export interface SetFavourites {
    type: ActionType.SetFavourites;
    payload: FavouriteCity[];
}
export interface SetGeneral {
    type: ActionType.SetGeneral;
    payload: General;
}
export interface SetLang {
    type: ActionType.SetLang;
    payload: Lang;
}
export interface SetUni {
    type: ActionType.SetUni;
    payload: Uni;
}

export type AppActions = SetWeatherData | SetFavourites | SetGeneral | SetLang | SetUni;
import { AppState, Weather, General, Lang, Uni } from './context';
import { ActionType, AppActions, SetWeatherData, SetFavourites, SetGeneral, SetLang, SetUni } from './actions';
import { FavouriteCity } from '../IDBModule';

export function appReducer(state: AppState, action:  AppActions): AppState {
    switch (action.type) {
        case ActionType.SetWeatherData:
            return { ...state, weather: action.payload };
        case ActionType.SetFavourites:
            return { ...state, favourites: action.payload };
        case ActionType.SetGeneral:
            return { ...state, general: action.payload };
        case ActionType.SetLang:
            return { ...state, lang: action.payload };
        case ActionType.SetUni:
            return { ...state, uni: action.payload };
        default:
            return state;
    }
}
// helper functions to simplify the caller

export const setWeatherData = (weather: Weather): SetWeatherData => ({
    type: ActionType.SetWeatherData,
    payload: weather,
});

export const setFavourites = (favourites: FavouriteCity[]): SetFavourites => ({
    type: ActionType.SetFavourites,
    payload: favourites,
});

export const setGeneral = (general: General): SetGeneral => ({
    type: ActionType.SetGeneral,
    payload: general
});

export const setLang = (lang: Lang): SetLang => ({
    type: ActionType.SetLang,
    payload: lang
});

export const setUni = (uni: Uni): SetUni => ({
    type: ActionType.SetUni,
    payload: uni
});
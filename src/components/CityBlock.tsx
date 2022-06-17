import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../store/context';
import { Link, Navigate, useLocation } from "react-router-dom";
import { roundDigit, parseCityFromDataArray, sunriseSunsetDayduration, getWindDir, convertWindSpeedVal, getBofortScaleVal, 
    convertToStringT, convertAccuracyToString, checkCoords } from '../Lib';
import { getIDBVal, setIDBVal, getIDBKeys, clearIDBKeys, delIDBVal, getAllIDBVals, WeatherData, FavouriteCity, setUserSettings, getUserSettings, delUserSettings,
        addToFavourites, delSingleCity, getFavoriteCitiesList } from '../IDBModule';
import { setWeatherData, setFavourites, setGeneral, setUni } from '../store/reducer';
import getLangPack from '../LangPack';
import Delete from './Icons/Delete';
import CityDB from '../CityDB';
import '../styles/SideMenu.scss';
import { LanguageServiceMode } from 'typescript';

function CityBlock(props: any) {
    const { state, dispatch } = useContext(AppContext);
    const lang = props.lang;

    const onDel = (e: any) => {
        delSingleCity(e);
        let indexToDel = state.favourites.findIndex((item: FavouriteCity) => item.cityName === e);
        if (indexToDel >= 0){
          let tempFavourites: Array<FavouriteCity> = state.favourites.slice();
          tempFavourites.splice(indexToDel, 1);
          dispatch(setFavourites(tempFavourites));
        }
    }
    /*<div key={i} className='Side-delete-wrapper'>
    <Link to={`/?lat=${el.lat}&lon=${el.lon}`} onClick={() => setUrlParams({lat: el.lat, lon: el.lon})}>{el.cityName}</Link>
    <div onClick={() => {onDel(el.cityName)}}><Delete wrapper='Side-delete-icon' /></div>*
</div>

<span onClick={() => Navigate(`/?lat=${el.lat}&lon=${el.lon}`)}>{el.cityName}</span>
*/
    let fcl = state.favourites.length > 0 ? state.favourites.map((el: any, i: number) => {
        const result = <div key={i} className='Side-delete-wrapper'>
            <Link to={`/?lat=${el.lat}&lon=${el.lon}`}>{el.cityName}</Link>
            <div onClick={() => {onDel(el.cityName)}}><Delete wrapper='Side-delete-icon' /></div>
        </div>;
        return result;
      }) : null;
    return (
        <div><h4>{lang.lib.info.favourites}</h4>
            <div>{fcl}</div>
        </div>
    );
  }
  export default CityBlock;
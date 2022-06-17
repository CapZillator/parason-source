import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../store/context';
import { roundDigit, parseCityFromDataArray, sunriseSunsetDayduration, getWindDir, convertWindSpeedVal, getBofortScaleVal, 
    convertToStringT, convertAccuracyToString, checkCoords } from '../Lib';
import Mist from './Icons/WeatherIcons/Mist';
import getLangPack from '../LangPack';
import GetWeatherIcon from './GetWeatherIcon';
import '../styles/CurrentWeather.scss';
import '../styles/Main.scss';

function CurrentWeather() {
    const { state, dispatch } = useContext(AppContext);
    const lang = getLangPack(state.lang.code);

    let cT, cTfl;
    let [cTVal, cTflVal] = new Array(2).fill(0);
    let wCode = 800;
    let iconName = '01d';
    if (state.weather.data){
      cTVal = state.weather.data.current.temp;
      cTflVal = state.weather.data.current.feels_like;
      wCode = state.weather.data.current.weather[0].id;
      iconName = state.weather.data.current.weather[0].icon;
    }
    cT = convertToStringT(cTVal, state.uni.gen);
    cTfl = convertToStringT(cTflVal, state.uni.gen);
    return (
      <div className='Current-wrapper'>
          <h2>{state.general.cityName}</h2>  
          <GetWeatherIcon iconCode={iconName} />
          <p className='Temp-current'>{cT}</p>
          <p className='Current-weather-state'>{lang.lib.weatherCodes[wCode]}</p>
          <p className='First-Letter-Uppercase'>{lang.lib.feels_like} {cTfl}</p>
      </div>
    );
  }
  export default CurrentWeather;
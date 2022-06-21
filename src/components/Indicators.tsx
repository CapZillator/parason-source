import React, { useContext } from 'react';
import { AppContext } from '../store/context';
import { getWindDir, convertWindSpeedVal, getBofortScaleVal } from '../Lib';
import WindMill from './WindMill';
import WindDir from './Icons/WindDir';
import getLangPack from '../LangPack';
import '../styles/CurrentWeather.scss';
import '../styles/Chart.scss';

function Indicators() {
    const { state, dispatch } = useContext(AppContext);
    const lang = getLangPack(state.lang.code);

    
    
    let currentWindDir = null;
    let [currentWindSpeed, currentBofort] = new Array(2).fill(0);
    let windUnits: string = lang.lib.units[state.uni.gen].windUnit[state.uni.wind];
    let windDirCode: number = 0;
    if (state.weather.data){//Определяем, какое сейчас время суток
        windDirCode = getWindDir(state.weather.data.current.wind_deg);
        currentWindDir = lang.lib.windDir[windDirCode];
        currentWindSpeed = Math.round(state.weather.data.current.wind_speed);
        currentBofort = getBofortScaleVal(state.weather.data.current.wind_speed);
    };
    return (
      <div className="Indicators-wrapper">
            <div className="Wind-block">
              <div>
                <p>{lang.lib.wind} {currentWindDir} {convertWindSpeedVal(state.uni.gen, state.uni.wind, currentWindSpeed)} {windUnits}</p>
                <WindDir direction={windDirCode}/>
                <p>{lang.lib.windBeafort} <span className='Current-Beafort-Val'>{currentBofort}</span></p>
              </div>
              <WindMill bofort={currentBofort}/>
            </div>
      </div>
    );
  }
  export default Indicators;
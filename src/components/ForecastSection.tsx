import React, { useContext, useState } from 'react';
import { AppContext } from '../store/context';
import getLangPack from '../LangPack';
import {convertToStringT, roundDigit, getWindDir, convertWindSpeedVal, convertDate} from '../Lib';
import SunChart from './SunChart';
import GetWeatherIcon from './GetWeatherIcon';
import WindDir from './Icons/WindDir';
import MoonPhase from './Icons/MoonPhase';
import Hum from './Icons/Hum';
import Cloud from './Icons/Cloud';
import UV from './Icons/UV';
import PressForecast from './Icons/PressForecast';
import Hint from './Hint';
import '../styles/DailyForecast.scss';

export default function ForecastSection(){
  const { state, dispatch } = useContext(AppContext);

  const lang = getLangPack(state.lang.code);
  const weather = state.weather.data;
  let dailySection = null;
  if (weather) {
    const dailyFrc: Array<any> = weather.daily;
    dailySection = dailyFrc.map((d, i) => {
      let [hum, press, clouds, uvi] = new Array(4).fill(0);
      let windSpeed= Math.round(d.wind_speed);
      let windUnits: string = lang.lib.units[state.uni.gen].windUnit[state.uni.wind];
      let windDirCode: number = getWindDir(d.wind_deg);
      let windDir = lang.lib.windDir[windDirCode];
      hum = roundDigit(d.humidity, 10);
      clouds = roundDigit(d.clouds, 10);
      uvi = roundDigit(d.uvi, 10);
      if (state.uni.press === 'hg'){
        press = state.uni.gen === 'metric' ? Math.round(d.pressure * 0.75): roundDigit(d.pressure * 0.02953, 100);
      }
      else press = roundDigit(d.pressure, 10);
      const convertedDate = convertDate(d.dt, lang.lib.dayFull, lang.lib.monthFull);
      return <div key={d.dt} className='Daily-Forecast-Wrapper'>
            <div className='Daily-Forecast-Header'>
              <div>
                <span className='Daily-forecast-Date-Val'>
                  {convertedDate.date}
                </span>
              </div>
              <div>
                <p> {convertedDate.month}</p>
                <p>{convertedDate.day}</p>
              </div>
            </div>
            <div className='Daily-Forecast-Temp'>
              <div className='Daily-Forecast-Temp-Content'>
                <div className='First-Letter-Uppercase'>{lang.lib.dayTime.morning}</div>
                <div>{convertToStringT(d.temp.morn, state.uni.gen)}</div>
              </div>
              <div className='Daily-Forecast-Temp-Content'>
                <div className='First-Letter-Uppercase'>{lang.lib.dayTime.day}</div>
                <div>{convertToStringT(d.temp.day, state.uni.gen)}</div>
              </div>
              <div className='Daily-Forecast-Temp-Content'>
                <div className='First-Letter-Uppercase'>{lang.lib.dayTime.evening}</div>
                <div>{convertToStringT(d.temp.eve, state.uni.gen)}</div>
              </div>
              <div className='Daily-Forecast-Temp-Content'>
                <div className='First-Letter-Uppercase'>{lang.lib.dayTime.night}</div>
                <div>{convertToStringT(d.temp.night, state.uni.gen)}</div> 
              </div>
            </div>
            <div className='Daily-Forecast-WeatherDesc'>
              <GetWeatherIcon iconCode={d.weather[0].icon} wrapper='Weather-Icon-Wrapper-Forecast'/>
              <div className='Daily-Forecast-WeatherDesc-Val'>{lang.lib.weatherCodes[d.weather[0].id]}</div>
            </div>
            <div className='Daily-Forecast-Wind'>
              <WindDir direction={windDirCode} type='forecast'/>
              <div className='Daily-Forecast-Wind-Val'>
                {windDir} {convertWindSpeedVal(state.uni.gen, state.uni.wind, windSpeed)} {windUnits}
              </div>
            </div>
            <div className='Daily-Forecast-Astro'>
              <MoonPhase phase={d.moon_phase} lang={lang} wrapper='Moon-Forecast-Icon'/>
              <SunChart sunrise={d.sunrise} sunset={d.sunset} size='small'/>
            </div>
            <div className='Daily-Forecast-OtherIndicators' title={lang.lib.hint.hum}>
              <div className='Daily-Forecast-OtherIndicators-Wrapper'>
                <Hum wrapper='Daily-Forecast-Icon-Small' />
                <div>
                  {hum}%
                </div>
              </div>
              <div className='Daily-Forecast-OtherIndicators-Wrapper' title={lang.lib.hint.cloud}>
                <Cloud wrapper='Daily-Forecast-Icon-Small' />
                <div>
                  {clouds}%
                </div>
              </div>
              <div className='Daily-Forecast-OtherIndicators-Wrapper' title={lang.lib.hint.uv}>
                <UV wrapper='Daily-Forecast-Icon-Small' />
                <div>
                  {uvi}
                </div>
              </div>
              <div className='Daily-Forecast-OtherIndicators-Wrapper' title={lang.lib.hint.pre}>
                <PressForecast wrapper='Daily-Forecast-Icon-Small' />
                <div>
                  {press} {lang.lib.units[state.uni.gen].press[state.uni.press]}
                </div>
              </div>
            </div>
        </div>;
    });
  }
  return (
    <div className="Forecast-wrapper">{dailySection}</div>
  );
}

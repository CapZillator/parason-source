import React, { useContext } from 'react';
import { AppContext } from '../store/context';
import { roundDigit } from '../Lib';
import CircleChart from './CircleChart';
import getLangPack from '../LangPack';
import '../styles/Indicators.scss';

function CircleIndicators() {
    const { state, dispatch } = useContext(AppContext);
    const lang = getLangPack(state.lang.code);
    
    let [hum, press, clouds, uvi] = new Array(4).fill(0);
    if (state.weather.data){
        hum = roundDigit(state.weather.data.current.humidity, 10);
        clouds = roundDigit(state.weather.data.current.clouds, 10);
        uvi = roundDigit(state.weather.data.current.uvi, 10);
        if (state.uni.press === 'hg'){
            press = state.uni.gen === 'metric' ? Math.round(state.weather.data.current.pressure * 0.75): roundDigit(state.weather.data.current.pressure * 0.02953, 100);
        }
        else press = roundDigit(state.weather.data.current.pressure, 10);
    }
    return (
      <div className="Circle-indicators-wrapper">
          <div className="Circle-indicators-container">
            <CircleChart val={hum} type={"general"} icon={"hum"}/>
            <CircleChart val={clouds} type={"general"} icon={"cloud"}/>
            <CircleChart val={uvi} type={"uvi"} icon={"uvi"}/>
            <CircleChart val={press} type={"press"} icon={"press"}/>
          </div>
      </div>
    );
  }
  export default CircleIndicators;
import React from 'react';
import HeavyRain from "./Icons/WeatherIcons/HeavyRain";
import LiteRain from "./Icons/WeatherIcons/LiteRain";
import ClearSkyDay from "./Icons/WeatherIcons/ClearSkyDay";
import ClearSkyNight from "./Icons/WeatherIcons/ClearSkyNight";
import HalfSun from "./Icons/WeatherIcons/HalfSun";
import HalfMoon from "./Icons/WeatherIcons/HalfMoon";
import Clouds from "./Icons/WeatherIcons/Clouds";
import Clouds2 from "./Icons/WeatherIcons/Clouds2";
import Storm from "./Icons/WeatherIcons/Storm";
import Mist from "./Icons/WeatherIcons/Mist";
import Snow from "./Icons/WeatherIcons/Snow";
import '../styles/CurrentWeather.scss';
import '../styles/Main.scss';

/* Возвращает иконку с соответствующей погодой */
function GetWeatherIcon(props: any) {
    const code: string = props.iconCode ? props.iconCode: '04d';
    const wrapperClassName = props.wrapper ? props.wrapper : 'Weather-Icon-Wrapper';
    let weatherIcon: any;
    switch (code){
        case '01d': weatherIcon = <ClearSkyDay wrapper={wrapperClassName}/>; break;
        case '01n': weatherIcon = <ClearSkyNight wrapper={wrapperClassName}/>; break;
        case '02d': weatherIcon = <HalfSun wrapper={wrapperClassName}/>; break;
        case '02n': weatherIcon = <HalfMoon wrapper={wrapperClassName}/>; break;
        case '03d': weatherIcon = <Clouds wrapper={wrapperClassName}/>; break;
        case '03n': weatherIcon = <Clouds wrapper={wrapperClassName}/>; break;
        case '04d': weatherIcon = <Clouds2 wrapper={wrapperClassName}/>; break;
        case '04n': weatherIcon = <Clouds2 wrapper={wrapperClassName}/>; break;
        case '09d': weatherIcon = <LiteRain wrapper={wrapperClassName}/>; break;
        case '09n': weatherIcon = <LiteRain wrapper={wrapperClassName}/>; break;
        case '10d': weatherIcon = <HeavyRain wrapper={wrapperClassName}/>; break;
        case '10n': weatherIcon = <HeavyRain wrapper={wrapperClassName}/>; break;
        case '11d': weatherIcon = <Storm wrapper={wrapperClassName}/>; break;
        case '11n': weatherIcon = <Storm wrapper={wrapperClassName}/>; break;
        case '13d': weatherIcon = <Snow wrapper={wrapperClassName}/>; break;
        case '13n': weatherIcon = <Snow wrapper={wrapperClassName}/>; break;
        case '50d': weatherIcon = <Mist wrapper={wrapperClassName}/>; break;
        case '50n': weatherIcon = <Mist wrapper={wrapperClassName}/>; break;
        default: weatherIcon = <HeavyRain wrapper={wrapperClassName}/>; break;
    }
    return (
        <div>
            {weatherIcon}
        </div>
    );
  }
  export default GetWeatherIcon;
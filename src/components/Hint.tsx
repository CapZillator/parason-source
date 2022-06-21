import React, { useContext, useState } from 'react';
import { AppContext } from '../store/context';
import getLangPack from '../LangPack';
import '../styles/DailyForecast.scss';

function Hint(props: any) {
    const hintState = props.hintState;
    const hintVal = props.val ? props.val: '';
    const hintClassName = hintState ? "Forecast-Hint": "Forecast-Hint Forecast-Hint-Hide";
    return (
        <div 
            className={hintClassName}
            >
                {hintVal}
        </div>
    );
  }
  export default Hint;
import React, { useContext } from 'react';
import { AppContext } from '../store/context';
import getLangPack from '../LangPack';
import { roundDigit } from '../Lib';
import '../styles/Chart.scss';

export function MainChart(){
  const { state, dispatch } = useContext(AppContext);
  const lang = getLangPack(state.lang.code);
  const weather = state.weather.data;
  let pathTMax: string = '';
  let pathTMin: string = '';
  let circleTMaxPoints, circleTMinPoints, textTMax, textTMin, precipVal, precipColumns, pressureColumns, pressureVal, 
  chartDateVal, chartDayVal, legendPress, legendPrecip, tMaxLegend, tMinLegend;
  if (weather){
    const chartW: number = 1000;//Ширина графика
    const chartH: number = 750;//Высота графика
    const yTempTopIndent: number = Math.round(chartH / 3);//Отступ графика Т по вертикали сверху
    const yTempBottomIndent: number = Math.round(chartH / 5);//Отступ графика Т по вертикали снизу
    const yPressIndent: number = Math.round(chartH / 8);//Отступ графика давления
    const yPressIndent2: number = Math.round(yPressIndent / 5);//Отступ столбца давления от столбца осадков снизу (буферный отступ, дабы не сливались)
    const yPrecipVal: number = chartH - 35;//Координата Y значений осадков
    const yPressVal: number = chartH - 10;//Координата Y значений давления
    const yDateVal: number = 30;//Координата Y значений даты
    const yDayVal: number = 55;//Координата Y значений дня недели
    const yBottomIndent: number = 65;//Отступ снизу для всех элементов графика, кроме температуры
    const tempMainArea: number = chartH - yTempTopIndent - yTempBottomIndent;//Диапозон значений Т по шкале Y
    const precipMainArea: number = chartH - yTempTopIndent - 75;//Диапозон значений осадков по шкале Y
    const pressureMainArea: number = yTempTopIndent - yPressIndent;//Диапозон значений давления по шкале Y
    const dailyFrc: Array<any> = weather.daily;
    let dailyTempMax: Array<any> = [];
    let dailyTempMin: Array<any> = [];
    let dailyPrecip: Array<any> = [];
    let dailyPressure: Array<any> = [];
    let dailyDate: Array<any> = [];
    dailyFrc.forEach(d => {
      dailyTempMax.push(Math.round(d.temp.max));
      dailyTempMin.push(Math.round(d.temp.min));
      dailyPressure.push(Math.round(d.pressure));
      dailyDate.push(d.dt);
      if (d.rain && d.rain > 0.01) dailyPrecip.push(d.rain);
      else dailyPrecip.push(0);
    });
    const maxT: number = Math.max(...dailyTempMax);
    const minT: number = Math.min(...dailyTempMin);
    const stepTY: number = maxT > minT ? Math.round(tempMainArea / Math.abs(maxT - minT)): tempMainArea;
    const maxPrecip: number = Math.max(...dailyPrecip);
    const stepPrecipY: number = maxPrecip > 0 ? Math.round(precipMainArea / maxPrecip): precipMainArea;
    const maxPressure: number = Math.max(...dailyPressure);
    const minPressure: number = Math.min(...dailyPressure);
    const stepPressY: number = maxPressure > minPressure ? Math.round(pressureMainArea / (maxPressure - minPressure)): pressureMainArea;
    pathTMax = '';
    pathTMin = '';
    let pointsTMax: Array<any> = [];//Координаты маркеров Tmax
    let pointsTMin: Array<any> = [];//Координаты маркеров Tmin
    let pointsPrecipVal: Array<any> = [];//Координаты значений осадков
    let columnPrecipCoords: Array<any> = [];//Координаты столбцов (осадки)
    let pointsPressVal: Array<any> = [];//Координаты значений давления (также используется для отрисовки значений даты)
    let columnPressureCoords: Array<any> = [];//Координаты столбцов (давление)
    let textTMaxPoints: Array<any> = [];//Координаты значений Tmax
    let textTMinPoints: Array<any> = [];//Координаты значений Tmin
    const circleTradius: number = 6;//Радиус точек Т на гриафике
    const textYIndent: number = Math.round(chartH / 20);
    const stepTX: number = Math.round(chartW / 10);//Шаг (расстояние между точками) графика Т по горизонтали
    const halfStep: number = Math.round(stepTX / 2);
    const quarterStep: number = Math.round(stepTX / 4);
    let bezieTempIndent: number = Math.round(chartW / 20);//Смещение кривой Безье для графика Т
    const xStartPoint: number = 0;//Точка отсчета по горизонтали
    let xTCounter: number = xStartPoint + halfStep;//Счетчик шага T по горизонтали
    dailyTempMax.forEach((d, i) => {
      const controlPointTMaxY: number = yTempTopIndent + (maxT - d) * stepTY;
      const controlPointTMinY: number = yTempTopIndent + (maxT - dailyTempMin[i]) * stepTY;
      const controlPointPrecipY: number = yTempTopIndent + (maxPrecip - dailyPrecip[i]) * stepPrecipY;
      const controlPointPressY: number = yPressIndent + (maxPressure - dailyPressure[i]) * stepPressY - yPressIndent2;
      if (i === 0){
        pathTMax = `M${xStartPoint},${controlPointTMaxY} C${xStartPoint + bezieTempIndent},${controlPointTMaxY} ${xTCounter - bezieTempIndent},${controlPointTMaxY} ${xTCounter},${controlPointTMaxY}`;
        pathTMin = `M${xStartPoint},${controlPointTMinY} C${xStartPoint + bezieTempIndent},${controlPointTMinY} ${xTCounter - bezieTempIndent},${controlPointTMinY} ${xTCounter},${controlPointTMinY}`;
      }
      else {
        pathTMax = `${pathTMax} S ${xTCounter - bezieTempIndent},${controlPointTMaxY} ${xTCounter},${controlPointTMaxY}`;
        pathTMin = `${pathTMin} S ${xTCounter - bezieTempIndent},${controlPointTMinY} ${xTCounter},${controlPointTMinY}`;
      };
      pointsTMax.push({x: xTCounter, y: controlPointTMaxY});
      pointsTMin.push({x: xTCounter, y: controlPointTMinY});
      textTMaxPoints.push({x: xTCounter, y: controlPointTMaxY - textYIndent});
      textTMinPoints.push({x: xTCounter, y: controlPointTMinY + textYIndent});
      pointsPrecipVal.push(xTCounter);
      columnPrecipCoords.push({x: xTCounter - quarterStep, y: controlPointPrecipY});
      columnPressureCoords.push({x: xTCounter - quarterStep, y: controlPointPressY});
      pointsPressVal.push(xTCounter);
      xTCounter += stepTX;
    });
    pathTMax = `${pathTMax} S ${xTCounter - halfStep - bezieTempIndent},${yTempTopIndent + (maxT - dailyTempMax[dailyTempMax.length - 1]) * stepTY} ${xTCounter - halfStep},${yTempTopIndent + (maxT - dailyTempMax[dailyTempMax.length - 1]) * stepTY}
                Q ${xTCounter - halfStep},${yTempTopIndent + Math.round((chartH - yTempTopIndent) / 2)} ${xTCounter - halfStep},${chartH - yBottomIndent} Q ${Math.round(xTCounter / 2)},${chartH - yBottomIndent} ${xStartPoint},${chartH - yBottomIndent}`;
    pathTMin = `${pathTMin} S ${xTCounter - halfStep - bezieTempIndent},${yTempTopIndent + (maxT - dailyTempMin[dailyTempMin.length - 1]) * stepTY} ${xTCounter - halfStep},${yTempTopIndent + (maxT - dailyTempMin[dailyTempMin.length - 1]) * stepTY}`;
    circleTMaxPoints = pointsTMax.map((p, i) => {
      return <circle key={`tMaxCircle${i}`} cx={p.x} cy={p.y} r={circleTradius} style={{fill: '#ffffff', stroke: 'none'}}/>;
    });
    circleTMinPoints = pointsTMin.map((p, i) => {
      return <circle key={`tMinCircle${i}`} cx={p.x} cy={p.y} r={circleTradius} className='PointsTMin' />;
    });
    textTMax = textTMaxPoints.map((p, i) => {
      let dtm: number = (state.uni.gen === 'metric') ? dailyTempMax[i] : Math.round(dailyTempMax[i] * 1.8 + 32);
      let tVal = dtm > 0 ? `+${dtm}`: dtm;
      return <text key={`tMaxVal${i}`} x={p.x} y={p.y + quarterStep / 2} className="TText">{tVal}</text>;
    });
    textTMin = textTMinPoints.map((p, i) => {
      let dtm: number = (state.uni.gen === 'metric') ? dailyTempMin[i] : Math.round(dailyTempMin[i] * 1.8 + 32);
      let tVal = dtm > 0 ? `+${dtm}`: dtm;
      return <text key={`tMinVal${i}`} x={p.x} y={p.y} className="TText">{tVal}</text>;
    });
    precipVal = pointsPrecipVal.map((p, i) => {
      let pVal: number = (state.uni.gen === 'metric') ? dailyPrecip[i] : roundDigit(dailyPrecip[i] * 0.03937);
      return <text key={`precipVal${i}`} x={p} y={yPrecipVal} className="PrecipText">{pVal}</text>;
    });
    precipColumns = columnPrecipCoords.map((p, i) => {
      if (dailyPrecip[i] > 0) return <rect key={`precipColumn${i}`} x={p.x} y={p.y} width={halfStep} height={chartH - p.y - yBottomIndent} className="PrecipColumn" />;
    });
    pressureColumns = columnPressureCoords.map((p, i) => {
      return <rect key={`pressureColumn${i}`} x={p.x} y={p.y} width={halfStep} height={chartH - p.y - yBottomIndent} className="PressureColumn" style={{stroke: 'url(#TGradient2)'}}/>;
    });
    pressureVal = pointsPressVal.map((p, i) => {
      let pressVal: number = dailyPressure[i];
      if (state.uni.press === 'hg'){
        pressVal = state.uni.gen === 'metric' ? Math.round(pressVal * 0.75): roundDigit(pressVal * 0.02953, 100);
      };
      return <text key={`pressureVal${i}`} x={p} y={yPressVal} className="PressText">{pressVal}</text>;
    });
    chartDateVal = pointsPressVal.map((p, i) => {
      let dtVal: any = new Date(dailyDate[i] * 1000);
      dtVal = dtVal.getDate();
      return <text key={`dateVal${i}`} x={p} y={yDateVal} className="DateText">{dtVal}</text>;
    });
    chartDayVal = pointsPressVal.map((p, i) => {
      let dayVal: any = new Date(dailyDate[i] * 1000);
      dayVal = lang.lib.dayShort[dayVal.getDay()];
      return <text key={`dayVal${i}`} x={p} y={yDayVal} className="DayText">{dayVal}</text>;
    });
    legendPrecip = <text x={xTCounter - quarterStep} y={yPrecipVal} className="LegendTextPrecip">
      {lang.lib.chart.precip}, {lang.lib.units[state.uni.gen].precip}</text>;
    legendPress = <text x={xTCounter - quarterStep} y={yPressVal} className="LegendText">{lang.lib.units[state.uni.gen].press[state.uni.press]}</text>;
    tMaxLegend = <text x={xTCounter - quarterStep} y={pointsTMax[pointsTMax.length - 1].y - textYIndent + quarterStep / 2} className="LegendTextTMax">{lang.lib.chart.tmax}</text>;
    tMinLegend = <text x={xTCounter - quarterStep} y={pointsTMin[pointsTMin.length - 1].y + textYIndent} className="LegendTextTMin">{lang.lib.chart.tmin}</text>;
  }
  return (
        <div className="Chart-wrapper">
          <svg width="1000" height="750" viewBox="0 0 1000 750" className="Chart-component">
            <linearGradient id="TGradient" x1="50%" y1="0" x2="50%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, .7)"/>
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)"/>
            </linearGradient>
            <linearGradient id="TGradient2" x1="50%" y1="0" x2="50%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, .4)"/>
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)"/>
            </linearGradient>
            {pressureColumns}
            {precipColumns}
            <path d={pathTMax} className="pathTMax" style={{fill: 'url(#TGradient)'}}/>
            <path d={pathTMin} className="PathTMin" strokeWidth="4" />
            {circleTMaxPoints}{circleTMinPoints}
            {textTMax}{textTMin}
            {precipVal}
            {pressureVal}
            {chartDateVal}
            {chartDayVal}
            {legendPress}{legendPrecip}
            {tMaxLegend}{tMinLegend}
          </svg>
        </div>
  );
}

export default MainChart;

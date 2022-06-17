export function roundDigit(digit: number, sign?: number): number {
  //Округляет число до определенного знака
  //lim - сколько знаков, 10 - 1 знак и т.д.
  const lim: number = sign ? sign: 100;
  let result: number = Math.round(digit * lim) / lim;
  return result;
}
export function parseCityFromDataArray(dataArr: Array<any>, lang?: string): string {
  //Ищет в исходном массиве данных, полученных с сервера, название населенного пункта на указанном языке
  let lng: string = lang ? lang: 'ru';//Язык по умолчанию - Русский
  let resultCityName: string = '';
  dataArr.forEach((el) => {
    //Перебирает все значения массива с названиями нас. пунктов на разных языках, пока не найдет первое совпадение
    //Логика кривая, но какое API, такая и логика)
    if (resultCityName.length === 0 && el.local_names[lng]){
      resultCityName = el.local_names[lng];
    }
  });
  if (resultCityName.length === 0) {
    //Устанавливает название населенного пункта в случае, если его не удалось найти на указанном языке.
    dataArr.forEach((el) => {
      if (resultCityName.length === 0 && el.name){
        resultCityName = el.name;
      }
    });
  }
  return resultCityName;
}
export function sunriseSunsetDayduration(sunrise?: number, sunset?: number, lang?: string, lat?: number): any {
  //Возвращает объект со строковым представлением восхода, заката солнца, продолжительности дня, а так же указанием на полярную ночь/день для регионов соответсвующей широты
  let rise: any = sunrise ? new Date(sunrise * 1000): 0;
  let set: any = sunset ? new Date(sunset * 1000): 0;
  if (!lang) lang = 'ru-RU';//Значение локали по умолчанию
  let options = {hour: '2-digit', minute:'2-digit'};
  rise = rise.toLocaleTimeString(lang, options);
  set = set.toLocaleTimeString(lang, options);
  let day: any = 0;//Рассчитывает продолжительность дня, если известны время восхода и заката солнца
  if (sunrise && sunset) {
    let minutes = convertMinValToString(Math.floor((sunset - sunrise) % 3600 / 60));
    day = `${Math.floor((sunset - sunrise) / 3600)}:${minutes}`;
  };
  let polar = 0;//Индикатор поярного дня/ночи. 0 - не наблюдается, 1 - день, 2 - ночь
  if (day === 0 && lat){
    //Если не указано время заката/восходя, проверяем широту и какой сейчас месяц на предмет возможного наступляения полярного дня/ночи
    let now: any = new Date();
    now = now.getMonth();
    if (lat >= 65.71) {
      if (now >= 2 && now <=8) polar = 1;
      else polar = 2;
    }
    else if (lat <= -66.56){
      if (now >= 3 && now <= 7) polar = 2;
      else polar = 1;
    }
  };
  let result = {sunrise: rise, sunset: set, dayDuration: day, polar: polar};
  return result;
}
export function moonriseSetDayduration(moonrise?: number, moonset?: number, lang?: string): any {
  //Возвращает объект со строковым представлением восхода, заката луны
  let rise: any = moonrise ? new Date(moonrise * 1000): 0;
  let set: any = moonset ? new Date(moonset * 1000): 0;
  if (!lang) lang = 'ru-RU';//Значение локали по умолчанию
  let options = {hour: '2-digit', minute:'2-digit'};
  rise = moonrise ? rise.toLocaleTimeString(lang, options): rise;
  set = moonset ? set.toLocaleTimeString(lang, options): set;
  let dur: any = '∞';//Рассчитывает продолжительность дня, если известны время восхода и заката солнца
  if (moonrise && moonset) {
    let difference = moonset > moonrise ? moonset - moonrise: moonrise - moonset;
    let minutes = convertMinValToString(Math.floor((difference) % 3600 / 60));
    dur = `${Math.floor((difference) / 3600)}:${minutes}`;
  };

  let result = {moonrise: rise, moonset: set, duration: dur};
  return result;
}
export function moonPhase(phase?: any): number {
  let p = phase ? phase: 0;
  let result = 0;
  if (p > 0 && p < 0.5) result = 1;
  else if (p === 0.5) result = 2;
  else if (p > 0.5 && p < 1) result = 3;
  return result;
}

export function getWindDir(degrees?: number): number{
  //Конвертирует направление ветра в градусах в числовой индекс, котрый в свою очередь соотетствует строковому обозначению на соответсвующем языке
  let result: number = 0;
  if (degrees){
    if (degrees > 22 && degrees <= 67) result = 1;
    else if (degrees > 67 && degrees <= 112) result = 2;
    else if (degrees > 112 && degrees <= 157) result = 3;
    else if (degrees > 157 && degrees <= 202) result = 4;
    else if (degrees > 202 && degrees <= 247) result = 5;
    else if (degrees > 247 && degrees <= 292) result = 6;
    else if (degrees > 292 && degrees <= 337) result = 7;
  }
  return result;
}
export function convertWindSpeedVal(unit: string, grade: string, speed?: number): number {
  //Конвертирует скорость ветра в указанную ед. измерения
  speed = speed ? speed : 0;
  if (unit === 'metric'){
    if (grade === 'hour') speed = Math.round(speed * 3.6);// км/ч
    else if (grade === 'knots') speed = Math.round(speed * 1.94384);// узлы
    else speed = Math.round(speed);// м/с
  }
  else {
    if (grade === 'hour') speed = Math.round(speed * 2.237);// миль/ч
    else if (grade === 'knots') speed = Math.round(speed * 1.94384);// узлы
    else speed = Math.round(speed * 3.28084);// фут/с
  };
  return speed;
}

export function getBofortScaleVal(speed: number): number {
  //Определяет силу ветра по шкале Бофорта
  let result: number = 0;
  //Если еденица измерения миль/ч, конвертируем в м/с
  const msWindSpeed: number = speed;
  //const msWindSpeed: number = (units && units === 'imperial') ? speed * 2.23694 : speed;
  if (msWindSpeed >= 0.3 && msWindSpeed < 1.6) result = 1;
  else if (msWindSpeed >= 1.6 && msWindSpeed < 3.4) result = 2;
  else if (msWindSpeed >= 3.4 && msWindSpeed < 5.5) result = 3;
  else if (msWindSpeed >= 5.5 && msWindSpeed < 8) result = 4;
  else if (msWindSpeed >= 8 && msWindSpeed < 10.8) result = 5;
  else if (msWindSpeed >= 10.8 && msWindSpeed < 13.9) result = 6;
  else if (msWindSpeed >= 13.9 && msWindSpeed < 17.2) result = 7;
  else if (msWindSpeed >= 17.2 && msWindSpeed < 20.8) result = 8;
  else if (msWindSpeed >= 20.8 && msWindSpeed < 24.5) result = 9;
  else if (msWindSpeed >= 24.5 && msWindSpeed < 28.5) result = 10;
  else if (msWindSpeed >= 28.5 && msWindSpeed < 33) result = 11;
  else if (msWindSpeed >= 33) result = 12;
  return result;
}

export function convertToStringT(t: number, unit: string): string {
  //Округляет численное значение Т и возвращает форматированную строку
  t = unit === 'metric' ? Math.round(t) : Math.round(t * 1.8 + 32);
  let resultT: string = t > 0 ? `+${t}°`: `${t}°`;
  return resultT;
} 

export function convertDateToString(sourceDate: number, langLib: any): string {
  //Получает дату в секундах и возвращает строковое представление на соответствующем языке
  //const options = { weekday: 'long' , day: 'numeric' };
  let d = new Date(sourceDate * 1000);
  let resultDate: string = `${langLib[d.getDay()]}, ${d.getDate()}`;
  return resultDate;
}
export function convertDate(sourceDate: number, dayName: any, monthName: any): any {
  //Получает дату в секундах и возвращает и конвертирует в массив [число, день, месяц]
  //const options = { weekday: 'long' , day: 'numeric' };
  let d = new Date(sourceDate * 1000);
  let result = {date: d.getDate(), day: dayName[d.getDay()], month: monthName[d.getMonth()]};
  return result;
}
export function convertMinValToString(min: number): string {
  //Получает числовое значение минут и возвращает строковое, более удобочитаемое
  let result: string = `${min}`;
  if (min === 0) result = '00';
  else if (min > 0 && min < 10) result = `0${min}`;
  return result;
}
export function convertAccuracyToString(acc: number, langPack: any, units: string): string {
  /*
    Получает числовое значение точности геолокации пользователя в метрах.
    Возвращает строку с округленным значением в соответсвующих еденицах измерения (метрическая/английская)
    и на соотвествующем языке.
  */
  let tempVal: number = 0;
  let result: string = (units === 'metric') ? langPack.lib.units.metric.distance.m : langPack.lib.units.imperial.distance.yd;
  if (acc){
    const divider1: number = (units === 'metric') ? 1000 : 1609;//Метров в километре/миле
    if (acc >= divider1) {
      tempVal = Math.round(acc / divider1);
      result = (units === 'metric') ? langPack.lib.units.metric.distance.km : langPack.lib.units.imperial.distance.m;
    }
    else {
      acc = (units === 'metric') ? acc : Math.round(acc * 1.09361);
      if (acc >= 10) {
        if (acc >= 100){
          tempVal = Math.floor(acc / 100) * 100;
          tempVal = (acc % tempVal) > 0 ? tempVal + Math.round((acc % tempVal) / 10) * 10 : tempVal;
        }
        else tempVal = Math.round(acc / 10) * 10;
      }
      else if (acc > 0){
        tempVal = acc;
      }
      else tempVal = 0;
    };
  }  
  result = `${tempVal} ${result}`;
  return result;
}
export function convertWindVal(wind: number, units: string, grade: number): number {
  let result: number = 0;
  return result;
}
export function checkCoords(coord: any, type: number): any {
  if (!isNaN(coord)){
    if (type === 1 && coord >= -180 && coord <= 180 ) coord = roundDigit(coord);
    else if (type === 2 && coord >= -90 && coord <= 90) coord = roundDigit(coord);
    else coord = null;
  }
  else coord = null;
  return coord;
}
export function getWeatherVal(code: number, langPack: any): string{
  let weather: string = '';
  switch(code){
    case 200: weather = ''; break;
  }
  return weather;
}

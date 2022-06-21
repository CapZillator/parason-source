const langLibrary: Array<any> = [
    {code: 'ru', fullCode: 'ru-RU', label: 'Русский', lib:
        {units: {metric: {windUnit: {second: 'м/с', hour: 'км/ч', knots: 'кн'}, distance: {m: 'м', km: 'км'}, precip: 'мм', press: {hpa: 'гПа', hg: 'мм рт. ст.'}}, 
                imperial: {wind: 'миля/ч', windUnit: {second: 'фут/с', hour: 'миль/ч', knots: 'кн'}, distance: {yd: 'ярд', m: 'миль'}, precip: 'дюйм', press: {hpa: 'гПа', hg: 'дюйм рт. ст.'}}},
        windDir: ['C', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'],
        windSpeed: 'скорость ветра',
        windBeafort: 'Шкала Бофорта',
        wind: 'Ветер',
        astro: {
            sunrise: 'восход', sunset: 'закат', dayDur: 'продолжительность дня'
            },
        dayShort: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
        dayFull: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
        dayTime: {
            morning: 'утро', day: 'день', evening: 'вечер', night: 'ночь'
        },
        monthFull: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
        moonPhase: ['новолуние', 'растущая луна', 'полнолуние', 'убывающая луна'],
        chart: {
            tmin: 'Tмин', tmax: 'Тмакс', precip: 'осадки',
            polar: ['Полярный день', 'Полярная ночь']
            },
        hint: {hum: 'Влажность', cloud: 'Облачность', pre: 'Давление', uv: 'УФ индекс'},
        feels_like: 'ощущается как',
        info: {addToFavourites: 'Добавить в избранное', favourites: 'Избранное', done: 'Готово', city: 'Город', geoAcc: 'Точность геолокации', 
            footerText: 'рассчитывает прогноз погоды по географическим координатам. Пожалуйста, не отключайте геолакацию для максимальной точности прогноза.'},
        weatherCodes: {200: 'небольшой дождь, гроза', 201: 'дождь, гроза', 202: 'сильный дождь, гроза', 210: 'небольшая гроза', 211: 'гроза', 212: 'сильная гроза', 221: 'местами гроза', 230: 'слабая морось, гроза', 231: 'морось, гроза', 232: 'сильная морось, гроза',
                    300: 'небольшая морось', 301: 'морось', 302: 'сильная морось', 310: 'небольшой моросящий дождь', 311: 'моросящий дождь', 312: 'сильный моросящий дождь', 313: 'временами слабая морось', 314: 'временами морось', 321: 'сильная морось',
                    500: 'небольшой дождь', 501: 'дождь', 502: 'сильный дождь', 503: 'очень сильный дождь', 504: 'ливень', 511: 'ледяной дождь', 520: 'временами небольшой проливной дождь', 521: 'временами проливной дождь', 522: 'временами сильный проливной дождь', 531: 'местами проливной дождь',
                    600: 'небольшой снег', 601: 'снег', 602: 'сильный снег', 611: 'мокрый снег', 612: 'временами мокрый снег', 613: 'временами сильный мокрый снег', 615: 'небольшой дождь со снегом', 616: 'дождь со снегом', 620: 'временами небольшой снег', 621: 'временами снег', 622: 'временами сильный снег',
                    701: 'дымка', 711: 'слабый туман', 721: 'туман', 731: 'пыльные вихри', 741: 'сильный туман', 751: 'песчаная буря', 761: 'пыльная буря', 762: 'вулканический пепел', 771: 'шквалы', 781: 'торнадо',
                    800: 'ясно', 801: 'небольшая облачность', 802: 'переменная облачность', 803: 'облачно с прояснениями', 804: 'пасмурно'}
        },
    },
    {code: 'by', fullCode: 'by-BY', label: 'Беларуская', lib:
        {units: {metric: {windUnit: {second: 'м/с', hour: 'км/г', knots: 'кн'}, distance: {m: 'м', km: 'км'}, precip: 'мм', press: {hpa: 'гПа', hg: 'мм рт. сл.'}}, 
                imperial: {wind: 'миля/ч', windUnit: {second: 'фут/с', hour: 'миля/г', knots: 'кн'}, distance: {yd: 'ярд', m: 'миль'}, precip: 'дзюйм', press: {hpa: 'гПа', hg: 'дзюйм рт. сл.'}}},
        windDir: ['Пн', 'Пн-У', 'У', 'Пд-У', 'Пд', 'Пд-З', 'З', 'Пн-З'],
        windSpeed: 'хуткасць ветру',
        windBeafort: 'Шкала Бофорта',
        wind: 'Вецер',
        astro: {
            sunrise: 'узыход', sunset: 'закат', dayDur: 'працягласць дня'
            },
        dayShort: ['НД', 'ПН', 'АТ', 'СР', 'ЧЦ', 'ПТ', 'СБ'],
        dayFull: ['нядзеля', 'панядзелак', 'аўторак', 'серада', 'чацвер', 'пятніца', 'субота'],
        dayTime: {
            morning: 'раніца', day: 'дзень', evening: 'вечар', night: 'ноч'
        },
        monthFull: ['студзеня', 'лютага', 'сакавіка', 'красавіка', 'мая', 'чэрвеня', 'ліпеня', 'жніўня', 'верасня', 'кастрычніка', 'лістапада', 'снежня'],
        moonPhase: ['маладзік', 'расце месяц', 'поўня', 'змяншальны месяц'],
        chart: {
            tmin: 'Tмін', tmax: 'Тмакс', precip: 'ападкі',
            polar: ['Палярны дзень', 'Палярная ноч']
            },
        hint: {hum: 'Вільготнасць', cloud: 'Воблачнасць', pre: 'Ціск', uv: 'УФ індэкс'},
        feels_like: 'адчуваецца як',
        info: {addToFavourites: 'Дадаць у абранае', favourites: 'Абранае', done: 'Гатова', city: 'Горад', geoAcc: 'Дакладнасць геалакацыі', 
            footerText: "разлічвае прагноз надвор'я па геаграфічных каардынатах. Калі ласка, не адключайце геалакацию для максімальнай дакладнасці прагнозу."},
        weatherCodes: {200: 'невялікі дождж, навальніца', 201: 'дождж, навальніца', 202: 'моцны дождж, навальніца', 210: 'невялікая навальніца', 211: 'навальніца', 212: 'моцная навальніца', 221: 'месцамі навальніца', 230: 'слабая морось, навальніца', 231: 'морось, навальніца', 232: 'моцная морось, навальніца',
            300: 'невялікая морось', 301: 'морось', 302: 'моцная морось', 310: 'невялікі дробны дождж', 311: 'дробны дождж', 312: 'моцны дробны дождж', 313: 'часам невялікі дробны дождж', 314: 'часам дробны дождж', 321: 'моцны дробны дождж',
            500: 'невялікі дождж', 501: 'дождж', 502: 'моцны дождж', 503: 'вельмі моцны дождж', 504: 'лівень', 511: 'ледзяны дождж', 520: 'часам невялікі праліўны дождж', 521: 'часам праліўны дождж', 522: 'часам моцны праліўны дождж', 531: 'месцамі праліўны дождж',
            600: 'невялікі снег', 601: 'снег', 602: 'моцны снег', 611: 'мокры снег', 612: 'часам мокры снег', 613: 'часам моцны мокры снег', 615: 'невялікі дождж са снегам', 616: 'дождж са снегам', 620: 'часам невялікі снег', 621: 'часам снег', 622: 'часам моцны снег',
            701: 'смуга', 711: 'слабы туман', 721: 'туман', 731: 'пыльныя віхуры', 741: 'моцны туман', 751: 'пясчаная бура', 761: 'пыльная бура', 762: 'вулканічны попел', 771: 'шквал', 781: 'тарнада',
            800: 'ясна', 801: 'невялікая воблачнасць', 802: 'пераменная воблачнасць', 803: 'воблачна з праясненнямі', 804: 'пахмурна'}
        },
    },
    {code: 'en', fullCode: 'en-EN', label: 'English', lib:
                {units: {metric: {wind: 'm/s', windUnit: {second: 'm/s', hour: 'km/h', knots: 'kn'}, distance: {m: 'm', km: 'km'}, precip: 'mm', press: {hpa: 'hPa', hg: 'mm Hg'}}, 
                imperial: {wind: 'mph', windUnit: {second: 'ft/s', hour: 'mph', knots: 'kn'}, distance: {yd: 'yd', m: 'mi'}, precip: 'in', press: {hpa: 'hPa', hg: 'in Hg'}}},
        windDir: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
        windSpeed: 'wind speed',
        windBeafort: 'Beaufort scale',
        wind: 'Wind',
        astro: {
            sunrise: 'sunrise', sunset: 'sunset', dayDur: 'day length'
            },
        dayShort: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
        dayFull: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
        dayTime: {
            morning: 'morning', day: 'day', evening: 'evening', night: 'night'
        },
        monthFull: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
        moonPhase: ['new moon', 'waxing moon', 'full moon', 'waning moon'],
        chart: {
            tmin: 'Tmin', tmax: 'Tmax', precip: 'precip.',
            polar: ['Polar day', 'Polar night']
            },
        hint: {hum: 'Humidity', cloud: 'Cloudiness', pre: 'Pressure', uv: 'UV index'},
        feels_like: 'feels like',
        info: {addToFavourites: 'Add to Favorites', favourites: 'Favourites', done: 'Done', city: 'City', geoAcc: 'Geolocation accuracy is', 
            footerText: 'calculates the weather forecast by geographic coordinates. Please do not disable geolocation for maximum forecast accuracy.'},
        weatherCodes: {200: 'thunderstorm with light rain', 201: 'thunderstorm with rain', 202: 'thunderstorm with heavy rain', 210: 'light thunderstorm', 211: 'thunderstorm', 212: 'heavy thunderstorm', 221: 'ragged thunderstorm', 230: 'thunderstorm with light drizzle', 231: 'thunderstorm with drizzle', 232: 'thunderstorm with heavy drizzle',
                    300: 'light intensity drizzle', 301: 'drizzle', 302: 'heavy intensity drizzle', 310: 'light intensity drizzle rain', 311: 'drizzle rain', 312: 'heavy intensity drizzle rain', 313: 'shower rain and drizzle', 314: 'heavy shower rain and drizzle', 321: 'shower drizzle',
                    500: 'light rain', 501: 'moderate rain', 502: 'heavy intensity rain', 503: 'very heavy rain', 504: 'extreme rain', 511: 'freezing rain', 520: 'light intensity shower rain', 521: 'shower rain', 522: 'heavy intensity shower rain', 531: 'ragged shower rain',
                    600: 'light snow', 601: 'Snow', 602: 'Heavy snow', 611: 'Sleet', 612: 'Light shower sleet', 613: 'Shower sleet', 615: 'Light rain and snow', 616: 'Rain and snow', 620: 'Light shower snow', 621: 'Shower snow', 622: 'Heavy shower snow',
                    701: 'mist', 711: 'Smoke', 721: 'Haze', 731: 'dust whirls', 741: 'fog', 751: 'sand', 761: 'dust', 762: 'volcanic ash', 771: 'squalls', 781: 'tornado',
                    800: 'clear sky', 801: 'few clouds', 802: 'scattered clouds', 803: 'broken clouds', 804: 'overcast clouds'}
        },
    }
];
export function getListOfLanguages(): Array<any> {
    let result: Array<any> = [];
    langLibrary.forEach((el) => {
        result.push({label: el.label, code: el.code});
    })
    return result;
}

export default function getLangPack(langCode?: string): any{
    //Получает двухбуквенный код языка и вовращает соотвествующий объект с набором фраз
    langCode = langCode ? langCode : 'ru';
    let index = langLibrary.findIndex(lang => lang.code === langCode);
    if (index === -1) index = 0;
    //Если язык не найден, по умолчанию будет русский
    return langLibrary[index];
}
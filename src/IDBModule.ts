import { openDB, DBSchema } from 'idb';

export interface WeatherData {
  date: number;
  data: any;
  cityName: string;
  id: string;
}
export interface FavouriteCity {
  cityName: string;
  lat: number;
  lon: number;
}
interface WeatherDB extends DBSchema {
  'weather-data': {
    key: string;
    value: WeatherData;
  };
  
}
interface UserDB extends DBSchema {
  'user-settings': {
    key: string;
    value: {
      units: string;
      windSpeedUnits: string;
      pressUnits: string;
      lang: string;
    };
  };
}
interface FavouriteCitiesList extends DBSchema {
  'favourite-cities-list': {
    key: string;
    value: FavouriteCity;
  };
}

const dbPromise = openDB<WeatherDB>('weather-db', 1, {
    upgrade(db) {
      /*const productStore = db.createObjectStore('products', {
        keyPath: 'productCode',
      });
      let productStore = db.createObjectStore('products', {
        keyPath: 'productCode',
      });
      */
      //productStore.createIndex('by-price', 'price');
      db.createObjectStore('weather-data');
    },
});
const dbPromise2 = openDB<UserDB>('usere-db', 1, {
  upgrade(db) {
    db.createObjectStore('user-settings');
  },
});
const dbPromise3 = openDB<FavouriteCitiesList>('favourite-cities-db', 1, {
  upgrade(db) {
    db.createObjectStore('favourite-cities-list');
  },
});

//Функции для работы с БД (weather-db)
export async function getIDBVal(key: string) {
  return (await dbPromise).get('weather-data', key);
};
export async function setIDBVal(key: string, val: WeatherData) {
  return (await dbPromise).put('weather-data', val, key);
};
export async function delIDBVal(key: string) {
  return (await dbPromise).delete('weather-data', key);
};
export async function clearIDBKeys() {
  return (await dbPromise).clear('weather-data');
};
export async function getIDBKeys() {
  return (await dbPromise).getAllKeys('weather-data');
};
export async function getAllIDBVals(){
  return (await dbPromise).getAll('weather-data');
}
//Функции для работы с БД (user-db)
export async function setUserSettings(key: string, val: any) {
  return (await dbPromise2).put('user-settings', val, key);
};
export async function getUserSettings(key: string) {
  return (await dbPromise2).get('user-settings', key);
};
export async function delUserSettings(key: string) {
  return (await dbPromise2).delete('user-settings', key);
};
//Функции для работы с БД (favourite-cities-db)
export async function getSingleCity(key: string) {
  return (await dbPromise3).get('favourite-cities-list', key);
};
export async function addToFavourites(key: string, val: FavouriteCity) {
  return (await dbPromise3).put('favourite-cities-list', val, key);
};
export async function delSingleCity(key: string) {
  return (await dbPromise3).delete('favourite-cities-list', key);
};
export async function clearFavoriteCitiesList() {
  return (await dbPromise3).clear('favourite-cities-list');
};
export async function getFavoriteCitiesList(){
  return (await dbPromise3).getAll('favourite-cities-list');
}
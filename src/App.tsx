import React, { useReducer, useEffect, useState } from 'react';
import { BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
  useParams } from "react-router-dom";
import { AppContext, initData } from './store/context';
import { appReducer } from './store/reducer';
import Main from './routes/Main';
/*
import React, { useReducer, useEffect, useState } from 'react';
import { roundDigit, parseCityFromDataArray, sunriseSunsetDayduration, getWindDir, convertWindSpeedVal, getBofortScaleVal, convertToStringT, convertAccuracyToString } from './Lib';
import { ContextApp, initData, reducer } from './reducer';
import { getIDBVal, setIDBVal, getIDBKeys, clearIDBKeys, delIDBVal, getAllIDBVals, WeatherData, FavouriteCity, setUserSettings, getUserSettings, delUserSettings,
         addToFavourites, delSingleCity, getFavoriteCitiesList } from './IDBModule';
import { BrowserRouter as Router,
  Route,
  Link,
  useLocation,
  useParams } from "react-router-dom";
import MainChart from './Charts';
import Parser from './Parser';
import CityDB from './CityDB';
import logo from './logo.svg';
import './App.scss';
import getLangPack from './LangPack';
import ForecastSection from './ForecastSection';

const parser: Parser = new Parser();
const cityDB: CityDB = new CityDB();


async function doDatabaseStuff() {
  const db = await openDB(…);
}

let openRequest = indexedDB.open("store", 1);

openRequest.onupgradeneeded = function() {
  // срабатывает, если на клиенте нет базы данных
  // ...выполнить инициализацию...
  let db = openRequest.result;
  if (!db.objectStoreNames.contains('weatherStore')) { // если хранилище "weatherStore" не существует
    db.createObjectStore('weatherStore', {keyPath: 'geoID'}); // создаем хранилище
  }
};

openRequest.onerror = function() {
  console.error("IndexedDB error", openRequest.error);
};

openRequest.onsuccess = function() {
  let db = openRequest.result;
  db.onversionchange = function() {//база данных устарела, закрыть соединение
    db.close();
  };
  // продолжить работу с базой данных, используя объект db
};
function App2() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Main />
        </Route>
      </Routes>
    </Router>

    <Router>
      
    </Router>

    <Routes>
        <Route path="/here">
          <Comp />
        </Route>
      </Routes>
  );
}
*/

function App() {
  const [state, dispatch] = useReducer(appReducer, initData);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      <Router>
        <Routes>
          <Route path="/" element={<Main/>} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}
export default App;

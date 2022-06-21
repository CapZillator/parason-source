import React, { useReducer } from 'react';
import { BrowserRouter as Router,
  Route,
  Routes } from "react-router-dom";
import { AppContext, initData } from './store/context';
import { appReducer } from './store/reducer';
import Main from './routes/Main';

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

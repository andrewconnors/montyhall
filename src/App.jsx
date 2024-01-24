import React, { useState } from 'react';
import {
  HashRouter,
  Route,
  Routes
} from "react-router-dom";

import GameShow from './gui/GameShow'
import HomeScreen from './gui/HomeScreen'
import StatsScreen from './gui/StatsScreen'

import './App.css'; // Create an App.css file for styling

const App = () => {
  return (
    <div className="app">
      <HashRouter>
        <Routes>
          <Route path="/" exact element={ <HomeScreen /> } />
          <Route path="/stats"  element={ <StatsScreen /> } />
          <Route path="/play"   element={ <GameShow /> } />
        </Routes>
    </HashRouter>
    </div>
  );
};

export default App;
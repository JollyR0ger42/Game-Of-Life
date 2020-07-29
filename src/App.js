import React from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';


import Game from './Game/Game';
import StartScreen from './StartScreen/StartScreen'


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">  
          <StartScreen />
        </Route>
        <Route path="/game/:rows/:columns">
          <Game />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

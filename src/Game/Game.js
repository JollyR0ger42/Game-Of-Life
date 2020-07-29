import React, { useState } from 'react';
import Board from '../Board/Board';

import gameIteration from './gameIteration';
import {cloneDeep} from  'lodash';


function Game(props) {
  // array of array with columns * rows dimension
  let [gameGrid, setGameGrid] = useState(Array.from(
    {length: props.rows}, () => new Array(props.columns).fill(0))
  );
  let [intervalID, setIntervalID] = useState();

  function handleStart(){
    if(intervalID){
      clearInterval(intervalID)
      setIntervalID(undefined)
    } else {
      let interval = setInterval(() => setGameGrid(prevGrid => gameIteration(prevGrid)), 100);
      setIntervalID(interval)
    }
  }

  function toggleCell(row, column){
    let grid = cloneDeep(gameGrid);
    grid[row][column] = grid[row][column] ? 0 : 1
    setGameGrid(grid)
  }

  return (
    <div>
      <button onClick={handleStart}>{intervalID ? 'Stop' : 'Start'}</button>
      <Board 
        gameGrid={gameGrid} 
        toggleCell={toggleCell}
      />
    </div>
  )
}

export default Game;
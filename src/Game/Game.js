import React, { useState } from 'react';
import Board from '../Board/Board';
import {useParams} from 'react-router-dom';
import './Game.css';

import gameIteration from './gameIteration';
import {cloneDeep} from  'lodash';


function Game(props) {
  const {rows, columns} = useParams();
  console.log(rows, columns)
  // array of array with columns * rows dimension
  let [gameGrid, setGameGrid] = useState(Array.from(
    {length: parseInt(rows)}, () => new Array(parseInt(columns)).fill(0))
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

  function setCellState(row, column, state){
    let grid = cloneDeep(gameGrid);
    grid[row][column] = state
    setGameGrid(grid)
  }

  return (
    <div className="flex-column">
      <button 
        onClick={handleStart}>{intervalID ? 'Stop' : 'Start'}
      </button>
      <Board 
        gameGrid={gameGrid} 
        setCellState={setCellState}
      />
    </div>
  )
}

export default Game;
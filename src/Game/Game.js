import React, { useState, useEffect } from 'react';
import Board from '../Board/Board';
import {useParams} from 'react-router-dom';
import './Game.css';

import gameIteration from './gameIteration';
import {cloneDeep} from  'lodash';


function Game(props) {
  const {rows, columns} = useParams();
  const emptyGrid = Array.from({length: parseInt(rows)}, () => new Array(parseInt(columns)).fill(0))
  // array of array with columns * rows dimension
  let [gameGrid, setGameGrid] = useState(emptyGrid);
  let [intervalID, setIntervalID] = useState();
  let [isTouchDevice, setTouchStatus] = useState();
  let [editMode, setEditMode] = useState(false);
  
  function preventDefault(event) {
    event.preventDefault()
    event.stopImmediatePropagation()
  }

  useEffect(() => {
    console.log('efect used')
    if(editMode){
      console.log('add')
      window.addEventListener('touchmove', preventDefault, {passive: false, capture: false})
    } else {
      console.log('remove')
      window.removeEventListener('touchmove', preventDefault, {passive: false, capture: false})
    }
  }, [editMode])

  function is_touch_device() {
    try {
        let prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

        let mq = function (query) {
            return window.matchMedia(query).matches;
        };

        if (('ontouchstart' in window) || (typeof window.DocumentTouch !== "undefined" && document instanceof window.DocumentTouch)) {
            return true;
        }

        return mq(['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join(''));
    } catch (e) {
        console.error('(Touch detect failed)', e);
        return false;
    }
  }

  useEffect(() => {
    setTouchStatus(is_touch_device())
  }, [])

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
      <div>
        {isTouchDevice && 
          <button className="fixed"
          onClick={() => setEditMode(!editMode)}>{editMode ? 'Move' : 'Edit'}
          </button>
        }
        <button 
          onClick={handleStart}>{intervalID ? 'Stop' : 'Start'}
        </button>
        <button 
          onClick={() => setGameGrid(emptyGrid)}>Clear
        </button>
      </div>
      <Board 
        isEditMode={editMode}
        gameGrid={gameGrid} 
        setCellState={setCellState}
      />
    </div>
  )
}

export default Game;
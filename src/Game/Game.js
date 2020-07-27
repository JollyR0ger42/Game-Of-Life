import React, { useState } from 'react';
import Board from '../Board/Board';


function Game(props) {
  // array of array with columns * rows dimension
  let [gameGrid, setGameGrid] = useState(Array.from(
    {length: props.rows}, () => new Array(props.columns).fill(false))
  );

  function handleClick(row, column) {
    let grid = gameGrid.slice();
    grid[row][column] = !grid[row][column]
    setGameGrid(grid)
  }

  return (<Board gameGrid={gameGrid} handleClick={handleClick} />)
}

export default Game;
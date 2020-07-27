import React from 'react';
import Cell from '../Cell/Cell';


function Board(props) {
  function generateRow(columns){
    let listCells = [];
    for(let i = 0; i < columns; i++ ){
      listCells.push(<td key={i}><Cell /></td>)
    }
    return listCells
  }

  function generateGrid(gameGrid){
    const rows = gameGrid.length;
    const columns = gameGrid[0].length;
    let grid = [];
    for(let i = 0; i < rows; i++){
      grid.push(<tr key={i}>{generateRow(columns)}</tr>)
    }
    return grid
  }

  return (
    <div>
      <h1>Board</h1>
      <table>
        <tbody>
          {generateGrid(props.gameGrid)}
        </tbody>
      </table>
    </div>
  )
}

export default Board;
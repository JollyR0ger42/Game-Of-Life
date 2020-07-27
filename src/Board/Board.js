import React from 'react';
import Cell from '../Cell/Cell';
import './Board.css'


function Board(props) {
  function renderCell(isActive){
    return <Cell isActive={isActive} />
  }

  function generateGrid(gameGrid){
    const rows = gameGrid.length;
    const columns = gameGrid[0].length;
    let grid = [];
    for(let i = 0; i < rows; i++){
      let cellList = [];
      for(let k = 0; k < columns; k++){
        cellList.push(<td key={k}>{renderCell(gameGrid[i][k])}</td>)
      }
      grid.push(<tr key={i}>{cellList}</tr>)
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
import React, {useState} from 'react';
import Cell from '../Cell/Cell';
import './Board.css'


function Board(props) {
  let [isMousePressed, setMouseState] = useState(false);
  let [cellStateTo, setCellStateTo] = useState(1);

  function renderCell(isActive, id, handleMouseOver){
    return (
      <Cell 
        isActive={isActive} 
        id={id} 
        handleMouseOver={handleMouseOver} 
      />
    )
  }

  function generateGrid(gameGrid){
    const rows = gameGrid.length;
    const columns = gameGrid[0].length;
    let grid = [];
    for(let i = 0; i < rows; i++){
      let cellList = [];
      for(let k = 0; k < columns; k++){
        cellList.push(
          <td key={k}>
            {renderCell(
              gameGrid[i][k], 
              `${i}:${k}`,
              () => handleMouseOver(i, k), 
            )}
          </td>)
      }
      grid.push(<tr key={i}>{cellList}</tr>)
    }
    return grid
  }

  function handleMouseDown(event){
    if(event.target.id){
      let [row, column] = event.target.id.split(':');
      [row, column] = [parseInt(row), parseInt(column)]
      if(props.gameGrid[row][column] === 1){
        setCellStateTo(0)
      }
      props.setCellState(row, column, cellStateTo)
    }
    setMouseState(true)
  }

  function handleMouseOver(row, column) {
    if(isMousePressed){
      props.setCellState(row, column, cellStateTo)
    }
  }

  function handleMouseUp(){
    setCellStateTo(1)
    setMouseState(false)
  }

  return (
    <div>
      <table
        onMouseDown={handleMouseDown} 
        onMouseUp={handleMouseUp}
      >
        <tbody>
          {generateGrid(props.gameGrid)}
        </tbody>
      </table>
    </div>
  )
}

export default Board;
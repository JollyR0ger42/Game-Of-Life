import React, {useState} from 'react';
import Cell from '../Cell/Cell';
import './Board.css'


function Board(props) {
  let [isMousePressed, setMouseState] = useState(false);

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
      let [row, column] = event.target.id.split(':')
      props.toggleCell(parseInt(row), parseInt(column))
    }
    setMouseState(true)
  }

  function handleMouseUp(){
    setMouseState(false)
  }

  function handleMouseOver(row, column) {
    if(isMousePressed){
      props.toggleCell(row, column)
    }
  }

  return (
    <div 
      onMouseDown={handleMouseDown} 
      onMouseUp={handleMouseUp}
    >
      <table>
        <tbody>
          {generateGrid(props.gameGrid)}
        </tbody>
      </table>
    </div>
  )
}

export default Board;
import React, {useState} from 'react';
import Cell from '../Cell/Cell';
import './Board.css'


function Board(props) {
  let [isMousePressed, setMouseState] = useState(false);
  let [cellStateTo, setCellStateTo] = useState(1);

  function renderCell(isActive, id, handleMouseOver, handleTouchMove){
    return (
      <Cell 
        isActive={isActive} 
        id={id} 
        handleMouseOver={handleMouseOver} 
        handleTouchMove={handleTouchMove}
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
      const [row, column] = event.target.id.split(':').map(x => parseInt(x));
      let firstCellState = 1;
      if(props.gameGrid[row][column] === 1){
        setCellStateTo(0)
        firstCellState = 0
      }
      props.setCellState(row, column, firstCellState)
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

  function handleTouchStart(event){
    if(props.isEditMode){
      handleMouseDown(event)
    }
  }
  
  function handleTouchMove(event){
    if(props.isEditMode){
      const targetElement = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY)
      if(targetElement?.id){
        const [row, column] = targetElement.id.split(':').map(x => parseInt(x));
        props.setCellState(row, column, cellStateTo)
      }
    }
  }

  return (
    <div>
      <table
        onMouseDown={handleMouseDown} 
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleMouseUp}
      >
        <tbody>
          {generateGrid(props.gameGrid)}
        </tbody>
      </table>
    </div>
  )
}

export default Board;
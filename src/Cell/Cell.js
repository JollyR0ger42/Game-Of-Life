import React from 'react';
import './Cell.css'


function Cell(props){
  let classList = "square";
  if(props.isActive)
    classList += " active"

  return(
    <p 
      className={classList} 
      onMouseOver={props.handleMouseOver}
      onClick={props.handleClick}
    >
    </p>
  )
}

export default Cell;
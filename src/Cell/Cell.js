import React from 'react';
import './Cell.css'


function Cell(props){
  let classList = "square";
  if(props.isActive)
    classList += " active"

  return(
    <button 
      className={classList} 
      onClick={props.onClick}>
    </button>
  )
}

export default Cell;
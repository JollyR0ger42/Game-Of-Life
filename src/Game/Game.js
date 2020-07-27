import React from 'react';
import Board from '../Board/Board';


function Game(props){
    // array of array with columns * rows dimension
    let gameGrid = Array(props.rows).fill(Array(props.columns).fill(0))

    return(<Board gameGrid={gameGrid}/>)
}

export default Game;
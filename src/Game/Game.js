import React from 'react';
import Board from '../Board/Board';


function Game(props){
    // array of array with columns * rows dimension
    let gameGrid = new Array(props.rows).fill(new Array(props.columns).fill(0))

    return(<Board gameGrid={gameGrid}/>)
}

export default Game;
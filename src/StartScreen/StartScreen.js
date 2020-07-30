import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import './StartScreen.css';

import {useForm} from 'react-hook-form';


function StartScreen() {
  let [redirect, setRedirect] = useState();
  const {register, handleSubmit} = useForm();

  function onSubmit(data){
    setRedirect(<Redirect push to={`/game/${data.rows}/${data.columns}`} />)
  }

  return (
    <div className="flex-column bg justify-center">
      {redirect}
      <h1>Conway's Game of Life</h1>
      <h4>Set the field size</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Rows:</label>
        <input type="number" name="rows" defaultValue="35" ref={register }/>
        <label>Columns:</label>
        <input type="number" name="columns" defaultValue="35" ref={register}/>
        <button>Start</button>
      </form>
    </div>
  )
}

export default StartScreen;
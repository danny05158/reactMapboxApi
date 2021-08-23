import React, { useReducer } from 'react';
import Navbar from './Navbar.js';
import Map from './Map.js';
import {initialState, reducer} from '../store/index';

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <Navbar state={state} dispatch={dispatch}/>
      <Map state={state}/>
    </>
  )
}

export default App;

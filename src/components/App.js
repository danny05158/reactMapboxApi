import React, { useReducer, useEffect } from 'react';
import Navbar from './Navbar.js';
import Map from './Map.js';
import axios from "axios";
import {setChargingStations, initialState, reducer} from '../store/index';

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData(){
      try{
        const { data } = await axios.get('https://developer.nrel.gov/api/alt-fuel-stations/v1.json?api_key=hFaHfjnF0JwKMVnhxQdQbYVBKJLI84ldJA5eTMlZ&state=IL&fuel_type=ELEC');

        dispatch(setChargingStations(data.fuel_stations));
      }catch(e){
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Navbar state={state} dispatch={dispatch}/>
      <Map state={state}/>
    </React.Fragment>
  )
}

export default App;

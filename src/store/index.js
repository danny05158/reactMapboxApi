import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger';
import axios from "axios";

//ACTION TYPES
const SET_CHARGING_STATIONS = 'SET_CHARGING_STATIONS';
const DISPLAY_STATIONS = 'DISPLAY_STATIONS';

//ACTION CREATORS
export const setChargingStations = setChargingStations => ({
  type: SET_CHARGING_STATIONS,
  setChargingStations
});

export const displayStationsonMap = displayStations => ({
  type: DISPLAY_STATIONS,
  displayStations
})


//THUNK CREATORS
export const fetchChargingStations = () => async dispatch => {

  const { data } = await axios.get(
    'https://developer.nrel.gov/api/alt-fuel-stations/v1.json?api_key=hFaHfjnF0JwKMVnhxQdQbYVBKJLI84ldJA5eTMlZ&state=IL&fuel_type=ELEC'
  );
  dispatch(setChargingStations(data.fuel_stations));
};


//INITIAL STATE
const initialState = {
  chargingStations: [],
  displayStations: false
}

//HANDLERS
const handlers = {
  [SET_CHARGING_STATIONS]: (state, action) => {
    return { ...state, chargingStations: action.setChargingStations}
  },
  [DISPLAY_STATIONS]: (state, action) => {
    return { ...state, displayStations: action.displayStations}
  }
}

// REDUCER
const reducer = (state = initialState, action) => {
  if(!handlers.hasOwnProperty(action.type)){
    return state;
  }else{
    return handlers[action.type](state, action);
  }
}

const middleware = applyMiddleware(loggingMiddleware, thunkMiddleware);
const store = createStore(reducer, middleware);
export default store;

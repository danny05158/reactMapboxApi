export const SET_CHARGING_STATIONS = 'SET_CHARGING_STATIONS';

export const setChargingStations = setChargingStations => ({
  type: SET_CHARGING_STATIONS,
  setChargingStations
});

export const initialState = {
  chargingStations: []
}

export const reducer = (state, action) => {
  switch(action.type){
    case SET_CHARGING_STATIONS:
      return {...state, chargingStations: action.setChargingStations}
  }
}

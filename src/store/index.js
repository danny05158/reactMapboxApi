const DISPLAY_DATA = 'DISPLAY_DATA';

export const displayData = displayData =>({
  type: DISPLAY_DATA,
  displayData
})

export const initialState = {
  displayData: false
}

export const reducer = (state, action) => {
  switch(action.type){
    case DISPLAY_DATA:
      return {...state, displayData: action.displayData};
  }
}

import React from 'react';
import { displayData } from '../store';

const Navbar = (props) => {

  const handleClick = () => {
    props.dispatch(displayData(!props.state.displayData));
  }

  return (
      <div className="nav-mixed menu">
          <div>
              <h3>Display Data</h3>
                  <div>
                    <span>Primary</span>
                  </div>
              <h3>Data</h3>
                <button
                  onClick={() => handleClick()}>
                  {props.state.displayData ? 'Hide' : 'Show'}
                </button>
          </div>
      </div>
  )
};

export default Navbar;

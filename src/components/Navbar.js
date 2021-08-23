import React from 'react';
import { displayData } from '../store';

const Navbar = (props) => {

  const handleClick = () => {
    props.dispatch(displayData(!props.state.displayData));
  }

  return (
      <div className="nav-mixed menu">
          <div className="container" id="controller">
              <h3>Display Data</h3>
                  <div className="checkbox radio checked" id="paletteA-check">
                    <span className="source">Primary</span>
                  </div>
              <h3>Data</h3>
                <button className="radio checked" id="paletteA-check"
                  onClick={() => handleClick()}>
                  {props.state.displayData ? 'Hide' : 'Show'}
                </button>
          </div>
      </div>
  )
};

export default Navbar;

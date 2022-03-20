import React from 'react';
import { displayData } from '../store';

const Navbar = (props) => {

  const handleClick = () => {
    props.dispatch(displayData(!props.state.displayData));
  }

  return (
    <div className="nav-mixed">
      <div className="nav-mixed-items">
        <h3>Display Data</h3>
      </div>
      <div className="nav-mixed-items">
        <span>Primary</span>
      </div>
      <div className="nav-mixed-items">
        <h3>Data</h3>
      </div>
      <div className="nav-mixed-items">
        <button onClick={() => handleClick()}>
          {props.state.displayData ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;

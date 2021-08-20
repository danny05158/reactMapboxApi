import React, {useState} from 'react';

const Navbar = (props) => {

  const [stations, setStations] = useState(false);

  return (
      <div className="nav-mixed menu">
        <nav className="multi-level-nav" role="navigation">
          <button onClick={() => setStations(!stations)}>{stations ? 'View Stations' : 'Hide Stations'}</button>
        </nav>
      </div>
  )
};

export default Navbar;

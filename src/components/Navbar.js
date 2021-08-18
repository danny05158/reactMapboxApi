import React, { Component } from 'react';
import { connect } from 'react-redux';
import {displayStationsonMap}  from '../store/index';
import './CSS/index.css';

class Navbar extends Component {

  handleClick = () => {
    const displayStations = this.props.displayStations;
    this.props.displayTheStations(!displayStations);
  }

  render(){
    return (
      <div className="nav-mixed menu">
        <nav id="multi-level-nav" className="multi-level-nav" role="navigation">
          <button
           onClick={this.handleClick}
          >Visible</button>
        </nav>
      </div>
    )
  }
}

const mapState = state => {
  return {
    displayStations: state.displayStations
  }
}

const mapDispatch = dispatch => ({
  displayTheStations: show => dispatch(displayStationsonMap(show))
})


export default connect(
  mapState,
  mapDispatch,
)(Navbar);

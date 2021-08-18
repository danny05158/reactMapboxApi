import React, { Component } from "react";
import { connect } from "react-redux";
import Map from './Map';
import { fetchChargingStations } from '../store/index';

class App extends Component {

  componentDidMount(){
      this.props.fetchChargingStations()
  }

  render(){
   if(this.props.displayStations){
     const accessToken = 'pk.eyJ1IjoiZGFubnkwNTE1OCIsImEiOiJja3Ftb3VzNXgwZnEzMnVvODJnd2VtbXB1In0.Jaezz28sT9uSw-AAmDeJ7Q';
     const stylesName = 'mapbox/light-v9';
     const zoomScale = 10;

    return (
      <div className="App">
        <Map
          accessToken={accessToken}
          styleName={stylesName}
          zoomScale={zoomScale}
        />
      </div>
     );
    }else{
      return <p>NO MAP</p>
    }
  }
}

const mapDispatch = dispatch => {
  return {
    fetchChargingStations: () => dispatch(fetchChargingStations()),
  }
}

const mapState = state => {
  return {
    displayStations: state.displayStations
  }
}

export default connect(
  mapState,
  mapDispatch,
)(App);

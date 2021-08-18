import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

class Map extends Component {

  componentDidMount(){

    const { accessToken, zoomScale} = this.props;
    mapboxgl.accessToken = accessToken;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-87.6298, 41.8781],
      zoom: [zoomScale],
    });

    this.map.on( 'load', async () => {

      const { chargingStations } = this.props;

      this.map.addSource('ev-charging-stations', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: chargingStations.map(station => {
            return {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [station.longitude, station.latitude],
              },
            };
          }),
        },
      });

      this.map.addLayer({
          id: 'allStations',
          type: 'circle',
          source: 'ev-charging-stations',
          layout: {
            'visibility': 'visible',
          },
          paint: {
            'circle-radius': 3,
            'circle-color': '#B42222',
          },
      });

      });
  }

  render(){
      return (
        <div id="map" />
      );
  }
};

const mapState = state => {
  return {
    chargingStations: state.chargingStations,
  };
};

export default connect(
  mapState,
  null,
)(Map);

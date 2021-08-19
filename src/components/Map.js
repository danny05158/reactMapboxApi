import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

const Map = () =>  {

  const [stations, setStations] = useState([]);

  useEffect(() => {

    async function fetchData() {
     const { data } = await axios.get('https://developer.nrel.gov/api/alt-fuel-stations/v1.json?api_key=hFaHfjnF0JwKMVnhxQdQbYVBKJLI84ldJA5eTMlZ&state=IL&fuel_type=ELEC');

     console.log('data', data)

     setStations(data.fuel_stations);

      console.log('stations', stations)
    }

    fetchData();
  }, []);

  useEffect( () => {

    mapboxgl.accessToken = 'pk.eyJ1IjoiZGFubnkwNTE1OCIsImEiOiJja3Ftb3VzNXgwZnEzMnVvODJnd2VtbXB1In0.Jaezz28sT9uSw-AAmDeJ7Q';
     const stylesName = 'mapbox/light-v9';
     const zoomScale = 10;

    let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-87.6298, 41.8781],
      zoom: [zoomScale],
    });

    map.on( 'load', async () => {

      map.addSource('ev-charging-stations', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: stations.map(station => {
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

      map.addLayer({
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

  }, []);

      return ( <div id="map" /> );
};

export default Map;

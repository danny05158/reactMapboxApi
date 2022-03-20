import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './mapAssets/variables.js';
import colors from './mapAssets/variables.js';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFubnkwNTE1OCIsImEiOiJja3Ftb3VzNXgwZnEzMnVvODJnd2VtbXB1In0.Jaezz28sT9uSw-AAmDeJ7Q';

const Map = (props) => {

  const mapRef = useRef(null);
  const [lon] = useState(-95.4);
  const [lat] = useState(38);
  const [zoom] =  useState(3);

  useEffect((initLayers) => {

    var map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [lon, lat],
      zoom: [zoom],
    });

    map.on('load', initLayers = () => {

      	map.addSource('earthquakes', {
          type: 'geojson',
          // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
          // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
          data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
          cluster: true,
          clusterMaxZoom: 14, // Max zoom to cluster points on
          clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
       });

       	map.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'earthquakes',
          filter: ['has', 'point_count'],
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          paint: {
            'circle-color': ['step', ['get', 'point_count'], colors.a, 100, colors.b, 750, colors.c],
            'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
          },
          layout: {
            visibility: 'none'
          }
	      });

        if(props.state.displayData){
          map.setLayoutProperty('clusters', 'visibility', 'visible');
        }

    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-left');

  });

  return (
    <div className="mapWrapper">
      <div id="map" ref={mapRef}/>
    </div>
  );
};

export default Map;

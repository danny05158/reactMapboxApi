import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFubnkwNTE1OCIsImEiOiJja3Ftb3VzNXgwZnEzMnVvODJnd2VtbXB1In0.Jaezz28sT9uSw-AAmDeJ7Q';

const Map = (props) => {

  const mapRef = useRef(null);
  const [lon, seLon] = useState(-87.6298);
  const [lat, setLat] = useState(41.8781);
  const [zoom, setZoom] =  useState(10);

  useEffect(() => {

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lon, lat],
      zoom: [zoom],
    });

    map.on( 'load', async () => {

      map.addSource('ev-charging-stations', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: props.state.chargingStations.map(station => {
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

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

  }, []);

      return (
        <div className="mapWrapper">
          <div id="map" ref={mapRef}/>
        </div>
      );
};

export default Map;

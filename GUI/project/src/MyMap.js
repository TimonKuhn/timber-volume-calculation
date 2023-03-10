import React, { useRef } from 'react';
import { MapContainer, TileLayer, useMapEvent,GeoJSON, FeatureGroup} from 'react-leaflet';
import { EditControl } from "react-leaflet-draw";
import trees from './data/trees.json'
import { Typography } from '@mui/material';

const MyMap = ({trees}) => {
  const drawnItemsRef = useRef(null);


  function onCreated(e) {
    const { layerType, layer } = e;
    if (layerType === 'polygon') {
    }
    drawnItemsRef.current.addLayer(layer);
  }

  return (
    <div>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <EditControl
          position='topright'
          onCreated={onCreated}
          draw={{
            polyline: false,
            circle: false,
            circlemarker: false,
            marker: false,
            rectangle: false,
            polygon: {
              allowIntersection: false,
              drawError: {
                color: '#e1e100',
                message: '<strong>Oh snap!<strong> you can\'t draw that!'
              },
              shapeOptions: {
                color: '#f357a1'
              }
            },
          }}
        />
        <GeoJSON data={trees} />
        <FeatureGroup ref={drawnItemsRef} />
      </MapContainer>
      
      <Typography>count: {}</Typography>

    </div>
  );
};

export default MyMap;
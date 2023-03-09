import React from 'react';
import "./App.css";

import { MapContainer, TileLayer, FeatureGroup, Polygon} from 'react-leaflet';
import { EditControl } from "react-leaflet-draw";
import { useRef } from 'react';
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

import L, {Point, DivIcon, polygon, map} from 'leaflet';


import { Button,Toolbar } from '@mui/material';


 
function App() {




var osm = (<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
/>)

const polygon = [
                [46.8011, 8.2266],
                [46.8012, 8.2266],
                [46.8011, 8.2267],
                [46.8011, 8.2266],
              ]



return (
  <>
  <Toolbar variant='regular'>
  Timber Volume Calculation
  </Toolbar>

  <MapContainer center={[46.801111, 8.226667]} zoom={13} scrollWheelZoom={true}>
  {osm}
  <Polygon
    positions={polygon}
  />
  </MapContainer>

  <Button variant="outlined">Test</Button>
  </>


  );


}

export default App;
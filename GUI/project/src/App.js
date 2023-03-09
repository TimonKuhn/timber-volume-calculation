import React from 'react';
import Button from '@mui/material/Button';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { useMap } from 'react-leaflet/hooks';


import "leaflet/dist/leaflet.css";
import "./App.css";




function App() {
  return (
    <>
      <MapContainer center={[51.505, -0.09]} zoom={15} scrollWheelZoom={true}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; OpenStreetMap contributors'/>
      </MapContainer>
      <Button variant="contained">Hello World</Button>

  </>);
}

export default App;


import React from 'react';
import Button from '@mui/material/Button';
import "./App.css";
//import "leflet/dist/leaflet.css";

//importin Leaflet Components
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet' 



function App() {
  return (
    <>
      <MapContainer center={[47.5349, 7.6416]} zoom={15} scrollWheelZoom={true}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; OpenStreetMap contributors'/>
      </MapContainer>
      <Button variant="contained">Hello World</Button>

  </>);
}

export default App;


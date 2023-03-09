import React from 'react';
import Button from '@mui/material/Button';
import "./App.css";

import "leaflet/dist/leaflet.css";

//importing Leaflet Components
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet' 



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


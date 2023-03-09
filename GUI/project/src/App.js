import React from 'react';
import ReactDOMServer from 'react-dom/server';
import "./App.css";

import "leaflet/dist/leaflet.css";

import L, {Point, DivIcon} from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Map , Polyline, Circle} from 'react-leaflet';

import marker from './data/Nuclear_symbol.svg';
//import Icon from './Icon';





function App() {




var osm = (<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
/>)



return (
  <>
  <MapContainer center={[46.801111, 8.226667]} zoom={8} scrollWheelZoom={true}>
  {osm}
  
    

  </MapContainer>
  </>

  );
}

export default App;
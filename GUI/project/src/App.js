import React from 'react';
import "./App.css";

import "leaflet/dist/leaflet.css";


import { MapContainer, TileLayer, Marker, Popup, Map , Polyline, Polygon, Rectangle} from 'react-leaflet';


//import Icon from './Icon';





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
  <MapContainer center={[46.801111, 8.226667]} zoom={20} scrollWheelZoom={true}>
  {osm}
  <Polygon
    positions={polygon}
  />
  
  </MapContainer>
  </>

  );
}

export default App;
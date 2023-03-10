import React, { useEffect, useState } from 'react';
import './App.css';

import {MapContainer,  TileLayer,  FeatureGroup,  Marker,  Popup,  GeoJSON} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import L, { map } from 'leaflet';

import { Button,Typography } from '@mui/material';


//import * as turf from '@turf/turf';




const App = () => {
  const [data, setData] = useState(null);

  
  const [center] = useState({ lat: 47.417, lng: 8.701 });
  const [mapLayers, setMapLayers] = useState([]);
  const [editableLayers, setEditableLayers] = useState(L.layerGroup());
  const [treeCount, setTreeCount] = useState(0);

  const ZOOM_LEVEL = 15;
  const mapRef = useRef();

 
  const del_all = () => {
    setMapLayers([]);
    setEditableLayers(L.layerGroup([]));
  };

  const _onCreate = (e) => {
    const { layerType, layer } = e;

    if (layerType === 'polygon') {
      const latlngs = layer.getLatLngs()[0];

      // Delete previous polygon

      setMapLayers([]);

      

      // Add new polygon to mapLayers and editableLayers
      const { _leaflet_id } = layer;
      setMapLayers((layers) => [
        ...layers,
        { id: _leaflet_id, latlngs },
      ]);
      //setEditableLayers(L.layerGroup([layer]));
      console.log("1", mapLayers)
    }
  };

  const _onEdited = (e) => {
    console.log(e);
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id, editing }) => {
      setMapLayers((layers) =>
        layers.map((l) =>
          l.id === _leaflet_id
            ? { ...l, latlngs: { ...editing.latlngs[0] } }
            : l
        )
      );
    });
  };

  const _onDeleted = (e) => {
    console.log(e);
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id }) => {
      setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });

    setTreeCount(0);
  };

  const _onDrawStop  = (e) => {


  }

  return (
    <>
      <div className="row">
        <div className="col text-center">
          <div className="col">
            <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
              <FeatureGroup>
                <EditControl
                  position="topright"
                  onCreated={_onCreate}
                  onEdited={_onEdited}
                  onDeleted={_onDeleted}
                  onEditStop={_onDrawStop}
                  draw={{
                    polygon: true,
                    rectangle: false,
                    polyline: false,
                    circle: false,
                    circlemarker: false,
                    marker: false,
                  }}
                />
              </FeatureGroup>

              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              
              />


            </MapContainer>

            <Typography>count: {treeCount}</Typography>
            <Typography>length: {mapLayers.length}</Typography>

            <Button onClick={del_all}>del</Button>

            <div>
              {/* Render the filtered data */}
              {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
            </div>

             <pre className="text-left">{JSON.stringify(mapLayers, 0, 2)}</pre> 
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
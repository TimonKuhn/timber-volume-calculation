import React, { useEffect, useState } from 'react';
import './App.css';

import {MapContainer,  TileLayer,  FeatureGroup,  Marker,  Popup,  GeoJSON} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import L, { map } from 'leaflet';
import theme from './theme';

import { Button,Grid,Typography } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

import axios from 'axios';
import { Container } from '@mui/system';



const App = () => {

  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() =>{download();},[]) //keine ahnung was das genau macht aber es ist notwendig sonst fnunktionert das ganze nicht
  
  function download(){
  let url = "http://localhost:8000/result"
  
  setLoading(true);

  axios.get(url)
  .then((response) => {
        setData(response.data); 
      }
    ).catch(
      (err) => { setError(err); }
    ).finally(
      (err) => { setLoading(false); }
    )
}




  const [data_1, setData_1] = useState(null);

  
  const [center] = useState({ lat: 47.417, lng: 8.701 });
  const [mapLayers, setMapLayers] = useState([]);
  const [editableLayers, setEditableLayers] = useState(L.layerGroup());
  const [treeCount, setTreeCount] = useState(0);

  const ZOOM_LEVEL = 15;
  const mapRef = useRef();

  const postpoly = () => {
    axios.post('http://localhost:8000/polyjson',{
    input: JSON.stringify(mapLayers)
  })

  }
 
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
      console.log(JSON.stringify(mapLayers, 0, 2))
      //setEditableLayers(L.layerGroup([layer]));
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
    <ThemeProvider theme={theme}>
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

            <div>
              {/* Render the filtered data */}
              {data_1 && <pre>{JSON.stringify(data_1, null, 2)}</pre>}
            </div>

            <Grid container direction="column" marginY={3}>
              <Grid item md={6}>      
                <Button variant='contained' onClick={postpoly()}>Calculate</Button>
              </Grid>
              <Grid item  md={6}>
                <Typography>Count: {data["Anzahl"]} <br/></Typography>
                <Typography>Volume: {data["Volumen"]}</Typography>
              </Grid>
            </Grid>
            {/* <pre className="text-left">{JSON.stringify(mapLayers, 0, 2)}</pre> */}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
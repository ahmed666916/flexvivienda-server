
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapStyles.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const SinglePropertyMap = ({ location }) => {
  return (
    <div className="map-wrapper" style={{ marginTop: '2rem' }}>
      <MapContainer
        center={[location.lat, location.lng]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap contributors &copy; <a href="https://carto.com/">CARTO</a>'
        />
        <Marker position={[location.lat, location.lng]}>
          <Popup>{location.title}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default SinglePropertyMap;

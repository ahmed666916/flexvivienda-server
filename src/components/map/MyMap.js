// src/components/MyMap.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapStyles.css';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Component that uses Leaflet context safely
const MapEffect = () => {
  const map = useMap(); // or useLeafletContext()

  // Example: Log center on mount
  React.useEffect(() => {
    console.log('Map center:', map.getCenter());
  }, [map]);

  return null; // this component doesn't render anything visually
};

const MyMap = () => {
  return (
    <section className="map-section">
      <h2 className="map-heading">Live Map</h2>
      <div className="map-wrapper">
        <MapContainer center={[39.0, 35.0]} zoom={8} style={{ height: '500px', width: '100%' }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; OpenStreetMap contributors &copy; <a href="https://carto.com/">CARTO</a>'
          />
          <Marker position={[39.0, 35.0]}>
            <Popup>
              A pretty popup.<br /> Easily customizable.
            </Popup>
          </Marker>

          <MapEffect /> {/* Custom logic that safely uses hooks */}
        </MapContainer>
      </div>
    </section>
  );
};

export default MyMap;

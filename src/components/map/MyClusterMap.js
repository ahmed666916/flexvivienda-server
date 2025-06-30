import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import './MapStyles.css';

// Fix Leaflet's marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Mock data across different parts of Turkey
const markerData = [
  { position: [41.0082, 28.9784], city: 'Istanbul' },
  { position: [39.9208, 32.8541], city: 'Ankara' },
  { position: [38.4192, 27.1287], city: 'Izmir' },
  { position: [36.8969, 30.7133], city: 'Antalya' },
  { position: [37.0, 35.3213], city: 'Adana' },
  { position: [40.1826, 29.0665], city: 'Bursa' },
  { position: [38.7312, 35.4787], city: 'Kayseri' },
  { position: [37.7648, 30.5566], city: 'Isparta' },
];

const MyClusterMap = () => {
  return (
    <div className="map-wrapper" style={{ height: '60vh', width: '100%' }}>
      <MapContainer
        center={[39.0, 35.0]}
        zoom={6}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        whenCreated={(map) => {
          const handleWheel = (e) => {
            if (e.originalEvent.ctrlKey) {
              map.scrollWheelZoom.enable();
            } else {
              map.scrollWheelZoom.disable();
            }
          };
          map.on('wheel', handleWheel);
          return () => map.off('wheel', handleWheel);
        }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap contributors &copy; <a href="https://carto.com/">CARTO</a>'
        />
        <MarkerClusterGroup>
          {markerData.map((marker, index) => (
            <Marker key={index} position={marker.position}>
              <Popup>{marker.city}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default MyClusterMap;

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapStyles.css'; // Optional: include if you add custom styling

// Fix Leaflet's marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Coordinates mapped by location strings
const cityCoordinates = {
  'Beyoğlu, Istanbul': [41.0369, 28.9760],
  'Ortaköy, Istanbul': [41.0431, 29.0222],
  'Kadıköy, Istanbul': [40.9902, 29.0275],
};

// Test data (you can replace this with props from your backend)
const testProperties = [
  { title: 'Apartment 1', location: 'Beyoğlu, Istanbul', price: '$1000' },
  { title: 'Apartment 2', location: 'Beyoğlu, Istanbul', price: '$1100' },
  { title: 'Apartment 3', location: 'Beyoğlu, Istanbul', price: '$1200' },
  { title: 'Loft 1', location: 'Ortaköy, Istanbul', price: '$1300' },
  { title: 'Loft 2', location: 'Ortaköy, Istanbul', price: '$1350' },
];

const ClusterMap = ({ properties = testProperties }) => {
  return (
    <div className="map-wrapper" style={{ height: '60vh', width: '100%' }}>
      <MapContainer
        center={[41.0151, 28.9795]}
        zoom={12}
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
          {Array.isArray(properties) &&
            properties.map((property, idx) => {
              const position = cityCoordinates[property.location];
              if (!position) {
                console.warn('Unknown location:', property.location);
                return null;
              }

              return (
                <Marker key={idx} position={position}>
                  <Popup>
                    <strong>{property.title}</strong><br />
                    {property.location}<br />
                    {property.price}
                  </Popup>
                </Marker>
              );
            })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default ClusterMap;

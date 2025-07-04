// src/components/MyClusterMap.js

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import L from 'leaflet';
import './MapStyles.css'; // Make sure this contains your .map-wrapper and .map-heading styles

// Leaflet marker icon fix
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Coordinates map
const cityCoordinates = {
  'Beyoğlu, Istanbul': [41.0369, 28.9760],
  'Ortaköy, Istanbul': [41.0431, 29.0222],
  'Kadıköy, Istanbul': [40.9902, 29.0275],
};

const MyClusterMap = ({ properties = [], onLoad }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map && onLoad) onLoad();
    return () => {
      if (map) {
        map.off();
        map.remove();
      }
    };
  }, [map, onLoad]);

  return (
    <section className="map-wrapper">
            <div style={{ height: '500px', width: '100%' }}>
        <MapContainer
          center={[41.0151, 28.9795]}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
          whenCreated={setMap}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; OpenStreetMap contributors &copy; <a href="https://carto.com/">CARTO</a>'
          />

          <MarkerClusterGroup chunkedLoading>
            {properties.map((property, index) => {
              const baseCoords = cityCoordinates[property.location];
              if (!baseCoords) return null;

              const jitter = (Math.random() - 0.5) * 0.005;
              const position = [baseCoords[0] + jitter, baseCoords[1] + jitter];

              return (
                <Marker
                  key={property.id || `${property.title}-${index}`}
                  position={position}
                >
                  <Popup>
                    <b>{property.title}</b><br />
                    {property.location}<br />
                    {property.price}
                  </Popup>
                </Marker>
              );
            })}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </section>
  );
};

export default MyClusterMap;

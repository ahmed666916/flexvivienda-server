import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});

const cityCoordinates = {
  'Beyoğlu, Istanbul': [41.0369, 28.9760],
  'Ortaköy, Istanbul': [41.0431, 29.0222],
  'Kadıköy, Istanbul': [40.9902, 29.0275],
};

const MyClusterMap = ({ properties = [], onLoad }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map && onLoad) {
      onLoad();
    }
    return () => {
      if (map) {
        map.off();
        map.remove();
      }
    };
  }, [map, onLoad]);

  return (
    <div className="cluster-map" style={{ height: '500px', width: '100%' }}>
      <MapContainer
        center={[41.0151, 28.9795]}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        whenCreated={setMap}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <MarkerClusterGroup>
          {properties.map((property) => {
            const position = cityCoordinates[property.location];
            return position ? (
              <Marker key={property.id} position={position}>
                <Popup>
                  <b>{property.title}</b><br />
                  {property.location}<br />
                  {property.price}
                </Popup>
              </Marker>
            ) : null;
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default MyClusterMap;
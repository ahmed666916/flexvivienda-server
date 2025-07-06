import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import L from 'leaflet';
import './MapStyles.css';

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
  'Bakırköy, Istanbul': [40.9719, 28.8535],
  'Taksim, Istanbul': [41.0365, 28.9850],
  'Şişli, Istanbul': [41.0605, 28.9872],
};

const defaultProperties = [
  {
    id: 1,
    title: 'Modern Flat near Istiklal Street',
    location: 'Beyoğlu, Istanbul',
    price: '€120/night',
  },
  {
    id: 2,
    title: 'Superb House in Ortaköy',
    location: 'Ortaköy, Istanbul',
    price: '€200/night',
  },
  {
    id: 3,
    title: 'Cozy Studio in Kadıköy',
    location: 'Kadıköy, Istanbul',
    price: '€90/night',
  },
  {
    id: 4,
    title: 'Sea View Apartment in Bakırköy',
    location: 'Bakırköy, Istanbul',
    price: '€150/night',
  },
  {
    id: 5,
    title: 'Luxury Central Flat',
    location: 'Taksim, Istanbul',
    price: '€250/night',
  },
  {
    id: 6,
    title: 'Stylish Retreat with Jacuzzi',
    location: 'Şişli, Istanbul',
    price: '€220/night',
  },
];

const MyClusterMap = ({ properties = defaultProperties, onLoad }) => {
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
    <section className="section-block">
      <center>
        <h2 className="heading">
          <span className="heading-primary">Live</span>{' '}
          <span className="heading-secondary">Map</span>
        </h2>
        <p className="heading-subtext">Explore our property distribution across Istanbul</p>
      </center>

      <div className="map-wrapper">
        <div style={{ height: '500px', width: '100%' }}>
          <MapContainer
            center={[41.0151, 28.9795]}
            zoom={11}
            style={{ height: '100%', width: '100%' }}
            whenCreated={setMap}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; OpenStreetMap contributors &copy; <a href="https://carto.com/">CARTO</a>'
            />

            <MarkerClusterGroup chunkedLoading>
              {properties.map((property, index) => {
                const coords = cityCoordinates[property.location];
                if (!coords) return null;

                const jitter = (Math.random() - 0.5) * 0.005;
                const position = [coords[0] + jitter, coords[1] + jitter];

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
      </div>
    </section>
  );
};

export default MyClusterMap;

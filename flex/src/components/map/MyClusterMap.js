import React, { useMemo, useRef, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import L from 'leaflet';
import './MapStyles.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// ---- icon fix once
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Stable jitter cache so markers don’t “wiggle”
function useJitterCache() {
  const ref = useRef(new Map());
  return (id) => {
    if (!ref.current.has(id)) {
      ref.current.set(id, {
        lat: (Math.random() - 0.5) * 0.003,
        lng: (Math.random() - 0.5) * 0.003,
      });
    }
    return ref.current.get(id);
  };
}

// Pin highlight style
const highlightIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [30, 49], // slightly larger
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function RawClusterMap({
  properties = [],
  onLoad,
  showHeading = true,
  highlightId = null,
}) {
  const jitterFor = useJitterCache();
  const markersRef = useRef(new Map()); // id -> marker instance

  const items = useMemo(() => {
    return properties
      .map((p, idx) => {
        let lat = Number(p.lat ?? p.latitude);
        let lng = Number(p.lng ?? p.longitude);

        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
          // fallback jitter
          const j = jitterFor(p.id ?? `${p.title}-${idx}`);
          lat = 41.0151 + j.lat;
          lng = 28.9795 + j.lng;
        }

        return { ...p, lat, lng };
      })
      .filter(Boolean);
  }, [properties, jitterFor]);

  // hook to nudge/open a pin when highlightId changes
  function HighlightEffect() {
    const map = useMap();
    useEffect(() => {
      if (!highlightId) return;
      const m = markersRef.current.get(highlightId);
      if (m) {
        m.openPopup?.();
        const ll = m.getLatLng();
        map.panTo(ll, { animate: true, duration: 0.25 });
      }
    }, [highlightId, map]);
    return null;
  }

  return (
    <section className={`section-block ${!showHeading ? 'listing-map-wrapper' : ''}`}>
      {/* ✅ only render heading if showHeading is true */}
      {showHeading && (
        <center>
          <h2 className="map-heading">
            <span className="heading-primary">Live</span>{' '}
            <span className="heading-secondary">Map</span>
          </h2>
          <p className="heading-subtext">
            Explore our property distribution across Turkey
          </p>
        </center>
      )}

      <div className={`map-wrapper ${!showHeading ? 'map-no-heading' : ''}`}>
        <div style={{ height: '500px', width: '100%' }}>
          <MapContainer
            center={[41.0151, 28.9795]}
            zoom={5}
            style={{ height: '100%', width: '100%' }}
            renderer={L.canvas()}
            preferCanvas={true}
            whenReady={onLoad}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; OpenStreetMap contributors &copy; <a href="https://carto.com/">CARTO</a>'
            />

            <HighlightEffect />

            <MarkerClusterGroup
              chunkedLoading
              spiderfyOnMaxZoom
              showCoverageOnHover={false}
              removeOutsideVisibleBounds={true}
            >
              {items.map((p) => (
                <Marker
                  key={p.id ?? `${p.title}-${p.lat}-${p.lng}`}
                  position={[p.lat, p.lng]}
                  ref={(mk) => {
                    if (mk) markersRef.current.set(p.id, mk);
                    else markersRef.current.delete(p.id);
                  }}
                  {...(highlightId === p.id ? { icon: highlightIcon } : {})}
                >
                  <Popup>
                    {p.image && (
                      <p>
                        <img
                          src={p.image}
                          alt={p.title}
                          style={{ width: '150px', borderRadius: '6px' }}
                        />
                      </p>
                    )}
                    <b>{p.title}</b>
                    <br />
                    {p.location}
                    <br />
                    <span>💰 {p.price} / day</span>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        </div>
      </div>
    </section>
  );
}

// Page wrapper: fetch API + render map
export default function PropertyMapPage({ showHeading = true }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/properties")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched properties:", data);
        setProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading map...</p>;

  return <RawClusterMap properties={properties} showHeading={showHeading} />;
}

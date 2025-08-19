import React, { useMemo, useRef, useEffect } from 'react';
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

// Fallback city coordinates (until real lat/lng comes from API)
const cityCoordinates = {
  'Beyoğlu, Istanbul': [41.0369, 28.9760],
  'Ortaköy, Istanbul': [41.0431, 29.0222],
  'Kadıköy, Istanbul': [40.9902, 29.0275],
  'Bakırköy, Istanbul': [40.9719, 28.8535],
  'Taksim, Istanbul': [41.0365, 28.9850],
  'Şişli, Istanbul': [41.0605, 28.9872],
};

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
  iconSize: [30, 49],   // slightly larger
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function RawClusterMap({
  properties = [],
  onLoad,
  showHeading = true,
  highlightId = null,
  onMarkerHover,
  onMarkerClick,
}) {
  const jitterFor = useJitterCache();
  const markersRef = useRef(new Map()); // id -> marker instance

  const items = useMemo(() => {
    return properties
      .map((p, idx) => {
        let lat = Number(p.lat ?? p.latitude);
        let lng = Number(p.lng ?? p.longitude);

        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
          const c = cityCoordinates[p.location];
          if (!c) return null;
          const j = jitterFor(p.id ?? `${p.title}-${idx}`);
          lat = c[0] + j.lat;
          lng = c[1] + j.lng;
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
        // open a tooltip/popup lightly and bring into view
        // eslint-disable-next-line no-underscore-dangle
        m.openPopup?.();
        const ll = m.getLatLng();
        // keep map center mostly stable; only pan slightly
        map.panTo(ll, { animate: true, duration: 0.25 });
      }
    }, [highlightId, map]);
    return null;
  }

  return (
    <section className={`section-block ${!showHeading ? 'listing-map-wrapper' : ''}`}>
      {showHeading && (
        <center>
          <h2 className="map-heading">
            <span className="heading-primary">Live</span>{' '}
            <span className="heading-secondary">Map</span>
          </h2>
          <p className="heading-subtext">Explore our property distribution across Turkey</p>
        </center>
      )}

      <div className={`map-wrapper ${!showHeading ? 'map-no-heading' : ''}`}>
        <div style={{ height: '500px', width: '100%' }}>
          <MapContainer
            center={[41.0151, 28.9795]}
            zoom={11}
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
                  key={p.id ?? `${p.slug ?? p.title}-${p.lat}-${p.lng}`}
                  position={[p.lat, p.lng]}
                  ref={(mk) => {
                    if (mk) markersRef.current.set(p.id, mk);
                    else markersRef.current.delete(p.id);
                  }}
                  {...(highlightId === p.id ? { icon: highlightIcon } : {})} // ✅ pass icon only when set
                  eventHandlers={{ /* ... */ }}
                >

                  <Popup>
                    <b>{p.title}</b><br />
                    {p.location}<br />
                    {p.price ?? p.price_per_night ?? ''}
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

// Prevent re-render if props didn’t meaningfully change
const propsEqual = (prev, next) => {
  if (prev.showHeading !== next.showHeading) return false;
  if (prev.highlightId !== next.highlightId) return false;

  const a = prev.properties || [];
  const b = next.properties || [];
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    const pa = a[i], pb = b[i];
    const ida = pa.id ?? pa.slug ?? pa.title, idb = pb.id ?? pb.slug ?? pb.title;
    if (ida !== idb) return false;
    if ((pa.lat ?? pa.latitude) !== (pb.lat ?? pb.latitude)) return false;
    if ((pa.lng ?? pa.longitude) !== (pb.lng ?? pb.longitude)) return false;
  }
  return true;
};

export default React.memo(RawClusterMap, propsEqual);

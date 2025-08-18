import React, { useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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
      // very small stable offset
      ref.current.set(id, {
        lat: (Math.random() - 0.5) * 0.003,
        lng: (Math.random() - 0.5) * 0.003,
      });
    }
    return ref.current.get(id);
  };
}

function RawClusterMap({ properties = [], onLoad, showHeading = true }) {
  const jitterFor = useJitterCache();

  // ✅ Keep a stable, filtered array for rendering
  const items = useMemo(() => {
    return properties
      .map((p, idx) => {
        // Prefer real coordinates if present
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

  // ⚠️ Don’t manually map.remove(); react-leaflet controls lifecycle.
  // Also avoid dynamic `key` on MapContainer — it forces remount.

  return (
    <section className={`section-block ${!showHeading ? 'listing-map-wrapper' : ''}`}>
      {showHeading && (
        <center>
          <h2 className="heading">
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
            renderer={L.canvas()}            // ✅ smoother paints
            preferCanvas={true}
            whenReady={onLoad}               // call once when tiles/size are ready
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; OpenStreetMap contributors &copy; <a href="https://carto.com/">CARTO</a>'
            />

            <MarkerClusterGroup
              chunkedLoading                     // ✅ incremental rendering
              spiderfyOnMaxZoom
              showCoverageOnHover={false}
              removeOutsideVisibleBounds={true}
            >
              {items.map((p) => (
                <Marker key={p.id ?? `${p.slug ?? p.title}-${p.lat}-${p.lng}`} position={[p.lat, p.lng]}>
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

// ✅ Prevent re-render if props didn’t meaningfully change
const propsEqual = (prev, next) => {
  if (prev.showHeading !== next.showHeading) return false;
  const a = prev.properties || [];
  const b = next.properties || [];
  if (a.length !== b.length) return false;
  // Shallow compare ids + coords to decide redraw
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

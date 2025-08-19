import React, { useEffect, useMemo, useRef, useState } from 'react';
import './Listings.css';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBarListing';
import ClusterMap from '../components/map/MyClusterMap';
import { listProperties } from '../services/api';

/* ========= helpers ========= */

// Base for absolutizing relative URLs, e.g. http://localhost:8000
const API_BASE = (process.env.REACT_APP_API_BASE_URL || '').replace(/\/+$/, '');

// '/storage/a.jpg' -> 'http://host/storage/a.jpg'
const toAbsolute = (u) => {
  if (!u) return '';
  if (/^https?:\/\//i.test(u)) return u;                        // already absolute
  if (/^\/\//.test(u)) return window.location.protocol + u;     // protocol-relative
  if (/^\//.test(u)) return API_BASE ? `${API_BASE}${u}` : u;   // root-relative
  return API_BASE ? `${API_BASE}/${u}` : u;                     // relative path
};

// Extract a URL out of any common image object shape
const extractUrl = (val) => {
  if (!val) return '';
  if (typeof val === 'string') return val.trim();
  if (typeof val === 'object') {
    return (
      val.url ||
      val.src ||
      val.path ||
      val.original ||
      val.large ||
      val.medium ||
      val.small ||
      ''
    );
  }
  return '';
};

// Turn any image field(s) into an array of absolute URLs (deduped)
const normalizeImages = (p) => {
  const out = [];

  // prefer explicit cover fields first
  const cover = extractUrl(p.cover_image_url || p.cover_image);
  if (cover) out.push(cover);

  // common arrays/strings where images might live
  const candidates = [p.images, p.photos, p.gallery, p.media, p.property_images];

  candidates.forEach((arr) => {
    if (!arr) return;

    if (typeof arr === 'string') {
      // JSON array string?
      try {
        const parsed = JSON.parse(arr);
        if (Array.isArray(parsed)) {
          parsed.forEach((x) => out.push(extractUrl(x)));
          return;
        }
      } catch {
        // CSV
        arr.split(',').forEach((s) => out.push(s.trim()));
        return;
      }
    }

    if (Array.isArray(arr)) {
      arr.forEach((x) => out.push(extractUrl(x)));
    }
  });

  // absolutize + dedupe + filter empties
  const abs = out.map(toAbsolute).filter(Boolean);
  return Array.from(new Set(abs));
};

// Muscache crisp 1x/2x variants (optional)
const muscacheSources = (url) => {
  const isMuscache = /(?:^|\/\/)a\d*\.muscache\.com\//.test(url);
  if (!isMuscache) return { src: url, srcSet: '' };
  const base = url.split('?')[0];
  const oneX = `${base}?im_w=720`;
  const twoX = `${base}?im_w=1440`;
  return { src: oneX, srcSet: `${oneX} 1x, ${twoX} 2x` };
};

/* ========= component ========= */

const Listings = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr(null);

    listProperties({ page, per_page: perPage })
      .then((res) => {
        if (!alive) return;
        const payload = res?.data?.data || [];
        setItems(payload);
        setTotal(res?.data?.meta?.total ?? payload.length ?? 0);
        scrollRef.current?.scrollTo?.({ top: 0, behavior: 'smooth' });

        // DEBUG: show first item + its normalized images once
        if (payload.length) {
          console.info('[Listings] sample item ->', payload[0]);
          console.info('[Listings] normalized images ->', normalizeImages(payload[0]));
        }
      })
      .catch((e) => {
        if (!alive) return;
        setErr(e?.response?.data?.message || e.message || 'Failed to load properties');
      })
      .finally(() => alive && setLoading(false));

    return () => { alive = false; };
  }, [page, perPage]);

  // Normalize → view model (robust first-image selection)
  const properties = useMemo(() => {
  return (items || []).map((p, idx) => ({
    id: p.id ?? idx,
    slug: p.slug,
    title: p.title,
    location: p.city?.name ?? p.location?.city ?? '',
    price: Number.isFinite(+p.price_per_night) ? `€${p.price_per_night}/night` : 'Price on request',
    image: p.cover_image_url || (Array.isArray(p.images) && p.images.length ? p.images[0] : ''),
    lat: p.lat ?? p.coordinates?.lat ?? null,
    lng: p.lng ?? p.coordinates?.lng ?? null,
    isFeatured: !!p.is_featured,
  }));
}, [items]);


  // Stable props for the map
  const mapProps = useMemo(
    () => properties.filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng)),
    [properties]
  );

  const reachedEnd = total ? page * perPage >= total : properties.length < perPage;

  return (
    <div className="listing-layout">
      <SearchBar />

      <div className="listings-section">
        {/* LEFT: scrollable grid */}
        <div className="left-section scroll-pane" ref={scrollRef}>
          {err && <div className="error">{err}</div>}
          {loading && <div className="loading">Loading properties…</div>}

          {!loading && !err && (
            <>
              {properties.length === 0 ? (
                <div className="empty">No properties found. Try adjusting your filters.</div>
              ) : (
                <div className="property-grid">
                  {properties.map((property) => (
                    <Link
                      to={`/property/${property.slug || property.id}`}
                      key={property.slug || property.id}
                      className="card-link"
                    >
                      <div className="property-card">
                        <div className="img-wrap" title={property._rawFirst || property.image}>
                          <img
                            src={property.image || '/fallback.jpg'}
                            {...(property.imageSet ? { srcSet: property.imageSet } : {})}
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            alt={property.title}
                            className="property-image"
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.src = '/fallback.jpg';
                              e.currentTarget.removeAttribute('srcset');
                            }}
                          />
                        </div>
                        <div className="property-details">
                          <h2 className="property-title">{property.title}</h2>
                          <p className="property-locations">{property.location}</p>
                          <p className="property-price">{property.price}</p>

                         
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <div className="pager">
                <button
                  className="filter-button"
                  disabled={loading || page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  ← Prev
                </button>
                <button
                  className="filter-button"
                  disabled={loading || reachedEnd}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next →
                </button>
                <div className="pager-meta">Page {page} · {total || properties.length} total</div>
              </div>
            </>
          )}
        </div>

        {/* RIGHT: sticky map */}
        <div className="right-section">
          <ClusterMap properties={mapProps} showHeading={false} />
        </div>
      </div>
    </div>
  );
};

export default Listings;

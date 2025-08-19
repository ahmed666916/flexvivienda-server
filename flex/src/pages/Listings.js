import React, { useEffect, useMemo, useRef, useState } from 'react';
import './Listings.css';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBarListing';
import ClusterMap from '../components/map/MyClusterMap';
import { listProperties } from '../services/api';
import LazyImage from '../components/LazyImage';

/* ========= helpers ========= */

const API_BASE = (process.env.REACT_APP_API_BASE_URL || '').replace(/\/+$/, '');

// Turn any location-ish value into a human-readable string
const toLocationText = (v) => {
  if (!v) return '';
  if (typeof v === 'string') return v;
  if (typeof v === 'number') return String(v);

  if (typeof v === 'object') {
    // Try common shapes
    const city =
      v.city?.name || v.city?.title || v.city ||
      v.town || v.district || v.neighborhood || v.name;

    const region =
      v.region?.name || v.region ||
      v.state?.name || v.state ||
      v.province || v.county;

    const country = v.country?.name || v.country;

    const parts = [city, region, country].filter(Boolean);
    if (parts.length) return parts.join(', ');

    // Last resort: lat/lng readout
    if (Number.isFinite(v.lat) && Number.isFinite(v.lng)) {
      return `${v.lat.toFixed(4)}, ${v.lng.toFixed(4)}`;
    }
  }
  return '';
};


const toAbsolute = (u) => {
  if (!u) return '';
  if (/^https?:\/\//i.test(u)) return u;
  if (/^\/\//.test(u)) return window.location.protocol + u;
  if (/^\//.test(u)) return API_BASE ? `${API_BASE}${u}` : u;
  return API_BASE ? `${API_BASE}/${u}` : u;
};

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

const normalizeImages = (p) => {
  const out = [];
  const cover = extractUrl(p.cover_image_url || p.cover_image);
  if (cover) out.push(cover);

  const candidates = [p.images, p.photos, p.gallery, p.media, p.property_images];
  candidates.forEach((arr) => {
    if (!arr) return;

    if (typeof arr === 'string') {
      try {
        const parsed = JSON.parse(arr);
        if (Array.isArray(parsed)) {
          parsed.forEach((x) => out.push(extractUrl(x)));
          return;
        }
      } catch {
        arr.split(',').forEach((s) => out.push(s.trim()));
        return;
      }
    }
    if (Array.isArray(arr)) arr.forEach((x) => out.push(extractUrl(x)));
  });

  const abs = out.map(toAbsolute).filter(Boolean);
  return Array.from(new Set(abs));
};

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
  const sentinelRef = useRef(null);

  // map/list hover sync
  const [hoverId, setHoverId] = useState(null);

  // fetch page
  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr(null);

    listProperties({ page, per_page: perPage })
      .then((res) => {
        if (!alive) return;
        const payload = res?.data?.data || [];
        setItems((prev) => (page === 1 ? payload : [...prev, ...payload]));
        setTotal(res?.data?.meta?.total ?? payload.length ?? 0);

        // Scroll to top only when first page loads
        if (page === 1) scrollRef.current?.scrollTo?.({ top: 0, behavior: 'smooth' });
      })
      .catch((e) => {
        if (!alive) return;
        setErr(e?.response?.data?.message || e.message || 'Failed to load properties');
      })
      .finally(() => alive && setLoading(false));

    return () => { alive = false; };
  }, [page, perPage]);

  // Normalize → view model
  const properties = useMemo(() => {
    return (items || []).map((p, idx) => {
      const imgs = normalizeImages(p);
      const first = imgs[0] || '/Images/gallery1.jpg';
      const { src, srcSet } = muscacheSources(first);

      // prefer explicit numeric ids; else fall back
      const id = p.id ?? p.external_id ?? p.slug ?? `idx-${idx}`;

      return {
        id,
        slug: p.slug,
        title: p.title,
        location: toLocationText(p.location) || toLocationText(p.city),
        price: Number.isFinite(+p.price_per_night) ? `€${p.price_per_night}/night` : (p.price_text || 'Price on request'),
        image: src,
        imageSet: srcSet || '',
        lat: p.lat ?? p.latitude ?? p.coordinates?.lat ?? null,
        lng: p.lng ?? p.longitude ?? p.coordinates?.lng ?? null,
        isFeatured: !!p.is_featured,
        _rawFirst: imgs[0],
        // you can add beds/baths/sleeps as they come from API
      };
    });
  }, [items]);

  const mapProps = useMemo(
    () => properties.filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng)),
    [properties]
  );

  const reachedEnd = total ? items.length >= total : properties.length < perPage;

  // Infinite scroll sentinel inside left pane
  useEffect(() => {
    if (!sentinelRef.current || !scrollRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !loading && !reachedEnd) {
            setPage((p) => p + 1);
            break;
          }
        }
      },
      { root: scrollRef.current, rootMargin: '800px 0px' }
    );
    io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, [loading, reachedEnd]);

  return (
    <div className="listing-layout">
      <div className="search-sticky">
        <SearchBar />
      </div>

      <div className="listings-section">
        {/* LEFT: scrollable grid */}
        <div className="left-section scroll-pane" ref={scrollRef}>
          {err && <div className="error">{err}</div>}
          {properties.length === 0 && loading && <div className="loading">Loading properties…</div>}

          {properties.length > 0 && (
            <div className="property-grid">
              {properties.map((property) => (
                <Link
                  to={`/property/${property.slug || property.id}`}
                  key={property.id}
                  className="card-link"
                  onMouseEnter={() => setHoverId(property.id)}
                  onMouseLeave={() => setHoverId(null)}
                >
                  <div className="property-card" data-prop={property.id}>
                    <div className="img-wrap" title={property._rawFirst || property.image}>
                      <LazyImage
                        src={property.image}
                        srcSet={property.imageSet}
                        alt={property.title}
                        className="property-image"
                        root={scrollRef}
                      />
                    </div>

                    <div className="property-details">
                      <h2 className="property-title" title={property.title}>{property.title}</h2>
                      <p className="property-locations">{property.location}</p>

                      <div className="meta-row">
                        {property.isFeatured && <span className="meta-pill">Featured</span>}
                        {/* Add: <span className="meta-pill">2 BR</span> etc when available */}
                      </div>

                      <p className="property-price">{property.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Infinite scroll sentinel */}
          <div ref={sentinelRef} style={{ height: 1 }} />

          {/* Fallback pager (optional) */}
          {!reachedEnd && (
            <div className="pager">
              <button
                className="filter-button"
                disabled={loading}
                onClick={() => setPage((p) => p + 1)}
              >
                Load more →
              </button>
              <div className="pager-meta">
                {items.length} / {total || '…'}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: sticky map */}
        <div className="right-section">
          <ClusterMap
            properties={mapProps}
            showHeading={false}
            highlightId={hoverId}
            onMarkerHover={(id) => setHoverId(id)}
            onMarkerClick={(id) => {
              const el = document.querySelector(`[data-prop="${id}"]`);
              if (el && scrollRef.current) {
                const top = el.offsetTop - 12;
                scrollRef.current.scrollTo({ top, behavior: 'smooth' });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Listings;

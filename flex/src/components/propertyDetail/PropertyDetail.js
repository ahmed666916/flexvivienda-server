import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PropertyDetail.css';
import ImageGallery from './ImageGallery';
import BookingCard from './BookingCard';
import SinglePropertyMap from '../map/SinglePropertyMap';

// ✅ Helper function to normalize fields (array, JSON string, or comma-separated string)
const parseList = (value) => {
  if (!value) return [];
  try {
    if (Array.isArray(value)) {
      return value;
    } else if (typeof value === "string") {
      // Try JSON parse first
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed;
      } else {
        // fallback: split comma-separated
        return value.split(",").map((v) => v.trim()).filter(Boolean);
      }
    }
  } catch {
    return value.split(",").map((v) => v.trim()).filter(Boolean);
  }
  return [];
};

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetch(`https://app.flexvivienda.com/api/properties/${id}`)
      .then((res) => res.json())
      .then((data) => setProperty(data))
      .catch((err) => console.error("Error fetching property:", err));
  }, [id]);

  if (!property) return <p>Loading...</p>;

  // ✅ Parse fields safely
  const amenities = parseList(property.amenities);
  const rules = parseList(property.rules);
  const cancellation = parseList(property.cancellation);
  const neighborhood = parseList(property.neighborhood);

  // ✅ Normalize images
  // ✅ Normalize images into plain strings
const imagePaths = property.images?.length
  ? property.images.map((img) => {
      if (typeof img === "string") return img;       // old format
      if (img.url) return img.url;                   // new format
      if (img.image_path) return `/storage/${img.image_path}`; // fallback
      return null;
    }).filter(Boolean)
  : ["https://via.placeholder.com/800x600?text=No+Image"];


  // ✅ Fallback coordinates (Istanbul) if missing
  const lat = property.latitude ?? 41.015137;
  const lng = property.longitude ?? 28.97953;

  return (
    <div className="property-detail-container">
      <h1 className="property-title">{property.title}</h1>
      <p className="property-location">{property.location}</p>

      {/* Image Gallery */}
      <div className="gallery-section">
        <ImageGallery images={imagePaths} />
      </div>

      <div className="main-content">
        <div className="content-left">
          {/* Description */}
          <section className="description-section">
            <h2>Description</h2>
            <p>{property.description || "Description coming soon."}</p>
          </section>

          {/* Amenities */}
          <section className="amenities-section">
            <h2>Amenities</h2>
            <div className="amenities-grid">
              {amenities.length > 0 ? (
                amenities.map((item, index) => (
                  <div key={index}>⭐ {item}</div>
                ))
              ) : (
                <p>No amenities listed</p>
              )}
            </div>
          </section>

          {/* Rules */}
          <section className="property-info">
            <h2>Things to Know</h2>
            <div className="info-grid">
              {rules.length > 0 ? (
                rules.map((rule, index) => (
                  <div className="info-item" key={index}>
                    <span className="icon">ℹ️</span> {rule}
                  </div>
                ))
              ) : (
                <p>No rules listed</p>
              )}
            </div>
          </section>

          {/* Cancellation */}
          <section className="property-cancellation">
            <h2>Cancellation & Early Termination</h2>
            <ul className="cancel-list">
              {cancellation.length > 0 ? (
                cancellation.map((item, index) => <li key={index}>{item}</li>)
              ) : (
                <li>No cancellation policy listed</li>
              )}
            </ul>
          </section>

          {/* Neighborhood */}
          <section className="property-neighborhood">
            <h2>About the Neighborhood</h2>
            <div className="neighborhood-grid">
              {neighborhood.length > 0 ? (
                neighborhood.map((place, index) => (
                  <div key={index}>
                    <span role="img">📍</span>
                    <p>{place}</p>
                  </div>
                ))
              ) : (
                <p>No neighborhood info</p>
              )}
            </div>
          </section>

          {/* Map */}
          <section className="map-section">
            {lat && lng ? (
              <SinglePropertyMap location={{ lat, lng, title: property.title }} />
            ) : (
              <p>No map available for this property.</p>
            )}
          </section>
        </div>

        <div className="content-right">
          <BookingCard price={property.price} propertyId={property.id} />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;

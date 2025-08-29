import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PropertyDetail.css';
import ImageGallery from './ImageGallery';
import BookingCard from './BookingCard';
import SinglePropertyMap from '../map/SinglePropertyMap';

const PropertyDetail = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/properties/${id}`)
      .then(res => res.json())
      .then(data => setProperty(data))
      .catch(err => console.error("Error fetching property:", err));
  }, [id]);



  if (!property) return <p>Loading...</p>;

const amenities = Array.isArray(property.amenities)
  ? property.amenities
  : JSON.parse(property.amenities || "[]");

const rules = Array.isArray(property.rules)
  ? property.rules
  : JSON.parse(property.rules || "[]");

const cancellation = Array.isArray(property.cancellation)
  ? property.cancellation
  : JSON.parse(property.cancellation || "[]");

const neighborhood = Array.isArray(property.neighborhood)
  ? property.neighborhood
  : JSON.parse(property.neighborhood || "[]");

  return (
    <div className="property-detail-container">
      <h1 className="property-title">{property.title}</h1>
      <p className="property-location">{property.location}</p>

      {/* Image Gallery */}
      <div className="gallery-section">
        <ImageGallery images={property.images} />
      </div>

      <div className="main-content">
        <div className="content-left">

          {/* Description */}
          <section className="description-section">
            <h2>Description</h2>
            <p>{property.description}</p>
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
              {rules.length > 0 && rules[0] !== "" ? (
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
              {cancellation.length > 0 && cancellation[0] !== "" ? (
                cancellation.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <li>No cancellation policy listed</li>
              )}
            </ul>
          </section>

          {/* Neighborhood */}
          <section className="property-neighborhood">
            <h2>About the Neighborhood</h2>
            <div className="neighborhood-grid">
              {neighborhood.length > 0 && neighborhood[0] !== "" ? (
                neighborhood.map((place, index) => (
                  <div key={index}>
                    <span role="img">📍</span><p>{place}</p>
                  </div>
                ))
              ) : (
                <p>No neighborhood info</p>
              )}
            </div>
          </section>

          {/* Map */}
          <section className="map-section">
            <SinglePropertyMap location={{
              lat: property.lat,
              lng: property.lng,
              title: property.title
            }} />
          </section>
        </div>

        <div className="content-right">
          <BookingCard price={property.price}/>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;

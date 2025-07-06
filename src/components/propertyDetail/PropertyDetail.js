import React from 'react';
import './PropertyDetail.css';
import ImageGallery from './ImageGallery';
import BookingCard from './BookingCard';
import SinglePropertyMap from '../map/SinglePropertyMap'; // NEW MAP IMPORT
import { FaBed, FaBath, FaRulerCombined, FaWifi, FaCar, FaSwimmer, FaSnowflake, FaEye } from 'react-icons/fa';

const PropertyDetail = () => {
  const images = [
    '/Images/house1.jpg',
    '/Images/house2.jpg',
    '/Images/house3.jpg',
    '/Images/house4.jpg',
    '/Images/house1.jpg',
    '/Images/house2.jpg',
    '/Images/house3.jpg',
    '/Images/house4.jpg',
  ];

  // Mock coordinates for this specific property (adjust as needed)
  const propertyLocation = {
    lat: 37.0344,  // Bodrum coordinates
    lng: 27.4305,
    title: 'Charming House with Garden in Bodrum',
  };

  return (
    <div className="property-detail-container">
      <h1 className="property-title">Charming House with Garden in Bodrum</h1>
      <p className="property-location">Muğla, Bodrum</p>

      <div className="gallery-section">
        <ImageGallery images={images} />
      </div>

      <div className="main-content">
        <div className="content-left">
          {/* Description */}
          <section className="description-section">
            <h2>Description</h2>
            <p>
              Experience the charm of Bodrum in this beautiful garden house...
            </p>
          </section>

          {/* Amenities */}
          <section className="amenities-section">
            <h2>Amenities</h2>
            <div className="amenities-grid">
              <div><FaBed /> 3 Bedrooms</div>
              <div><FaBath /> 2 Bathrooms</div>
              <div><FaRulerCombined /> 120 m²</div>
              <div><FaSwimmer /> Walking distance to the beach</div>
              <div><FaEye /> Balcony</div>
              <div><FaCar /> Free Parking</div>
              <div><FaSnowflake /> Air Conditioning</div>
              <div><FaWifi /> WiFi</div>
              <div><FaCar /> Backyard</div>
              <div><FaEye /> Beach View</div>
              <div><FaEye /> Washing Machine</div>
            </div>
          </section>

          {/* Rules */}
          <section className="property-info">
            <h2>Things to Know</h2>
            <div className="info-grid">
              <div className="info-item"><span className="icon">🕒</span><span><strong>Move in after 2 PM</strong><br /><strong>Move out before 12 PM</strong></span></div>
              <div className="info-item"><span className="icon">🚭</span><span>No smoking allowed</span></div>
              <div className="info-item"><span className="icon">🎉</span><span>No parties or events allowed</span></div>
              <div className="info-item"><span className="icon">🐾</span><span>No pets allowed</span></div>
            </div>
          </section>

          {/* Cancellation */}
          <section className="property-cancellation">
            <h2>Cancellation & Early Termination</h2>
            <ul className="cancel-list">
              <li><strong>If 30+ days</strong> before move-in, 10% charge + fees.</li>
              <li><strong>If less than 30 days</strong>, one month’s rent, no refund of fees.</li>
              <li><a href="#">See cancellation policies</a></li>
              <li>Background checks apply. If failed, full refund offered.</li>
            </ul>
          </section>

          {/* Neighborhood */}
          <section className="property-neighborhood">
            <h2>About the Neighborhood</h2>
            <p>
              Located on Boğazkesen... connects Galataport to Istiklal Street.
            </p>
            <div className="neighborhood-grid">
              <div><span role="img">🛒</span><p>Supermarkets</p></div>
              <div><span role="img">🅿️</span><p>Parking lots</p></div>
              <div><span role="img">🏋️‍♂️</span><p>Gyms</p></div>
              <div><span role="img">🏫</span><p>Schools</p></div>
              <div><span role="img">🍽️</span><p>Restaurants</p></div>
              <div><span role="img">☕</span><p>Cafes</p></div>
              <div><span role="img">🍸</span><p>Bars</p></div>
              <div><span role="img">🛍️</span><p>Shops</p></div>
            </div>
          </section>

          {/* Map (no heading, just single marker) */}
          <section className="map-section">
            <SinglePropertyMap location={propertyLocation} />
          </section>
        </div>

        <div className="content-right">
          <BookingCard />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;

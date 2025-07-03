import React from 'react';
import './PropertyDetail.css';
import ImageGallery from './ImageGallery';
import BookingCard from './BookingCard';
import GoogleMap from './GoogleMap';
import GridGalleryViewer from './GridGalleryViewer';

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

  return (
    <div className="property-detail-container">
      <h1 className="property-title">Charming House with Garden in Bodrum</h1>
      <p className="property-location">Muğla, Bodrum</p>

      <div className="gallery-section">
        <ImageGallery images={images} />
      </div>

      <div className="main-content">
        <div className="content-left">
          <section className="description-section">
            <h2>Description</h2>
            <p>
              Experience the charm of Bodrum in this beautiful garden house. Located within walking distance to the beach,
              the home boasts a serene backyard, modern design, and all the amenities you need for a relaxing holiday.
              Perfect for families or small groups seeking a mix of nature and comfort.
            </p>
          </section>

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

          <section className="map-section">
            <GoogleMap />
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

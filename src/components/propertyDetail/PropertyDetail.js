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

         <section className="property-info">
          <h2>Things to Know</h2>
          <div className="info-grid">
            <div className="info-item"><span className="icon">🕒</span><span><strong>Move in after 2 PM</strong><br /><strong>Move out before 12 PM</strong></span></div>
            <div className="info-item"><span className="icon">🚭</span><span>No smoking allowed</span></div>
            <div className="info-item"><span className="icon">🎉</span><span>No parties or events allowed</span></div>
            <div className="info-item"><span className="icon">🐾</span><span>No pets allowed</span></div>
          </div>
        </section>

        <section className="property-cancellation">
          <h2>Cancellation & Early Termination</h2>
          <ul className="cancel-list">
            <li><strong>If 30+ days</strong> before move-in, charge of 10% of the booking value (and any card processing fees are non-refundable).</li>
            <li><strong>If less than 30 days</strong> before move-in, one month’s rent charge (and no service/booking or card processing fee refund).</li>
            <li><a href="#">See our cancellation and early termination policies</a></li>
            <li>Partners reserve the right to conduct secure ID and background checks. If a booking is canceled as a result of these checks, a full refund will be offered.</li>
          </ul>
        </section>

        <section className="property-neighborhood">
          <h2>About the Neighborhood</h2>
          <p>
            Located on Boğazkesen, the officially declared Cultural Street of Istanbul, this apartment connects Galataport to the famous Istiklal Street...
          </p>
          <div className="neighborhood-grid">
            <div><span role="img">🛒</span><p>Supermarkets</p></div>
            <div><span role="img">🅿️</span><p>Parking lots</p></div>
            <div><span role="img">🏋️‍♂️</span><p>Gyms</p></div>
            <div><span role="img">🏫</span><p>Schools/Universities</p></div>
            <div><span role="img">🍽️</span><p>Restaurants</p></div>
            <div><span role="img">☕</span><p>Cafes</p></div>
            <div><span role="img">🍸</span><p>Bars</p></div>
            <div><span role="img">🛍️</span><p>Shops</p></div>
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

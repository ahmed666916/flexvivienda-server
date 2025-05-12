import React from 'react';
import './PropertyDetail.css';

const PropertyDetail = () => {
  const images = [
    'https://agentrealestateschools.com/wp-content/uploads/2021/11/real-estate-property.jpg',
    'https://duotax.com.au/wp-content/uploads/House.jpg',
    'https://www.synchrony.com/syfbank/images/hero-land-lord-life-1140x570.jpg',
    'https://duotax.com.au/wp-content/uploads/House.jpg',
  ];

  const amenities = [
    'Air Conditioning',
    'Dishwasher',
    'Dryer',
    'Elevator',
    'Free Parking on Premises',
    'Heating',
    'Iron',
    'Refrigerator',
    'Stove',
    'TV',
    'Washing Machine',
    'Beach View',
    'Linens',
    'Cleaning Disinfection',
    'Coffee Maker',
    'Cookware',
    'Dining Table',
    'Cutlery',
    'Enhanced Cleaning Practices',
    'Essentials',
    'Extra Pillows and Blankets',
    'Family/Kid Friendly',
    'Free Street Parking',
    'Garden or Backyard',
    'Hangers',
    'Hair Dryer',
    'High-touch Surfaces Disinfected',
    'Hot Water',
    'Internet',
    'Kettle',
    'Kitchen',
    'Long-term Stays Allowed',
    'Microwave',
    'Oven',
    'Patio or Balcony',
    'Private Entrance',
    'Room-darkening Shades',
    'Shampoo',
    'Smoke Detector',
    'Suitable for Infants (under 2)',
    'Suitable for Children (2-12 years)',
    'Toaster',
    'Towels Provided',
    'Wheelchair Accessible',
    'Wireless Internet',
  ];

  return (
    <div className="property-detail-container">
      <h1 className="property-title-detail">Bodrum’da Arka Bahçeli Büyüleyici Ev | Louvre</h1>
      <p className="property-location">Muğla, Bodrum</p>

      <div className="image-gallery">
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Property view ${index + 1}`} className="gallery-image" />
        ))}
      </div>

      <div className="property-info">
        <div className="property-overview">
          <h2>Overview</h2>
          <ul>
            <li>3 Bedrooms</li>
            <li>2 Bathrooms</li>
            <li>120 m²</li>
            <li>Walking distance to the beach</li>
            <li>Backyard</li>
            <li>Balcony</li>
          </ul>
        </div>

        <div className="property-amenities">
          <h2>Amenities</h2>
          <ul>
            {amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        </div>

        <div className="property-booking">
          <h2>Booking Information</h2>
          <p><strong>Check-in:</strong> 15:00</p>
          <p><strong>Check-out:</strong> 11:00</p>
          <p><strong>Cancellation Policy:</strong> Full refund for cancellations made up to 5 days before check-in. No refund within 5 days of check-in. Cleaning fee is refundable.</p>
          <button className="book-button">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;

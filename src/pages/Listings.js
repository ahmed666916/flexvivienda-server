import React, { useState } from 'react';
import './Listings.css';
import { Link } from 'react-router-dom';

const sampleProperties = [
  {
    id: 1,
    title: 'Modern Flat near Istiklal Street',
    location: 'Beyoğlu, Istanbul',
    price: '€120/night',
    image: 'https://agentrealestateschools.com/wp-content/uploads/2021/11/real-estate-property.jpg',
    tag: 'Hot Property',
  },
  {
    id: 2,
    title: 'Superb House with Garden in Ortaköy',
    location: 'Ortaköy, Istanbul',
    price: '€200/night',
    image: 'https://duotax.com.au/wp-content/uploads/House.jpg',
    tag: 'Highest Rated',
  },
  {
    id: 3,
    title: 'Cozy Studio in Kadıköy',
    location: 'Kadıköy, Istanbul',
    price: '€90/night',
    image: 'https://www.synchrony.com/syfbank/images/hero-land-lord-life-1140x570.jpg',
  },
  // Add more properties as needed
];

const Listings = () => {
  const [view, setView] = useState('list');

  const toggleView = () => {
    setView((prev) => (prev === 'list' ? 'map' : 'list'));
  };

  return (
    <div className="listing-page-container">
      <div className="filter-section">
        <h3>Filters</h3>
        <div className="filter-group"><label>Price Range</label><input type="range" min="50" max="500" /></div>
        <hr style={{ margin: '20px 0', borderColor: '#eee' }} />
        <div className="filter-group"><label>Property Type</label><select><option>All</option><option>Apartment</option><option>Villa</option><option>Bungalow</option></select></div>
        <div className="filter-group"><label>Bedrooms</label><select><option>Any</option><option>1+</option><option>2+</option><option>3+</option></select></div>
        <div className="filter-group"><label>Bathrooms</label><select><option>Any</option><option>1+</option><option>2+</option></select></div>
        <div className="filter-group"><label>Pets Allowed</label><input type="checkbox" /></div>
        <div className="filter-group"><label>Air Conditioning</label><input type="checkbox" /></div>
        <div className="filter-group"><label>WiFi</label><input type="checkbox" /></div>
        <div className="filter-group"><label>Parking</label><input type="checkbox" /></div>
        <div className="filter-group"><label>Garden</label><input type="checkbox" /></div>
        <div className="filter-group"><label>Sea View</label><input type="checkbox" /></div>
      </div>

      <div className="listings-section">
        {view === 'list' ? (
          <div className="property-grid">
            {sampleProperties.map((property) => (
              <Link to="/property_detail" key={property.id}>
              <div className="property-card" key={property.id}>
                {/* {property.tag && <span className="property-tag">{property.tag}</span>} */}
                <img src={property.image} alt={property.title} className="property-image" />
                <div className="property-details">
                  <h2 className="property-title">{property.title}</h2>
                  <p className="property-location">{property.location}</p>
                  <p className="property-price">{property.price}</p>
                </div>
              </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="map-container2">
            <iframe
              src="https://www.google.com/maps/embed/v1/view?key=AIzaSyAUERmGeMXxZ6rDvbVYmvy67j4NF9b3Yqs&center=41.0082,28.9784&zoom=12"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Map View"
            ></iframe>
          </div>
        )}
      </div>

      <div className="toggle-button-popup">
        <button onClick={toggleView}>
          {view === 'list' ? 'Switch to Map View' : 'Switch to List View'}
        </button>
      </div>
    </div>
  );
};

export default Listings;

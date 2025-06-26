import React, { useState } from 'react';
import './Listings.css';
import { Link } from 'react-router-dom';

import SearchBar from '../components/SearchBar/SearchBarListing'
import ClusterMap from '../components/map/MyClusterMap'

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
];

const Listings = () => {


  return (
    <div className="listing-layout">
      {/* Filter Button */}

      <SearchBar />

      

      {/* Main layout */}
      <div className="listings-section">
        
        <div className="left-section">
          <div className="property-grid">
            {sampleProperties.map((property) => (
              <Link to="/property_detail" key={property.id}>
                <div className="property-card">
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
        </div>
        <div className="right-section">
          {/* <iframe
            src="https://www.google.com/maps/embed/v1/view?key=AIzaSyAUERmGeMXxZ6rDvbVYmvy67j4NF9b3Yqs&center=41.0082,28.9784&zoom=12"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Map View"
          ></iframe> */}
          <ClusterMap />
        </div>
      </div>
    </div>
  );
};

export default Listings;

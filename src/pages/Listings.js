import React from 'react';
import './Listings.css';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBarListing';
import ClusterMap from '../components/map/MyClusterMap';

const properties = [
  {
    id: 1,
    title: 'Modern Flat near Istiklal Street',
    location: 'Beyoğlu, Istanbul',
    price: '€120/night',
    image: 'https://agentrealestateschools.com/wp-content/uploads/2021/11/real-estate-property.jpg',
    tag: 'Hot Property',
    lat: 41.0369,
    lng: 28.9855,
  },
  {
    id: 2,
    title: 'Superb House in Ortaköy',
    location: 'Ortaköy, Istanbul',
    price: '€200/night',
    image: 'https://duotax.com.au/wp-content/uploads/House.jpg',
    tag: 'Hot Property',
    lat: 41.0451,
    lng: 29.0215,
  },
  {
    id: 3,
    title: 'Cozy Studio in Kadıköy',
    location: 'Kadıköy, Istanbul',
    price: '€90/night',
    image: 'https://www.synchrony.com/syfbank/images/hero-land-lord-life-1140x570.jpg',
    tag: 'Highest Rated',
    lat: 40.9890,
    lng: 29.0390,
  },
  {
    id: 4,
    title: 'Modern Flat near Istiklal Street',
    location: 'Beyoğlu, Istanbul',
    price: '€120/night',
    image: 'https://agentrealestateschools.com/wp-content/uploads/2021/11/real-estate-property.jpg',
    tag: 'Highest Rated',
    lat: 41.0365,
    lng: 28.9865,
  },
  {
    id: 5,
    title: 'Superb House in Ortaköy',
    location: 'Ortaköy, Istanbul',
    price: '€200/night',
    image: 'https://duotax.com.au/wp-content/uploads/House.jpg',
    tag: 'Highest Rated',
    lat: 41.0445,
    lng: 29.0200,
  },
  {
    id: 6,
    title: 'Cozy Studio in Kadıköy',
    location: 'Kadıköy, Istanbul',
    price: '€90/night',
    image: 'https://www.synchrony.com/syfbank/images/hero-land-lord-life-1140x570.jpg',
    tag: 'Hot Property',
    lat: 40.9900,
    lng: 29.0380,
  }
];

const Listings = () => {
  return (
    <div className="listing-layout">
      <SearchBar />

      <div className="listings-section">
        <div className="left-section">
          <div className="property-grid">
            {properties.map((property) => (
              <Link to="/property_detail" key={property.id}>
                <div className="property-card">
                  <img src={property.image} alt={property.title} className="property-image" />
                  <div className="property-details">
                    <h2 className="property-title">{property.title}</h2>
                    <p className="property-locations">{property.location}</p>
                    <p className="property-price">{property.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="right-section">
          <ClusterMap properties={properties} showHeading={false} />
        </div>
      </div>
    </div>
  );
};

export default Listings;

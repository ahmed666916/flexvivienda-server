import React from 'react';
import { Link } from 'react-router-dom';
import './PropertyList.css';

const properties = [
  {
    id: 1,
    title: 'Modern Flat near Istiklal Street',
    location: 'Beyoğlu, Istanbul',
    price: '€120/night',
    image: 'https://agentrealestateschools.com/wp-content/uploads/2021/11/real-estate-property.jpg',
  },
  {
    id: 2,
    title: 'Superb House with Garden in Ortaköy',
    location: 'Ortaköy, Istanbul',
    price: '€200/night',
    image: 'https://duotax.com.au/wp-content/uploads/House.jpg',
  },
  {
    id: 3,
    title: 'Cozy Studio in Kadıköy',
    location: 'Kadıköy, Istanbul',
    price: '€90/night',
    image: 'https://www.synchrony.com/syfbank/images/hero-land-lord-life-1140x570.jpg',
  },
  {
    id: 4,
    title: 'Modern Flat near Istiklal Street',
    location: 'Beyoğlu, Istanbul',
    price: '€120/night',
    image: 'https://agentrealestateschools.com/wp-content/uploads/2021/11/real-estate-property.jpg',
  },
  {
    id: 5,
    title: 'Superb House with Garden in Ortaköy',
    location: 'Ortaköy, Istanbul',
    price: '€200/night',
    image: 'https://duotax.com.au/wp-content/uploads/House.jpg',
  },
  {
    id: 6,
    title: 'Cozy Studio in Kadıköy',
    location: 'Kadıköy, Istanbul',
    price: '€90/night',
    image: 'https://www.synchrony.com/syfbank/images/hero-land-lord-life-1140x570.jpg',
  },
  // Add more properties as needed
];

const PropertyList = () => {
  return (
    <div className="listing-container">
      {properties.map((property) => (
        <Link to={"/property_detail"}>
        <div className="property-card" key={property.id}>
          <img src={property.image} alt={property.title} className="property-image" />
          <div className="property-details">
            <h2 className="property-title">{property.title}</h2>
            <p className="property-location">{property.location}</p>
            <p className="property-price">{property.price}</p>
            
          </div>
        </div></Link>
      ))}
    </div>
  );
};

export default PropertyList;

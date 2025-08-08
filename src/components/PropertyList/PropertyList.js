import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PropertyList.css';
import CMap from '../map/MyClusterMap';
import {
  FaWater, FaUmbrellaBeach, FaTree, FaDog, FaSpa, FaHeart,
  FaBuilding, FaCity, FaHotTub
} from 'react-icons/fa';

const filters = [
  { name: 'All', icon: <FaHeart /> },
  { name: 'Sea view', icon: <FaWater /> },
  { name: 'Swimming Pool', icon: <FaSpa /> },
  { name: 'Garden', icon: <FaTree /> },
  { name: 'Close to Beach', icon: <FaUmbrellaBeach /> },
  { name: 'Pet friendly', icon: <FaDog /> },
  { name: 'Residence', icon: <FaBuilding /> },
  { name: 'Central', icon: <FaCity /> },
  { name: 'Jacuzzi', icon: <FaHotTub /> },
];

const properties = [
  {
    id: 1,
    title: 'Modern Flat near Istiklal Street',
    location: 'Beyoğlu, Istanbul',
    price: '€120/night',
    image: 'https://agentrealestateschools.com/wp-content/uploads/2021/11/real-estate-property.jpg',
    tag: 'Hot Property',
    bedrooms: 2,
    bathrooms: 1,
    size: 75,
    persons: 4,
    features: ['Sea view', 'Pet friendly', 'Central', 'Jacuzzi'],
  },
  {
    id: 2,
    title: 'Superb House in Ortaköy',
    location: 'Ortaköy, Istanbul',
    price: '€200/night',
    image: 'https://duotax.com.au/wp-content/uploads/House.jpg',
    tag: 'Hot Property',
    bedrooms: 4,
    bathrooms: 2,
    size: 200,
    persons: 4,
    features: ['Garden', 'Swimming Pool', 'Residence'],
  },
  {
    id: 3,
    title: 'Cozy Studio in Kadıköy',
    location: 'Kadıköy, Istanbul',
    price: '€90/night',
    image: 'https://www.synchrony.com/syfbank/images/hero-land-lord-life-1140x570.jpg',
    tag: 'Highest Rated',
    bedrooms: 1,
    bathrooms: 1,
    size: 45,
    persons: 4,
    features: ['Close to Beach', 'Residence'],
  },
  {
    id: 4,
    title: 'Sea View Apartment in Bakırköy',
    location: 'Bakırköy, Istanbul',
    price: '€150/night',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    tag: 'Highest Rated',
    bedrooms: 3,
    bathrooms: 2,
    size: 110,
    persons: 4,
    features: ['Sea view', 'Swimming Pool', 'Jacuzzi'],
  },
  {
    id: 5,
    title: 'Luxury Central Flat',
    location: 'Taksim, Istanbul',
    price: '€250/night',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    tag: 'Luxury Stay',
    bedrooms: 2,
    bathrooms: 1,
    size: 90,
    persons: 4,
    features: ['Central', 'Pet friendly', 'Residence'],
  },
  {
    id: 6,
    title: 'Stylish Retreat with Jacuzzi',
    location: 'Şişli, Istanbul',
    price: '€220/night',
    image: 'https://agentrealestateschools.com/wp-content/uploads/2021/11/real-estate-property.jpg',
    tag: 'Hot Property',
    bedrooms: 2,
    bathrooms: 2,
    size: 120,
    persons: 4,
    features: ['Jacuzzi', 'Garden', 'Central'],
  }
];

const PropertyList = (props) => {
  const scrollRef = useRef();
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const el = scrollRef.current;
    let isDown = false;
    let startX, scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      el.classList.add('dragging');
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const handleMouseUpLeave = () => {
      isDown = false;
      el.classList.remove('dragging');
    };
    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      el.scrollLeft = scrollLeft - (x - startX) * 2;
    };

    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mouseup', handleMouseUpLeave);
    el.addEventListener('mouseleave', handleMouseUpLeave);
    el.addEventListener('mousemove', handleMouseMove);
    return () => {
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mouseup', handleMouseUpLeave);
      el.removeEventListener('mouseleave', handleMouseUpLeave);
      el.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const filteredProperties =
    activeFilter === 'All'
      ? properties
      : properties.filter((p) => p.features && p.features.includes(activeFilter));

  return (
    <>
      {props.maps === "1" && (
        <>
          <br />
          <CMap properties={properties} showHeading={props.showHeading === "1"} />
        </>
      )}
      <br />
      <center>
        <h2 className="heading">
          <span className="heading-primary">{props.title.split(' ')[0]}</span>{' '}
          <span className="heading-secondary">{props.title.split(' ').slice(1).join(' ')}</span>
        </h2>
        <p className="heading-subtext">
          We've curated the finest rental homes for your vacations, business trips, and a variety of other experiences.
        </p>
      </center>
      <br />

      {props.tabs === "1" && (
        <div className="category-bar">
          {filters.map((filter, idx) => (
            <button
              key={idx}
              className={`category-button ${activeFilter === filter.name ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.name)}
            >
              <span className="category-icon">{filter.icon}</span>
              <span className="category-label">{filter.name}</span>
            </button>
          ))}
        </div>
      )}

      <div className="listing-container" ref={scrollRef}>
        {filteredProperties.map((property) => (
          <Link to="/property_detail" key={property.id}>
            <div className="property-card">
              {props.tags === "1" && property.tag && (
                <span className="property-tag">{property.tag}</span>
              )}
              <button className="fav-btn">
                <i className="fa-regular fa-heart"></i>
              </button>
              <img src={property.image} alt={property.title} className="property-image" />
              <div className="property-details">
                <h2 className="property-title">{property.title}</h2>
                <p className="property-locations">{property.location}</p>
                <div className="property-features">
                  <span><i className="fa-solid fa-bed"></i> {property.bedrooms}</span>
                  <span><i className="fa-solid fa-bath"></i> {property.bathrooms}</span>
                  <span>
                    <i className={props.short === "1" ? "fa-solid fa-user-group" : "fa-solid fa-maximize"}></i>
                    {props.short === "1" ? property.persons : property.size}
                  </span>
                </div>
                <p className="property-price">{property.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <center><span className='links'><Link to="/listing">See All Listings</Link></span></center>
    </>
  );
};

export default PropertyList;

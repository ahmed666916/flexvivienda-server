import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PropertyList.css';
import CMap from '../map/MyClusterMap';

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
    features: ['Sea view', 'Pet friendly'],
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
    features: ['Garden', 'Swimming Pool'],
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
    features: ['Close to Beach'],
  },
  {
    id: 4,
    title: 'Modern Flat near Istiklal Street',
    location: 'Beyoğlu, Istanbul',
    price: '€120/night',
    image: 'https://agentrealestateschools.com/wp-content/uploads/2021/11/real-estate-property.jpg',
    tag: 'Highest Rated',
    bedrooms: 4,
    bathrooms: 2,
    size: 200,
    persons: 4,
    features: ['Sea view', 'Swimming Pool'],
  },
  {
    id: 5,
    title: 'Superb House in Ortaköy',
    location: 'Ortaköy, Istanbul',
    price: '€200/night',
    image: 'https://duotax.com.au/wp-content/uploads/House.jpg',
    tag: 'Highest Rated',
    bedrooms: 2,
    bathrooms: 1,
    size: 75,
    persons: 4,
    features: ['Garden'],
  },
  {
    id: 6,
    title: 'Cozy Studio in Kadıköy',
    location: 'Kadıköy, Istanbul',
    price: '€90/night',
    image: 'https://www.synchrony.com/syfbank/images/hero-land-lord-life-1140x570.jpg',
    bedrooms: 4,
    bathrooms: 2,
    size: 200,
    persons: 4,
    features: ['Pet friendly'],
  },
];

const PropertyList = (props) => {
  const scrollRef = useRef();
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Sea view', 'Swimming Pool', 'Garden', 'Close to Beach', 'Pet friendly'];

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
           <h2 className="map-heading">Live Map of Available Properties</h2>
          <CMap />
        </>
      )}
      <br />
      <center><h2 className='heading'>{props.title}</h2></center>
      <br />

      {props.tabs === "1" && (
        <ul className="clusters">
          {filters.map((filter, idx) => (
            <li key={idx} className={activeFilter === filter ? 'active' : ''} onClick={() => setActiveFilter(filter)}>
              {filter}
            </li>
          ))}
        </ul>
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

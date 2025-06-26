import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PropertyList.css';
import Map from '../map/MyMap';
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
    features: ['Sea view', 'Pet friendly']
  },
  {
    id: 2,
    title: 'Superb House with Garden in Ortaköy',
    location: 'Ortaköy, Istanbul',
    price: '€200/night',
    image: 'https://duotax.com.au/wp-content/uploads/House.jpg',
    tag: 'Hot Property',
    bedrooms: 4,
    bathrooms: 2,
    size: 200,
    features: ['Garden', 'Swimming Pool']
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
    features: ['Close to Beach']
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
    features: ['Sea view', 'Swimming Pool']
  },
  {
    id: 5,
    title: 'Superb House with Garden in Ortaköy',
    location: 'Ortaköy, Istanbul',
    price: '€200/night',
    image: 'https://duotax.com.au/wp-content/uploads/House.jpg',
    tag: 'Highest Rated',
    bedrooms: 2,
    bathrooms: 1,
    size: 75,
    features: ['Garden']
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
    features: ['Pet friendly']
  },
];

const PropertyList = (props) => {
  const scrollRef = useRef();
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Sea view', 'Swimming Pool', 'Garden', 'Close to Beach', 'Pet friendly'];

  useEffect(() => {
    const el = scrollRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      el.classList.add('dragging');
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      el.classList.remove('dragging');
    };

    const handleMouseUp = () => {
      isDown = false;
      el.classList.remove('dragging');
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 2;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseup', handleMouseUp);
    el.addEventListener('mousemove', handleMouseMove);

    return () => {
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseup', handleMouseUp);
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
          <CMap />
        </>
      )}

      <br />
      <center><h2 className='heading'>{props.title}</h2></center>
      <br />

      {props.tabs === "1" && (
        <div>
          <ul className="clusters">
            {filters.map((filter, index) => (
              <li
                key={index}
                className={activeFilter === filter ? 'active' : ''}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </li>
            ))}
          </ul>
        </div>
      )}

      <br />
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
                <p className="property-location">{property.location}</p>
                <div className="property-features">
                  <span><i className="fa-solid fa-bed"></i> {property.bedrooms}</span>
                  <span><i className="fa-solid fa-bath"></i> {property.bathrooms}</span>
                  <span><i className="fa-solid fa-maximize"></i> {property.size} m²</span>
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
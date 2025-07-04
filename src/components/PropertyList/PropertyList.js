import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PropertyList.css';

// Import the map component with dynamic import to prevent SSR issues
const CMap = React.lazy(() => import('../map/MyClusterMap'));

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
  const [mapLoaded, setMapLoaded] = useState(false);
  const filters = ['All', 'Sea view', 'Swimming Pool', 'Garden', 'Close to Beach', 'Pet friendly'];

  // Horizontal scroll effect
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleMouseDown = (e) => {
      el.classList.add('dragging');
      const startX = e.pageX - el.offsetLeft;
      const scrollLeft = el.scrollLeft;

      const handleMouseMove = (e) => {
        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        el.scrollLeft = scrollLeft - (x - startX) * 2;
      };

      const handleMouseUp = () => {
        el.classList.remove('dragging');
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    el.addEventListener('mousedown', handleMouseDown);
    return () => el.removeEventListener('mousedown', handleMouseDown);
  }, []);

  const filteredProperties =
    activeFilter === 'All'
      ? properties
      : properties.filter((p) => p.features?.includes(activeFilter));

  return (
    <>
      {/* Map Section - Only render when needed and properly loaded */}
      {props.maps === "1" && (
        <div className="map-section" style={{ display: mapLoaded ? 'block' : 'none' }}>
          <h2 className="map-heading">Live Map of Available Properties</h2>
          <React.Suspense fallback={<div>Loading map...</div>}>
            <CMap 
              properties={properties} 
              onLoad={() => setMapLoaded(true)}
            />
          </React.Suspense>
        </div>
      )}

      {/* Rest of your component remains the same */}
      <br />
      <center><h2 className='heading'>{props.title}</h2></center>
      <br />

      {props.tabs === "1" && (
        <ul className="clusters">
          {filters.map((filter, idx) => (
            <li 
              key={idx} 
              className={activeFilter === filter ? 'active' : ''} 
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </li>
          ))}
        </ul>
      )}

      <div className="listing-container" ref={scrollRef}>
        {filteredProperties.map((property) => (
          <Link to={`/property_detail/${property.id}`} key={property.id}>
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

      <center>
        <span className='links'>
          <Link to="/listing">See All Listings</Link>
        </span>
      </center>
    </>
  );
};

export default PropertyList;
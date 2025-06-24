import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PropertyList.css';
import Map from '../map/MyMap'
import CMap from '../map/MyClusterMap'

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
    size: 75
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
    size: 200
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
    size: 45
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
    size: 200
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
    size: 75
  },
  {
    id: 6,
    title: 'Cozy Studio in Kadıköy',
    location: 'Kadıköy, Istanbul',
    price: '€90/night',
    image: 'https://www.synchrony.com/syfbank/images/hero-land-lord-life-1140x570.jpg',
     bedrooms: 4,
    bathrooms: 2,
    size: 200
  },
  // Add more properties as needed
];

const PropertyCitiesList = (props) => {
  const scrollRef = useRef();

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
      const walk = (x - startX) * 2; // speed multiplier
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

  return (
    <>
   
      
      {props.maps === "1" && (
        <>
        <br></br>
      {/* <div className="map-container">
        <iframe
          title="Google Map"
          width="100%"
          height="400"
          style={{ border: 0 }}
          src="https://www.google.com/maps/embed/v1/view?key=AIzaSyAUERmGeMXxZ6rDvbVYmvy67j4NF9b3Yqs&center=41.0082,28.9784&zoom=12"
          allowFullScreen
        ></iframe>
      </div> */}
      <CMap />
      </>
      )}

       <br></br>
       <center><h2 className='heading'>{props.title}</h2></center>
      
      <br></br>
      {props.tabs === "1" && (
      <div>
        <ul className="clusters">
          <li>Istanbul</li>
          <li>Ankara</li>
          <li>Izmir</li>
          <li>Antalya</li>
          <li>Bursa</li>
          <li>Adana</li>
          <li>Gaziantep</li>
          <li>Konya</li>
        </ul>
      </div>
    )}

    <br></br>

    <div className="listing-container" ref={scrollRef}>

      {properties.map((property) => (
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
    <center><span className='links'><Link  to="/listing">See All Listings</Link></span></center>
    </>
  );
};

export default PropertyCitiesList;
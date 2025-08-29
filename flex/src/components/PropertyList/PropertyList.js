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

const PropertyList = (props) => {
  const scrollRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch properties from API
  useEffect(() => {
     
      let url = null;
      switch (props.type) {
          case "feature":
              url = "https://app.flexvivienda.com/api/getFeaturedProperties/1";
              break;
          case "all":
              url = "https://app.flexvivienda.com/api/getAllProperties";
              break;
          case "long":
             url = "https://app.flexvivienda.com/api/getLongMediumTermProperties/long";
             break;
          case "medium":
             url = "https://app.flexvivienda.com/api/getLongMediumTermProperties/medium";
             break;
      }

    

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
        setLoading(false);
      });
  }, []);

  // ✅ Safe scroll drag logic
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return; // prevent null error

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
  }, [scrollRef]);

  // ✅ Apply filter
  const filteredProperties =
    activeFilter === 'All'
      ? properties
      : properties.filter((p) => p.amenities && p.amenities.includes(activeFilter));

  if (loading) return <p>Loading properties...</p>;

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
          <Link to={`/property/${property.id}`} key={property.id}>
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
                  {property.bedrooms && <span><i className="fa-solid fa-bed"></i> {property.bedrooms}</span>}
                  {property.bathrooms && <span><i className="fa-solid fa-bath"></i> {property.bathrooms}</span>}
                  <span>
                    <i className={props.short === "1" ? "fa-solid fa-user-group" : "fa-solid fa-maximize"}></i>
                    {props.short === "1" ? property.persons ?? 0 : property.size ?? 0}
                  </span>
                </div>
                <p className="property-price">
                  {property.price ? `€${property.price}/night` : 'Price on request'}
                </p>
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

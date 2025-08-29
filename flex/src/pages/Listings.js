import React, { useEffect, useMemo, useRef, useState } from 'react';
import './Listings.css';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBarListing';
import ClusterMap from '../components/map/MyClusterMap';
import { listProperties } from '../services/api';
import LazyImage from '../components/LazyImage';
import PropertyList from '../components/PropertyList/PropertyList';

/* ========= helpers ========= */


/* ========= component ========= */

const Listings = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [properties, setProperties] = useState([]);

  const scrollRef = useRef(null);
  const sentinelRef = useRef(null);

    useEffect(() => {
       var url = null;
      
         url = "http://localhost:8000/api/getAllProperties";
      
  
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



  return (
    <div className="listing-layout">
      <div className="search-sticky">
        <SearchBar />
      </div>

      <div className="listings-section">
        {/* LEFT: scrollable grid */}
        <div className="left-section scroll-pane" ref={scrollRef}>
          
          <div className="listing-container" ref={scrollRef}>
                  {properties.map((property) => (
                    <Link to={`/property/${property.id}`} key={property.id}>
                      <div className="property-card">
                       
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
                              <i className={"fa-solid fa-user-group"}></i>
                              { property.persons }
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
          
        </div>

        {/* RIGHT: sticky map */}
        <div className="right-section">
          <ClusterMap
            showHeading={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Listings;

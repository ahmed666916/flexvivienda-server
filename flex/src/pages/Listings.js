import React, { useState, useEffect } from "react";
import PropertyCard from "../components/PropertyCard/PropertyCard";
import "./Listings.css";
import ClusterMap from '../components/map/MyClusterMap';
import SearchBarListing from "../components/SearchBar/SearchBarListing";

const Listings = () => {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 18;

  // Fetch from backend
  useEffect(() => {
    fetch("https://app.flexvivienda.com/api/getAllProperties")
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.error("Error fetching properties:", err));
  }, []);

  // Pagination logic
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  return (
    <div className="listings-page">
      {/* Airbnb-style search bar */}
      <div className="listings-header">
        <SearchBarListing />
      </div>

      <div className="listings-content">
        {/* Left: Property grid */}
        <div className="property-panel">
          <div className="property-grid">
            {currentProperties.length > 0 ? (
              currentProperties.map((property, index) => (
                <PropertyCard key={index} property={property} />
              ))
            ) : (
              <p>No properties found.</p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={currentPage === i + 1 ? "active" : ""}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Fixed map */}
        <div className="map-panel">
          <ClusterMap showHeading={false} properties={properties} />
        </div>
      </div>
    </div>
  );
};

export default Listings;

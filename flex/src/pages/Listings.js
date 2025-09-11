// updated_Listings.js
//
// This component is an enhanced version of the existing Listings page.
// It strives to replicate the layout and visual style of Airbnb's listing
// results page while continuing to rely on the project's own data source.
// The page includes a sticky search bar at the top, a results header
// summarising the number of stays returned, a horizontal list of
// filter chips (without active filter logic), a grid of property cards
// and a map panel on the right. Pagination logic is preserved from
// the original component. If you wish to implement actual filtering,
// you can hook up handlers to update the `properties` state based on
// the selected filter.

import React, { useState, useEffect } from "react";
import PropertyCard from "../components/PropertyCard/PropertyCard";
import "./Listings.css";
import ClusterMap from '../components/map/MyClusterMap';
import SearchBarListing from "../components/SearchBar/SearchBarListing";

const Listings = () => {
  // Stores all properties returned from the API
  const [properties, setProperties] = useState([]);
  // Track the current page for pagination
  const [currentPage, setCurrentPage] = useState(1);
  // Adjust the number of items per page as needed
  const propertiesPerPage = 18;

  // Fetch properties from the backend when the component mounts
  useEffect(() => {
    fetch("https://app.flexvivienda.com/api/getAllProperties")
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.error("Error fetching properties:", err));
  }, []);

  // Compute indices for slicing the current page of results
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  // Calculate the total number of pages based on the property count
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  // Define a static list of filter chip labels. These do not apply
  // filtering logic; they exist purely for visual parity with Airbnb.
  const filterOptions = [
    "Price",
    "Rooms & beds",
    "Amenities",
    "Property type",
    "More filters"
  ];

  return (
    <div className="listings-page">
      {/* Sticky header with reusable search bar component */}
      <div className="listings-header">
        <SearchBarListing />
      </div>

      <div className="listings-content">
        {/* Left panel containing results summary, filters and property cards */}
        <div className="property-panel">
          {/* Results header summarising the number of stays */}
          <div className="results-header">
            <span className="results-count">{properties.length} stays</span>
            {/* You can insert a location indicator here if you capture it from the search bar */}
            {/* <span className="results-location">• in Lahore</span> */}
          </div>

          {/* Horizontal list of filter chips (no functional filters yet) */}
          <div className="filter-bar">
            {filterOptions.map((label) => (
              <button
                key={label}
                className="filter-chip"
                onClick={() => {
                  // Placeholder for future filter logic
                  console.log(`Filter clicked: ${label}`);
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Property grid displaying the current page of results */}
          <div className="property-grid">
            {currentProperties.length > 0 ? (
              currentProperties.map((property, index) => (
                <PropertyCard key={index} property={property} />
              ))
            ) : (
              <p>No properties found.</p>
            )}
          </div>

          {/* Pagination controls */}
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

        {/* Right panel containing the map */}
        <div className="map-panel">
          <ClusterMap showHeading={false} properties={properties} />
        </div>
      </div>
    </div>
  );
};

export default Listings;
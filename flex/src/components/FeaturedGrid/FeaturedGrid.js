import React from "react";
import PropertyCard from "./PropertyCard";
import "./FeaturedGrid.css";

const FeaturedGrid = ({ properties }) => {
  return (
    <div className="featured-grid">
      {properties.slice(0, 6).map((property, index) => (
        <PropertyCard key={index} property={property} />
      ))}
    </div>
  );
};

export default FeaturedGrid;

import React from "react";
import { Link } from "react-router-dom";
import "./PropertyCard.css";

const PropertyCard = ({ property }) => {
  return (
    <Link to={`/property/${property.id}`} className="card-link">
      <div className="property-card">
        <img
          src={property.image || "https://via.placeholder.com/400x250"}
          alt={property.title}
          className="property-image"
        />
        <div className="property-info">
          <h3 className="property-title">{property.title}</h3>
          <p className="property-location">{property.location}</p>
          <p className="property-price">${property.price} / night</p>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;

import React from "react";
import { Link } from "react-router-dom";
import "./PropertyCard.css";

const PropertyCard = ({ property }) => {
  // Choose main image: prefer first image in array, fallback to single image, then placeholder
  const mainImage =
    property.images && property.images.length > 0
      ? property.images[0].url
      : property.image || "https://via.placeholder.com/400x250";

  return (
    <Link to={`/property/${property.id}`} className="card-link">
      <div className="property-card">
        <img
          src={mainImage}
          alt={property.title}
          className="property-image"
          onError={(e) => {
            // fallback if broken link
            e.target.src = "https://via.placeholder.com/400x250";
          }}
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

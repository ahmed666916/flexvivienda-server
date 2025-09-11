import React from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaStar,
  FaBed,
  FaBath,
  FaUsers
} from "react-icons/fa";
import "./PropertyCard.css";

/**
 * A redesigned property card component that closely mirrors the look and feel
 * of Airbnb’s listing cards.  Each card shows a large cover image, a
 * favourite button, the property title, optional rating, location and a
 * breakdown of sleeping arrangements.  Pricing is displayed in the familiar
 * Airbnb style with a coloured price and a subdued "/night" suffix.
 *
 * This component does not make any external API calls; it relies solely
 * on the provided `property` prop.  If `property.images` is an array,
 * the first image will be used as the cover.  Fallbacks are provided to
 * ensure the UI remains robust even when data is incomplete.
 */
const PropertyCard = ({ property }) => {
  // Determine which image to display as the main cover.  Prefer the first
  // image from an array, then fall back to a singular `image` field, and
  // finally a placeholder to avoid broken images.
  const mainImage =
    property?.images && property.images.length > 0
      ? property.images[0].url
      : property.image || "https://via.placeholder.com/400x250";

  return (
    <Link to={`/property/${property.id}`} className="card-link">
      <div className="property-card">
        {/* Cover image with a floating favourite button */}
        <div className="image-wrapper">
          <img
            src={mainImage}
            alt={property.title}
            className="property-image"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/400x250";
            }}
          />
          <button className="favorite-btn" title="Add to favourites">
            <FaHeart />
          </button>
        </div>

        {/* Information section */}
        <div className="property-info">
          {/* Title and optional rating */}
          <div className="card-header">
            <span className="property-title">{property.title}</span>
            {property.rating && (
              <span className="property-rating">
                <FaStar className="star-icon" />
                {property.rating.toFixed(1)}
              </span>
            )}
          </div>
          {/* Location */}
          <span className="property-location">{property.location}</span>
          {/* Attributes: bedrooms, bathrooms and guests */}
          <div className="property-attributes">
            {property.bedrooms && (
              <span className="attr">
                <FaBed /> {property.bedrooms} bd
              </span>
            )}
            {property.bathrooms && (
              <span className="attr">
                <FaBath /> {property.bathrooms} ba
              </span>
            )}
            {property.persons && (
              <span className="attr">
                <FaUsers /> {property.persons} guests
              </span>
            )}
          </div>
          {/* Pricing */}
          <div className="property-price">
            €{property.price}
            <span className="per-night"> / night</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
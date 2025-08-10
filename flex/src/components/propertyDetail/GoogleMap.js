import React from 'react';
import './PropertyDetail.css';

const GoogleMap = ({ location }) => {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`;
  return (
    <div className="google-map-container">
      <h2>Location</h2>
      <iframe 
        src={mapSrc}
        width="100%"
        height="250"
        style={{ border: 0, borderRadius: '8px' }}
        allowFullScreen=""
        loading="lazy"
        title="Google Map"
      ></iframe>
    </div>
  );
};

export default GoogleMap;

import React, { useState } from 'react';
import './GridGalleryViewer.css';

const GridGalleryViewer = ({ images = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      <div className="grid-gallery">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Gallery ${index}`}
            className="grid-image"
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="image-viewer-backdrop" onClick={() => setSelectedIndex(null)}>
          <div className="image-viewer-content" onClick={(e) => e.stopPropagation()}>
            <button className="nav-arrows left" onClick={handlePrev}>&#10094;</button>
            <img src={images[selectedIndex]} alt="Full View" className="image-viewer-image" />
            <button className="nav-arrows right" onClick={handleNext}>&#10095;</button>
          </div>
        </div>
      )}
    </>
  );
};

export default GridGalleryViewer;

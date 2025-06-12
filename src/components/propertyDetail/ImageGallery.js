import React, { useState } from 'react';
import './PropertyDetail.css';

const ImageGallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handlePrev = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div className="image-gallery">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Gallery ${i + 1}`}
            className="gallery-image"
            onClick={() => setSelectedIndex(i)}
          />
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="image-viewer-backdrop" onClick={() => setSelectedIndex(null)}>
          <div className="image-viewer-content" onClick={(e) => e.stopPropagation()}>
            <button className="nav-arrow left" onClick={handlePrev}>
              &#10094;
            </button>
            <img
              src={images[selectedIndex]}
              alt="Full View"
              className="image-viewer-image"
            />
            <button className="nav-arrow right" onClick={handleNext}>
              &#10095;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;

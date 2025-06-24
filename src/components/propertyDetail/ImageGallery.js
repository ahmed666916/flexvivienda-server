import React, { useState } from 'react';
import './PropertyDetail.css';

const ImageGallery = ({ images }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handlePrev = () => {
    setSlideIndex((prev) => (prev - 2 + images.length) % images.length);
  };

  const handleNext = () => {
    setSlideIndex((prev) => (prev + 2) % images.length);
  };

  const visibleImages = [
    images[slideIndex],
    images[(slideIndex + 1) % images.length],
  ];

  return (
    <>
      <div className="dual-image-gallery">
        <button className="nav-arrow left" onClick={handlePrev}>
          &#10094;
        </button>

        <div className="dual-image-wrapper">
          {visibleImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Gallery ${slideIndex + i + 1}`}
              className="dual-gallery-image"
              onClick={() => setSelectedIndex((slideIndex + i) % images.length)}
            />
          ))}
        </div>

        <button className="nav-arrow right" onClick={handleNext}>
          &#10095;
        </button>
      </div>

      {selectedIndex !== null && (
        <div className="image-viewer-backdrop" onClick={() => setSelectedIndex(null)}>
          <div className="image-viewer-content" onClick={(e) => e.stopPropagation()}>
            <button className="nav-arrow left" onClick={() =>
              setSelectedIndex((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
              )
            }>
              &#10094;
            </button>
            <img
              src={images[selectedIndex]}
              alt="Full View"
              className="image-viewer-image"
            />
            <button className="nav-arrow right" onClick={() =>
              setSelectedIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
              )
            }>
              &#10095;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;

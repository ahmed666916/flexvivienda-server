import React from 'react';
import './PropertyDetail.css';

const ImageGallery = ({ images }) => (
  <div className="image-gallery">
    {images.map((src, i) => (
      <img key={i} src={src} alt={`Gallery ${i + 1}`} className="gallery-image" />
    ))}
  </div>
);

export default ImageGallery;

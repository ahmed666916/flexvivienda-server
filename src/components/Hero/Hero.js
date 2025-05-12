// src/components/Hero/Hero.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import SearchBar from '../SearchBar/SearchBar';

const images = [
  '/Images/slider1.jpg',
  '/Images/slider2.jpg',
  '/Images/slider3.jpg',
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="overlay"></div> {/* Dark overlay */}
      <div className="hero-content">
        <h1>Missafir'le Evin Her Yerde</h1>
        <p>Birkaç gün, hafta veya ay boyunca kusursuzca düzenlenmiş bir mekanda konaklayın.</p>
        <Link to="/listing" className="explore-button">Explore Now</Link>
        <SearchBar />
      </div>
    </section>
  );
};

export default Hero;

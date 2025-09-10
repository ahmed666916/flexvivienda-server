// src/components/Hero/Hero.js
import React, { useEffect, useState } from "react";
import "./Hero.css";
import ReservationBar from "../SearchBar/ReservationBar";

const images = [
  "/Images/hero1.jpeg",
  "/Images/hero2.jpg",
  "/Images/hero3.jpg",
  "/Images/hero4.jpg",
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1>Your Property. Our Expertise. Maximized Returns</h1>
        <p>Flexible rental solutions — short, mid, or long term. Fully managed.</p>
      </div>

      {/* Reservation bar fixed at bottom of hero */}
      <div className="reservation-bar-wrapper">
        <ReservationBar />
      </div>
    </section>
  );
};

export default Hero;

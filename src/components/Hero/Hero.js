import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css'; // Create corresponding CSS for styling

const Hero = () => (
  <section className="hero">
    <h1>Missafir'le Evin Her Yerde</h1>
    <p>Birkaç gün, hafta veya ay boyunca kusursuzca düzenlenmiş bir mekanda konaklayın.</p>
    <Link to="/listing">Explore Now</Link>
  </section>
);

export default Hero;

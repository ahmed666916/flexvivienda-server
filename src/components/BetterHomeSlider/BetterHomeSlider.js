import React, { useState } from 'react';
import './BetterHomeSlider.css';

const slides = [
  {
    img: '/Images/gallery1.jpg',
    title: 'Extraordinary experiences unlocked',
    text: 'We elevate your stay with exclusive partner services — from meal kits and wine delivery to on-demand fitness and car rentals.',
    note: '*partner services vary by city',
    index: '1/3'
  },
  {
    img: '/Images/gallery2.jpg',
    title: 'Bespoke design',
    text: 'Each home is thoughtfully curated by a professional interior designer and features exclusive furniture selections.',
    index: '2/3'
  },
  {
    img: '/Images/gallery3.jpg',
    title: 'Everyday living, upgraded',
    text: 'Each space features high-speed Wi-Fi, smart home entertainment, kitchenware, and access to gyms or pools in select buildings.',
    index: '3/3'
  }
];

const BetterHomeSlider = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((current + 1) % slides.length);
  const prevSlide = () => setCurrent((current - 1 + slides.length) % slides.length);

  return (
    <section className="slider-section">
    
      <h2 className="heading">
  <span className="heading-black">Home,</span> <span className="heading-red">but better</span>
  </h2>

      <p className="heading-subtext">Where comfort meets smart living</p>

      <div className="slider">
        <button className="nav left" onClick={prevSlide}> &#10094;</button>
        <div
          className="slide"
          style={{ backgroundImage: `url(${slides[current].img})` }}
        >
          <div className="slide-text">
            <span>{slides[current].index}</span>
            <h3>{slides[current].title}</h3>
            <p>{slides[current].text}</p>
            {slides[current].note && <small>{slides[current].note}</small>}
          </div>
        </div>
        <button className="nav right" onClick={nextSlide}>  &#10095;</button>
      </div>
    </section>
  );
};

export default BetterHomeSlider;

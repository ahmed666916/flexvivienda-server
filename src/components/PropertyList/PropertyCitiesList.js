import React, { useEffect, useRef, useState } from 'react';
import './PropertyList.css';

const cities = [
  {
    id: 1,
    cityName: 'Istanbul',
    image: '/Images/istanbul.jpg',
    tagline: 'City of minarets & bridges'
  },
  {
    id: 2,
    cityName: 'Antalya',
    image: '/Images/antalya.jpg',
    tagline: 'Beach paradise of the south'
  },
  {
    id: 3,
    cityName: 'Izmir',
    image: '/Images/izmir.jpg',
    tagline: 'Seaside charm & coastal vibes'
  },
  {
    id: 4,
    cityName: 'Ankara',
    image: '/Images/ankara.jpg',
    tagline: 'Heart of the nation'
  },
  {
    id: 5,
    cityName: 'Bursa',
    image: '/Images/bursa.jpg',
    tagline: 'Ottoman roots and mountain breeze'
  }
];

const PropertyCitiesList = (props) => {
  const scrollRef = useRef();

  useEffect(() => {
    const el = scrollRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      el.classList.add('dragging');
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      el.classList.remove('dragging');
    };

    const handleMouseUp = () => {
      isDown = false;
      el.classList.remove('dragging');
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 2;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseup', handleMouseUp);
    el.addEventListener('mousemove', handleMouseMove);

    return () => {
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseup', handleMouseUp);
      el.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <br />
      <center><h2 className='heading'>{props.title}</h2></center>
      <br />
      
      <br />
      <div className="listing-container" ref={scrollRef}>
        {cities.map((city) => (
          <div key={city.id} className="property-card">
            <img src={city.image} alt={city.cityName} className="property-image" />
            <div className="property-details">
              <h2 className="property-title">{city.cityName}</h2>
              <p className="property-locations">{city.tagline}</p>
            </div>
          </div>
        ))}
      </div>
      <center><span className='links'><a href="/listing">See All Listings</a></span></center>
    </>
  );
};

export default PropertyCitiesList;

import React from 'react';
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
  return (
    <>
      <br />
      <center><h2 className='heading'>{props.title}</h2></center>
      <br />
      {props.tabs === "1" && (
        <div>
          <ul className="clusters">
            <li>Istanbul</li>
            <li>Ankara</li>
            <li>Izmir</li>
            <li>Antalya</li>
            <li>Bursa</li>
            <li>Adana</li>
            <li>Gaziantep</li>
            <li>Konya</li>
          </ul>
        </div>
      )}
      <br />
      <div className="listing-container">
        {cities.map((city) => (
          <div key={city.id} className="property-card">
            <img src={city.image} alt={city.cityName} className="property-image" />
            <div className="property-details">
              <h2 className="property-title">{city.cityName}</h2>
              <p className="property-location">{city.tagline}</p>
            </div>
          </div>
        ))}
      </div>
      <center><span className='links'><a href="/listing">See All Listings</a></span></center>
    </>
  );
};

export default PropertyCitiesList;

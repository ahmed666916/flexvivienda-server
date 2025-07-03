import React from 'react';
import './PropertyDetail.css';
import ImageGallery from './ImageGallery';
import BookingCard from './BookingCard';
import GoogleMap from './GoogleMap';
import GridGalleryViewer from './GridGalleryViewer';

const PropertyDetail = () => {
  const images = [
    '/Images/house1.jpg',
    '/Images/house2.jpg',
    '/Images/house3.jpg',
    '/Images/house4.jpg',
     '/Images/house1.jpg',
    '/Images/house2.jpg',
    '/Images/house3.jpg',
    '/Images/house4.jpg',
  ];

  return (
    <div className="property-detail-container">
      <br></br>
      <h1 className="property-title-detail">Charming House with Garden in Bodrum</h1>
      <p className="property-location">Muğla, Bodrum</p>

      <div className="property-detail-layout">
        <div className="left-section">
          <ImageGallery images={images} />


          <div className='row'>
            <div className='col-md-8'>

              <div className="property-description">
                <h2>Description</h2>
                <p>
                  Experience the charm of Bodrum in this beautiful garden house. Located within walking distance to the beach,
                  the home boasts a serene backyard, modern design, and all the amenities you need for a relaxing holiday.
                  Perfect for families or small groups seeking a mix of nature and comfort.
                </p>
              </div>

            <div className="property-amenities">
                
            <h2>Amenities</h2>
            <ul>
              <li>3 Bedrooms</li>
              <li>2 Bathrooms</li>
              <li>120 m²</li>
              <li>Walking distance to the beach</li>
              <li>Backyard</li>
              <li>Balcony</li>
            </ul>
              <ul>
                <li>Air Conditioning</li>
                <li>WiFi</li>
                <li>Washing Machine</li>
                <li>Free Parking</li>
                <li>Beach View</li>
              </ul>
              <ul>
                <li>Hangers</li>
              <li>Iron</li>
              <li>Smoke detector</li>
              <li>Washer/dryer in unit</li>
              <li>Elevator</li>
              </ul>
            </div>

            <div className="property-info">
          <h2>Things to Know</h2>
          <ul className="things-to-know-list">
            <li>
              <span className="icon">🕒</span>
              <span className="text">
                <strong>Move in after 2 PM</strong><br />
                <strong>Move out before 12 PM</strong>
              </span>
            </li>
            <li>
              <span className="icon">🚭</span>
              <span className="text">No smoking allowed</span>
            </li>
            <li>
              <span className="icon">🎉</span>
              <span className="text">No parties or events allowed</span>
            </li>
            <li>
              <span className="icon">🐾</span>
              <span className="text">No pets allowed</span>
            </li>
          </ul>
        </div>

        <div className="property-cancellation">
        <h2>Cancellation & Early Termination</h2>
        <ul>
          <li>
            <strong>If 30+ days</strong> before move-in, charge of 10% of the booking value (and any card processing fees are non-refundable).
          </li>
          <li>
            <strong>If less than 30 days</strong> before move-in, one month’s rent charge (and no service/booking or card processing fee refund).
          </li>
          <li>
            <a href="#">See our cancellation and early termination policies</a>
          </li>
          <li>
            Partners reserve the right to conduct secure ID and background checks. If a booking is canceled as a result of these checks, a full refund will be offered.
          </li>
        </ul>
      </div>

          <div className="property-neighborhood">
      <h2>About the Neighborhood</h2>
      <p>
        Located on Boğazkesen, the officially declared Cultural Street of Istanbul, this apartment connects Galataport to the famous Istiklal Street, offering shopping, vibrant nightlife, and the best of local cuisine. It’s a minute’s walk to the historic Orphelinat Saint-Joseph, 5 minutes to the antique district, and 10 minutes to either the Galata Tower or Taksim Square. Topkapı Palace, the Blue Mosque, Hagia Sophia, the Grand Bazaar, and other historic sites are only 15 minutes away by tram. For a Bosphorus tour or a visit to the Asian side, it’s just a 10-minute walk to the ferry port.
      </p>

      <div className="neighborhood-icons">
        <div><span role="img" aria-label="supermarkets">🛒</span><p>Supermarkets</p></div>
        <div><span role="img" aria-label="parking">🅿️</span><p>Parking lots</p></div>
        <div><span role="img" aria-label="gym">🏋️‍♂️</span><p>Gyms</p></div>
        <div><span role="img" aria-label="school">🏫</span><p>Schools/Universities</p></div>
        <div><span role="img" aria-label="restaurant">🍽️</span><p>Restaurants</p></div>
        <div><span role="img" aria-label="cafe">☕</span><p>Cafes</p></div>
        <div><span role="img" aria-label="bars">🍸</span><p>Bars</p></div>
        <div><span role="img" aria-label="shops">🛍️</span><p>Shops</p></div>
      </div>
    </div>




             <div className="property-amenities">
                  <h2>Images</h2>
              <GridGalleryViewer images={images} />
              
             </div>
            
            </div>

            <div className='col-md-4'>
               <div className="right-section">
                <BookingCard price={120} />
              </div>
            </div>
          </div>


        </div>

        <GoogleMap location="Muğla Bodrum" />
      </div>
    </div>
  );
};

export default PropertyDetail;

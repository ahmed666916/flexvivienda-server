import React from 'react';
import './PropertyDetail.css';
import ImageGallery from './ImageGallery';
import BookingCard from './BookingCard';
import GoogleMap from './GoogleMap';

const PropertyDetail = () => {
  const images = [
    '/images/house1.jpg',
    '/images/house2.jpg',
    '/images/house3.jpg',
    '/images/house4.jpg',
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

import React from 'react';
import ListingFilter from '../components/ListingFilter/ListingFilter';
import PropertyListing from '../components/PropertyList/PropertyList'

const Listings = () => {
  return (

        <>
            <ListingFilter />
            <PropertyListing />
        </>

  );
};

export default Listings;

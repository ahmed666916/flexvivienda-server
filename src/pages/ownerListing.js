import React from 'react';
import RentApplicationForm from '../components/ownerListing/RentApplicationForm'
import OurServices from '../components/ownerListing/OurServices'
import PerfectRentalExperience from '../components/ownerListing/PerfectRentalExperience'
import BecomeMissafirSteps from '../components/ownerListing/BecomeMissafirSteps'


const OwnerListing = () => {
  return (

        <>
        <RentApplicationForm />
        <OurServices />
        <PerfectRentalExperience />
        <BecomeMissafirSteps />
        </>

  );
};

export default OwnerListing;
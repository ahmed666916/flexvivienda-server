import React, {useRef } from 'react';
import RentApplicationForm from '../components/ownerListing/RentApplicationForm'
import OurServices from '../components/ownerListing/OurServices'
import PerfectRentalExperience from '../components/ownerListing/PerfectRentalExperience'
import BecomeMissafirSteps from '../components/ownerListing/BecomeMissafirSteps'
import HeroSection from '../components/ownerListing/HeroSection'
import ValueProposition from '../components/ownerListing/ValueProposition';
import ROICalculator from '../components/ownerListing/ROICalculator';
import Testimonials from '../components/ownerListing/Testimonials';
import TrustSignals from '../components/ownerListing/TrustSignals';
import FlexIntro from '../components/ownerListing/FlexIntro'
import SubscriptionPackage from '../components/ownerListing/SubscriptionPackage'
import Blog from '../components/blog/blog';


const OwnerListing = () => {
  const targetRef = useRef(null);
  return (

        <>
        <HeroSection scrollToRef={targetRef} />
        <FlexIntro />
        <ValueProposition  />
        {/* <ROICalculator  /> */}
        <PerfectRentalExperience />
        <BecomeMissafirSteps />
        <SubscriptionPackage />
        <Testimonials />
        <TrustSignals />
         <Blog />
        <RentApplicationForm ref={targetRef} />
        {/* <OurServices /> */}
        
        
        </>

  );
};

export default OwnerListing;
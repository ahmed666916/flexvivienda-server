import React from 'react';
import Hero from '../components/Hero/Hero';
import PropertyList from '../components/PropertyList/PropertyList';
import Testimonials from '../components/Testimonial/Testimonial';
import ExperienceSection from './components/ExperienceSection/ExperienceSection';


const Home = () => {
  return (

        <>
        <Hero />
        
        <PropertyList />
        <Testimonials />
        <Experience />

        </>

  );
};

export default Home;
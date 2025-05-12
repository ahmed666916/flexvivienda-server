import React from 'react';
import Hero from '../components/Hero/Hero';
import SearchBar from '../components/SearchBar/SearchBar';
import PropertyList from '../components/PropertyList/PropertyList';
import Testimonials from '../components/Testimonial/Testimonial';


const Home = () => {
  return (

        <>
        <Hero />
        <SearchBar />
        <PropertyList />
        <Testimonials />

        </>

  );
};

export default Home;
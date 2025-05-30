import React from 'react';
import Hero from '../components/Hero/Hero';
import SearchBar from '../components/SearchBar/SearchBar';
import PropertyList from '../components/PropertyList/PropertyList';
import Testimonials from '../components/Testimonial/Testimonial';
import Experience from '../components/Experience/Experience';
import Blog from '../components/blog/blog';



const Home = () => {
  return (

        <>
        <Hero />
        {/* <SearchBar /> */}
        <br></br>
        <PropertyList title="Featured Listings" tabs="0"/>
        <br></br>
        <PropertyList title="Perfect Locations" tabs="1"/>
         <Experience />
        <Testimonials />
        <Blog />


        </>

  );
};

export default Home;
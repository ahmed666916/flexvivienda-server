import React from 'react';
import PropertyList from '../components/PropertyList/PropertyList';
import Testimonials from '../components/Testimonial/Testimonial';
import FAQ from '../components/FAQ/FAQ';
import LifeTimeExperience from '../components/midstay/experience/LifestyleSection';
import Hero from '../components/midstay/hero/MidTermHero/StyledHero';
import { useTranslation } from 'react-i18next';

const MidStay = () => {
  const { t } = useTranslation();

  return (
    <>
      <Hero
        heading={t('MidheroMessage')}
        subheading={t('MidheroSubtitle')}
        description={t('MidheroDescription')}
      />
      <br />
      <PropertyList title="Midterm Stay Locations" tabs="0" maps="0" tags="0" short="0" />
      <LifeTimeExperience />
      <Testimonials />
      <FAQ />
    </>
  );
};

export default MidStay;

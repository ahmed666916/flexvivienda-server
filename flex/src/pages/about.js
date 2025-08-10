import React , { useEffect } from 'react';
import './about.css';
import Team from '../components/team/Team';

const About = () => {

    useEffect(() => {
    const sections = document.querySelectorAll('.about-section');

    const revealOnScroll = () => {
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight - 100;

        if (sectionTop < triggerPoint) {
          section.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // reveal on load

    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);

  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>

      {/* Section 1 */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2>Our Heritage</h2>
            <p>
              Central to Flex is the legacy of Flatix, a pioneering property management company that has long sought to redefine how real estate works in Istanbul. With a foundation of trust, innovation, and operational excellence, Flatix was founded to serve a new breed of property owners—those seeking a professional, transparent, and technology-driven solution to managing their holdings.
            </p>
          </div>
          <div className="about-image">
            <img src="/Images/heritage.jpg" alt="Our Heritage" />
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="about-section">
        <div className="about-content reverse">
          <div className="about-text">
            <h2>Opportunity Rises</h2>
            <p>
              With the evolution of Istanbul as a global hub for international professionals, remote workers, and foreign students, we saw a huge potential. There was a gap between short tourist stays and long-term rentals—a need for flexible, furnished, and commitment-free homes for residents staying 1 to 12 months.
            </p>
          </div>
          <div className="about-image">
            <img src="/Images/opportunity.jpg" alt="Opportunity Rises" />
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2>Flex Living</h2>
            <p>
              Flex is designed for the new renter: the tech professional, the exchange student, the traveling expat, or corporate teams. We offer stylishly furnished apartments in Istanbul’s most vibrant neighborhoods—all-inclusive of Wi-Fi, utilities, and local experiences. No paperwork, no hidden fees—just plug-and-live.
            </p>
          </div>
          <div className="about-image">
            <img src="/Images/flex-living.jpg" alt="Flex Living" />
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="about-section">
        <div className="about-content reverse">
          <div className="about-text">
            <h2>A Lifestyle Choice</h2>
            <p>
              But Flex is not just a convenience – it's a lifestyle. We believe that home is a sense of belonging. Every apartment is curated to be comfortable and efficient, and our platform allows guests to book, extend, and contact us seamlessly. Behind the scenes, our team ensures every visit meets Flatix’s trusted standards.
            </p>
          </div>
          <div className="about-image">
            <img src="/Images/lifestyle.jpg" alt="A Lifestyle Choice" />
          </div>
        </div>
      </section>

      {/* Section 5 */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2>Future of Living</h2>
            <p>
              Backed by Flatix’s real estate expertise, Flex is the best mid-term renting solution in Istanbul. As living becomes more mobile and experiential, Flex is where smart living meets modern hospitality. Whether it’s for a month or a year, Flex gives you freedom while we handle the rest.
            </p>
          </div>
          <div className="about-image">
            <img src="/Images/future-living.jpg" alt="Future of Living" />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <Team />
    </div>
  );
};

export default About;

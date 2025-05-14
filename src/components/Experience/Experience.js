import React from 'react';
import './ExperienceSection.css';

const cards = [
  {
    image: '/Images/experience1.jpg',
    title: 'Etkileyici Evler',
    description: 'Görsel estetiği ön planda tutan evlerimiz, sakinlik ve konfor sunan tasarımlarıyla yaşam alanınıza zarif bir dokunuş katar.'
  },
  {
    image: '/Images/experience2.jpg',
    title: 'Konforlu Konaklama',
    description: 'Tüm ihtiyaçlarınızı karşılayacak şekilde donatılmış evlerimiz, evinizin konforunu aratmayan bir deneyim sunar.'
  },
  {
    image: '/Images/experience3.jpg',
    title: 'Akıllı Ev Teknolojisi',
    description: 'Gelişmiş teknolojilerle donatılmış evlerimizle konforu ve güvenliği bir arada yaşayın.'
  }
];

const ExperienceSection = () => (
  <section className="experience-section">
    <div className="experience-header">
      <h2>Kişiselleştirilmiş Bir Ev Deneyimi</h2>
      <p>Sizin için en uygun evi bulmanıza yardımcı oluyoruz.</p>
    </div>
    <div className="experience-cards">
      {cards.map((card, index) => (
        <div className="experience-card" key={index}>
          <img src={card.image} alt={card.title} />
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ExperienceSection;

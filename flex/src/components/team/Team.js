import React, { useRef, useEffect } from 'react';
import './Team.css';

const teamMembers = [
  {
    id: 1,
    name: 'Osman Hulusi Takci',
    position: 'General Manager',
    image: '/Images/osman.JPG',
  },
  {
    id: 2,
    name: 'Fikret Bildik',
    position: 'Housing Operation Manager',
    image: '/Images/fikret.JPG',
  },
  {
    id: 3,
    name: 'Sude Ceylan',
    position: 'Operations Team Leader',
    image: '/Images/sudeceylan.jpeg',
  },
  {
    id: 4,
    name: 'Arez Odabasi',
    position: 'Account Manager',
    image: '/Images/arez.JPG',
  },
  {
    id: 5,
    name: 'Abdullah Mücahitoğlu',
    position: 'Supply Chain Manager',
    image: '/Images/abdullah.JPG',
  },
  
  {
    id: 6,
    name: 'Taha Gondal',
    position: 'Data Analyst',
    image: '/Images/taha.JPG',
  },
  {
    id: 7,
    name: 'Turkan Kırmaz',
    position: 'Content Creator',
    image: '/Images/turkankirmaz.jpeg',
  },
  
];

const Team = () => {
  const scrollRef = useRef();

  useEffect(() => {
    const el = scrollRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      el.classList.add('dragging');
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      el.classList.remove('dragging');
    };

    const handleMouseUp = () => {
      isDown = false;
      el.classList.remove('dragging');
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 2;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseup', handleMouseUp);
    el.addEventListener('mousemove', handleMouseMove);

    return () => {
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseup', handleMouseUp);
      el.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <center><h2 className="team-section-title">Meet Our Team</h2></center>
      <div className="team-container" ref={scrollRef}>
        {teamMembers.map((member) => (
          <div key={member.id} className="team-card">
            <img src={member.image} alt={member.name} className="team-image" />
            <div className="team-content">
              <h3 className="team-name">{member.name}</h3>
              <p className="team-position">{member.position}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Team;

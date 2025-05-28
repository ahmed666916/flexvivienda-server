import React from 'react';
import './BlogDetail.css';

const BlogDetail = () => {
  const blog = {
    title: "Exploring Istanbul's Hidden Gems",
    date: "May 15, 2025",
    image: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?fit=crop&w=1200&q=80",
    content: `
      Istanbul is a city layered with history and bursting with culture. While iconic landmarks like the Hagia Sophia and Blue Mosque are essential, there's a quieter side waiting to be explored.

      Wander through the hidden alleyways of Balat, sip Turkish tea on rooftops that overlook the Bosphorus, and get lost in the endless corridors of local bazaars.

      From century-old bookstores to tucked-away art galleries, this city never stops revealing new surprises. Let’s uncover some of its most enchanting hidden gems together.
    `
  };

  return (
    <div className="blog-detail">
      <img src={blog.image} alt={blog.title} className="blog-detail-image" />
      <div className="blog-detail-content">
        <h1 className="blog-detail-title">{blog.title}</h1>
        <p className="blog-detail-date">{blog.date}</p>
        <p className="blog-detail-text">{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogDetail;

import React from 'react';
import './blogPagePosts.css';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: "Exploring Istanbul's Hidden Gems",
    date: "May 15, 2025",
    excerpt: "Discover secret rooftops, local bazaars, and cozy tea houses tucked away in the alleys of Istanbul.",
    image: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Modern Interiors for Turkish Homes",
    date: "April 28, 2025",
    excerpt: "Blending tradition with modern design trends in Turkey’s vibrant residential spaces.",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Best Cafés to Work Remotely in Kadıköy",
    date: "March 20, 2025",
    excerpt: "From riverside views to cozy corners, these cafés offer perfect work vibes and great coffee.",
    image: "Images/exp_1.jpeg"
  }
];

const BlogPagePosts = () => {
  return (
    <div className="blog-page">
      <h1 className="blog-page-title">Blogs</h1>
      <div className="blog-row-container">
        {blogPosts.map(post => (
          <Link to="/blog-detail"><div className="blog-card" key={post.id}>
            <img src={post.image} alt={post.title} className="blog-image" />
            <h2 className="blog-title">{post.title}</h2>
            <p className="blog-excerpt">{post.excerpt}</p>
            <p className="blog-date">{post.date}</p>
          </div></Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPagePosts;

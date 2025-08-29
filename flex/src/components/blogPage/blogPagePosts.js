import React, { useEffect, useState } from 'react';
import './blogPagePosts.css';
import { Link } from 'react-router-dom';

const BlogPagePosts = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/blogs")
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading blogs...</p>;

  return (
    <div className="blog-page">
      <h1 className="blog-page-title">Blogs</h1>
      <div className="blog-row-container">
        {blogs.map(post => (
          <Link to={`/blog-detail/${post.id}`} key={post.id}>
            <div className="blog-card">
              {post.image && (
                <img src={post.image} alt={post.title} className="blog-image" />
              )}
              <h2 className="blog-title">{post.title}</h2>
              <p className="blog-excerpt">{post.excerpt}</p>
              <p className="blog-date">{post.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPagePosts;

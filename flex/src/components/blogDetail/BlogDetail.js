import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/blogs/${id}`)
      .then(res => res.json())
      .then(data => {
        setBlog(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching blog:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading blog...</p>;
  if (!blog) return <p>Blog not found</p>;

  return (
    <div className="blog-detail">
      {blog.image && (
        <img src={blog.image} alt={blog.title} className="blog-detail-image" />
      )}
      <div className="blog-detail-content">
        <h1 className="blog-detail-title">{blog.title}</h1>
        <p className="blog-detail-date">{blog.date}</p>
        {/* render HTML body safely */}
        <div
          className="blog-detail-text"
          dangerouslySetInnerHTML={{ __html: blog.body }}
        />
      </div>
    </div>
  );
};

export default BlogDetail;

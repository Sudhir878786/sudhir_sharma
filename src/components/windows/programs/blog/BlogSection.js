import React, { useState } from 'react';
import blogsData from '../welcome/blogsData';
import './blog.css';

const BlogSection = () => {
  const [activeCategory, setActiveCategory] = useState('*');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['*', 'Backend Engineering', 'Big Data', 'AI & ML', 'Search & AI', 'Frontend Engineering', 'Data Engineering'];

  const filteredBlogs = blogsData.filter(blog => {
    const matchesCategory = activeCategory === '*' || blog.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="blog-section section" id="blog">
      <div className="container">
        <div className="section-header">
          <h3 className="title" data-title="Technical Insights">Professional Blog</h3>
          <p className="text">
            Deep dives into software engineering, data systems, and AI—lessons learned from building production systems.
          </p>
        </div>

        <div className="blog-controls">
          {/* Search Bar */}
          <div className="blog-search">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Search articles by title, topic, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Category Filter */}
          <div className="blog-filter">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category === '*' ? 'All Articles' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="blog-grid">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map(blog => (
              <article key={blog.id} className="blog-card" data-category={blog.category}>
                <div className="blog-card-image">
                  <img src={blog.coverImage} alt={blog.title} />
                  <div className="blog-card-overlay">
                    <span className="blog-category">{blog.category}</span>
                  </div>
                </div>
                
                <div className="blog-card-content">
                  <div className="blog-meta">
                    <span className="blog-date">
                      <i className="far fa-calendar"></i> {blog.date}
                    </span>
                    <span className="blog-read-time">
                      <i className="far fa-clock"></i> {blog.readTime}
                    </span>
                  </div>
                  
                  <h3 className="blog-title">{blog.title}</h3>
                  
                  <p className="blog-excerpt">{blog.excerpt}</p>
                  
                  <div className="blog-tags">
                    {blog.tags.map((tag, index) => (
                      <span key={index} className="blog-tag">#{tag}</span>
                    ))}
                  </div>
                  
                  <a 
                    href={`#blog-post-${blog.slug}`} 
                    className="blog-read-more"
                    onClick={(e) => {
                      e.preventDefault();
                      // Open blog post in modal or navigate
                      const event = new CustomEvent('openBlogPost', { detail: blog });
                      window.dispatchEvent(event);
                    }}
                  >
                    Read Article <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </article>
            ))
          ) : (
            <div className="no-results">
              <i className="fas fa-search"></i>
              <p>No articles found matching your criteria.</p>
              <button 
                className="btn"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('*');
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="blog-stats">
          <div className="stat-card">
            <i className="fas fa-newspaper"></i>
            <h4>{blogsData.length}</h4>
            <p>Articles Published</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-tags"></i>
            <h4>{new Set(blogsData.flatMap(b => b.tags)).size}</h4>
            <p>Topics Covered</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-layer-group"></i>
            <h4>{categories.length - 1}</h4>
            <p>Categories</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

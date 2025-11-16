import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './blog.css';

const BlogPost = ({ blog, onClose }) => {
  const [showTOC, setShowTOC] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Extract headings for table of contents
  const extractHeadings = (content) => {
    const headingRegex = /^#{2,3}\s+(.+)$/gm;
    const headings = [];
    let match;
    
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[0].split('#').length - 2;
      const text = match[1].trim();
      const id = text.toLowerCase().replace(/[^\w]+/g, '-');
      headings.push({ level, text, id });
    }
    
    return headings;
  };

  const headings = extractHeadings(blog.content);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  return (
    <div className="blog-post-modal" onClick={onClose}>
      <div className="blog-post-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="blog-post-header">
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
          
          <div className="blog-post-meta-header">
            <span className="blog-category-badge">{blog.category}</span>
            <h1 className="blog-post-title">{blog.title}</h1>
            
            <div className="blog-post-info">
              <span className="info-item">
                <i className="far fa-calendar"></i> {blog.date}
              </span>
              <span className="info-item">
                <i className="far fa-clock"></i> {blog.readTime}
              </span>
              <span className="info-item">
                <i className="fas fa-user"></i> Sudhir Sharma
              </span>
            </div>
            
            <div className="blog-post-tags">
              {blog.tags.map((tag, index) => (
                <span key={index} className="post-tag">#{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* TOC Toggle */}
        <button 
          className="toc-toggle"
          onClick={() => setShowTOC(!showTOC)}
        >
          <i className="fas fa-list"></i> Table of Contents
        </button>

        {/* Table of Contents */}
        {showTOC && (
          <div className="table-of-contents">
            <h3>Contents</h3>
            <ul>
              {headings.map((heading, index) => (
                <li 
                  key={index} 
                  className={`toc-item level-${heading.level} ${activeSection === heading.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(heading.id)}
                >
                  {heading.text}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Content */}
        <div className="blog-post-content">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              h2({ node, children, ...props }) {
                const text = children.toString();
                const id = text.toLowerCase().replace(/[^\w]+/g, '-');
                return <h2 id={id} {...props}>{children}</h2>;
              },
              h3({ node, children, ...props }) {
                const text = children.toString();
                const id = text.toLowerCase().replace(/[^\w]+/g, '-');
                return <h3 id={id} {...props}>{children}</h3>;
              },
              table({ node, children, ...props }) {
                return (
                  <div className="table-wrapper">
                    <table {...props}>{children}</table>
                  </div>
                );
              }
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <div className="blog-post-footer">
          <div className="share-section">
            <h4>Share this article</h4>
            <div className="share-buttons">
              <button className="share-btn twitter">
                <i className="fab fa-twitter"></i> Twitter
              </button>
              <button className="share-btn linkedin">
                <i className="fab fa-linkedin"></i> LinkedIn
              </button>
              <button className="share-btn copy-link">
                <i className="fas fa-link"></i> Copy Link
              </button>
            </div>
          </div>
          
          <div className="author-section">
            <img src={require("../welcome/img/shapes/me.png")} alt="Sudhir Sharma" className="author-avatar" />
            <div className="author-info">
              <h4>Sudhir Sharma</h4>
              <p>Software Development Engineer specializing in scalable systems, data pipelines, and AI integration. Passionate about sharing knowledge through technical writing.</p>
              <div className="author-social">
                <a href="https://github.com/Sudhir878786" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/sudhirsharma87/" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://x.com/SUDHIRSHAR61219" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;

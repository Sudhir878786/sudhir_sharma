import React from 'react';
import styled, { keyframes } from 'styled-components';
import ReactMarkdown from 'react-markdown';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100000;
  animation: ${fadeIn} 0.3s ease-out;
  padding: 20px;
  box-sizing: border-box;
`;

const ModalContent = styled.div`
  background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%);
  border-radius: 12px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: ${slideUp} 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(78, 201, 176, 0.2);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.8),
    0 0 0 1px rgba(78, 201, 176, 0.1);

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(78, 201, 176, 0.5);
    border-radius: 4px;

    &:hover {
      background: rgba(78, 201, 176, 0.7);
    }
  }
`;

const CloseButton = styled.button`
  position: sticky;
  top: 20px;
  right: 20px;
  float: right;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: #ffffff;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(78, 201, 176, 0.3);
    border-color: rgba(78, 201, 176, 0.6);
    transform: scale(1.1);
  }
`;

const BlogHeader = styled.div`
  padding: 60px 60px 40px;
  border-bottom: 1px solid rgba(78, 201, 176, 0.1);

  @media (max-width: 768px) {
    padding: 40px 30px 30px;
  }
`;

const Category = styled.div`
  display: inline-block;
  padding: 8px 16px;
  background: rgba(86, 156, 214, 0.2);
  border: 1px solid rgba(86, 156, 214, 0.4);
  border-radius: 6px;
  color: #569cd6;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 20px;
  font-family: 'Segoe UI', sans-serif;
`;

const Title = styled.h1`
  font-size: clamp(28px, 5vw, 42px);
  font-weight: 900;
  color: #ffffff;
  margin: 0 0 20px 0;
  font-family: 'Segoe UI', sans-serif;
  line-height: 1.2;
  background: linear-gradient(135deg, #ffffff 0%, #4ec9b0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Meta = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const MetaItem = styled.span`
  font-size: 14px;
  color: rgba(220, 220, 170, 0.9);
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;

  i {
    color: #4ec9b0;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
`;

const Tag = styled.span`
  padding: 4px 12px;
  background: rgba(78, 201, 176, 0.15);
  border: 1px solid rgba(78, 201, 176, 0.3);
  border-radius: 4px;
  font-size: 11px;
  color: #4ec9b0;
  font-weight: 600;
  font-family: 'Segoe UI', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const BlogBody = styled.div`
  padding: 40px 60px 60px;
  color: rgba(255, 255, 255, 0.9);
  font-family: 'Segoe UI', sans-serif;
  font-size: 16px;
  line-height: 1.8;

  @media (max-width: 768px) {
    padding: 30px 30px 40px;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #ffffff;
    font-weight: 700;
    margin: 40px 0 20px 0;
    line-height: 1.3;
  }

  h1 { font-size: 32px; }
  h2 { 
    font-size: 28px; 
    color: #4ec9b0;
    border-bottom: 2px solid rgba(78, 201, 176, 0.2);
    padding-bottom: 10px;
  }
  h3 { font-size: 24px; }
  h4 { font-size: 20px; }

  p {
    margin: 20px 0;
  }

  strong {
    color: #4ec9b0;
    font-weight: 700;
  }

  em {
    color: #dcdcaa;
  }

  a {
    color: #569cd6;
    text-decoration: none;
    border-bottom: 1px solid rgba(86, 156, 214, 0.3);
    transition: all 0.3s ease;

    &:hover {
      color: #4ec9b0;
      border-bottom-color: rgba(78, 201, 176, 0.6);
    }
  }

  ul, ol {
    margin: 20px 0;
    padding-left: 30px;
  }

  li {
    margin: 10px 0;
    color: rgba(255, 255, 255, 0.85);
  }

  code {
    background: rgba(78, 201, 176, 0.1);
    color: #4ec9b0;
    padding: 2px 8px;
    border-radius: 4px;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 14px;
    border: 1px solid rgba(78, 201, 176, 0.2);
  }

  pre {
    background: #0d1117;
    border: 1px solid rgba(78, 201, 176, 0.2);
    border-radius: 8px;
    padding: 20px;
    overflow-x: auto;
    margin: 30px 0;

    code {
      background: transparent;
      border: none;
      padding: 0;
      color: #c9d1d9;
      font-size: 14px;
      line-height: 1.6;
    }
  }

  blockquote {
    border-left: 4px solid #4ec9b0;
    padding-left: 20px;
    margin: 30px 0;
    color: rgba(255, 255, 255, 0.7);
    font-style: italic;
    background: rgba(78, 201, 176, 0.05);
    padding: 20px;
    border-radius: 0 8px 8px 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 30px 0;
    border: 1px solid rgba(78, 201, 176, 0.2);
    border-radius: 8px;
    overflow: hidden;
  }

  th {
    background: rgba(78, 201, 176, 0.2);
    color: #4ec9b0;
    font-weight: 700;
    padding: 12px;
    text-align: left;
    border-bottom: 2px solid rgba(78, 201, 176, 0.4);
  }

  td {
    padding: 12px;
    border-bottom: 1px solid rgba(78, 201, 176, 0.1);
  }

  tr:hover {
    background: rgba(78, 201, 176, 0.05);
  }

  img {
    max-width: 100%;
    border-radius: 8px;
    margin: 30px 0;
    border: 1px solid rgba(78, 201, 176, 0.2);
  }

  hr {
    border: none;
    border-top: 1px solid rgba(78, 201, 176, 0.2);
    margin: 40px 0;
  }
`;

const BlogModal = ({ blog, onClose }) => {
  if (!blog) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        
        <BlogHeader>
          <Category>{blog.category}</Category>
          <Title>{blog.title}</Title>
          <Meta>
            <MetaItem>
              <i className="far fa-calendar"></i>
              {blog.date}
            </MetaItem>
            <MetaItem>
              <i className="far fa-clock"></i>
              {blog.readTime}
            </MetaItem>
          </Meta>
          <Tags>
            {blog.tags.map((tag, i) => (
              <Tag key={i}>#{tag}</Tag>
            ))}
          </Tags>
        </BlogHeader>

        <BlogBody>
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </BlogBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default BlogModal;

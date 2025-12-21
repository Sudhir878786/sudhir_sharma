import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import blogsData from '../windows/programs/welcome/blogsData';
import BlogModal from '../BlogModal';

// ========== CINEMATIC ANIMATIONS ==========
const trailerFadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
    filter: brightness(0.3);
  }
  to {
    opacity: 1;
    transform: scale(1);
    filter: brightness(1);
  }
`;

const lightSweep = keyframes`
  0% {
    transform: translateX(-200%) skewX(-15deg);
  }
  100% {
    transform: translateX(200%) skewX(-15deg);
  }
`;

const fogDrift = keyframes`
  0%, 100% {
    transform: translateX(0) translateY(0);
    opacity: 0.4;
  }
  50% {
    transform: translateX(30px) translateY(-20px);
    opacity: 0.6;
  }
`;

const posterReveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
    filter: blur(10px) brightness(0.5);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0) brightness(1);
  }
`;

const titleDramatic = keyframes`
  from {
    opacity: 0;
    transform: scale(1.3);
    filter: blur(8px);
    letter-spacing: 0.3em;
  }
  to {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
    letter-spacing: 0.15em;
  }
`;

const glowPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(78, 201, 176, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(78, 201, 176, 0.6);
  }
`;

const particleFloat = keyframes`
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-120px) translateX(20px) rotate(180deg);
    opacity: 0;
  }
`;

// ========== MAIN CONTAINER ==========
const CinematicContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: transparent; /* Changed from #0a0a0a to transparent */
  position: relative;
  overflow: hidden;
  padding: 80px 40px;
  box-sizing: border-box;
  animation: ${trailerFadeIn} 1.5s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

// ========== ATMOSPHERIC EFFECTS ==========
const FogLayer = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(86, 156, 214, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(60px);
  pointer-events: none;
  animation: ${fogDrift} ${props => props.duration || '40s'} ease-in-out infinite;
  top: ${props => props.top || '20%'};
  left: ${props => props.left || '10%'};
  z-index: 0;
`;

const LightRay = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100px) scaleY(0.5);
  }
  50% {
    opacity: 0.3;
    transform: translateX(0) scaleY(1);
  }
  100% {
    opacity: 0;
    transform: translateX(100px) scaleY(0.5);
  }
`;

const VolumetricLight = styled.div`
  position: absolute;
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, 
    transparent 0%, 
    rgba(78, 201, 176, 0.15) 30%, 
    rgba(86, 156, 214, 0.15) 70%, 
    transparent 100%
  );
  filter: blur(2px);
  animation: ${LightRay} ${props => props.duration || '25s'} ease-in-out infinite;
  left: ${props => props.left || '30%'};
  z-index: 0;
  pointer-events: none;
`;

// ========== SECTION HEADER ==========
const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
  position: relative;
  z-index: 2;
`;

const MainTitle = styled.h1`
  font-size: clamp(48px, 8vw, 120px);
  font-weight: 900;
  color: transparent;
  background: linear-gradient(135deg, #ffffff 0%, #4ec9b0 50%, #569cd6 100%);
  background-clip: text;
  -webkit-background-clip: text;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin: 0 0 20px 0;
  font-family: 'Segoe UI', sans-serif;
  animation: ${titleDramatic} 2s cubic-bezier(0.16, 1, 0.3, 1);
  text-shadow: 
    0 0 40px rgba(78, 201, 176, 0.5),
    0 0 80px rgba(86, 156, 214, 0.3);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    animation: ${lightSweep} 3s ease-in-out 0.5s;
  }
`;

const Subtitle = styled.p`
  font-size: clamp(16px, 2vw, 24px);
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.3em;
  text-transform: uppercase;
  font-weight: 300;
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
`;

// ========== FILTER CONTROLS ==========
const FilterControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-bottom: 60px;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const FilterButton = styled.button`
  padding: 12px 28px;
  background: ${props => props.$active 
    ? 'linear-gradient(135deg, rgba(78, 201, 176, 0.3), rgba(86, 156, 214, 0.3))' 
    : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${props => props.$active 
    ? 'rgba(78, 201, 176, 0.6)' 
    : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 8px;
  color: ${props => props.$active ? '#4ec9b0' : 'rgba(255, 255, 255, 0.7)'};
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  font-family: 'Segoe UI', sans-serif;
  backdrop-filter: blur(10px);

  &:hover {
    background: linear-gradient(135deg, rgba(78, 201, 176, 0.2), rgba(86, 156, 214, 0.2));
    border-color: rgba(78, 201, 176, 0.5);
    color: #4ec9b0;
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(78, 201, 176, 0.3);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 11px;
  }
`;

// ========== BLOG GRID ==========
const BlogsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 50px;
  max-width: 1600px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 40px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  @media (max-width: 480px) {
    gap: 30px;
  }
`;

// ========== BLOG POSTER CARD ==========
const PosterCard = styled.div`
  position: relative;
  aspect-ratio: 2/3;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  animation: ${posterReveal} 1.2s cubic-bezier(0.16, 1, 0.3, 1) backwards;
  animation-delay: ${props => props.delay || '0s'};
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  transform-style: preserve-3d;
  will-change: transform;
  
  @media (max-width: 768px) {
    aspect-ratio: 16/9;
    border-radius: 6px;
  }
  
  @media (max-width: 480px) {
    aspect-ratio: 4/3;
    border-radius: 4px;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    z-index: 10;

    img {
      transform: scale(1.1);
      filter: brightness(1.1) contrast(1.05);
    }

    &::before {
      opacity: 0.9;
    }

    &::after {
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    &:hover {
      transform: scale(1.02) translateY(-5px);
    }
  }

  /* Vignette */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.8) 100%);
    z-index: 1;
    opacity: 0.6;
    transition: opacity 0.6s ease;
    pointer-events: none;
  }

  /* Light sweep on hover */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    z-index: 3;
    opacity: 0;
    animation: ${lightSweep} 1.5s ease;
    pointer-events: none;
  }

  &:hover::after {
    animation: ${lightSweep} 1.5s ease;
  }
`;

const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  filter: brightness(0.8) contrast(1.05);
`;

const PosterOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.7) 40%,
    transparent 70%
  );
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  box-sizing: border-box;
  overflow-y: auto;
  max-height: 100%;
  
  @media (max-width: 768px) {
    padding: 20px;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.98) 0%,
      rgba(0, 0, 0, 0.8) 50%,
      transparent 80%
    );
  }
  
  @media (max-width: 480px) {
    padding: 15px;
  }
  
  &::-webkit-scrollbar {
    width: 3px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(78, 201, 176, 0.5);
    border-radius: 2px;
  }
`;

const CategoryBadge = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  background: rgba(86, 156, 214, 0.9);
  border-radius: 6px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #ffffff;
  z-index: 4;
  font-family: 'Segoe UI', sans-serif;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    top: 15px;
    right: 15px;
    padding: 6px 12px;
    font-size: 9px;
  }
  
  @media (max-width: 480px) {
    top: 10px;
    right: 10px;
    padding: 5px 10px;
    font-size: 8px;
  }
  
  ${PosterCard}:hover & {
    transform: scale(1.1);
    background: rgba(78, 201, 176, 0.9);
  }
`;

const PosterTitle = styled.h2`
  font-size: clamp(20px, 2.5vw, 32px);
  font-weight: 900;
  color: #ffffff;
  margin: 0 0 8px 0;
  font-family: 'Segoe UI', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 
    0 0 20px rgba(78, 201, 176, 0.8),
    0 2px 10px rgba(0, 0, 0, 0.9);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  line-height: 1.2;
  
  ${PosterCard}:hover & {
    transform: scale(1.05);
    text-shadow: 
      0 0 30px rgba(78, 201, 176, 1),
      0 0 60px rgba(86, 156, 214, 0.8),
      0 2px 10px rgba(0, 0, 0, 0.9);
  }
`;

const BlogMeta = styled.div`
  display: flex;
  gap: 15px;
  margin: 8px 0 12px 0;
  flex-wrap: wrap;
`;

const MetaItem = styled.span`
  font-size: clamp(10px, 1vw, 12px);
  color: rgba(220, 220, 170, 0.9);
  font-family: 'Segoe UI', sans-serif;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 5px;
  opacity: 0.8;
  transition: all 0.4s ease;
  
  ${PosterCard}:hover & {
    opacity: 1;
  }
`;

const PosterDescription = styled.p`
  font-size: clamp(11px, 1vw, 13px);
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  margin: 0 0 12px 0;
  font-family: 'Segoe UI', sans-serif;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
  
  @media (max-width: 768px) {
    opacity: 1;
    transform: translateY(0);
    font-size: 12px;
    line-height: 1.5;
  }
  
  @media (max-width: 480px) {
    font-size: 11px;
    margin-bottom: 10px;
  }
  
  ${PosterCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
  
  @media (max-width: 768px) {
    opacity: 1;
    transform: translateY(0);
    gap: 5px;
    margin-bottom: 10px;
  }
  
  @media (max-width: 480px) {
    gap: 4px;
    margin-bottom: 8px;
  }
  
  ${PosterCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Tag = styled.span`
  padding: 3px 10px;
  background: rgba(78, 201, 176, 0.2);
  border: 1px solid rgba(78, 201, 176, 0.4);
  border-radius: 4px;
  font-size: 10px;
  color: #4ec9b0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: 'Segoe UI', sans-serif;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 3px 8px;
    font-size: 9px;
  }
  
  @media (max-width: 480px) {
    padding: 2px 6px;
    font-size: 8px;
  }
  
  &:hover {
    background: rgba(78, 201, 176, 0.3);
    border-color: rgba(78, 201, 176, 0.6);
    transform: translateY(-2px);
  }
`;

const GlowingEdge = styled.div`
  position: absolute;
  inset: 0;
  border: 2px solid transparent;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(78, 201, 176, 0.5), rgba(86, 156, 214, 0.5)) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: 4;
  pointer-events: none;
  animation: ${glowPulse} 2s ease-in-out infinite;
  
  ${PosterCard}:hover & {
    opacity: 1;
  }
`;

const ParticleContainer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 5;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.5s ease;
  
  ${PosterCard}:hover & {
    opacity: 1;
  }
`;

const Particle = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: ${props => props.color || '#4ec9b0'};
  border-radius: 50%;
  animation: ${particleFloat} ${props => props.duration || '4s'} ease-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  bottom: ${props => props.bottom || '20%'};
  left: ${props => props.left || '50%'};
  box-shadow: 0 0 10px ${props => props.color || '#4ec9b0'};
`;

const NoResults = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 80px 20px;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Segoe UI', sans-serif;

  i {
    font-size: 64px;
    margin-bottom: 20px;
    opacity: 0.3;
  }

  p {
    font-size: 20px;
    margin: 20px 0;
  }

  button {
    margin-top: 20px;
    padding: 12px 30px;
    background: linear-gradient(135deg, rgba(78, 201, 176, 0.3), rgba(86, 156, 214, 0.3));
    border: 1px solid rgba(78, 201, 176, 0.6);
    border-radius: 8px;
    color: #4ec9b0;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 25px rgba(78, 201, 176, 0.4);
    }
  }
`;

// ========== HELPER FUNCTIONS ==========
const generateParticles = () => {
  const particles = [];
  const colors = ['#4ec9b0', '#569cd6', '#dcdcaa', '#ffffff'];
  
  for (let i = 0; i < 12; i++) {
    particles.push(
      <Particle
        key={i}
        color={colors[Math.floor(Math.random() * colors.length)]}
        duration={`${3 + Math.random() * 3}s`}
        delay={`${Math.random() * 2}s`}
        bottom={`${20 + Math.random() * 60}%`}
        left={`${10 + Math.random() * 80}%`}
      />
    );
  }
  
  return particles;
};

// ========== BLOG CARD COMPONENT ==========
const BlogCard = ({ blog, index, onBlogClick }) => {
  return (
    <PosterCard
      delay={`${index * 0.15}s`}
      onClick={() => onBlogClick(blog)}
    >
      <PosterImage src={blog.coverImage} alt={blog.title} />
      <CategoryBadge>{blog.category}</CategoryBadge>
      <GlowingEdge />
      <ParticleContainer>
        {generateParticles()}
      </ParticleContainer>
      <PosterOverlay>
        <PosterTitle>{blog.title}</PosterTitle>
        <BlogMeta>
          <MetaItem>
            <i className="far fa-calendar"></i> {blog.date}
          </MetaItem>
          <MetaItem>
            <i className="far fa-clock"></i> {blog.readTime}
          </MetaItem>
        </BlogMeta>
        <PosterDescription>{blog.excerpt}</PosterDescription>
        
        {/* Tags */}
        <TagsContainer>
          {blog.tags.map((tag, i) => (
            <Tag key={i}>#{tag}</Tag>
          ))}
        </TagsContainer>
      </PosterOverlay>
    </PosterCard>
  );
};

// ========== MAIN COMPONENT ==========
const CinematicBlog = () => {
  const [activeCategory, setActiveCategory] = useState('*');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const categories = ['*', 'Backend Engineering', 'Big Data', 'AI & ML', 'Search & AI', 'Frontend Engineering', 'Data Engineering'];

  const filteredBlogs = blogsData.filter(blog => {
    const matchesCategory = activeCategory === '*' || blog.category === activeCategory;
    return matchesCategory;
  });

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

  const handleCloseModal = () => {
    setSelectedBlog(null);
  };

  return (
    <>
      <CinematicContainer>
        {/* Atmospheric Effects */}
        <FogLayer top="10%" left="5%" duration="35s" />
        <FogLayer top="60%" left="70%" duration="45s" />
        <FogLayer top="40%" left="40%" duration="40s" />
        
        <VolumetricLight left="20%" duration="20s" />
        <VolumetricLight left="60%" duration="28s" />
        <VolumetricLight left="80%" duration="24s" />
        
        {/* Section Header */}
        <SectionHeader>
          <MainTitle>TECHNICAL INSIGHTS</MainTitle>
          <Subtitle>Professional Blog</Subtitle>
        </SectionHeader>
        
        {/* Category Filters */}
        <FilterControls>
          {categories.map(category => (
            <FilterButton
              key={category}
              $active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category === '*' ? 'All Articles' : category}
            </FilterButton>
          ))}
        </FilterControls>
        
        {/* Blogs Grid */}
        <BlogsGrid>
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, index) => (
              <BlogCard 
                key={blog.id} 
                blog={blog} 
                index={index}
                onBlogClick={handleBlogClick}
              />
            ))
          ) : (
            <NoResults>
              <i className="fas fa-search"></i>
              <p>No articles found matching your criteria.</p>
              <button onClick={() => setActiveCategory('*')}>
                Clear Filters
              </button>
            </NoResults>
          )}
        </BlogsGrid>
      </CinematicContainer>

      {/* Blog Modal */}
      {selectedBlog && (
        <BlogModal blog={selectedBlog} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default CinematicBlog;

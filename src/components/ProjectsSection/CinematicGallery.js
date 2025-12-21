import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Epic cinematic animations
const trailerReveal = keyframes`
  0% { 
    transform: scale(1.5) translateZ(0);
    opacity: 0;
    filter: brightness(0);
  }
  40% {
    filter: brightness(0.5);
  }
  100% { 
    transform: scale(1) translateZ(0);
    opacity: 1;
    filter: brightness(1);
  }
`;

const dramaticZoomIn = keyframes`
  0% {
    transform: scale(0.7) translateY(50px);
    opacity: 0;
    letter-spacing: 0.3em;
    filter: blur(10px);
  }
  60% {
    transform: scale(1.08) translateY(-5px);
    opacity: 1;
    filter: blur(0px);
  }
  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
    letter-spacing: 0.15em;
    filter: blur(0px);
  }
`;

const posterTilt3D = keyframes`
  0% { transform: perspective(1000px) rotateY(0deg) rotateX(0deg); }
  100% { transform: perspective(1000px) rotateY(var(--rotate-y, 0deg)) rotateX(var(--rotate-x, 0deg)); }
`;

const spotlightSweep = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const lensFlare = keyframes`
  0% {
    transform: translateX(-300%) rotate(45deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(300%) rotate(45deg);
    opacity: 0;
  }
`;

const cameraShakeMicro = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  10% { transform: translate(-0.5px, 0.5px) rotate(0.2deg); }
  20% { transform: translate(0.5px, -0.5px) rotate(-0.2deg); }
  30% { transform: translate(-0.5px, -0.5px) rotate(0.2deg); }
  40% { transform: translate(0.5px, 0.5px) rotate(-0.2deg); }
  50% { transform: translate(-0.5px, 0.5px) rotate(0.2deg); }
  60% { transform: translate(0.5px, -0.5px) rotate(-0.2deg); }
  70% { transform: translate(-0.5px, -0.5px) rotate(0.2deg); }
  80% { transform: translate(0.5px, 0.5px) rotate(-0.2deg); }
  90% { transform: translate(-0.5px, 0.5px) rotate(0.2deg); }
`;

const hologramFlicker = keyframes`
  0%, 90%, 100% {
    opacity: 1;
    transform: translate(0, 0);
  }
  92% {
    opacity: 0.7;
    transform: translate(-1px, 1px);
  }
  94% {
    opacity: 0.9;
    transform: translate(1px, -1px);
  }
  96% {
    opacity: 0.8;
    transform: translate(-1px, -1px);
  }
`;

const glowingEdge = keyframes`
  0%, 100% {
    box-shadow: 
      0 0 30px rgba(78, 201, 176, 0.4),
      0 0 60px rgba(78, 201, 176, 0.3),
      inset 0 0 30px rgba(78, 201, 176, 0.1);
  }
  50% {
    box-shadow: 
      0 0 60px rgba(78, 201, 176, 0.8),
      0 0 120px rgba(78, 201, 176, 0.5),
      inset 0 0 50px rgba(78, 201, 176, 0.2);
  }
`;

const fogDrift = keyframes`
  0% {
    transform: translateX(-20%) translateY(0);
    opacity: 0.15;
  }
  50% {
    opacity: 0.25;
  }
  100% {
    transform: translateX(20%) translateY(-10%);
    opacity: 0.15;
  }
`;

const lightRayAnimation = keyframes`
  0% {
    transform: translateX(-100%) rotate(-10deg);
    opacity: 0;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    transform: translateX(200%) rotate(-10deg);
    opacity: 0;
  }
`;

const slowMotionParticle = keyframes`
  0% {
    transform: translate(0, 0) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 0.5;
  }
  100% {
    transform: translate(var(--particle-x, 0), var(--particle-y, -300px)) scale(1);
    opacity: 0;
  }
`;

// Main Projects Section Container
const ProjectsSection = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: 
    radial-gradient(ellipse at 50% 20%, rgba(78, 201, 176, 0.05) 0%, transparent 50%),
    radial-gradient(ellipse at 20% 80%, rgba(86, 156, 214, 0.05) 0%, transparent 50%),
    linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 50%, #0a0a0a 100%);
  overflow: hidden;
  padding: 120px 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(78, 201, 176, 0.02) 2px,
        rgba(78, 201, 176, 0.02) 4px
      );
    opacity: 0.3;
    pointer-events: none;
  }
`;

// Atmospheric fog layers
const FogLayer = styled.div`
  position: absolute;
  top: ${props => props.$top || 0}%;
  left: -30%;
  width: 160%;
  height: 60%;
  background: radial-gradient(
    ellipse at center,
    rgba(78, 201, 176, 0.08) 0%,
    rgba(86, 156, 214, 0.05) 30%,
    transparent 70%
  );
  filter: blur(80px);
  animation: ${fogDrift} ${props => props.$duration || 30}s ease-in-out infinite;
  animation-delay: ${props => props.$delay || 0}s;
  pointer-events: none;
  opacity: ${props => props.$opacity || 0.6};
`;

// Drifting light rays
const LightRay = styled.div`
  position: absolute;
  top: ${props => props.$top || 0}%;
  left: -20%;
  width: 140%;
  height: 200px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(78, 201, 176, 0.1) 45%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(78, 201, 176, 0.1) 55%,
    transparent 100%
  );
  transform: rotate(-10deg);
  animation: ${lightRayAnimation} ${props => props.$duration || 15}s ease-in-out infinite;
  animation-delay: ${props => props.$delay || 0}s;
  pointer-events: none;
  opacity: 0.2;
`;

// Section Header
const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
  position: relative;
  z-index: 10;
  animation: ${dramaticZoomIn} 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
`;

const SectionTitle = styled.h2`
  font-size: clamp(60px, 10vw, 140px);
  font-weight: 900;
  color: #ffffff;
  font-family: 'Segoe UI', sans-serif;
  margin: 0 0 20px 0;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #4ec9b0 50%,
    #569cd6 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  text-shadow: 
    0 0 60px rgba(78, 201, 176, 0.6),
    0 0 120px rgba(78, 201, 176, 0.4);
  
  filter: drop-shadow(0 10px 40px rgba(0, 0, 0, 0.8));
  
  position: relative;
  
  &::before {
    content: attr(data-text);
    position: absolute;
    left: 2px;
    top: 2px;
    z-index: -1;
    background: linear-gradient(180deg, #4ec9b0 0%, #569cd6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    opacity: 0.3;
    filter: blur(4px);
  }
  
  @media (max-width: 768px) {
    font-size: 48px;
    letter-spacing: 0.1em;
  }
`;

const SectionSubtitle = styled.p`
  font-size: clamp(20px, 3vw, 32px);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Segoe UI', sans-serif;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin: 0;
  position: relative;
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 100px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #4ec9b0, transparent);
  }
  
  &::before {
    right: calc(100% + 30px);
  }
  
  &::after {
    left: calc(100% + 30px);
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    letter-spacing: 0.2em;
    
    &::before, &::after {
      width: 50px;
    }
  }
`;

// Projects Gallery Grid
const ProjectsGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 80px;
  padding: 60px 80px;
  max-width: 1800px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    gap: 60px;
    padding: 40px 40px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 50px;
    padding: 20px;
  }
`;

// Movie Poster Card
const PosterCard = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2/3;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  animation: ${trailerReveal} 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: ${props => props.$index * 0.15}s;
  
  ${props => props.$isHovered && css`
    transform: perspective(1200px) 
               rotateY(${props.$rotateY}deg) 
               rotateX(${props.$rotateX}deg) 
               scale(1.08) 
               translateZ(50px);
    z-index: 100;
    animation: ${cameraShakeMicro} 0.3s ease-out;
  `}
  
  &:hover {
    box-shadow: 
      0 0 80px rgba(78, 201, 176, 0.6),
      0 0 160px rgba(78, 201, 176, 0.4),
      0 60px 150px rgba(0, 0, 0, 0.9);
  }
`;

// Poster background with spotlight
const PosterBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  
  ${props => props.$isHovered && css`
    transform: scale(1.15);
    animation: ${hologramFlicker} 3s ease-in-out infinite;
  `}
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.5) 60%,
      rgba(0, 0, 0, 0.95) 100%
    );
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.1) 45%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0.1) 55%,
      transparent 100%
    );
    animation: ${props => props.$isHovered ? css`${spotlightSweep} 2s ease-in-out` : 'none'};
    pointer-events: none;
  }
`;

// Dramatic vignette
const DramaticVignette = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    transparent 20%,
    rgba(0, 0, 0, 0.6) 70%,
    rgba(0, 0, 0, 0.95) 100%
  );
  opacity: ${props => props.$isHovered ? 1 : 0.5};
  transition: opacity 0.8s ease;
  pointer-events: none;
`;

// Glowing edge border
const GlowingBorder = styled.div`
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 20px;
  background: linear-gradient(
    135deg,
    #4ec9b0,
    #569cd6,
    #dcdcaa,
    #4ec9b0
  );
  opacity: ${props => props.$isHovered ? 1 : 0};
  transition: opacity 0.6s ease;
  animation: ${props => props.$isHovered ? css`${glowingEdge} 2s ease-in-out infinite` : 'none'};
  z-index: -1;
  filter: blur(8px);
`;

// Lens flare effect
const LensFlare = styled.div`
  position: absolute;
  top: 0;
  left: -100%;
  width: 50px;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.8),
    transparent
  );
  transform: rotate(45deg);
  opacity: ${props => props.$isHovered ? 1 : 0};
  animation: ${props => props.$isHovered ? css`${lensFlare} 1.5s ease-out` : 'none'};
  pointer-events: none;
`;

// Slow motion particles
const ParticleField = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  opacity: ${props => props.$isHovered ? 1 : 0};
  transition: opacity 0.6s ease;
`;

const Particle = styled.div`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background: ${props => props.$color};
  border-radius: 50%;
  left: ${props => props.$left}%;
  bottom: ${props => props.$bottom}%;
  box-shadow: 0 0 ${props => props.$size * 3}px ${props => props.$color};
  --particle-x: ${props => props.$targetX}px;
  --particle-y: ${props => props.$targetY}px;
  animation: ${slowMotionParticle} ${props => props.$duration}s ease-out infinite;
  animation-delay: ${props => props.$delay}s;
`;

// Project info overlay
const ProjectOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 50px 35px 35px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(0, 0, 0, 0.7) 10%,
    rgba(0, 0, 0, 0.98) 100%
  );
  transform: translateY(${props => props.$isHovered ? '0' : '30px'});
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
`;

// Project title with glow
const ProjectTitle = styled.h3`
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 900;
  color: #ffffff;
  font-family: 'Segoe UI', sans-serif;
  margin: 0 0 15px 0;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 1.1;
  
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #4ec9b0 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.9);
  
  ${props => props.$isHovered && css`
    animation: ${dramaticZoomIn} 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    text-shadow: 
      0 0 30px rgba(78, 201, 176, 0.8),
      0 0 60px rgba(78, 201, 176, 0.5),
      0 4px 30px rgba(0, 0, 0, 0.9);
  `}
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const ProjectGenre = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #569cd6;
  font-family: 'Segoe UI', sans-serif;
  margin: 0 0 20px 0;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: ${props => props.$isHovered ? 1 : 0.8};
  transition: opacity 0.6s ease;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ProjectDescription = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  font-family: 'Segoe UI', sans-serif;
  line-height: 1.7;
  margin: 0 0 25px 0;
  max-height: ${props => props.$isHovered ? '300px' : '0'};
  overflow: hidden;
  opacity: ${props => props.$isHovered ? 1 : 0};
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: ${props => props.$isHovered ? '0.2s' : '0s'};
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-height: ${props => props.$isHovered ? '150px' : '0'};
  overflow: hidden;
  opacity: ${props => props.$isHovered ? 1 : 0};
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: ${props => props.$isHovered ? '0.3s' : '0s'};
`;

const TechTag = styled.span`
  padding: 8px 18px;
  background: rgba(78, 201, 176, 0.12);
  border: 1.5px solid rgba(78, 201, 176, 0.5);
  border-radius: 25px;
  font-size: 13px;
  font-weight: 700;
  color: #4ec9b0;
  font-family: 'Segoe UI', sans-serif;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  backdrop-filter: blur(15px);
  box-shadow: 0 0 25px rgba(78, 201, 176, 0.25);
  transition: all 0.4s ease;
  
  &:hover {
    background: rgba(78, 201, 176, 0.25);
    border-color: rgba(78, 201, 176, 0.8);
    box-shadow: 0 0 40px rgba(78, 201, 176, 0.5);
    transform: translateY(-2px);
  }
`;

// Character intro corner accents
const CornerFrame = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  border-color: rgba(78, 201, 176, 0.7);
  border-style: solid;
  pointer-events: none;
  opacity: ${props => props.$isHovered ? 1 : 0};
  transition: opacity 0.6s ease;
  animation: ${props => props.$isHovered ? css`${glowingEdge} 2s ease-in-out infinite` : 'none'};
  
  ${props => {
    switch(props.$position) {
      case 'top-left':
        return css`
          top: 20px;
          left: 20px;
          border-width: 4px 0 0 4px;
        `;
      case 'top-right':
        return css`
          top: 20px;
          right: 20px;
          border-width: 4px 4px 0 0;
        `;
      case 'bottom-left':
        return css`
          bottom: 20px;
          left: 20px;
          border-width: 0 0 4px 4px;
        `;
      case 'bottom-right':
        return css`
          bottom: 20px;
          right: 20px;
          border-width: 0 4px 4px 0;
        `;
    }
  }}
`;

// Main component
const CinematicProjectsGallery = ({ projects = [] }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRefs = useRef([]);

  const handleMouseMove = (e, index) => {
    if (hoveredIndex !== index) return;
    
    const card = cardRefs.current[index];
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 15;
    const rotateX = ((centerY - y) / centerY) * 15;
    
    setMousePosition({ x: rotateY, y: rotateX });
  };

  const generateParticles = () => {
    return Array.from({ length: 25 }, (_, i) => ({
      size: 2 + Math.random() * 3,
      left: Math.random() * 100,
      bottom: Math.random() * 20,
      targetX: (Math.random() - 0.5) * 150,
      targetY: -200 - Math.random() * 200,
      duration: 4 + Math.random() * 4,
      delay: Math.random() * 3,
      color: ['rgba(78, 201, 176, 0.8)', 'rgba(86, 156, 214, 0.8)', 'rgba(220, 220, 170, 0.8)'][i % 3]
    }));
  };

  return (
    <ProjectsSection>
      <FogLayer $top={10} $duration={35} $delay={0} $opacity={0.5} />
      <FogLayer $top={50} $duration={40} $delay={5} $opacity={0.4} />
      <FogLayer $top={80} $duration={30} $delay={10} $opacity={0.3} />
      
      <LightRay $top={20} $duration={20} $delay={0} />
      <LightRay $top={60} $duration={25} $delay={8} />
    
      <ProjectsGallery>
        {projects.map((project, index) => {
          const particles = generateParticles();
          const isHovered = hoveredIndex === index;
          
          return (
            <PosterCard
              key={index}
              ref={el => cardRefs.current[index] = el}
              $index={index}
              $isHovered={isHovered}
              $rotateY={isHovered ? mousePosition.x : 0}
              $rotateX={isHovered ? mousePosition.y : 0}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setMousePosition({ x: 0, y: 0 });
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onClick={project.onClick}
            >
              <GlowingBorder $isHovered={isHovered} />
              <PosterBackground $image={project.image} $isHovered={isHovered} />
              <DramaticVignette $isHovered={isHovered} />
              <LensFlare $isHovered={isHovered} />
              
              <CornerFrame $position="top-left" $isHovered={isHovered} />
              <CornerFrame $position="top-right" $isHovered={isHovered} />
              <CornerFrame $position="bottom-left" $isHovered={isHovered} />
              <CornerFrame $position="bottom-right" $isHovered={isHovered} />
              
              <ParticleField $isHovered={isHovered}>
                {particles.map((particle, i) => (
                  <Particle
                    key={i}
                    $size={particle.size}
                    $left={particle.left}
                    $bottom={particle.bottom}
                    $targetX={particle.targetX}
                    $targetY={particle.targetY}
                    $duration={particle.duration}
                    $delay={particle.delay}
                    $color={particle.color}
                  />
                ))}
              </ParticleField>
              
              <ProjectOverlay $isHovered={isHovered}>
                <ProjectTitle $isHovered={isHovered}>{project.title}</ProjectTitle>
                <ProjectGenre $isHovered={isHovered}>{project.genre}</ProjectGenre>
                <ProjectDescription $isHovered={isHovered}>
                  {project.description}
                </ProjectDescription>
                <TechStack $isHovered={isHovered}>
                  {project.techStack?.map((tech, i) => (
                    <TechTag key={i}>{tech}</TechTag>
                  ))}
                </TechStack>
              </ProjectOverlay>
            </PosterCard>
          );
        })}
      </ProjectsGallery>
    </ProjectsSection>
  );
};

export default CinematicProjectsGallery;

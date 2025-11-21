import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Trailer-style animations
const trailerZoom = keyframes`
  0% { 
    transform: scale(1) translateY(0);
    filter: brightness(1);
  }
  100% { 
    transform: scale(1.05) translateY(-10px);
    filter: brightness(1.2);
  }
`;

const titleDramaticReveal = keyframes`
  0% {
    transform: scale(0.8) translateY(30px);
    opacity: 0;
    letter-spacing: -0.05em;
  }
  60% {
    transform: scale(1.1) translateY(-5px);
    opacity: 1;
  }
  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
    letter-spacing: 0.1em;
  }
`;

const vignetteExpand = keyframes`
  0% {
    opacity: 0;
    transform: scale(1.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const lightSweepAcross = keyframes`
  0% {
    transform: translateX(-150%) rotate(20deg);
  }
  100% {
    transform: translateX(150%) rotate(20deg);
  }
`;

const glowPulse = keyframes`
  0%, 100% {
    box-shadow: 
      0 0 20px rgba(78, 201, 176, 0.3),
      0 0 40px rgba(78, 201, 176, 0.2),
      0 20px 60px rgba(0, 0, 0, 0.5);
  }
  50% {
    box-shadow: 
      0 0 40px rgba(78, 201, 176, 0.6),
      0 0 80px rgba(78, 201, 176, 0.4),
      0 30px 80px rgba(0, 0, 0, 0.7);
  }
`;

const particleRise = keyframes`
  0% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-200px) scale(0);
    opacity: 0;
  }
`;

const filmGrainAnimation = keyframes`
  0%, 100% { opacity: 0.05; }
  50% { opacity: 0.08; }
`;

// Projects grid container
const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 60px;
  padding: 40px 0;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

// Movie poster card container
const ProjectCard = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2/3;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  
  ${props => props.$isHovered && css`
    animation: ${trailerZoom} 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    z-index: 10;
  `}
  
  &:hover {
    box-shadow: 
      0 0 60px rgba(78, 201, 176, 0.5),
      0 0 120px rgba(78, 201, 176, 0.3),
      0 40px 100px rgba(0, 0, 0, 0.8);
  }
`;

// Background image with cinematic effects
const PosterBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  
  ${props => props.$isHovered && css`
    transform: scale(1.1);
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
      transparent 0%,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0.9) 100%
    );
  }
`;

// Film grain overlay
const FilmGrain = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.06;
  pointer-events: none;
  animation: ${filmGrainAnimation} 0.5s steps(10) infinite;
  mix-blend-mode: overlay;
`;

// Cinematic vignette effect
const Vignette = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    transparent 30%,
    rgba(0, 0, 0, 0.8) 100%
  );
  opacity: ${props => props.$isHovered ? 1 : 0};
  transition: opacity 0.6s ease;
  animation: ${props => props.$isHovered ? css`${vignetteExpand} 0.6s ease-out` : 'none'};
  pointer-events: none;
`;

// Light sweep effect
const LightSweep = styled.div`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(78, 201, 176, 0.2) 45%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(78, 201, 176, 0.2) 55%,
    transparent 100%
  );
  opacity: ${props => props.$isHovered ? 1 : 0};
  animation: ${props => props.$isHovered ? css`${lightSweepAcross} 1.2s ease-out` : 'none'};
  pointer-events: none;
`;

// Project info overlay
const ProjectInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 40px 30px 30px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(0, 0, 0, 0.8) 20%,
    rgba(0, 0, 0, 0.95) 100%
  );
  transform: translateY(${props => props.$isHovered ? '0' : '20px'});
  opacity: ${props => props.$isHovered ? 1 : 0.9};
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
`;

// Dramatic title
const ProjectTitle = styled.h3`
  font-size: clamp(28px, 3vw, 42px);
  font-weight: 900;
  color: #ffffff;
  font-family: 'Segoe UI', sans-serif;
  margin: 0 0 12px 0;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  line-height: 1.2;
  
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #4ec9b0 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
  
  ${props => props.$isHovered && css`
    animation: ${titleDramaticReveal} 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  `}
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

// Tagline
const ProjectTagline = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #569cd6;
  font-family: 'Segoe UI', sans-serif;
  margin: 0 0 16px 0;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  opacity: ${props => props.$isHovered ? 1 : 0.7};
  transition: opacity 0.6s ease;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// Description
const ProjectDescription = styled.p`
  font-size: 15px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.85);
  font-family: 'Segoe UI', sans-serif;
  margin: 0 0 20px 0;
  line-height: 1.6;
  max-height: ${props => props.$isHovered ? '200px' : '0'};
  overflow: hidden;
  opacity: ${props => props.$isHovered ? 1 : 0};
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: ${props => props.$isHovered ? '0.2s' : '0s'};
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// Tech stack tags
const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-height: ${props => props.$isHovered ? '100px' : '0'};
  overflow: hidden;
  opacity: ${props => props.$isHovered ? 1 : 0};
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: ${props => props.$isHovered ? '0.3s' : '0s'};
`;

const TechTag = styled.span`
  padding: 6px 14px;
  background: rgba(78, 201, 176, 0.15);
  border: 1px solid rgba(78, 201, 176, 0.4);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #4ec9b0;
  font-family: 'Segoe UI', sans-serif;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px rgba(78, 201, 176, 0.2);
  
  &:hover {
    background: rgba(78, 201, 176, 0.25);
    border-color: rgba(78, 201, 176, 0.6);
    box-shadow: 0 0 30px rgba(78, 201, 176, 0.4);
  }
`;

// Corner frame accents
const CornerAccent = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  border-color: rgba(78, 201, 176, 0.6);
  border-style: solid;
  pointer-events: none;
  opacity: ${props => props.$isHovered ? 1 : 0};
  transition: opacity 0.6s ease;
  animation: ${props => props.$isHovered ? css`${glowPulse} 2s ease-in-out infinite` : 'none'};
  
  ${props => {
    if (props.$position === 'top-left') {
      return css`
        top: 15px;
        left: 15px;
        border-width: 3px 0 0 3px;
      `;
    }
    if (props.$position === 'top-right') {
      return css`
        top: 15px;
        right: 15px;
        border-width: 3px 3px 0 0;
      `;
    }
    if (props.$position === 'bottom-left') {
      return css`
        bottom: 15px;
        left: 15px;
        border-width: 0 0 3px 3px;
      `;
    }
    if (props.$position === 'bottom-right') {
      return css`
        bottom: 15px;
        right: 15px;
        border-width: 0 3px 3px 0;
      `;
    }
  }}
`;

// Particles for hover effect
const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  opacity: ${props => props.$isHovered ? 1 : 0};
`;

const Particle = styled.div`
  position: absolute;
  width: 3px;
  height: 3px;
  background: ${props => props.$color || '#4ec9b0'};
  border-radius: 50%;
  left: ${props => props.$left}%;
  bottom: 0;
  animation: ${particleRise} ${props => props.$duration}s ease-out infinite;
  animation-delay: ${props => props.$delay}s;
  box-shadow: 0 0 10px ${props => props.$color || '#4ec9b0'};
`;

// Main project card component
const MoviePosterProjectCard = ({ 
  title, 
  tagline, 
  description, 
  image, 
  techStack = [],
  onClick 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const particles = Array.from({ length: 15 }, (_, i) => ({
    left: (i * 7 + Math.random() * 10) % 100,
    duration: 2 + Math.random() * 2,
    delay: Math.random() * 1.5,
    color: ['#4ec9b0', '#569cd6', '#dcdcaa'][i % 3]
  }));

  return (
    <ProjectCard
      $isHovered={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <PosterBackground $image={image} $isHovered={isHovered} />
      <FilmGrain />
      <Vignette $isHovered={isHovered} />
      <LightSweep $isHovered={isHovered} />
      
      <CornerAccent $position="top-left" $isHovered={isHovered} />
      <CornerAccent $position="top-right" $isHovered={isHovered} />
      <CornerAccent $position="bottom-left" $isHovered={isHovered} />
      <CornerAccent $position="bottom-right" $isHovered={isHovered} />
      
      <ParticlesContainer $isHovered={isHovered}>
        {particles.map((particle, i) => (
          <Particle
            key={i}
            $left={particle.left}
            $duration={particle.duration}
            $delay={particle.delay}
            $color={particle.color}
          />
        ))}
      </ParticlesContainer>
      
      <ProjectInfo $isHovered={isHovered}>
        <ProjectTitle $isHovered={isHovered}>{title}</ProjectTitle>
        <ProjectTagline $isHovered={isHovered}>{tagline}</ProjectTagline>
        <ProjectDescription $isHovered={isHovered}>
          {description}
        </ProjectDescription>
        <TechStack $isHovered={isHovered}>
          {techStack.map((tech, index) => (
            <TechTag key={index}>{tech}</TechTag>
          ))}
        </TechStack>
      </ProjectInfo>
    </ProjectCard>
  );
};

export default MoviePosterProjectCard;
export { ProjectsGrid };

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const cinematicZoom = keyframes`
  0% {
    transform: scale(1.5) translateZ(0);
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  100% {
    transform: scale(1) translateZ(0);
    opacity: 1;
  }
`;

const titleReveal = keyframes`
  0% {
    transform: translateY(100px) scale(0.8);
    opacity: 0;
    filter: blur(10px);
  }
  60% {
    transform: translateY(-10px) scale(1.05);
    opacity: 1;
    filter: blur(0px);
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
    filter: blur(0px);
  }
`;

const subtitleSlide = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const lightSweep = keyframes`
  0% {
    transform: translateX(-200%) rotate(45deg);
  }
  100% {
    transform: translateX(200%) rotate(45deg);
  }
`;

const particleFloat = keyframes`
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.8;
  }
  33% {
    transform: translate(30px, -50px) scale(1.2);
    opacity: 0.5;
  }
  66% {
    transform: translate(-20px, -100px) scale(0.8);
    opacity: 0.3;
  }
`;

const fogDrift = keyframes`
  0% {
    transform: translateX(-10%) translateY(0);
    opacity: 0.3;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: translateX(10%) translateY(-5%);
    opacity: 0.3;
  }
`;

const gridPulse = keyframes`
  0%, 100% {
    opacity: 0.1;
    transform: perspective(1000px) rotateX(60deg) translateZ(0);
  }
  50% {
    opacity: 0.3;
    transform: perspective(1000px) rotateX(60deg) translateZ(20px);
  }
`;

const cameraShake = keyframes`
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-1px, 1px); }
  20% { transform: translate(1px, -1px); }
  30% { transform: translate(-1px, -1px); }
  40% { transform: translate(1px, 1px); }
  50% { transform: translate(-1px, 1px); }
  60% { transform: translate(1px, -1px); }
  70% { transform: translate(-1px, -1px); }
  80% { transform: translate(1px, 1px); }
  90% { transform: translate(-1px, 1px); }
`;

const glitchEffect = keyframes`
  0%, 90%, 100% {
    transform: translate(0);
    filter: hue-rotate(0deg);
  }
  92% {
    transform: translate(-2px, 2px);
    filter: hue-rotate(5deg);
  }
  94% {
    transform: translate(2px, -2px);
    filter: hue-rotate(-5deg);
  }
  96% {
    transform: translate(-2px, -2px);
  }
`;

const typewriterBlink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0a0a0a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  overflow: hidden;
  animation: ${({ $isExiting }) => $isExiting ? fadeOut : fadeIn} ${({ $isExiting }) => $isExiting ? '1s' : '0.5s'} ease-out forwards;
  perspective: 2000px;
`;

const CinematicBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(ellipse at 50% 30%, rgba(78, 201, 176, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 20% 70%, rgba(86, 156, 214, 0.15) 0%, transparent 40%),
    radial-gradient(ellipse at 80% 60%, rgba(220, 220, 170, 0.1) 0%, transparent 50%),
    linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%);
  animation: ${cinematicZoom} 3s ease-out forwards;
`;

const Grid3D = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60%;
  background-image: 
    linear-gradient(rgba(78, 201, 176, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(78, 201, 176, 0.1) 1px, transparent 1px);
  background-size: 80px 80px;
  transform: perspective(800px) rotateX(60deg);
  transform-origin: bottom;
  opacity: 0.15;
  animation: ${gridPulse} 4s ease-in-out infinite;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(to top, transparent 0%, #0a0a0a 100%);
  }
`;

const FogLayer = styled.div`
  position: absolute;
  top: 0;
  left: -20%;
  width: 140%;
  height: 100%;
  background: 
    radial-gradient(ellipse at 30% 50%, rgba(78, 201, 176, 0.08) 0%, transparent 60%),
    radial-gradient(ellipse at 70% 60%, rgba(86, 156, 214, 0.08) 0%, transparent 60%);
  filter: blur(60px);
  animation: ${fogDrift} 20s ease-in-out infinite alternate;
  opacity: 0.5;
`;

const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
`;

const Particle = styled.div`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background: ${props => props.$color};
  border-radius: 50%;
  box-shadow: 0 0 ${props => props.$size * 2}px ${props => props.$color};
  left: ${props => props.$left}%;
  top: ${props => props.$top}%;
  animation: ${particleFloat} ${props => props.$duration}s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
  opacity: 0.6;
`;

const LightSweep = styled.div`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(78, 201, 176, 0.1) 45%,
    rgba(78, 201, 176, 0.3) 50%,
    rgba(78, 201, 176, 0.1) 55%,
    transparent 100%
  );
  animation: ${lightSweep} 3s ease-in-out infinite;
  animation-delay: 1s;
  pointer-events: none;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  animation: ${cameraShake} 0.5s ease-out 1.5s;
`;

const LogoGlow = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(78, 201, 176, 0.3) 0%, transparent 70%);
  filter: blur(80px);
  animation: ${fadeIn} 2s ease-out forwards;
`;

const MainTitle = styled.h1`
  font-size: clamp(40px, 7vw, 85px);
  font-weight: 900;
  color: #ffffff;
  font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
  margin: 0;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  position: relative;
  animation: ${titleReveal} 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
  
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
    0 0 40px rgba(78, 201, 176, 0.5),
    0 0 80px rgba(78, 201, 176, 0.3),
    0 10px 30px rgba(0, 0, 0, 0.5);
  
  filter: drop-shadow(0 0 20px rgba(78, 201, 176, 0.6));
  
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background: linear-gradient(45deg, transparent, rgba(78, 201, 176, 0.1), transparent);
    animation: ${lightSweep} 3s ease-in-out infinite;
    z-index: -1;
  }
  
  @media (max-width: 768px) {
    font-size: 32px;
    letter-spacing: 0.05em;
  }
`;

const TypewriterCursor = styled.span`
  display: inline-block;
  width: 3px;
  height: 0.8em;
  background: #4ec9b0;
  margin-left: 4px;
  animation: ${typewriterBlink} 1s step-end infinite;
  box-shadow: 0 0 10px #4ec9b0;
`;

const SubtitleBar = styled.div`
  width: 600px;
  max-width: 90vw;
  height: 2px;
  background: linear-gradient(90deg, transparent, #4ec9b0, transparent);
  margin: 40px 0 30px;
  position: relative;
  animation: ${subtitleSlide} 1s ease-out 1.2s both;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background: #4ec9b0;
    border-radius: 50%;
    box-shadow: 0 0 20px #4ec9b0;
    top: -3px;
  }
  
  &::before {
    left: 0;
  }
  
  &::after {
    right: 0;
  }
`;

const Subtitle = styled.div`
  font-size: clamp(14px, 2.5vw, 20px);
  font-weight: 500;
  color: #569cd6;
  font-family: 'Segoe UI', sans-serif;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  animation: ${fadeIn} 1s ease-out 1.5s both;
  text-shadow: 0 0 20px rgba(86, 156, 214, 0.5);
  
  @media (max-width: 768px) {
    font-size: 12px;
    letter-spacing: 0.2em;
  }
`;

const TaglineContainer = styled.div`
  margin-top: 30px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 1s ease-out 2s both;
`;

const RotatingText = styled.div`
  font-size: clamp(16px, 2.5vw, 22px);
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Segoe UI', sans-serif;
  text-align: center;
  letter-spacing: 0.05em;
  animation: ${fadeIn} 0.6s ease-out;
  padding: 0 20px;
  
  &::before {
    content: '// ';
    color: #4ec9b0;
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const LoadingIndicator = styled.div`
  margin-top: 60px;
  width: 500px;
  max-width: 80vw;
  height: 2px;
  background: rgba(78, 201, 176, 0.1);
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 1s ease-out 2.5s both;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      #4ec9b0 20%,
      #569cd6 50%,
      #4ec9b0 80%,
      transparent
    );
    animation: ${lightSweep} 2s ease-in-out infinite;
    box-shadow: 0 0 20px #4ec9b0;
  }
`;

const CornerFrame = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  border-color: rgba(78, 201, 176, 0.3);
  border-style: solid;
  pointer-events: none;
  animation: ${fadeIn} 1s ease-out 1s both;
  
  ${props => {
    if (props.$position === 'top-left') {
      return `
        top: 40px;
        left: 40px;
        border-width: 2px 0 0 2px;
      `;
    }
    if (props.$position === 'top-right') {
      return `
        top: 40px;
        right: 40px;
        border-width: 2px 2px 0 0;
      `;
    }
    if (props.$position === 'bottom-left') {
      return `
        bottom: 40px;
        left: 40px;
        border-width: 0 0 2px 2px;
      `;
    }
    if (props.$position === 'bottom-right') {
      return `
        bottom: 40px;
        right: 40px;
        border-width: 0 2px 2px 0;
      `;
    }
  }}
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
  }
`;

const Vignette = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.7) 100%);
  pointer-events: none;
`;

const features = [
  'RAG Pipelines & Semantic Search',
  'Vector Databases • FAISS • ChromaDB',
  'LangChain & OpenAI Integration',
  'Distributed Systems & Microservices',
  'Spring Boot • PySpark • SQL',
  'Cloud-Native Deployments',
  'Competitive Programming',
  'Data Structures & Algorithms'
];

const LoadingScreen = ({ onLoadComplete }) => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [displayedName, setDisplayedName] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullName = 'SUDHIR SHARMA';

  useEffect(() => {
    // Typewriter effect for name
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < fullName.length) {
        setDisplayedName(fullName.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setShowCursor(false), 500);
      }
    }, 100);

    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 2000);

    const loadingTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        if (onLoadComplete) onLoadComplete();
      }, 1000);
    }, 6000);

    return () => {
      clearInterval(typeInterval);
      clearInterval(featureInterval);
      clearTimeout(loadingTimer);
    };
  }, [onLoadComplete]);

  const particles = [
    { size: 3, left: 10, top: 20, duration: 8, delay: 0, color: 'rgba(78, 201, 176, 0.6)' },
    { size: 2, left: 85, top: 15, duration: 10, delay: 1, color: 'rgba(86, 156, 214, 0.6)' },
    { size: 4, left: 20, top: 70, duration: 12, delay: 2, color: 'rgba(78, 201, 176, 0.4)' },
    { size: 2, left: 90, top: 80, duration: 9, delay: 1.5, color: 'rgba(220, 220, 170, 0.5)' },
    { size: 3, left: 50, top: 30, duration: 11, delay: 0.5, color: 'rgba(86, 156, 214, 0.5)' },
    { size: 2, left: 15, top: 85, duration: 10, delay: 2.5, color: 'rgba(78, 201, 176, 0.6)' },
    { size: 4, left: 75, top: 40, duration: 13, delay: 1, color: 'rgba(78, 201, 176, 0.5)' },
    { size: 3, left: 60, top: 65, duration: 9, delay: 3, color: 'rgba(86, 156, 214, 0.4)' },
  ];

  return (
    <LoadingContainer $isExiting={isExiting}>
      <CinematicBackground />
      <Grid3D />
      <FogLayer />
      <LightSweep />
      
      <ParticlesContainer>
        {particles.map((particle, index) => (
          <Particle
            key={index}
            $size={particle.size}
            $left={particle.left}
            $top={particle.top}
            $duration={particle.duration}
            $delay={particle.delay}
            $color={particle.color}
          />
        ))}
      </ParticlesContainer>

      <CornerFrame $position="top-left" />
      <CornerFrame $position="top-right" />
      <CornerFrame $position="bottom-left" />
      <CornerFrame $position="bottom-right" />

      <ContentWrapper>
        <LogoGlow />
        
        <MainTitle>
          {displayedName}
          {showCursor && <TypewriterCursor />}
        </MainTitle>
        
        <SubtitleBar />
        
        <Subtitle>AI/ML • BACKEND • ALGORITHMS</Subtitle>
        
        <TaglineContainer>
          <RotatingText key={currentFeature}>
            {features[currentFeature]}
          </RotatingText>
        </TaglineContainer>

        <LoadingIndicator />
      </ContentWrapper>

      <Vignette />
    </LoadingContainer>
  );
};

export default LoadingScreen;

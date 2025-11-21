import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Epic opening sequence animations
const openingFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px);
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0px);
  }
`;

const titleRevealCinematic = keyframes`
  0% {
    transform: scale(0.5) translateY(100px);
    opacity: 0;
    letter-spacing: 0.5em;
    filter: blur(20px) brightness(0);
  }
  50% {
    filter: blur(5px) brightness(0.5);
  }
  80% {
    transform: scale(1.1) translateY(-10px);
    letter-spacing: 0.25em;
  }
  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
    letter-spacing: 0.2em;
    filter: blur(0px) brightness(1);
  }
`;

const subtitleFadeUp = keyframes`
  0% {
    transform: translateY(30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const lightBeamSweep = keyframes`
  0% {
    transform: translateX(-200%) rotate(-15deg);
    opacity: 0;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    transform: translateX(200%) rotate(-15deg);
    opacity: 0;
  }
`;

const dustParticleFloat = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    transform: translate(var(--dust-x, 50px), var(--dust-y, -400px)) rotate(360deg);
    opacity: 0;
  }
`;

const silhouetteGlow = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 30px rgba(78, 201, 176, 0.4));
  }
  50% {
    filter: drop-shadow(0 0 60px rgba(78, 201, 176, 0.8));
  }
`;

const hologramScan = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
`;

const hudElementSlide = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const creditScroll = keyframes`
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-20px);
    opacity: 0;
  }
`;

const atmosphericPulse = keyframes`
  0%, 100% {
    opacity: 0.15;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.1);
  }
`;

// Main About Section
const AboutSection = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: 
    radial-gradient(ellipse at 30% 40%, rgba(78, 201, 176, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 60%, rgba(86, 156, 214, 0.08) 0%, transparent 50%),
    linear-gradient(180deg, #0a0a0a 0%, #0d0d0d 50%, #0a0a0a 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 100px 0;
`;

// Atmospheric light beams
const LightBeam = styled.div`
  position: absolute;
  top: ${props => props.$top || 0}%;
  left: -30%;
  width: 160%;
  height: 300px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(78, 201, 176, 0.05) 45%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(78, 201, 176, 0.05) 55%,
    transparent 100%
  );
  transform: rotate(-15deg);
  animation: ${lightBeamSweep} ${props => props.$duration || 20}s ease-in-out infinite;
  animation-delay: ${props => props.$delay || 0}s;
  pointer-events: none;
  opacity: 0.3;
  filter: blur(30px);
`;

// Floating dust particles
const DustField = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
`;

const DustParticle = styled.div`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  left: ${props => props.$left}%;
  top: ${props => props.$top}%;
  box-shadow: 0 0 ${props => props.$size * 2}px rgba(255, 255, 255, 0.6);
  --dust-x: ${props => props.$targetX}px;
  --dust-y: ${props => props.$targetY}px;
  animation: ${dustParticleFloat} ${props => props.$duration}s ease-out infinite;
  animation-delay: ${props => props.$delay}s;
  opacity: 0.4;
`;

// Content container
const AboutContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 80px;
  display: grid;
  grid-template-columns: 45% 55%;
  gap: 100px;
  align-items: center;
  position: relative;
  z-index: 10;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 60px;
    padding: 0 40px;
  }
`;

// Left side - Hero imagery
const HeroImagery = styled.div`
  position: relative;
  aspect-ratio: 3/4;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${openingFadeIn} 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
  
  @media (max-width: 1200px) {
    max-width: 500px;
    margin: 0 auto;
  }
`;

// Silhouette with outline glow
const HeroSilhouette = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${props => props.$image 
    ? `url(${props.$image})` 
    : 'linear-gradient(135deg, rgba(78, 201, 176, 0.1) 0%, rgba(86, 156, 214, 0.1) 100%)'};
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  overflow: hidden;
  animation: ${silhouetteGlow} 3s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    inset: -3px;
    background: linear-gradient(
      135deg,
      #4ec9b0,
      #569cd6,
      #dcdcaa,
      #4ec9b0
    );
    border-radius: 20px;
    z-index: -1;
    opacity: 0.6;
    filter: blur(15px);
  }
  
  &::after {
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
      rgba(0, 0, 0, 0.8) 100%
    );
  }
`;

// Hologram scan line
const HologramScanLine = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(78, 201, 176, 0.8),
    transparent
  );
  box-shadow: 0 0 20px rgba(78, 201, 176, 0.8);
  animation: ${hologramScan} 4s linear infinite;
  opacity: 0.6;
`;

// Right side - Story content
const StoryContent = styled.div`
  position: relative;
  animation: ${openingFadeIn} 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both;
`;

// Epic title
const EpicTitle = styled.h1`
  font-size: clamp(48px, 7vw, 90px);
  font-weight: 900;
  color: #ffffff;
  font-family: 'Segoe UI', sans-serif;
  margin: 0 0 30px 0;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  line-height: 1.1;
  
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
    0 0 60px rgba(78, 201, 176, 0.5),
    0 10px 40px rgba(0, 0, 0, 0.8);
  
  filter: drop-shadow(0 0 30px rgba(78, 201, 176, 0.4));
  
  animation: ${titleRevealCinematic} 2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
  
  @media (max-width: 768px) {
    font-size: 36px;
    letter-spacing: 0.1em;
  }
`;

const Subtitle = styled.h2`
  font-size: clamp(24px, 3.5vw, 42px);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.85);
  font-family: 'Segoe UI', sans-serif;
  margin: 0 0 50px 0;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  animation: ${subtitleFadeUp} 1.5s ease-out 1s both;
  
  @media (max-width: 768px) {
    font-size: 18px;
    letter-spacing: 0.2em;
  }
`;

// HUD-style separator
const HUDSeparator = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    #4ec9b0,
    #569cd6,
    transparent
  );
  margin: 40px 0;
  position: relative;
  animation: ${hudElementSlide} 1s ease-out 1.5s both;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background: #4ec9b0;
    border-radius: 50%;
    box-shadow: 0 0 15px #4ec9b0;
    top: -2.5px;
  }
  
  &::before {
    left: 0;
  }
  
  &::after {
    left: 60%;
  }
`;

// Narration text
const NarrationText = styled.p`
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.9);
  font-family: 'Segoe UI', sans-serif;
  line-height: 1.8;
  margin: 0 0 30px 0;
  animation: ${creditScroll} ${props => props.$duration || 6}s ease-in-out ${props => props.$delay || 2}s both;
  
  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 1.6;
  }
`;

// Character intro cards
const CharacterCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  margin-top: 50px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const CharacterCard = styled.div`
  padding: 30px;
  background: rgba(78, 201, 176, 0.05);
  border: 2px solid rgba(78, 201, 176, 0.3);
  border-radius: 15px;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  animation: ${openingFadeIn} 1s ease-out ${props => props.$delay || 2}s both;
  transition: all 0.5s ease;
  
  &:hover {
    background: rgba(78, 201, 176, 0.1);
    border-color: rgba(78, 201, 176, 0.6);
    transform: translateY(-5px);
    box-shadow: 0 20px 60px rgba(78, 201, 176, 0.3);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at top right,
      rgba(78, 201, 176, 0.1) 0%,
      transparent 50%
    );
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const CardIcon = styled.div`
  font-size: 36px;
  margin-bottom: 15px;
  filter: drop-shadow(0 0 10px currentColor);
  animation: ${atmosphericPulse} 3s ease-in-out infinite;
  animation-delay: ${props => props.$delay || 0}s;
`;

const CardTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #4ec9b0;
  font-family: 'Segoe UI', sans-serif;
  margin: 0 0 12px 0;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const CardDescription = styled.p`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Segoe UI', sans-serif;
  line-height: 1.6;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// Corner HUD elements
const HUDCorner = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  pointer-events: none;
  opacity: 0.6;
  
  ${props => {
    switch(props.$position) {
      case 'top-left':
        return css`
          top: 40px;
          left: 40px;
          border-top: 3px solid #4ec9b0;
          border-left: 3px solid #4ec9b0;
          animation: ${hudElementSlide} 1s ease-out 1s both;
        `;
      case 'bottom-right':
        return css`
          bottom: 40px;
          right: 40px;
          border-bottom: 3px solid #569cd6;
          border-right: 3px solid #569cd6;
          animation: ${hudElementSlide} 1s ease-out 1.2s both;
          transform-origin: bottom right;
        `;
    }
  }}
  
  &::before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background: currentColor;
    border-radius: 50%;
    box-shadow: 0 0 15px currentColor;
    ${props => props.$position === 'top-left' ? 'top: -5px; left: -5px;' : 'bottom: -5px; right: -5px;'}
  }
`;

// Main component
const CinematicAboutSection = ({ 
  heroImage, 
  characterStats = [],
  narrationTexts = []
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const generateDustParticles = () => {
    return Array.from({ length: 30 }, (_, i) => ({
      size: 1 + Math.random() * 2,
      left: Math.random() * 100,
      top: 50 + Math.random() * 50,
      targetX: (Math.random() - 0.5) * 100,
      targetY: -300 - Math.random() * 200,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 5
    }));
  };

  const dustParticles = generateDustParticles();

  return (
    <AboutSection>
      <LightBeam $top={20} $duration={25} $delay={0} />
      <LightBeam $top={60} $duration={30} $delay={10} />
      <LightBeam $top={40} $duration={35} $delay={5} />
      
      <DustField>
        {dustParticles.map((particle, i) => (
          <DustParticle
            key={i}
            $size={particle.size}
            $left={particle.left}
            $top={particle.top}
            $targetX={particle.targetX}
            $targetY={particle.targetY}
            $duration={particle.duration}
            $delay={particle.delay}
          />
        ))}
      </DustField>
      
      <HUDCorner $position="top-left" />
      <HUDCorner $position="bottom-right" />
      
      <AboutContainer>
        <HeroImagery>
          <HeroSilhouette $image={heroImage}>
            <HologramScanLine />
          </HeroSilhouette>
        </HeroImagery>
        
        <StoryContent>
          <EpicTitle>
            THE CREATOR<br/>BEHIND THE SCENES
          </EpicTitle>
          
          <Subtitle>
            A Developer With Vision
          </Subtitle>
          
          <HUDSeparator />
          
          {narrationTexts.map((text, index) => (
            <NarrationText 
              key={index} 
              $duration={6 + index}
              $delay={2 + index * 0.5}
            >
              {text}
            </NarrationText>
          ))}
          
          <CharacterCards>
            {characterStats.map((stat, index) => (
              <CharacterCard key={index} $delay={3 + index * 0.2}>
                <CardIcon $delay={index * 0.3}>{stat.icon}</CardIcon>
                <CardTitle>{stat.title}</CardTitle>
                <CardDescription>{stat.description}</CardDescription>
              </CharacterCard>
            ))}
          </CharacterCards>
        </StoryContent>
      </AboutContainer>
    </AboutSection>
  );
};

export default CinematicAboutSection;

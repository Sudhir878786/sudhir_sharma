import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Cinematic transition animations
const fadeToBlack = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const letterboxWipe = keyframes`
  0% { 
    clip-path: inset(50% 0 50% 0); 
  }
  50% { 
    clip-path: inset(0 0 0 0); 
  }
  100% { 
    clip-path: inset(50% 0 50% 0); 
  }
`;

const lightFlash = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
`;

const parallaxFloat = keyframes`
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-20px) translateX(10px); }
`;

const hologramGlitch = keyframes`
  0%, 90%, 100% {
    transform: translate(0, 0);
    opacity: 0.8;
  }
  92% {
    transform: translate(-2px, 2px);
    opacity: 0.6;
  }
  94% {
    transform: translate(2px, -2px);
    opacity: 1;
  }
`;

const rotate3D = keyframes`
  from { transform: rotateY(0deg) rotateX(0deg); }
  to { transform: rotateY(360deg) rotateX(360deg); }
`;

const pulseGlow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(78, 201, 176, 0.4);
    filter: brightness(1);
  }
  50% { 
    box-shadow: 0 0 60px rgba(78, 201, 176, 0.8);
    filter: brightness(1.2);
  }
`;

// Main container
const CinematicContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  position: relative;
  background: #0a0a0a;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(30, 30, 30, 0.5);
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #4ec9b0, #569cd6);
    border-radius: 4px;
    
    &:hover {
      background: linear-gradient(180deg, #5edac0, #67acf6);
    }
  }
`;

// Scene wrapper with transition effects
const Scene = styled.section`
  min-height: 100vh;
  width: 100%;
  scroll-snap-align: start;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  ${props => props.$transition === 'fade' && css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #000;
      pointer-events: none;
      opacity: 0;
      animation: ${fadeToBlack} 2s ease-in-out;
      animation-play-state: ${props.$isTransitioning ? 'running' : 'paused'};
      z-index: 100;
    }
  `}
  
  ${props => props.$transition === 'letterbox' && css`
    &::before, &::after {
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
      height: 15%;
      background: #000;
      z-index: 100;
      transition: transform 0.8s cubic-bezier(0.87, 0, 0.13, 1);
    }
    
    &::before {
      top: 0;
      transform: ${props.$isTransitioning ? 'translateY(0)' : 'translateY(-100%)'};
    }
    
    &::after {
      bottom: 0;
      transform: ${props.$isTransitioning ? 'translateY(0)' : 'translateY(100%)'};
    }
  `}
  
  ${props => props.$transition === 'flash' && css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(78, 201, 176, 0.3) 0%, rgba(255, 255, 255, 0.8) 100%);
      pointer-events: none;
      opacity: 0;
      animation: ${lightFlash} 0.5s ease-out;
      animation-play-state: ${props.$isTransitioning ? 'running' : 'paused'};
      z-index: 100;
    }
  `}
`;

// Parallax layers
const ParallaxLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  transform: translateZ(${props => props.$depth}px);
  will-change: transform;
`;

const FloatingElement = styled.div`
  position: absolute;
  left: ${props => props.$left}%;
  top: ${props => props.$top}%;
  animation: ${parallaxFloat} ${props => props.$duration}s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
  opacity: ${props => props.$opacity || 0.6};
  font-size: ${props => props.$size || 48}px;
  color: ${props => props.$color || '#4ec9b0'};
  text-shadow: 0 0 30px currentColor;
  filter: blur(${props => props.$blur || 0}px);
  transform-style: preserve-3d;
  
  ${props => props.$type === 'code' && css`
    font-family: 'Courier New', monospace;
    font-weight: bold;
  `}
  
  ${props => props.$type === 'hologram' && css`
    animation: ${hologramGlitch} 3s ease-in-out infinite;
    border: 2px solid currentColor;
    padding: 10px;
    backdrop-filter: blur(10px);
    background: rgba(78, 201, 176, 0.05);
  `}
`;

const GeometricShape = styled.div`
  position: absolute;
  left: ${props => props.$left}%;
  top: ${props => props.$top}%;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  border: 3px solid ${props => props.$color || '#4ec9b0'};
  background: ${props => props.$fill ? `rgba(78, 201, 176, 0.1)` : 'transparent'};
  transform-style: preserve-3d;
  animation: ${rotate3D} ${props => props.$duration}s linear infinite, 
             ${parallaxFloat} ${props => props.$duration * 0.8}s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
  opacity: ${props => props.$opacity || 0.4};
  box-shadow: 0 0 30px ${props => props.$color || '#4ec9b0'};
  
  ${props => props.$shape === 'triangle' && css`
    width: 0;
    height: 0;
    border-left: ${props.$size / 2}px solid transparent;
    border-right: ${props.$size / 2}px solid transparent;
    border-bottom: ${props.$size}px solid ${props.$color || '#4ec9b0'};
    background: transparent;
  `}
  
  ${props => props.$shape === 'hexagon' && css`
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  `}
  
  ${props => props.$shape === 'circle' && css`
    border-radius: 50%;
  `}
`;

// Scene background with cinematic lighting
const SceneBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.$gradient || 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)'};
  z-index: -1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.$lighting || 'radial-gradient(ellipse at 50% 50%, rgba(78, 201, 176, 0.15) 0%, transparent 70%)'};
    opacity: 0.8;
    transition: opacity 1s ease;
  }
`;

const SceneContent = styled.div`
  position: relative;
  z-index: 10;
  width: 90%;
  max-width: 1400px;
  padding: 60px 20px;
`;

const SceneTitle = styled.h2`
  font-size: clamp(60px, 8vw, 120px);
  font-weight: 900;
  color: #ffffff;
  font-family: 'Segoe UI', sans-serif;
  margin: 0 0 40px 0;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    ${props => props.$color || '#4ec9b0'} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  text-shadow: 
    0 0 40px ${props => props.$color || 'rgba(78, 201, 176, 0.5)'},
    0 10px 30px rgba(0, 0, 0, 0.5);
  
  filter: drop-shadow(0 0 20px ${props => props.$color || 'rgba(78, 201, 176, 0.6)'});
  
  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

const CinematicScroller = ({ children, scenes }) => {
  const containerRef = useRef(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      const windowHeight = container.clientHeight;
      const newScene = Math.round(scrollPosition / windowHeight);
      
      setScrollY(scrollPosition);
      
      if (newScene !== currentScene) {
        setIsTransitioning(true);
        setCurrentScene(newScene);
        
        setTimeout(() => {
          setIsTransitioning(false);
        }, 1000);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentScene]);

  // Generate floating elements
  const codeSymbols = ['{ }', '< />', '( )', '[ ]', '=>', '::'];
  const floatingElements = codeSymbols.map((symbol, i) => ({
    type: 'code',
    content: symbol,
    left: (i * 17 + 10) % 90,
    top: (i * 23 + 15) % 80,
    duration: 8 + i * 2,
    delay: i * 0.5,
    size: 36 + (i % 3) * 12,
    opacity: 0.4 + (i % 3) * 0.1,
    color: ['#4ec9b0', '#569cd6', '#dcdcaa'][i % 3]
  }));

  const shapes = [
    { shape: 'square', left: 15, top: 20, size: 80, duration: 12, delay: 0, color: '#4ec9b0' },
    { shape: 'triangle', left: 75, top: 15, size: 100, duration: 15, delay: 2, color: '#569cd6' },
    { shape: 'hexagon', left: 85, top: 70, size: 60, duration: 10, delay: 1, color: '#dcdcaa', fill: true },
    { shape: 'circle', left: 10, top: 65, size: 70, duration: 14, delay: 3, color: '#4ec9b0' },
    { shape: 'square', left: 50, top: 10, size: 50, duration: 11, delay: 1.5, color: '#569cd6', fill: true },
  ];

  return (
    <CinematicContainer ref={containerRef}>
      {scenes.map((scene, index) => (
        <Scene
          key={index}
          $transition={scene.transition || 'fade'}
          $isTransitioning={isTransitioning && currentScene === index}
        >
          <SceneBackground
            $gradient={scene.gradient}
            $lighting={scene.lighting}
          />
          
          {/* Parallax layers with different depths */}
          <ParallaxLayer 
            $depth={-200}
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            {floatingElements.slice(0, 2).map((el, i) => (
              <FloatingElement
                key={`code-far-${i}`}
                $type={el.type}
                $left={el.left}
                $top={el.top}
                $duration={el.duration}
                $delay={el.delay}
                $size={el.size}
                $opacity={el.opacity * 0.3}
                $color={el.color}
                $blur={2}
              >
                {el.content}
              </FloatingElement>
            ))}
          </ParallaxLayer>
          
          <ParallaxLayer 
            $depth={-100}
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          >
            {shapes.slice(0, 3).map((shape, i) => (
              <GeometricShape
                key={`shape-mid-${i}`}
                {...shape}
                $opacity={shape.opacity || 0.3}
              />
            ))}
          </ParallaxLayer>
          
          <ParallaxLayer 
            $depth={0}
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          >
            {floatingElements.slice(2, 5).map((el, i) => (
              <FloatingElement
                key={`code-near-${i}`}
                $type={el.type}
                $left={el.left}
                $top={el.top}
                $duration={el.duration}
                $delay={el.delay}
                $size={el.size}
                $opacity={el.opacity}
                $color={el.color}
              >
                {el.content}
              </FloatingElement>
            ))}
            
            {shapes.slice(3).map((shape, i) => (
              <GeometricShape
                key={`shape-near-${i}`}
                {...shape}
              />
            ))}
          </ParallaxLayer>
          
          {/* Hologram effects */}
          <ParallaxLayer 
            $depth={50}
            style={{ transform: `translateY(${scrollY * 0.7}px)` }}
          >
            <FloatingElement
              $type="hologram"
              $left={20}
              $top={30}
              $duration={4}
              $delay={0}
              $size={32}
              $color="#569cd6"
            >
              SYSTEM ONLINE
            </FloatingElement>
            
            <FloatingElement
              $type="hologram"
              $left={70}
              $top={60}
              $duration={5}
              $delay={1}
              $size={28}
              $color="#4ec9b0"
            >
              &lt;DEV /&gt;
            </FloatingElement>
          </ParallaxLayer>
          
          <SceneContent>
            <SceneTitle $color={scene.color}>
              {scene.title}
            </SceneTitle>
            {scene.content}
          </SceneContent>
        </Scene>
      ))}
    </CinematicContainer>
  );
};

export default CinematicScroller;
export { SceneContent, SceneTitle, Scene };

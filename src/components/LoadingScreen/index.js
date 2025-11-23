import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

// 3D CONTAINER
const Container3D = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%);
  z-index: 99999;
  animation: ${({ $isExiting }) => $isExiting ? fadeOut : 'none'} 1s ease-out forwards;
  overflow: hidden;
  
  canvas {
    width: 100% !important;
    height: 100% !important;
    display: block;
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 4px;
  background: rgba(78, 201, 176, 0.2);
  border-radius: 2px;
  overflow: hidden;
  z-index: 10;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${props => props.$progress || 0}%;
    background: linear-gradient(90deg, #4ec9b0, #569cd6, #dcdcaa);
    transition: width 0.3s ease;
    box-shadow: 0 0 20px rgba(78, 201, 176, 0.8);
  }
`;

const LoadingText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 15px;
  z-index: 10;
  pointer-events: none;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 90%;
  
  @media (max-width: 768px) {
    gap: 8px;
    top: 45%;
  }
  
  @media (max-width: 480px) {
    gap: 5px;
    flex-direction: column;
    align-items: center;
  }
`;

const FallingLetter = styled.span`
  color: ${props => props.$hasLanded ? '#4ec9b0' : 'transparent'};
  font-size: 56px;
  font-weight: 900;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  opacity: ${props => props.$hasLanded ? 1 : 0};
  transform: ${props => props.$hasLanded ? 'scale(1)' : 'scale(0.5)'};
  text-shadow: 
    0 0 20px rgba(78, 201, 176, ${props => props.$hasLanded ? 0.8 : 0}),
    0 0 40px rgba(86, 156, 214, ${props => props.$hasLanded ? 0.6 : 0}),
    0 0 60px rgba(220, 220, 170, ${props => props.$hasLanded ? 0.4 : 0});
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: ${props => props.$hasLanded ? 'glow 2s ease-in-out infinite' : 'none'};

  @media (max-width: 768px) {
    font-size: 36px;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
    letter-spacing: 0.03em;
  }

  @keyframes glow {
    0%, 100% { text-shadow: 
      0 0 20px rgba(78, 201, 176, 0.8),
      0 0 40px rgba(86, 156, 214, 0.6),
      0 0 60px rgba(220, 220, 170, 0.4); 
    }
    50% { text-shadow: 
      0 0 30px rgba(78, 201, 176, 1),
      0 0 60px rgba(86, 156, 214, 0.8),
      0 0 90px rgba(220, 220, 170, 0.6); 
    }
  }
`;

// KALI LINUX TERMINAL LOADING BAR
const LoadingBarContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 600px;
  perspective: 1500px;
  z-index: 10;
  
  @media (max-width: 768px) {
    width: 85%;
    max-width: 500px;
  }
  
  @media (max-width: 480px) {
    width: 90%;
    max-width: 350px;
    perspective: 1000px;
  }
`;

const KaliTerminalBox = styled.div`
  background: #000;
  border: 1px solid #00ff41;
  border-radius: 2px;
  padding: 15px;
  transform-style: preserve-3d;
  transform: rotateX(8deg) translateZ(20px);
  box-shadow: 
    0 20px 50px rgba(0, 0, 0, 0.9),
    0 0 30px rgba(0, 255, 65, 0.2);
  font-family: 'Courier New', monospace;
  
  @media (max-width: 768px) {
    padding: 12px;
    transform: rotateX(5deg) translateZ(15px);
  }
  
  @media (max-width: 480px) {
    padding: 10px;
    transform: rotateX(3deg) translateZ(10px);
    border-width: 1px;
  }
`;

const TerminalLine = styled.div`
  color: #00ff41;
  font-size: 13px;
  margin-bottom: 8px;
  text-shadow: 0 0 5px rgba(0, 255, 65, 0.5);
  word-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: 11px;
    margin-bottom: 6px;
  }
  
  @media (max-width: 480px) {
    font-size: 9px;
    margin-bottom: 5px;
  }
  
  .user {
    color: #00ff41;
  }
  
  .at {
    color: #fff;
  }
  
  .host {
    color: #00ff41;
  }
  
  .path {
    color: #0080ff;
  }
  
  .prompt {
    color: #ff073a;
  }
`;

const LoadingBarTrack = styled.div`
  width: 100%;
  height: 20px;
  background: #0a0a0a;
  border: 1px solid #00ff41;
  position: relative;
  overflow: hidden;
`;

const LoadingBarFill = styled.div`
  height: 100%;
  width: ${props => props.$progress || 0}%;
  background: #00ff41;
  transition: width 0.2s linear;
  box-shadow: 0 0 10px rgba(0, 255, 65, 0.8);
`;

const StatusLine = styled.div`
  color: #00ff41;
  font-size: 12px;
  margin-top: 8px;
  text-shadow: 0 0 5px rgba(0, 255, 65, 0.5);
  word-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: 10px;
    margin-top: 6px;
  }
  
  @media (max-width: 480px) {
    font-size: 9px;
    margin-top: 5px;
  }
  
  .percent {
    color: #fff;
  }
`;

// FALLING LETTER BOX
function FallingLetterBox({ char, index, onLand }) {
  const meshRef = useRef();
  const [hasLanded, setHasLanded] = useState(false);
  const velocity = useRef(-0.15 - Math.random() * 0.1);
  const rotationSpeed = useRef([
    (Math.random() - 0.5) * 0.15,
    (Math.random() - 0.5) * 0.15,
    (Math.random() - 0.5) * 0.15
  ]);
  
  const startX = -6 + index * 1;
  const groundY = -2;

  useFrame(() => {
    if (!meshRef.current || hasLanded) return;

    // Apply gravity
    velocity.current -= 0.008;
    meshRef.current.position.y += velocity.current;

    // Rotate while falling
    meshRef.current.rotation.x += rotationSpeed.current[0];
    meshRef.current.rotation.y += rotationSpeed.current[1];
    meshRef.current.rotation.z += rotationSpeed.current[2];

    // Check if landed
    if (meshRef.current.position.y <= groundY && !hasLanded) {
      meshRef.current.position.y = groundY;
      meshRef.current.rotation.set(0, 0, 0);
      setHasLanded(true);
      velocity.current = 0;
      
      // Play sound
      if (onLand) {
        onLand();
      }

      // Bounce effect
      setTimeout(() => {
        if (meshRef.current) {
          meshRef.current.position.y = groundY + 0.15;
          setTimeout(() => {
            if (meshRef.current) meshRef.current.position.y = groundY;
          }, 100);
        }
      }, 10);
    }
  });

  return (
    <mesh ref={meshRef} position={[startX, 5 + index * 0.5, 0]} castShadow>
      <boxGeometry args={[0.6, 0.6, 0.6]} />
      <meshStandardMaterial
        color={hasLanded ? '#4ec9b0' : '#569cd6'}
        metalness={0.8}
        roughness={0.2}
        emissive={hasLanded ? '#4ec9b0' : '#569cd6'}
        emissiveIntensity={hasLanded ? 0.5 : 0.2}
      />
    </mesh>
  );
}

// GROUND PLANE
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <planeGeometry args={[20, 10]} />
      <meshStandardMaterial
        color="#1a1a2e"
        metalness={0.8}
        roughness={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// MAIN 3D SCENE
function Scene({ onAllLanded, onLetterLand }) {
  const name = "SUDHIR SHARMA";
  const letters = name.split('');
  const [landedCount, setLandedCount] = useState(0);
  const audioContextRef = useRef(null);

  useEffect(() => {
    // Initialize Web Audio API
    try {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      // Web Audio API not supported
    }
  }, []);

  const playBlockSound = (index) => {
    if (!audioContextRef.current) return;

    try {
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Block landing sound (low thump)
      oscillator.frequency.setValueAtTime(80, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.2);
    } catch (e) {
      // Sound playback failed
    }

    // Notify that letter has landed
    if (onLetterLand) {
      onLetterLand(index);
    }

    setLandedCount(prev => {
      const newCount = prev + 1;
      if (newCount === letters.length && onAllLanded) {
        setTimeout(onAllLanded, 1000);
      }
      return newCount;
    });
  };

  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.5}
        penumbra={1}
        intensity={1.5}
        castShadow
        color="#4ec9b0"
      />
      <spotLight
        position={[-10, 10, -10]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        color="#569cd6"
      />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#dcdcaa" />

      <Ground />

      {letters.map((char, index) => {
        return (
          <FallingLetterBox
            key={index}
            char={char}
            index={index}
            onLand={() => playBlockSound(index)}
          />
        );
      })}

      <fog attach="fog" args={['#0a0a0a', 5, 25]} />
    </>
  );
}

// MAIN COMPONENT
const LoadingScreen = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const totalModules = 13;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Faster progress - increase by 3-6% each tick
        const increment = 3 + Math.random() * 3;
        const newProgress = Math.min(100, prev + increment);
        return newProgress;
      });
    }, 150);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          if (onLoadComplete) {
            onLoadComplete();
          }
        }, 800);
      }, 500);
    }
  }, [progress, onLoadComplete]);

  // Calculate modules based on progress
  const modulesLoaded = Math.floor((progress / 100) * totalModules);

  return (
    <Container3D $isExiting={isExiting}>
      <Canvas
        shadows
        camera={{ position: [0, 2, 12], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: 'transparent', display: 'none' }}
      >
        <Scene 
          onAllLanded={() => {}}
          onLetterLand={() => {}}
        />
      </Canvas>

      <LoadingBarContainer>
        <KaliTerminalBox>
          <TerminalLine>
            <span className="user">root</span>
            <span className="at">@</span>
            <span className="host">kali</span>
            <span className="path">:~/portfolio</span>
            <span className="prompt">#</span> ./load_portfolio.sh
          </TerminalLine>
          <StatusLine>
            Loading... <span className="percent">{Math.round(progress)}%</span> [{modulesLoaded}/{totalModules} modules]
          </StatusLine>
        </KaliTerminalBox>
      </LoadingBarContainer>
    </Container3D>
  );
};

export default LoadingScreen;

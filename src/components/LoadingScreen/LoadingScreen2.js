import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Canvas, useFrame } from '@react-three/fiber';

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Container3D = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%);
  z-index: 99999;
  animation: ${({ $isExiting }) => $isExiting ? fadeOut : 'none'} 1s ease-out forwards;
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
  color: #4ec9b0;
  font-size: 48px;
  font-weight: 900;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  z-index: 10;
  text-shadow: 
    0 0 10px rgba(78, 201, 176, 0.8),
    0 0 20px rgba(86, 156, 214, 0.6),
    0 0 30px rgba(220, 220, 170, 0.4);
`;

const SubText = styled.div`
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  color: #4ec9b0;
  font-size: 14px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  z-index: 10;
`;

// SPINNING CUBE
function TestCube() {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial 
        color="#4ec9b0" 
        emissive="#4ec9b0" 
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

const LoadingScreen = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    console.log('✅ LoadingScreen mounted');
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(100, prev + 5);
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              if (onLoadComplete) {
                console.log('✅ Calling onLoadComplete');
                onLoadComplete();
              }
            }, 1000);
          }, 2000);
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <Container3D $isExiting={isExiting}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
        onCreated={() => console.log('✅ Canvas created successfully!')}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <TestCube />
      </Canvas>

      <LoadingText>SUDHIR SHARMA</LoadingText>
      <SubText>LOADING EXPERIENCE...</SubText>
      <ProgressBar $progress={progress} />
    </Container3D>
  );
};

export default LoadingScreen;

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = (props) => {
  const ref = useRef();
  const { mouse, viewport } = useThree();
  
  // Generate random points in a sphere - more particles, more visible
  const points = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();
    
    for (let i = 0; i < count; i++) {
      // Random position in a large sphere - closer to camera
      const r = 25 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // More vibrant teal/cyan/blue colors
      const choice = Math.random();
      if (choice > 0.7) color.set('#4ec9b0'); // Teal - more frequent
      else if (choice > 0.4) color.set('#3da58a'); // Darker teal
      else if (choice > 0.2) color.set('#569cd6'); // Blue
      else color.set('#80d4c4'); // Light teal
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Constant slow rotation
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 30;
      
      // Mouse parallax (very subtle)
      const x = (mouse.x * viewport.width) / 100;
      const y = (mouse.y * viewport.height) / 100;
      
      ref.current.position.x += (x - ref.current.position.x) * 0.05;
      ref.current.position.y += (-y - ref.current.position.y) * 0.05;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={points.positions} colors={points.colors} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          vertexColors
          size={0.15}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.9}
        />
      </Points>
    </group>
  );
};

const CinematicBackground = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
      background: 'radial-gradient(ellipse at 30% 20%, #1e2a2a 0%, #0a0f0f 40%, #050808 100%)'
    }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default CinematicBackground;

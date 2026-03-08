'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, OrbitControls } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function BangleModel() {
  const meshRef = useRef<THREE.Mesh>(null);

  const threadTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = '#7a1f2c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 180; i += 1) {
      ctx.strokeStyle = i % 2 === 0 ? 'rgba(255,233,201,0.3)' : 'rgba(94,18,30,0.32)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(i * 6, 0);
      ctx.lineTo(i * 6 - 150, canvas.height);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 1);
    texture.anisotropy = 16;
    return texture;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
  });

  return (
    <group>
      <mesh ref={meshRef} rotation={[1.2, 0, 0]}>
        <torusGeometry args={[2.25, 0.5, 80, 320]} />
        <meshPhysicalMaterial
          map={threadTexture ?? undefined}
          roughness={0.3}
          clearcoat={0.8}
          clearcoatRoughness={0.22}
          metalness={0.12}
          reflectivity={1}
        />
      </mesh>

      {[...Array(18)].map((_, i) => {
        const angle = (i / 18) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 2.25, Math.sin(angle) * 2.25, 0]} rotation={[0.4, 0.2, angle]}>
            <sphereGeometry args={[0.11, 20, 20]} />
            <meshStandardMaterial color="#c89b3c" metalness={0.85} roughness={0.2} />
          </mesh>
        );
      })}
    </group>
  );
}

function CinematicRig() {
  const controls = useRef<any>(null);

  useFrame((state) => {
    if (!controls.current) return;
    const t = state.clock.elapsedTime;
    controls.current.setAzimuthalAngle(Math.sin(t * 0.18) * 0.3);
    controls.current.setPolarAngle(Math.PI / 2.3 + Math.sin(t * 0.22) * 0.04);
    controls.current.update();
  });

  return <OrbitControls ref={controls} enableZoom={false} enablePan={false} enableRotate={false} />;
}

export function BangleScene() {
  return (
    <Canvas camera={{ position: [0, 0, 7.5], fov: 34 }}>
      <color attach="background" args={['#18070b']} />
      <fog attach="fog" args={['#18070b', 8, 17]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 3]} intensity={2} color="#ffd9a4" />
      <spotLight position={[-4, 3, 6]} intensity={55} angle={0.35} penumbra={0.45} color="#fff2da" />
      <Environment preset="studio" />
      <Float speed={0.9} rotationIntensity={0.1} floatIntensity={0.32}>
        <BangleModel />
      </Float>
      <CinematicRig />
    </Canvas>
  );
}

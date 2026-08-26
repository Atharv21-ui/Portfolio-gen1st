import { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { easing } from "maath";

function Lens() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    // Smooth mouse follow
    const targetX = (state.pointer.x * state.viewport.width) / 2;
    const targetY = (state.pointer.y * state.viewport.height) / 2;
    
    easing.damp3(
      ref.current.position,
      [targetX, targetY, 15],
      0.15,
      delta
    );
  });

  return (
    <mesh ref={ref} position={[0, 0, 15]} scale={[2.2, 2.2, 0.4]}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshTransmissionMaterial
        ior={1.2}
        thickness={1.5}
        anisotropy={0.1}
        chromaticAberration={0.04}
        transmission={1}
        roughness={0}
        clearcoat={1}
        clearcoatRoughness={0.1}
        color="#ffffff"
      />
    </mesh>
  );
}

function Typography() {
  return (
    <mesh position={[0, 0, 12]} scale={[5, 2, 1]}>
      <boxGeometry />
      <meshBasicMaterial color="#FF5E00" />
    </mesh>
  );
}

import { Suspense } from "react";
export default function FluidGlass() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 20], fov: 15 }}
        gl={{ alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          
          <Typography />
          <Lens />
        </Suspense>
      </Canvas>
    </div>
  );
}

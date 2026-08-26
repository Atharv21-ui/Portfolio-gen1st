/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

// @ts-ignore
import cardGLB from '../../assets/lanyard/card.glb';
// @ts-ignore
import lanyard from '../../assets/lanyard/lanyard.png';
// @ts-ignore
import avatarFront from '../../assets/lanyard/avatar_front.png';

import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({
  gravity = [0, -40, 0],
  transparent = true,
  lanyardImage = null,
  lanyardWidth = 1
}: any) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position: [0, 0, 13], fov: 20 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color('#050508'), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity as [number, number, number]} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band
            isMobile={isMobile}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
          />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  lanyardImage = null,
  lanyardWidth = 1
}: any) {
  const band = useRef<THREE.Mesh>(null),
    fixed = useRef<any>(null),
    j1 = useRef<any>(null),
    j2 = useRef<any>(null),
    j3 = useRef<any>(null),
    card = useRef<any>(null);
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 } as any;
  const { nodes, materials } = useGLTF(cardGLB) as any;
  const texture = useTexture(lanyardImage || lanyard) as THREE.Texture;
  const avatarTex = useTexture(avatarFront) as THREE.Texture;

  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;
    const baseImg = baseMap.image;
    if (!baseImg) return baseMap;
    
    const W = baseImg.width;
    const H = baseImg.height;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;
    
    // Draw base map (black/dark background)
    ctx.fillStyle = '#111118';
    ctx.fillRect(0, 0, W, H);

    // Front Face Rect: x:0, y:0, w:0.5, h:0.755
    const drawFront = () => {
      const fx = 0 * W;
      const fy = 0 * H;
      const fw = 0.5 * W;
      const fh = 0.755 * H;

      // Draw background
      ctx.fillStyle = '#181822';
      ctx.fillRect(fx, fy, fw, fh);

      // Draw Avatar (circular)
      const centerX = fx + fw / 2;
      const avatarY = fy + fh * 0.35;
      const avatarRadius = fw * 0.3; // Much larger avatar

      if (avatarTex && avatarTex.image) {
        const img = avatarTex.image as HTMLImageElement;
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, avatarY, avatarRadius, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, centerX - avatarRadius, avatarY - avatarRadius, avatarRadius * 2, avatarRadius * 2);
        ctx.restore();
        
        // Avatar border
        ctx.beginPath();
        ctx.arc(centerX, avatarY, avatarRadius, 0, Math.PI * 2);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 8;
        ctx.stroke();
      }

      // Draw Text
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${fw * 0.17}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('Atharv Singh', centerX, avatarY + avatarRadius + fh * 0.13);

      ctx.fillStyle = '#60a5fa';
      ctx.font = `bold ${fw * 0.085}px sans-serif`;
      ctx.fillText('DEVELOPER', centerX, avatarY + avatarRadius + fh * 0.22);
      
      ctx.fillStyle = '#888888';
      ctx.font = `normal ${fw * 0.065}px sans-serif`;
      ctx.fillText('Click to flip', centerX, fy + fh - fh * 0.04);
    };

    // Back Face Rect: x:0.5, y:0, w:0.5, h:0.757
    const drawBack = () => {
      const bx = 0.5 * W;
      const by = 0 * H;
      const bw = 0.5 * W;
      const bh = 0.757 * H;

      ctx.fillStyle = '#0a0a0e';
      ctx.fillRect(bx, by, bw, bh);

      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${bw * 0.1}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('Details', bx + bw / 2, by + bh * 0.15);

      // Line
      ctx.beginPath();
      ctx.moveTo(bx + bw * 0.2, by + bh * 0.2);
      ctx.lineTo(bx + bw * 0.8, by + bh * 0.2);
      ctx.strokeStyle = '#333';
      ctx.stroke();

      ctx.textAlign = 'left';
      
      // Age
      ctx.fillStyle = '#888';
      ctx.font = `normal ${bw * 0.06}px sans-serif`;
      ctx.fillText('AGE', bx + bw * 0.15, by + bh * 0.35);
      ctx.fillStyle = '#fff';
      ctx.font = `bold ${bw * 0.1}px sans-serif`;
      ctx.fillText('16 yrs', bx + bw * 0.15, by + bh * 0.45);

      // Education
      ctx.fillStyle = '#888';
      ctx.font = `normal ${bw * 0.06}px sans-serif`;
      ctx.fillText('EDUCATION', bx + bw * 0.15, by + bh * 0.6);
      ctx.fillStyle = '#fff';
      ctx.font = `bold ${bw * 0.09}px sans-serif`;
      ctx.fillText('Study at RLPS', bx + bw * 0.15, by + bh * 0.7);

      // Links
      ctx.fillStyle = '#888';
      ctx.font = `normal ${bw * 0.06}px sans-serif`;
      ctx.fillText('LINKS', bx + bw * 0.15, by + bh * 0.85);
      
      ctx.fillStyle = '#60a5fa';
      ctx.font = `bold ${bw * 0.075}px sans-serif`;
      ctx.fillText('Portfolio Demo', bx + bw * 0.15, by + bh * 0.93);
    };

    drawFront();
    drawBack();

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [avatarTex, materials.base.map]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0.5, 0),
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, 1.5, 0)
      ])
  );
  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);
  const dragStartPos = useRef(new THREE.Vector2());
  const dragStartTime = useRef(0);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      
      card.current.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      
      const dist = curve.points[0].distanceTo(curve.points[3]);
      if (band.current && dist > 0.01) {
        (band.current.geometry as any).setPoints(curve.getPoints(isMobile ? 16 : 32));
      }
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  (curve as any).curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
              
              // If click was short and didn't move much, flip the card!
              const dist = dragStartPos.current.distanceTo(new THREE.Vector2(e.clientX, e.clientY));
              const time = performance.now() - dragStartTime.current;
              if (dist < 10 && time < 300) {
                card.current?.applyTorqueImpulse({ x: 0, y: Math.random() > 0.5 ? 0.8 : -0.8, z: 0 }, true);
              }
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              dragStartPos.current.set(e.clientX, e.clientY);
              dragStartTime.current = performance.now();
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
                color="#ffffff"
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        {/* @ts-ignore */}
        <meshLineGeometry />
        {/* @ts-ignore */}
        <meshLineMaterial
          color="#aaaaaa"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          lineWidth={lanyardWidth * 0.6}
        />
      </mesh>
    </>
  );
}

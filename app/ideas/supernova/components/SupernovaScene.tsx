'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { HandData, StarPhase, SimulationState } from '../types';

// Shader
const particleVertexShader = `
  attribute float aSize;
  attribute float aRandom;
  attribute vec3 aColor;
  varying vec3 vColor;
  uniform float uTime;
  uniform float uPhase;
  uniform float uPinch; // Controls expansion/contraction

  void main() {
    vec3 pos = position;

    // 1. Hand Expansion Control (Pinch)
    float expansionFactor = 0.5 + (uPinch * 1.0);

    // 2. Breathing/Pulse effect
    float breathe = sin(uTime * 3.0 + aRandom * 10.0) * 0.05;

    // 3. Phase specific distortions
    if (uPhase == 2.0) { // IMPLODING
        // Violent sucking in (Slower oscillation for new timing)
        float implosion = sin(uTime * 5.0) * 0.15; // Slower frequency, larger amplitude
        pos *= (0.7 + implosion); // Shrink
    } else if (uPhase == 3.0) { // SUPERNOVA
        // Expansion handled in JS for physics, but we add visual noise here
        expansionFactor *= 1.0;
    } else {
        // Normal state
        pos *= (expansionFactor + breathe);
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (1500.0 / -mvPosition.z);

    // Color Dynamics
    vec3 finalColor = aColor;

    // Heat up on crush (pinch)
    if (uPinch < 0.3) {
        finalColor = mix(aColor, vec3(1.0, 1.0, 1.0), (0.3 - uPinch) * 3.0);
    }

    // Implosion turns white/blue
    if (uPhase == 2.0) {
        finalColor = mix(aColor, vec3(0.8, 0.9, 1.0), 0.8);
    }

    vColor = finalColor;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particleFragmentShader = `
  varying vec3 vColor;

  void main() {
    float r = distance(gl_PointCoord, vec2(0.5));
    if (r > 0.5) discard;

    float glow = 1.0 - (r * 2.0);
    glow = pow(glow, 2.0);

    gl_FragColor = vec4(vColor, glow);
  }
`;

interface ParticlesProps {
  count: number;
  handData: HandData;
  phase: StarPhase;
}

const Particles: React.FC<ParticlesProps> = ({ count, handData, phase }) => {
  const mesh = useRef<THREE.Points>(null);
  // Three.js shader uniforms must be mutable - using useState for stable reference
  const [uniforms] = React.useState(() => ({
    uTime: { value: 0 },
    uPhase: { value: 0 },
    uPinch: { value: 1 },
  }));

  // Generate particle data using lazy initializer to avoid impure function calls during render
  const [{ positions, colors, sizes, randoms }] = React.useState(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const randoms = new Float32Array(count);

    const color1 = new THREE.Color('#fbbf24'); // Orange
    const color2 = new THREE.Color('#ef4444'); // Red
    const color3 = new THREE.Color('#3b82f6'); // Blue core

    for (let i = 0; i < count; i++) {
      const r = Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const normalizedR = r / 25;
      const c = new THREE.Color();
      if (normalizedR < 0.2) c.lerp(color3, Math.random());
      else c.lerpColors(color1, color2, normalizedR);

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = (Math.random() * 4) + 1.5;
      randoms[i] = Math.random();
    }
    return { positions, colors, sizes, randoms };
  });

  useFrame((state) => {
    const { clock } = state;
    if (!mesh.current) return;

    // Three.js shader uniforms must be mutated imperatively
    // eslint-disable-next-line react-hooks/immutability
    uniforms.uTime.value = clock.getElapsedTime();

    let phaseVal = 0;
    if (phase === StarPhase.UNSTABLE) phaseVal = 1;
    if (phase === StarPhase.IMPLODING) phaseVal = 2;
    if (phase === StarPhase.SUPERNOVA) phaseVal = 3;
    if (phase === StarPhase.REMNANT) phaseVal = 4;

    uniforms.uPhase.value = phaseVal;

    uniforms.uPinch.value = handData.isPresent ? handData.pinchDistance : 1.0;

    const positionsAttribute = mesh.current.geometry.attributes.position;

    // Rotation
    if (handData.isPresent) {
        mesh.current.rotation.y += handData.x * 0.05;
        mesh.current.rotation.x += handData.y * 0.05;
    } else {
        mesh.current.rotation.y += 0.002;
    }

    // Physics
    for (let i = 0; i < count; i++) {
        if (phase === StarPhase.SUPERNOVA) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            let x = positions[ix];
            let y = positions[iy];
            let z = positions[iz];

            let nx = x; let ny = y; let nz = z;
            const len = Math.sqrt(x*x+y*y+z*z);
            if (len > 0) { nx/=len; ny/=len; nz/=len; }

            // Explosion speed - Increased to 2.0 for fast action
            const speed = (0.5 + Math.random() * 1.5) * 2.0;

            x += nx * speed;
            y += ny * speed;
            z += nz * speed;

            positionsAttribute.setXYZ(i, x, y, z);
            positionsAttribute.needsUpdate = true;
        }
        // No else block needed for STABLE because we remount the component (key change) to reset positions
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aColor"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          args={[randoms, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        attach="material"
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Scene Controller handles Camera visuals (Shake, Zoom, Warp)
const SceneController: React.FC<{ handData: HandData; phase: StarPhase }> = ({ handData, phase }) => {
    const { camera } = useThree();

    useFrame((state) => {
        let targetZ = 80;
        let targetFov = 60;

        // 1. Hand Zoom Logic
        if (handData.isPresent) {
            targetZ = 120 - (handData.z * 100);
        }

        // 2. Phase Effects - Three.js requires imperative camera mutations
        if (phase === StarPhase.IMPLODING) {
            // Shake Effect
            // eslint-disable-next-line react-hooks/immutability
            camera.position.x = (Math.random() - 0.5) * 2;

            camera.position.y = (Math.random() - 0.5) * 2;
            // Warp FOV to simulate sucking
            targetFov = 100;
            targetZ = 40; // Pull in close
        } else if (phase === StarPhase.SUPERNOVA) {
            // Travel Effect
            targetZ = 180;
            targetFov = 80;

            // Subtle drift
            camera.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 5;
            camera.position.y = Math.cos(state.clock.elapsedTime * 0.5) * 5;
        } else {
             // Reset shake
             camera.position.x += (0 - camera.position.x) * 0.1;
             camera.position.y += (0 - camera.position.y) * 0.1;
        }

        // Apply Camera Changes
        camera.position.z += (targetZ - camera.position.z) * 0.05;

        const pCam = camera as THREE.PerspectiveCamera;
        // Three.js FOV must be assigned directly, no setter method
        // eslint-disable-next-line react-hooks/immutability
        pCam.fov += (targetFov - pCam.fov) * 0.05;
        pCam.updateProjectionMatrix();
    });
    return null;
};

// Dynamic Star Background
const DynamicStars: React.FC<{ phase: StarPhase }> = ({ phase }) => {
    const starRef = useRef<THREE.Points>(null);

    useFrame(() => {
        if (starRef.current) {
            // Normal rotation
            starRef.current.rotation.y += 0.0005;

            // Warp speed effect during Supernova
            if (phase === StarPhase.SUPERNOVA) {
                 starRef.current.rotation.z += 0.02; // Faster spin
            }
        }
    });

    // Speed increases during explosion but kept reasonable
    const speed = phase === StarPhase.SUPERNOVA ? 3.0 : 0.5;
    const count = phase === StarPhase.SUPERNOVA ? 8000 : 5000;

    return <Stars ref={starRef} radius={300} depth={50} count={count} factor={6} saturation={0} fade speed={speed} />;
}

const SupernovaScene: React.FC<{
  handData: HandData;
  simState: SimulationState;
  resetKey: number;
}> = ({ handData, simState, resetKey }) => {
  return (
    <div className="w-full h-full absolute top-0 left-0 z-0 !bg-black">
      <Canvas gl={{ alpha: false }} style={{ background: '#000000' }}>
        <color attach="background" args={['#000000']} />
        <PerspectiveCamera makeDefault position={[0, 0, 80]} fov={60} />
        <ambientLight intensity={0.5} />

        <DynamicStars phase={simState.phase} />

        <SceneController handData={handData} phase={simState.phase} />

        {/* We use resetKey to force the Particles component to re-mount and re-calculate initial positions on reset */}
        <Particles
            key={resetKey}
            count={8000}
            handData={handData}
            phase={simState.phase}
        />

        <OrbitControls
            enableZoom={!handData.isPresent}
            enableRotate={!handData.isPresent}
            enablePan={false}
        />
      </Canvas>
    </div>
  );
};

export default SupernovaScene;

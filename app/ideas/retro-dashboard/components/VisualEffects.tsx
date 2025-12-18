'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cloud, Stars, Float, Sparkles, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';
import { VisualMode } from '../types';

// --- Custom Shaders ---

const RadarMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#22c55e') }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColor;

    void main() {
      vec2 center = vec2(0.5);
      vec2 toFrag = vUv - center;
      float dist = length(toFrag);

      // Rotating beam
      float angle = atan(toFrag.y, toFrag.x);
      float beamAngle = mod(-uTime * 3.0, 6.28318);
      float diff = mod(angle - beamAngle + 3.14159, 6.28318) - 3.14159;
      float beam = smoothstep(0.5, 0.0, abs(diff)) * step(0.0, diff);

      // Fade trail
      float trail = smoothstep(0.0, 2.5, (angle - beamAngle));
      if(beamAngle < -3.0 && angle > 3.0) trail = 1.0;

      // Concentric rings
      float rings = step(0.95, fract(dist * 8.0));

      // Crosshair
      float axes = step(0.995, 1.0 - abs(vUv.x - 0.5)) + step(0.995, 1.0 - abs(vUv.y - 0.5));

      float alpha = (beam + trail * 0.5 + rings * 0.3 + axes * 0.2);
      alpha *= (1.0 - smoothstep(0.45, 0.5, dist));

      gl_FragColor = vec4(uColor, alpha);
    }
  `
};

const SunMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color('#d946ef') },
    uColor2: { value: new THREE.Color('#f59e0b') }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;

    void main() {
      float y = vUv.y;

      vec3 color = mix(uColor2, uColor1, y);

      // Moving scanlines
      float scanline = step(0.15, mod(y * 15.0 + uTime * 0.5, 1.0));
      if (y < 0.55) {
          color *= scanline;
      }

      float alpha = smoothstep(0.5, 0.48, length(vUv - 0.5));
      if (alpha < 0.01) discard;

      gl_FragColor = vec4(color, alpha);
    }
  `
};

// --- Sub-Components ---

const CyberCity = () => {
  const count = 400;
  // Generate data for instances using lazy initializer to avoid impure function calls during render
  const [data] = React.useState(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const isLeft = i % 2 === 0;
      const x = (isLeft ? -1 : 1) * (15 + Math.random() * 40);
      const z = (Math.random() - 0.5) * 200;
      const h = 5 + Math.random() * 25;
      const w = 2 + Math.random() * 6;
      const d = 2 + Math.random() * 6;
      temp.push({ position: [x, h/2 - 10, z], scale: [w, h, d], speed: 10 + Math.random() * 5 });
    }
    return temp;
  });

  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Animate buildings moving towards camera
    data.forEach((d, i) => {
      d.position[2] += d.speed * delta * 5;
      if (d.position[2] > 50) d.position[2] = -150;

      dummy.position.set(d.position[0], d.position[1], d.position[2]);
      dummy.scale.set(d.scale[0], d.scale[1], d.scale[2]);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry />
      <meshStandardMaterial color="#2a0a2a" emissive="#d946ef" emissiveIntensity={0.2} roughness={0.2} metalness={0.8} />
    </instancedMesh>
  );
};

const SynthwaveScene = () => {
  const gridRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (gridRef.current) {
      // Infinite scroll floor
      gridRef.current.position.z = (state.clock.elapsedTime * 20) % 20;
    }
  });

  return (
    <group>
      {/* Sun */}
      <mesh position={[0, 15, -100]}>
        <planeGeometry args={[80, 80]} />
        <shaderMaterial args={[SunMaterial]} transparent depthWrite={false} />
      </mesh>

      {/* Floor */}
      <group position={[0, -10, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} ref={gridRef}>
          <planeGeometry args={[200, 200, 40, 40]} />
          <meshBasicMaterial
            color="#d946ef"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
           <planeGeometry args={[400, 400]} />
           <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.9} />
        </mesh>
      </group>

      <CyberCity />
      <Stars radius={150} depth={50} count={5000} factor={4} saturation={1} fade speed={2} />
      <fog attach="fog" args={['#1a051a', 20, 120]} />
    </group>
  );
};

const WireframeGlobe = () => {
  const group = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    if (outerRef.current) {
      outerRef.current.rotation.x = state.clock.elapsedTime * -0.05;
      outerRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={group}>
      {/* Inner Globe */}
      <mesh>
        <icosahedronGeometry args={[4, 4]} />
        <meshBasicMaterial color="#000" polygonOffset polygonOffsetFactor={1} />
        <lineSegments>
          <wireframeGeometry args={[new THREE.IcosahedronGeometry(4, 4)]} />
          <lineBasicMaterial color="#10b981" transparent opacity={0.15} />
        </lineSegments>
      </mesh>

      {/* Points Surface */}
      <points>
         <icosahedronGeometry args={[4.05, 6]} />
         <pointsMaterial size={0.03} color="#34d399" transparent opacity={0.6} />
      </points>

      {/* Outer Rings */}
      <mesh ref={outerRef}>
         <torusGeometry args={[6, 0.02, 16, 100]} />
         <meshBasicMaterial color="#10b981" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[Math.PI/2, 0, 0]}>
         <torusGeometry args={[7.5, 0.02, 16, 100]} />
         <meshBasicMaterial color="#059669" transparent opacity={0.2} />
      </mesh>

      {/* Glow */}
      <mesh>
        <sphereGeometry args={[3.8, 32, 32]} />
        <meshBasicMaterial color="#064e3b" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

const RadarScene = () => {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const blipRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (blipRef.current) {
      // Rotate blips slowly
      blipRef.current.rotation.z = -state.clock.elapsedTime * 0.1;
    }
  });

  // Random targets using lazy initializer to avoid impure function calls during render
  const [targets] = React.useState(() =>
    Array.from({length: 8}).map(() => ({
      x: (Math.random() - 0.5) * 20,
      y: (Math.random() - 0.5) * 20,
      scale: 0.5 + Math.random() * 0.5
    }))
  );

  return (
    <group rotation={[-Math.PI/2, 0, 0]}>
      {/* Main Radar Plane */}
      <mesh>
        <planeGeometry args={[40, 40]} />
        <shaderMaterial ref={shaderRef} args={[RadarMaterial]} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Grid lines */}
      <gridHelper args={[40, 40, '#003300', '#001100']} rotation={[Math.PI/2, 0, 0]} />

      {/* Targets */}
      <group ref={blipRef}>
        {targets.map((t, i) => (
           <mesh key={i} position={[t.x, t.y, 0.5]}>
              <ringGeometry args={[0.2 * t.scale, 0.3 * t.scale, 32]} />
              <meshBasicMaterial color="#4ade80" transparent opacity={0.8} side={THREE.DoubleSide} />
           </mesh>
        ))}
      </group>

      <fog attach="fog" args={['#000', 5, 50]} />
    </group>
  );
};

const MatrixRain = () => {
  const count = 100;
  const group = useRef<THREE.Group>(null);

  // Create columns of falling "code" using lazy initializer to avoid impure function calls during render
  const [streams] = React.useState(() =>
    Array.from({length: count}).map(() => ({
      x: (Math.random() - 0.5) * 60,
      z: (Math.random() - 0.5) * 40,
      speed: 2 + Math.random() * 5,
      offset: Math.random() * 100,
      height: 10 + Math.random() * 20
    }))
  );

  useFrame((state, delta) => {
    if (group.current) {
       group.current.children.forEach((child, i) => {
         const stream = streams[i];
         child.position.y -= stream.speed * delta;
         if (child.position.y < -20) child.position.y = 20;
       });
    }
  });

  return (
    <group ref={group}>
      {streams.map((s, i) => (
        <mesh key={i} position={[s.x, s.offset % 40 - 20, s.z]}>
           <boxGeometry args={[0.1, s.height, 0.1]} />
           <meshBasicMaterial color="#0f0" transparent opacity={0.4} wireframe />
        </mesh>
      ))}
      <fog attach="fog" args={['#000', 0, 40]} />
    </group>
  );
};

const WarpScene = () => {
  const starsRef = useRef<THREE.Points>(null);

  useFrame(() => {
    if (starsRef.current) {
      const positions = starsRef.current.geometry.attributes.position.array as Float32Array;
      for(let i=0; i<positions.length; i+=3) {
         positions[i+2] += 4; // Fast speed
         if(positions[i+2] > 50) positions[i+2] = -200;
      }
      starsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const [positions] = React.useState(() => {
    const pos = new Float32Array(4000 * 3);
    for(let i=0; i<4000; i++) {
      pos[i*3] = (Math.random() - 0.5) * 100;
      pos[i*3+1] = (Math.random() - 0.5) * 100;
      pos[i*3+2] = (Math.random() - 0.5) * 250 - 50;
    }
    return pos;
  });

  return (
    <group>
       <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#bfdbfe" size={0.4} transparent opacity={0.8} sizeAttenuation />
      </points>
      {/* Tunnel effect rings */}
      {Array.from({length: 5}).map((_, i) => (
         <mesh key={i} position={[0,0,-i*40]}>
            <torusGeometry args={[20, 0.5, 16, 50]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.1} />
         </mesh>
      ))}
      <fog attach="fog" args={['#000', 0, 150]} />
    </group>
  );
};

const StormScene = () => {
  const lightRef = useRef<THREE.PointLight>(null);
  const rainRef = useRef<THREE.Points>(null);

  useFrame(() => {
    // Rain
    if (rainRef.current) {
       const positions = rainRef.current.geometry.attributes.position.array as Float32Array;
       for(let i=1; i<positions.length; i+=3) {
          positions[i] -= 2;
          if(positions[i] < -30) positions[i] = 30;
       }
       rainRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Lightning
    if (lightRef.current) {
      if (Math.random() > 0.97) {
        lightRef.current.intensity = 50 + Math.random() * 100;
        lightRef.current.position.set((Math.random()-0.5)*100, 20, (Math.random()-0.5)*50);
      } else {
        lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, 0, 0.2);
      }
    }
  });

  const rainCount = 8000;
  const [rainPos] = React.useState(() => {
    const pos = new Float32Array(rainCount * 3);
    for(let i=0; i<rainCount; i++) {
       pos[i*3] = (Math.random() - 0.5) * 100;
       pos[i*3+1] = Math.random() * 60 - 30;
       pos[i*3+2] = (Math.random() - 0.5) * 60;
    }
    return pos;
  });

  return (
    <group>
      <pointLight ref={lightRef} color="#cbd5e1" distance={200} decay={2} />
      <Cloud opacity={0.3} speed={0.4} color="#334155" position={[0, 15, -30]} />
      <Cloud opacity={0.3} speed={0.2} color="#1e293b" position={[-20, 10, -20]} />
      <Cloud opacity={0.3} speed={0.6} color="#0f172a" position={[20, 20, -40]} />

      <points ref={rainRef}>
        <bufferGeometry>
           <bufferAttribute attach="attributes-position" args={[rainPos, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#94a3b8" size={0.15} transparent opacity={0.4} />
      </points>
      <fog attach="fog" args={['#020617', 0, 80]} />
    </group>
  );
};

const HeatmapTerrain = () => {
    // A more detailed terrain mesh
    const meshRef = useRef<THREE.Mesh>(null);
    const geomRef = useRef<THREE.PlaneGeometry>(null);

    useFrame(({ clock }) => {
        if (geomRef.current) {
            const pos = geomRef.current.attributes.position;
            const t = clock.elapsedTime * 0.5;
            for(let i=0; i<pos.count; i++){
                 const x = pos.getX(i);
                 const y = pos.getY(i);
                 // Simplex-ish noise movement
                 const z = Math.sin(x * 0.2 + t) * 2 + Math.cos(y * 0.3 + t) * 2;
                 pos.setZ(i, z);
            }
            pos.needsUpdate = true;
            geomRef.current.computeVertexNormals();
        }
    });

    return (
        <group rotation={[-Math.PI/2, 0, 0]} position={[0,-5,0]}>
            <mesh ref={meshRef}>
                <planeGeometry ref={geomRef} args={[80, 80, 64, 64]} />
                <meshStandardMaterial
                    color="#f97316"
                    wireframe
                    emissive="#c2410c"
                    emissiveIntensity={0.5}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <fog attach="fog" args={['#431407', 0, 60]} />
        </group>
    );
};

const ZenMode = () => {
    return (
        <group>
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
                <Icosahedron args={[3, 0]}>
                     <meshPhysicalMaterial
                        color="white"
                        roughness={0}
                        metalness={0.1}
                        transmission={1}
                        thickness={2}
                     />
                </Icosahedron>
                <Icosahedron args={[2, 0]}>
                     <meshBasicMaterial color="#fff" wireframe />
                </Icosahedron>
            </Float>
            <Sparkles count={100} scale={12} size={2} speed={0.4} opacity={0.5} color="white" />
            <fog attach="fog" args={['#000', 5, 40]} />
            <ambientLight intensity={1} />
        </group>
    );
};

// --- Main Switcher ---

export const SceneContent: React.FC<{ mode: VisualMode }> = ({ mode }) => {
  switch (mode) {
    case VisualMode.NEON_RETRO: return <SynthwaveScene />;
    case VisualMode.WIREFRAME_MAP: return (
        <>
            <WireframeGlobe />
            <Stars radius={150} count={2000} fade />
            <ambientLight intensity={0.5} />
        </>
    );
    case VisualMode.RADAR_SWEEP: return <RadarScene />;
    case VisualMode.WARP_SPEED: return <WarpScene />;
    case VisualMode.HEATMAP: return <HeatmapTerrain />;
    case VisualMode.MATRIX_RAIN: return <MatrixRain />;
    case VisualMode.STORM_WATCH: return <StormScene />;
    case VisualMode.ZEN_MINIMAL: return <ZenMode />;
    default: return null;
  }
};

'use client';

import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, Scanline, Glitch } from '@react-three/postprocessing';
import { VisualMode } from '../types';
import { SceneContent } from './VisualEffects';
import * as THREE from 'three';

interface MainViewportProps {
  mode: VisualMode;
}

const PostProcessingEffects: React.FC<{ mode: VisualMode }> = ({ mode }) => {
  return (
    <EffectComposer enableNormalPass={false}>
      <Bloom
        luminanceThreshold={mode === VisualMode.NEON_RETRO ? 0.1 : 0.6}
        mipmapBlur
        intensity={mode === VisualMode.NEON_RETRO ? 2.0 : 1.0}
        radius={0.6}
      />
      <Vignette offset={0.3} darkness={0.6} eskil={false} />
      <Noise opacity={0.1} />

      <Scanline
        density={3}
        opacity={(mode === VisualMode.RADAR_SWEEP || mode === VisualMode.MATRIX_RAIN) ? 0.15 : 0}
      />

      <Glitch
        delay={new THREE.Vector2(1.5, 3.5)}
        duration={new THREE.Vector2(0.1, 0.3)}
        strength={new THREE.Vector2(0.3, 0.5)}
        mode={0}
        active={mode === VisualMode.MATRIX_RAIN}
        ratio={0.85}
      />

      <Glitch
        delay={new THREE.Vector2(0.5, 1)}
        duration={new THREE.Vector2(0.05, 0.1)}
        strength={new THREE.Vector2(0.1, 0.1)}
        mode={0}
        active={mode === VisualMode.WARP_SPEED}
        ratio={0.1}
      />
    </EffectComposer>
  );
};

const MainViewport: React.FC<MainViewportProps> = ({ mode }) => {

  // Dynamic camera position based on mode
  const cameraPosition = useMemo(() => {
    switch(mode) {
      case VisualMode.NEON_RETRO: return [0, 4, 25];
      case VisualMode.WIREFRAME_MAP: return [0, 0, 14];
      case VisualMode.RADAR_SWEEP: return [0, 15, 15]; // Higher angle
      case VisualMode.WARP_SPEED: return [0, 0, 10];
      case VisualMode.MATRIX_RAIN: return [0, 0, 30];
      case VisualMode.STORM_WATCH: return [0, 5, 35];
      default: return [0, 2, 12];
    }
  }, [mode]);

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] border-b-4 border-gray-800 bg-black overflow-hidden shadow-[0_0_50px_rgba(0,0,0,1)_inset]">

      {/* Decorative HUD Elements */}
      <div className="absolute top-6 left-6 z-10 font-bold tracking-widest pointer-events-none select-none">
        <div className="border-l-2 border-cyan-500/50 bg-black/60 p-4 backdrop-blur-md shadow-lg rounded-r-lg">
          <p className="text-cyan-400 text-sm mb-1">SYS.VISUAL // {mode}</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-xs text-gray-300">RENDERING_ENGINE_ONLINE</p>
          </div>
        </div>
      </div>

      <div className="absolute top-6 right-6 z-10 pointer-events-none select-none hidden md:block">
        <div className="flex flex-col gap-1 items-end">
           <div className="text-[10px] text-gray-500 font-mono mb-1">BUFFER_STATUS</div>
           <div className="flex gap-1">
             {[...Array(8)].map((_, i) => (
               <div key={i} className={`w-1 h-3 ${i < 6 ? 'bg-cyan-500' : 'bg-gray-800'} transform skew-x-[-10deg]`}></div>
             ))}
           </div>
           <div className="flex gap-1 mt-1">
             {[...Array(8)].map((_, i) => (
               <div key={i} className={`w-1 h-3 ${i < 4 ? 'bg-purple-500' : 'bg-gray-800'} transform skew-x-[-10deg]`}></div>
             ))}
           </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 z-10 text-[10px] text-gray-500 font-mono pointer-events-none">
         <div className="flex gap-4">
           <div>
             <span className="text-gray-700">LAT:</span> 45.1209 N
           </div>
           <div>
             <span className="text-gray-700">LNG:</span> 93.2104 W
           </div>
           <div>
             <span className="text-gray-700">ALT:</span> 15,240 FT
           </div>
         </div>
      </div>

      {/* 3D Scene */}
      <Canvas
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]} // Cap DPR for performance with post-processing
      >
        <color attach="background" args={['#050505']} />

        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={cameraPosition as [number, number, number]} fov={60} />

          <OrbitControls
            enableZoom={mode !== VisualMode.RADAR_SWEEP}
            enablePan={false}
            maxPolarAngle={Math.PI / 2 - 0.05}
            minPolarAngle={Math.PI / 4}
            autoRotate={mode === VisualMode.NEON_RETRO || mode === VisualMode.WIREFRAME_MAP || mode === VisualMode.ZEN_MINIMAL}
            autoRotateSpeed={0.5}
            dampingFactor={0.05}
          />

          <SceneContent mode={mode} />
          <PostProcessingEffects mode={mode} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default MainViewport;

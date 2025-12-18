'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SciFiPanel } from './SciFiPanel';
import { ViewMode } from '../types';
import { RefreshCw } from 'lucide-react';

interface MainViewportProps {
  imageSrc: string | null;
  loading: boolean;
  onGenerate: (prompt: string) => void;
}

export const MainViewport: React.FC<MainViewportProps> = ({ imageSrc, loading, onGenerate }) => {
  const [activeMode, setActiveMode] = useState<ViewMode>(ViewMode.ORBITAL);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleScan = () => {
    // Prompts specifically tuned for "Particle Sphere" and "Point Cloud" aesthetic
    const prompts = [
        "A massive, complex, glowing blue and red fiber optic particle sphere hovering above a dark alien rocky terrain. High tech point cloud visualization. Detailed. Digital art.",
        "Dyson sphere construction composed of millions of tiny glowing lights, pointillism style. Deep space background. Sci-fi HUD style.",
        "Abstract digital organism, spherical shape, made of neon optic fibers and particles. Dark background.",
        "Holographic projection of a planet made entirely of floating data points and light nodes. Cyberpunk aesthetic."
    ];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    onGenerate(randomPrompt);
  };

  // Canvas Effect for the Particle Sphere (Default View)
  useEffect(() => {
    if (imageSrc) return; // Don't run if showing an image

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; z: number; color: string; size: number }[] = [];

    // Initialize Particles to match the reference image (Red Core, Blue Shell)
    const initParticles = () => {
        particles = [];
        const particleCount = 2500;

        for (let i = 0; i < particleCount; i++) {
            // Spherical distribution
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = Math.cbrt(Math.random()) * 180; // Radius

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            // Color Logic based on Radius (The key to matching the photo)
            // Core (0-60): Red/Orange/Yellow magma
            // Mid (60-120): Dark/Fade
            // Outer (120-180): Blue/Cyan/Violet/White tips
            let color;
            let size = Math.random() * 1.5 + 0.5;

            if (r < 50) {
                // Core: Bright Yellow/White center
                color = `rgba(255, 255, 200, ${Math.random() * 0.5 + 0.5})`;
                size += 1;
            } else if (r < 90) {
                // Inner Core: Red/Orange
                color = `rgba(255, ${Math.floor(Math.random() * 100)}, 0, ${Math.random() * 0.4 + 0.4})`;
            } else if (r < 130) {
                // Transition: Dark Red/Purple
                color = `rgba(100, 0, 50, 0.4)`;
                size *= 0.8;
            } else {
                // Outer Shell: Blue/Cyan/White tips
                const mix = Math.random();
                if (mix > 0.8) color = 'rgba(200, 230, 255, 0.9)'; // White tips
                else if (mix > 0.5) color = 'rgba(100, 180, 255, 0.7)'; // Light Blue
                else color = 'rgba(50, 50, 200, 0.5)'; // Deep Blue
            }

            particles.push({ x, y, z, color, size });
        }
    };

    let rotation = 0;

    const render = () => {
        if (!canvas) return;
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Deep Space Background
        const cx = canvas.width / 2;
        const cy = canvas.height / 2 - 20; // Move sphere up slightly to make room for terrain

        // Draw Terrain (Rocky bottom)
        ctx.fillStyle = '#050510';
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        for (let i = 0; i <= canvas.width; i+=10) {
            // Jagged noise for rocks
            const noise = Math.sin(i * 0.05) * 10 + Math.cos(i * 0.02) * 20;
            ctx.lineTo(i, canvas.height - 80 + noise);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.fill();

        // Add some "flowers" or details to terrain
        for(let i=0; i<20; i++) {
             const tx = Math.random() * canvas.width;
             const ty = canvas.height - Math.random() * 60 - 10;
             ctx.fillStyle = Math.random() > 0.5 ? '#3b82f6' : '#a855f7'; // Blue/Purple flowers
             ctx.fillRect(tx, ty, 2, 2);
        }

        // Sort particles by Z for depth
        particles.sort((a, b) => {
             // Rotate positions for sorting
             const az = a.z * Math.cos(rotation) - a.x * Math.sin(rotation);
             const bz = b.z * Math.cos(rotation) - b.x * Math.sin(rotation);
             return az - bz;
        });

        // Draw Particles
        rotation += 0.002;

        particles.forEach(p => {
            // Rotate around Y axis
            const px = p.x * Math.cos(rotation) - p.z * Math.sin(rotation);
            const pz = p.x * Math.sin(rotation) + p.z * Math.cos(rotation);

            // Simple perspective projection
            const fov = 300;
            const scale = fov / (fov + pz);

            const x2d = cx + px * scale;
            const y2d = cy + p.y * scale;

            // Draw
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(x2d, y2d, p.size * scale, 0, Math.PI * 2);
            ctx.fill();
        });

        animationFrameId = requestAnimationFrame(render);
    };

    // Handle Resize
    const resize = () => {
        const parent = canvas.parentElement;
        if (parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        }
        initParticles();
    };

    window.addEventListener('resize', resize);
    resize();
    render();

    return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animationFrameId);
    };
  }, [imageSrc]);

  return (
    <div className="flex-1 flex flex-col pt-1 pb-1 px-1 relative min-w-0 overflow-hidden min-h-0">
      <SciFiPanel className="flex-1 flex flex-col relative border-none bg-transparent min-h-0" title={`VISUAL_FEED :: ${activeMode}`} borderColor="slate" noPadding>

        {/* Decorative Frame Brackets (Inset from the main panel border) */}
        <div className="absolute inset-0 pointer-events-none z-20">
             {/* Top Left Bracket */}
             <div className="absolute top-1 left-1 sm:top-2 sm:left-2 w-8 h-8 sm:w-16 sm:h-16 border-t border-l sm:border-t-2 sm:border-l-2 border-cyan-500/50 rounded-tl-lg shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
             {/* Bottom Right Bracket */}
             <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-8 h-8 sm:w-16 sm:h-16 border-b border-r sm:border-b-2 sm:border-r-2 border-amber-500/50 rounded-br-lg shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
             {/* Reticle Lines */}
             <div className="absolute top-1/2 left-2 sm:left-4 w-1 sm:w-2 h-[1px] sm:h-[2px] bg-cyan-500/50"></div>
             <div className="absolute top-1/2 right-2 sm:right-4 w-1 sm:w-2 h-[1px] sm:h-[2px] bg-cyan-500/50"></div>
             <div className="absolute bottom-2 sm:bottom-4 left-1/2 w-[1px] sm:w-[2px] h-1 sm:h-2 bg-cyan-500/50"></div>
             <div className="absolute top-2 sm:top-4 left-1/2 w-[1px] sm:w-[2px] h-1 sm:h-2 bg-cyan-500/50"></div>
        </div>

        {/* Viewport Content */}
        <div className="flex-1 relative overflow-hidden bg-[#020202] flex items-center justify-center">

             {/* 1. CANVAS-BASED PARTICLE SPHERE (DEFAULT VISUAL) */}
             <canvas
                ref={canvasRef}
                className={`absolute inset-0 w-full h-full object-cover block ${imageSrc ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
             />

             {/* 2. AI GENERATED IMAGE LAYER */}
             {imageSrc && (
                <div className="absolute inset-0 z-10 bg-cover bg-center transition-all duration-1000 ease-in-out"
                   style={{
                     backgroundImage: `url(${imageSrc})`,
                     filter: loading ? 'blur(10px) brightness(0.5)' : 'none',
                     transform: loading ? 'scale(1.1)' : 'scale(1)'
                   }}>
                </div>
             )}

             {/* 3. SYSTEM OVERLAYS (Always on top) */}

             {/* Loading State */}
             {loading && (
                 <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 sm:gap-4 z-30 bg-black/60 backdrop-blur-sm">
                     <div className="relative w-16 h-16 sm:w-24 sm:h-24">
                         <div className="absolute inset-0 border-2 sm:border-4 border-cyan-500/20 rounded-full"></div>
                         <div className="absolute inset-0 border-2 sm:border-4 border-t-cyan-500 rounded-full animate-spin"></div>
                     </div>
                     <span className="text-cyan-500 font-mono animate-pulse tracking-widest text-[10px] sm:text-xs px-2 text-center">PROCESSING VISUAL DATA...</span>
                 </div>
             )}

             {/* Grid Overlay */}
             <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(0,0,0,0)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none border border-cyan-900/10"></div>

             {/* Central HUD Target Ring (Rotates) */}
             <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                 <div className="w-[50vh] h-[50vh] sm:w-[60vh] sm:h-[60vh] max-w-[300px] max-h-[300px] sm:max-w-[500px] sm:max-h-[500px] rounded-full border border-white/5 flex items-center justify-center relative shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-4 sm:h-6 bg-cyan-500/60"></div>
                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-4 sm:h-6 bg-cyan-500/60"></div>
                     <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 sm:w-6 h-[1px] bg-cyan-500/60"></div>
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 sm:w-6 h-[1px] bg-cyan-500/60"></div>

                     {/* Inner rotating rings */}
                     <div className="absolute inset-4 sm:inset-8 rounded-full border border-dotted border-cyan-500/30 animate-[spin_60s_linear_infinite]"></div>
                     <div className="absolute inset-12 sm:inset-24 rounded-full border border-dashed border-amber-500/20 animate-[spin_30s_linear_infinite_reverse]"></div>
                 </div>
             </div>

             {/* Scanlines Effect */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_4px,6px_100%] pointer-events-none mix-blend-overlay"></div>
        </div>

        {/* Mode Selector Overlay (Bottom Center) */}
        <div className="absolute bottom-2 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-0.5 sm:gap-1 p-0.5 sm:p-1 bg-black/80 border border-slate-700/50 backdrop-blur-md rounded-full shadow-lg">
            {[ViewMode.ORBITAL, ViewMode.TERRAIN, ViewMode.SPECTRAL].map(mode => (
                <button
                    key={mode}
                    onClick={() => setActiveMode(mode)}
                    className={`px-2 sm:px-6 py-0.5 sm:py-1 text-[7px] sm:text-[9px] font-bold tracking-widest rounded-full transition-all touch-manipulation
                        ${activeMode === mode
                            ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.6)]'
                            : 'text-slate-400 hover:text-white'
                        }`}
                >
                    {mode}
                </button>
            ))}
        </div>

        {/* Action Buttons (Top Right) */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30">
            <button
                onClick={handleScan}
                disabled={loading}
                className="group flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 border border-cyan-500/30 bg-cyan-950/80 backdrop-blur-md hover:bg-cyan-500/20 transition-all shadow-[0_0_10px_rgba(0,0,0,0.5)] touch-manipulation"
            >
                <RefreshCw className={`w-3 h-3 sm:w-3 sm:h-3 text-cyan-400 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                <span className="text-[7px] sm:text-[9px] text-cyan-300 tracking-widest hidden sm:inline">INIT_SCAN</span>
            </button>
        </div>

      </SciFiPanel>
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Layers } from 'lucide-react';
import Globe from './components/Globe';
import { GlobeTheme } from './types';

// --- Theme Definitions ---

const THEMES: GlobeTheme[] = [
  {
    id: 'natural',
    name: 'Satellite View',
    type: 'dark',
    background: 'radial-gradient(ellipse at top, #0a1128 0%, #1a0b2e 30%, #000000 100%)',
    oceanColor: ['#000f2e', '#001a4d'], // Deep realistic blue
    landColor: '#2d4a36', // Natural dark green
    strokeColor: 'none', // No borders for realism
    graticuleColor: '#ffffff10', // Very faint
    atmosphereColor: '#3b82f6',
    atmosphereOpacity: 0.3,
    showStars: true,
    nebula: true,
    enableShadow: true, // Key for realism
    colorMode: 'default'
  },
  {
    id: 'political',
    name: 'Political Map',
    type: 'light',
    background: '#f1f5f9', // Slate-100
    oceanColor: '#bfdbfe', // Blue-200
    landColor: '#ffffff',
    strokeColor: '#ffffff',
    graticuleColor: '#94a3b840',
    atmosphereColor: '#93c5fd',
    atmosphereOpacity: 0.1,
    showStars: false,
    nebula: false,
    enableShadow: false,
    colorMode: 'political'
  },
  {
    id: 'antique',
    name: 'Antique Atlas',
    type: 'light',
    background: '#f5f5dc', // Beige/Parchment
    oceanColor: '#e6d5ac', // Tan/Sand
    landColor: '#d2b48c', // Darker tan
    strokeColor: '#5d4037', // Brown ink
    graticuleColor: '#8d6e6340',
    atmosphereColor: '#d7ccc8',
    atmosphereOpacity: 0.2,
    showStars: false,
    nebula: false,
    enableShadow: false,
    colorMode: 'default'
  },
  {
    id: 'midnight',
    name: 'Midnight Lights',
    type: 'dark',
    background: 'radial-gradient(ellipse at center, #0d0d1a 0%, #000000 100%)',
    oceanColor: '#0a0a0a', // Almost black
    landColor: '#171717', // Dark grey
    strokeColor: '#fbbf24', // Amber/Gold borders resembling lights
    graticuleColor: '#262626',
    atmosphereColor: '#fbbf24', // Gold atmosphere
    atmosphereOpacity: 0.15,
    showStars: true,
    nebula: false,
    enableShadow: true,
    colorMode: 'default'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    type: 'dark',
    background: '#050505',
    oceanColor: '#000000',
    landColor: '#001a00',
    strokeColor: '#00ff41', // Matrix Green
    strokeWidth: 1.2,
    graticuleColor: '#003300',
    atmosphereColor: '#00ff41',
    atmosphereOpacity: 0.15,
    showStars: false,
    nebula: false,
    enableShadow: false,
    colorMode: 'default'
  },
  {
    id: 'retro',
    name: '8-Bit Retro',
    type: 'light',
    background: '#8b9c48', // Gameboy green
    oceanColor: '#9bac56',
    landColor: '#306230',
    strokeColor: '#0f380f',
    strokeWidth: 1.5,
    graticuleColor: '#30623040',
    atmosphereColor: '#8b9c48',
    atmosphereOpacity: 0,
    showStars: false,
    nebula: false,
    enableShadow: false,
    colorMode: 'default'
  },
  {
    id: 'cartoon',
    name: 'Toon World',
    type: 'light',
    background: '#bae6fd', // Sky blue
    oceanColor: '#38bdf8', // Bright blue
    landColor: '#4ade80', // Bright Green
    strokeColor: '#000000', // Thick black lines
    strokeWidth: 1.5,
    graticuleColor: '#ffffff80',
    atmosphereColor: '#ffffff',
    atmosphereOpacity: 0.4,
    showStars: false,
    nebula: false,
    enableShadow: false,
    colorMode: 'default'
  },
  {
    id: 'vaporwave',
    name: 'Vaporwave',
    type: 'dark',
    background: 'linear-gradient(to bottom, #ff71ce, #01cdfe)',
    oceanColor: '#01cdfe',
    landColor: '#ff71ce', // Pink land
    strokeColor: '#fffb96', // Pale yellow borders
    graticuleColor: '#ffffff',
    atmosphereColor: '#b967ff',
    atmosphereOpacity: 0.4,
    showStars: true,
    nebula: true,
    enableShadow: false,
    colorMode: 'default'
  },
  {
    id: 'neon',
    name: 'Neon Verse',
    type: 'dark',
    background: '#020205',
    oceanColor: '#1a0b2e',
    landColor: '#000000',
    strokeColor: '#d946ef',
    graticuleColor: '#22d3ee30',
    atmosphereColor: '#d946ef',
    atmosphereOpacity: 0.2,
    showStars: false,
    nebula: false,
    enableShadow: false,
    colorMode: 'default'
  },
  {
    id: 'glacial',
    name: 'Ice World',
    type: 'light',
    background: 'radial-gradient(circle at center, #f0f9ff 0%, #e0f2fe 100%)',
    oceanColor: ['#bae6fd', '#7dd3fc'],
    landColor: '#ffffff',
    strokeColor: '#38bdf8',
    graticuleColor: '#ffffff80',
    atmosphereColor: '#e0f2fe',
    atmosphereOpacity: 0.6,
    showStars: false,
    nebula: false,
    enableShadow: true,
    colorMode: 'default'
  },
  {
    id: 'minimal',
    name: 'Minimalist',
    type: 'light',
    background: '#ffffff',
    oceanColor: '#f3f4f6',
    landColor: '#9ca3af',
    strokeColor: '#ffffff',
    graticuleColor: 'transparent',
    atmosphereColor: '#000000',
    atmosphereOpacity: 0.05,
    showStars: false,
    nebula: false,
    enableShadow: false,
    colorMode: 'default'
  },
  {
    id: 'blueprint',
    name: 'Blueprint',
    type: 'dark',
    background: '#1e3a8a',
    oceanColor: '#1e3a8a',
    landColor: 'transparent',
    strokeColor: '#93c5fd',
    graticuleColor: '#60a5fa40',
    atmosphereColor: '#ffffff',
    atmosphereOpacity: 0.1,
    showStars: false,
    nebula: false,
    enableShadow: false,
    colorMode: 'default'
  }
];

export default function TerraPage() {
  const [currentTheme, setCurrentTheme] = useState<GlobeTheme>(THEMES[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative w-screen h-screen overflow-hidden font-sans touch-none" style={{ height: '100dvh', touchAction: 'none', overscrollBehavior: 'none' }}>
      {/* Exit Button - Top Left */}
      <Link
        href="/"
        className={`fixed top-2 left-2 sm:top-6 sm:left-6 z-50 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:scale-105 transition-all border shadow-lg touch-manipulation ${
          currentTheme.type === 'dark'
            ? 'bg-slate-800/80 text-white border-slate-600 hover:bg-slate-700'
            : 'bg-white/80 text-slate-800 border-slate-200 hover:bg-slate-50'
        }`}
      >
        <ArrowLeft size={14} className="sm:w-[18px] sm:h-[18px]" />
        <span className="text-xs sm:text-sm font-medium">EXIT</span>
      </Link>

      <main className="w-full h-full relative">
        <Globe theme={currentTheme} />
      </main>

      {/* Layer Switcher Control */}
      <div className="absolute top-2 right-2 sm:top-6 sm:right-6 z-20 flex flex-col items-end">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 border touch-manipulation ${
            currentTheme.type === 'dark'
              ? 'bg-slate-800/80 text-white border-slate-600 hover:bg-slate-700'
              : 'bg-white/80 text-slate-800 border-slate-200 hover:bg-slate-50'
          }`}
          title="Change Map Style"
          aria-label="Change Map Style"
        >
          <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Dropdown Menu */}
        <div className={`mt-2 transition-all duration-300 origin-top-right ${
          isMenuOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
        }`}>
          <div className="flex flex-col gap-1.5 sm:gap-2 max-h-[calc(100dvh-120px)] sm:max-h-[80vh] overflow-y-auto overflow-x-visible px-2 sm:px-3 pt-2 pb-6 sm:pb-8" style={{ scrollbarGutter: 'stable' }}>
            {THEMES.map((theme, index) => (
            <button
              key={theme.id}
              onClick={() => {
                setCurrentTheme(theme);
                setIsMenuOpen(false);
              }}
              className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg backdrop-blur-md border shadow-xl w-[calc(100vw-32px)] sm:w-72 max-w-[320px] sm:max-w-none text-left transition-colors touch-manipulation ${
                currentTheme.type === 'dark'
                  ? 'bg-slate-900/90 border-slate-700 text-slate-200 hover:bg-slate-800'
                  : 'bg-white/90 border-slate-200 text-slate-700 hover:bg-slate-50'
              } ${currentTheme.id === theme.id ? 'ring-2 ring-blue-500' : ''} ${index === THEMES.length - 1 ? 'mb-2 sm:mb-4' : ''}`}
            >
              {/* Theme Preview Circle */}
              <div
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/20 shadow-inner shrink-0 relative overflow-hidden"
                style={{
                  background: Array.isArray(theme.oceanColor) ? theme.oceanColor[1] : theme.oceanColor
                }}
              >
                {/* Simulated land in preview */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-current opacity-80" style={{ color: theme.landColor === 'transparent' ? 'transparent' : theme.landColor }}></div>
                {theme.colorMode === 'political' && (
                    <div className="absolute inset-0 flex flex-wrap">
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-red-400 opacity-50"></div>
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-yellow-400 opacity-50"></div>
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-green-400 opacity-50"></div>
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-blue-400 opacity-50"></div>
                    </div>
                )}
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                 <span className="font-medium text-xs sm:text-sm truncate">{theme.name}</span>
                 <span className="text-[9px] sm:text-[10px] opacity-60 capitalize">{theme.id === 'natural' ? 'Realistic' : theme.colorMode === 'political' ? 'Political' : 'Stylized'}</span>
              </div>
            </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

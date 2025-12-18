'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { VisualMode } from './types';
import { INITIAL_MODE, MODES } from './constants';
import ControlPanel from './components/ControlPanel';

// Dynamic import for MainViewport to avoid SSR issues
const MainViewport = dynamic(() => import('./components/MainViewport'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[60vh] md:h-[70vh] flex items-center justify-center bg-black border-b-4 border-gray-800">
      <div className="text-white text-xl font-mono">LOADING 3D SCENE...</div>
    </div>
  ),
});

export default function RetroDashboardPage() {
  const [currentMode, setCurrentMode] = useState<VisualMode>(INITIAL_MODE);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const num = parseInt(e.key);
      if (!isNaN(num) && num >= 1 && num <= MODES.length) {
        setCurrentMode(MODES[num - 1].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleModeSelect = useCallback((mode: VisualMode) => {
    setCurrentMode(mode);
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen bg-black text-gray-200 overflow-hidden font-mono relative">
      {/* Top Section: Main Viewport */}
      <header className="flex-none relative z-10">
        <MainViewport mode={currentMode} />
      </header>

      {/* Bottom Section: Controls */}
      <main className="flex-1 flex flex-col relative z-20 min-h-0">
         {/* Decorative separating bar */}
         <div className="h-2 bg-gray-900 border-y border-gray-800 flex items-center justify-center gap-2">
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`w-full h-[1px] ${i % 2 === 0 ? 'bg-gray-800' : 'bg-transparent'}`}></div>
            ))}
         </div>

         <ControlPanel
            currentMode={currentMode}
            onModeSelect={handleModeSelect}
            backButton={
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-md transition-all active:scale-95 group cursor-pointer"
                title="Exit to Home"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="text-xs text-gray-400 group-hover:text-gray-200">BACK</span>
              </Link>
            }
         />
      </main>
    </div>
  );
}

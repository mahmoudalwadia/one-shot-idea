'use client';

import { useState, useEffect } from 'react';
import { patterns } from './services/patternService';
import { PatternDefinition } from './types';
import PatternCanvas from './components/PatternCanvas';

export default function GenerativePatternStudioPage() {
  const [selectedPattern, setSelectedPattern] = useState<PatternDefinition>(patterns[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [speed, setSpeed] = useState(1.0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'h' || e.key === 'H') {
        setIsSidebarOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#020202] overflow-hidden font-sans text-white select-none">
      {/* The Generative Background */}
      <PatternCanvas pattern={selectedPattern} speed={speed} />

      {/* Control Panel - Responsive Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-full sm:w-96 bg-black/60 backdrop-blur-3xl border-r border-white/5 transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) z-40 p-8 sm:p-12 flex flex-col justify-center ${
          isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}
      >
        <header className="mb-12">
          <h1 className="text-3xl font-extralight tracking-[0.2em] text-white uppercase leading-tight">
            Pattern
            <span className="block font-black tracking-tighter italic opacity-90 text-4xl">Studio</span>
          </h1>
        </header>

        <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-12 custom-scrollbar">
          {/* Speed Control - Moved to top of list */}
          <section className="relative group">
            <div className="flex justify-between items-end mb-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-white/60 transition-colors">
                Temporal Flux
              </label>
              <span className="text-[10px] font-mono text-white/40">
                {speed.toFixed(1)}Hz
              </span>
            </div>
            <div className="relative py-4">
              <input
                type="range"
                min="0.0"
                max="5.0"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full h-[1px] bg-white/10 rounded-full appearance-none cursor-crosshair accent-white transition-all hover:bg-white/20"
                style={{
                  WebkitAppearance: 'none',
                  background: `linear-gradient(to right, rgba(255,255,255,0.4) ${speed * 20}%, rgba(255,255,255,0.05) ${speed * 20}%)`
                }}
              />
            </div>
          </section>

          {/* Pattern Selection */}
          <section>
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 block mb-6">Motif Selection</label>
            <div className="space-y-4">
              {patterns.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPattern(p)}
                  className={`w-full text-left group relative transition-all duration-500 ${
                    selectedPattern.id === p.id ? 'pl-4' : 'hover:pl-2'
                  }`}
                >
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-white transition-all duration-500 ${
                    selectedPattern.id === p.id ? 'h-full opacity-100' : 'opacity-0'
                  }`} />
                  <span className={`text-sm uppercase tracking-widest font-bold block transition-all ${
                    selectedPattern.id === p.id ? 'text-white' : 'text-white/20 group-hover:text-white/50'
                  }`}>
                    {p.name}
                  </span>
                  <span className={`text-[9px] uppercase tracking-tighter font-medium mt-0.5 block transition-opacity ${
                    selectedPattern.id === p.id ? 'opacity-40' : 'opacity-0'
                  }`}>
                    {p.category}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Minimalist Details Section */}
          <section className="relative group pb-8">
            <div className="absolute -left-4 top-0 bottom-8 w-[1px] bg-white/10 group-hover:bg-white/30 transition-colors" />
            <div className="pl-4">
              <p className="text-[11px] leading-relaxed text-white/30 font-light italic tracking-wide group-hover:text-white/50 transition-colors">
                {selectedPattern.description}
              </p>
            </div>
          </section>
        </div>

        <button
          onClick={() => setIsSidebarOpen(false)}
          className="mt-8 self-start text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-all"
        >
          [ Dismiss Interface ]
        </button>
      </div>

      {/* Enhanced Minimal Floating Toggle Button - Better visibility across all patterns */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="absolute top-8 left-8 z-50 w-12 h-12 flex flex-col items-center justify-center space-y-1.5 transition-all bg-black/40 backdrop-blur-md border border-white/10 rounded-full hover:bg-black/60 hover:scale-110 active:scale-95 group shadow-2xl"
          aria-label="Open controls"
        >
          <div className="w-5 h-[1.5px] bg-white transition-all group-hover:w-6" />
          <div className="w-3 h-[1.5px] bg-white transition-all group-hover:w-6" />
          <div className="w-5 h-[1.5px] bg-white transition-all group-hover:w-6" />
        </button>
      )}

      {/* Artistic overlays */}
      <div className="fixed inset-0 pointer-events-none border-[1px] border-white/[0.03] m-8 transition-all duration-1000" style={{ opacity: isSidebarOpen ? 0.2 : 0.8 }} />
    </div>
  );
}

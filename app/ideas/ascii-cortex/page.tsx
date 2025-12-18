'use client';

import React, { useState, useEffect, useRef } from 'react';
import DataStream from './components/DataStream';
import Nebula from './components/Nebula';
import TacticalMap from './components/TacticalMap';
import AsciiFire from './components/AsciiFire';
import AsciiWaveform from './components/AsciiWaveform';
import AsciiDna from './components/AsciiDna';
import AsciiGlobe from './components/AsciiGlobe';
import AsciiRain from './components/AsciiRain';
import AsciiRadar from './components/AsciiRadar';
import AsciiHex from './components/AsciiHex';
import AsciiNetwork from './components/AsciiNetwork';
import AsciiFlux from './components/AsciiFlux';
import AsciiGame from './components/AsciiGame';
import AsciiClock from './components/AsciiClock';
import AsciiDonut from './components/AsciiDonut';
import AsciiSolar from './components/AsciiSolar';
import AsciiLife from './components/AsciiLife';
import AsciiMaze from './components/AsciiMaze';
import AsciiMandala from './components/AsciiMandala';
import AsciiLandscape from './components/AsciiLandscape';
import AsciiCircuit from './components/AsciiCircuit';
import AsciiSwirl from './components/AsciiSwirl';
import AsciiPortal from './components/AsciiPortal';
import AsciiSnow from './components/AsciiSnow';
import TerminalInput from './components/TerminalInput';
import { LogEntry } from './types';

export default function AsciiCortexPage() {
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', timestamp: '00:00:01', message: 'SYSTEM BOOT SEQUENCE INITIATED', type: 'info' },
    { id: '2', timestamp: '00:00:02', message: 'LOADING KERNEL MODULES...', type: 'info' },
    { id: '3', timestamp: '00:00:05', message: 'NEBULA_ENGINE: ONLINE', type: 'success' },
    { id: '4', timestamp: '00:00:06', message: 'TACTICAL_GRID: CALIBRATED', type: 'success' },
    { id: '5', timestamp: '00:00:09', message: 'WARNING: CORE TEMP RISING', type: 'warning' },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'slide' | 'grid'>('grid');

  // Touch handling state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const addLog = (message: string, type: LogEntry['type'] = 'info') => {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    const newLog: LogEntry = {
      id: Date.now().toString(),
      timestamp,
      message,
      type
    };
    setLogs(prev => [...prev.slice(-49), newLog]);
  };

  const handleCommand = async (cmd: string) => {
    setIsProcessing(true);
    addLog(`USR_CMD: ${cmd}`, 'info');

    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      // Generic response without AI integration
      addLog(`COMMAND_PROCESSED: ${cmd.toUpperCase()}`, 'success');

      if (cmd.toLowerCase().includes('fire')) {
        addLog('FIREWALL PROTOCOLS: DISABLED. THERMAL RUNAWAY IMMINENT.', 'error');
      }
    } catch {
      addLog('ERR: PROCESSING FAILURE', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
        addLog("AWAITING USER INPUT...", "info");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = () => {
    if (scrollRef.current && viewMode === 'slide') {
        const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth);
        setCurrentIndex(index);
    }
  };

  const scrollTo = (index: number) => {
      if (scrollRef.current && viewMode === 'slide') {
          scrollRef.current.scrollTo({
              left: index * scrollRef.current.clientWidth,
              behavior: 'smooth'
          });
          setCurrentIndex(index);
      }
  };

  // Manual Swipe Logic to augment Native Scroll
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < components.length - 1) {
       scrollTo(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
       scrollTo(currentIndex - 1);
    }
  };

  // List of all visualization components
  const components: ComponentItem[] = [
     { id: 'datastream', Component: DataStream as unknown as React.ComponentType<Record<string, unknown>>, props: { logs } },
     { id: 'nebula', Component: Nebula as React.ComponentType<Record<string, unknown>> },
     { id: 'clock', Component: AsciiClock as React.ComponentType<Record<string, unknown>> },
     { id: 'rain', Component: AsciiRain as React.ComponentType<Record<string, unknown>> },
     { id: 'globe', Component: AsciiGlobe as React.ComponentType<Record<string, unknown>> },
     { id: 'hex', Component: AsciiHex as React.ComponentType<Record<string, unknown>> },
     { id: 'network', Component: AsciiNetwork as React.ComponentType<Record<string, unknown>> },
     { id: 'radar', Component: AsciiRadar as React.ComponentType<Record<string, unknown>> },
     { id: 'flux', Component: AsciiFlux as React.ComponentType<Record<string, unknown>> },
     { id: 'game', Component: AsciiGame as React.ComponentType<Record<string, unknown>> },
     { id: 'dna', Component: AsciiDna as React.ComponentType<Record<string, unknown>> },
     { id: 'solar', Component: AsciiSolar as React.ComponentType<Record<string, unknown>> },
     { id: 'maze', Component: AsciiMaze as React.ComponentType<Record<string, unknown>> },
     { id: 'life', Component: AsciiLife as React.ComponentType<Record<string, unknown>> },
     { id: 'mandala', Component: AsciiMandala as React.ComponentType<Record<string, unknown>> },
     { id: 'donut', Component: AsciiDonut as React.ComponentType<Record<string, unknown>> },
     { id: 'landscape', Component: AsciiLandscape as React.ComponentType<Record<string, unknown>> },
     { id: 'circuit', Component: AsciiCircuit as React.ComponentType<Record<string, unknown>> },
     { id: 'swirl', Component: AsciiSwirl as React.ComponentType<Record<string, unknown>> },
     { id: 'portal', Component: AsciiPortal as React.ComponentType<Record<string, unknown>> },
     { id: 'snow', Component: AsciiSnow as React.ComponentType<Record<string, unknown>> },
     { id: 'fire', Component: AsciiFire as React.ComponentType<Record<string, unknown>> },
     { id: 'tactical', Component: TacticalMap as React.ComponentType<Record<string, unknown>> },
     { id: 'waveform', Component: AsciiWaveform as React.ComponentType<Record<string, unknown>> },
  ];

  interface ComponentItem {
    id: string;
    Component: React.ComponentType<Record<string, unknown>>;
    props?: Record<string, unknown>;
  }

  const renderContent = (item: ComponentItem, isGrid: boolean) => (
      <>
        {/* Decorative Frame Corners - Scaled down for grid */}
        <div className={`absolute top-2 left-2 border-t-2 border-l-2 border-red-900/30 z-20 pointer-events-none ${isGrid ? 'w-2 h-2' : 'w-6 h-6'}`} />
        <div className={`absolute top-2 right-2 border-t-2 border-r-2 border-red-900/30 z-20 pointer-events-none ${isGrid ? 'w-2 h-2' : 'w-6 h-6'}`} />
        <div className={`absolute bottom-2 left-2 border-b-2 border-l-2 border-red-900/30 z-20 pointer-events-none ${isGrid ? 'w-2 h-2' : 'w-6 h-6'}`} />
        <div className={`absolute bottom-2 right-2 border-b-2 border-r-2 border-red-900/30 z-20 pointer-events-none ${isGrid ? 'w-2 h-2' : 'w-6 h-6'}`} />

        {/* Module Name Label */}
        <div className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 text-red-900/50 z-20 font-retro tracking-widest uppercase truncate max-w-[90%] text-center ${isGrid ? 'text-[8px] leading-none' : 'text-[10px]'}`}>
            {item.id.replace('_', ' ')}
        </div>

        {/* Content Container - Scaled for Grid Mode to fit 2-column layout on mobile */}
        <div className={`w-full h-full relative z-10 flex items-center justify-center transition-transform ${isGrid ? 'scale-[0.60] sm:scale-75 md:scale-90' : ''}`}>
             <item.Component {...(item.props || {})} />
        </div>
      </>
  );

  return (
    <div className="flex flex-col h-[100dvh] w-screen bg-black text-white overflow-hidden font-mono">

      {/* Back Button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          window.location.href = '/';
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onTouchStart={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          e.stopPropagation();
          window.location.href = '/';
        }}
        className="fixed top-3 left-3 z-[9999] text-[10px] font-bold border border-red-900/50 text-red-500 px-3 py-2 bg-black/90 backdrop-blur-sm hover:bg-red-900/20 transition-colors uppercase tracking-widest rounded-sm active:scale-95 select-none cursor-pointer"
        style={{ pointerEvents: 'auto' }}
      >
        ← BACK
      </button>

      {/* View Toggle Button */}
      <button
        onClick={() => setViewMode(prev => prev === 'slide' ? 'grid' : 'slide')}
        className="fixed top-3 right-3 z-50 text-[10px] font-bold border border-red-900/50 text-red-500 px-3 py-2 bg-black/90 backdrop-blur-sm hover:bg-red-900/20 transition-colors uppercase tracking-widest rounded-sm active:scale-95 select-none"
      >
        {viewMode === 'slide' ? ':: GRID' : ':: SLIDE'}
      </button>

      {viewMode === 'slide' ? (
        <>
          {/* Horizontal Carousel */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className="flex-1 flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide h-full w-full touch-pan-x"
            style={{ scrollBehavior: 'smooth' }}
          >
            {components.map((item, index) => (
                <section
                    key={item.id}
                    className="min-w-full w-screen h-full snap-center snap-always relative overflow-hidden flex items-center justify-center bg-black border-r border-red-900/10"
                >
                    {/* Index Indicator (Slide Mode Only) */}
                    <div className="absolute top-4 left-4 md:left-1/2 md:transform md:-translate-x-1/2 text-[10px] text-red-900/50 z-20 font-bold tracking-widest bg-black/80 px-2 rounded">
                        MODULE {index + 1} / {components.length}
                    </div>

                    {renderContent(item, false)}
                </section>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => scrollTo(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="fixed left-2 top-1/2 transform -translate-y-1/2 text-red-900/50 hover:text-red-500 z-50 text-4xl disabled:opacity-0 transition-all hidden md:block p-4"
            aria-label="Previous Module"
          >
            &lt;
          </button>

          <button
            onClick={() => scrollTo(currentIndex + 1)}
            disabled={currentIndex === components.length - 1}
            className="fixed right-2 top-1/2 transform -translate-y-1/2 text-red-900/50 hover:text-red-500 z-50 text-4xl disabled:opacity-0 transition-all hidden md:block p-4"
            aria-label="Next Module"
          >
            &gt;
          </button>

          {/* Mobile Swipe Hint */}
          <div className="md:hidden absolute bottom-16 w-full text-center text-red-900/30 text-[10px] pointer-events-none animate-pulse">
            &lt; SWIPE &gt;
          </div>
        </>
      ) : (
        /* Grid View */
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 auto-rows-min h-full overflow-y-auto p-2 md:p-4 gap-2 md:gap-4 scrollbar-hide pb-20">
            {components.map((item) => (
                <div key={item.id} className="relative border border-red-900/20 bg-black/50 aspect-square overflow-hidden flex items-center justify-center hover:border-red-500/50 transition-colors rounded-sm">
                    {renderContent(item, true)}
                </div>
            ))}
        </div>
      )}

      {/* Terminal Footer */}
      <TerminalInput onSubmit={handleCommand} disabled={isProcessing} />
    </div>
  );
}

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import { MainViewport } from './components/MainViewport';
import { BottomConsole } from './components/BottomConsole';
import { SystemLog } from './types';

export default function XenonInterfacePage() {
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [viewportImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Initialize logs on mount
  useEffect(() => {
    const initLogs = async () => {
        // Initial fake logs
        setLogs([
            { id: '1', timestamp: '08:00:00.00', level: 'INFO', message: 'SYSTEM INITIALIZED' },
            { id: '2', timestamp: '08:00:00.15', level: 'INFO', message: 'LOADING CORE MODULES' },
            { id: '3', timestamp: '08:00:01.00', level: 'WARN', message: 'NETWORK LATENCY DETECTED' },
            { id: '4', timestamp: '08:00:02.00', level: 'INFO', message: 'ORBITAL MECHANICS CALIBRATED' },
            { id: '5', timestamp: '08:00:02.50', level: 'INFO', message: 'ALL SYSTEMS NOMINAL' },
        ]);
    };
    initLogs();

    // Set an interval to occasionally add "fake" background noise logs
    const interval = setInterval(() => {
        if (Math.random() > 0.6) {
            const timestamp = new Date().toISOString().split('T')[1].slice(0, 11);
            setLogs(prev => [...prev.slice(-19), {
                id: Math.random().toString(36),
                timestamp,
                level: Math.random() > 0.9 ? 'WARN' : 'INFO',
                message: `PROCESS_ID_${Math.floor(Math.random() * 9999)} SYNC`
            }]); // Keep fewer logs for tighter UI
        }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleGenerateImage = useCallback(async (_prompt: string) => {
    setIsGenerating(true);
    const timestamp = new Date().toISOString().split('T')[1].slice(0, 11);
    setLogs(prev => [...prev, {
        id: Math.random().toString(36),
        timestamp,
        level: 'WARN',
        message: `IMAGE_GENERATION_DISABLED`
    }]);

    // Image generation disabled - no AI integration
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsGenerating(false);
  }, []);

  return (
    <div className="w-screen h-screen bg-[#000] text-slate-300 font-mono flex items-center justify-center overflow-hidden selection:bg-cyan-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,_#111_0%,_#000_100%)]"></div>

      {/* Back Button - Top Left */}
      <Link
        href="/"
        className="fixed top-2 left-2 sm:top-4 sm:left-4 z-50 flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-500/30 backdrop-blur-md transition-all active:scale-95 group cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.1)]"
        title="Exit to Home"
      >
        <ArrowLeft size={14} className="sm:w-4 sm:h-4 text-cyan-400 group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="text-[8px] sm:text-[9px] text-cyan-300 tracking-widest group-hover:text-cyan-100">EXIT</span>
      </Link>

      {/* Main Grid Container - Responsive Layout */}
      <div className="relative z-10 w-full h-full max-w-[1800px] max-h-[1000px] flex flex-col sm:flex-row gap-1 p-1 sm:p-2">
        {/* Mobile: Compact sidebars at top, Desktop: Full sidebars */}
        <div className="flex sm:hidden flex-row gap-1 mb-1 h-28">
          {/* Mobile Left Sidebar - Compact */}
          <div className="flex-1 min-w-0">
            <LeftSidebar isMobile={true} />
          </div>
          {/* Mobile Right Sidebar - Compact */}
          <div className="flex-1 min-w-0">
            <RightSidebar logs={logs} isMobile={true} />
          </div>
        </div>

        {/* Desktop Left Sidebar */}
        <div className="hidden sm:block">
          <LeftSidebar isMobile={false} />
        </div>

        <div className="flex-1 flex flex-col min-w-0 gap-1 min-h-0">
          <MainViewport
            imageSrc={viewportImage}
            loading={isGenerating}
            onGenerate={handleGenerateImage}
          />
          <BottomConsole />
        </div>

        {/* Desktop Right Sidebar */}
        <div className="hidden sm:block">
          <RightSidebar logs={logs} isMobile={false} />
        </div>
      </div>

    </div>
  );
}

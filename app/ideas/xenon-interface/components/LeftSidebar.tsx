'use client';

import React from 'react';
import { SciFiPanel } from './SciFiPanel';

interface LeftSidebarProps {
  isMobile?: boolean;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ isMobile = false }) => {
  // Use mounted state to prevent hydration mismatch
  const [mounted, setMounted] = React.useState(false);

  // Generate random values using lazy initializer to avoid impure function calls during render
  const [memoryBuffer] = React.useState(() => Array.from({length: 20}, () => Math.random() > 0.5));
  const [spectrumHeights] = React.useState(() => Array.from({length: 16}, () => Math.floor(Math.random() * 80) + 10));

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (isMobile) {
    return (
      <div className="flex flex-col gap-1 h-full bg-black/40">
        {/* Mobile: Show orbital scan with all 3 orbs */}
        <SciFiPanel className="flex-1 min-h-0" title="ORBITAL_SCAN" borderColor="cyan" noPadding>
          <div className="flex flex-col gap-1.5 h-full items-center justify-center py-1 px-1 overflow-hidden">
            {/* Compact orbs for mobile */}
            {[
              { name: 'ALPHA_7', dist: '4.2 AU', progress: 66, color: 'cyan' },
              { name: 'BETA_PRIME', dist: '8.9 AU', progress: 33, color: 'purple' },
              { name: 'GAMMA_IX', dist: '0.2 AU', progress: 100, color: 'red' }
            ].map((orb, idx) => (
              <div key={idx} className="flex items-center gap-1.5 w-full">
                <div className="w-6 h-6 rounded-full border border-cyan-500/30 bg-[radial-gradient(circle_at_30%_30%,_rgba(6,182,212,0.4),_transparent)] relative shrink-0">
                  <div className="absolute inset-0 rounded-full border-t border-cyan-200/50 animate-spin duration-[3s]"></div>
                </div>
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <span className="text-[7px] text-cyan-300 font-bold tracking-widest truncate">{orb.name}</span>
                  <div className="w-full h-0.5 bg-cyan-900/50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-cyan-500" style={{ width: `${orb.progress}%` }}></div>
                  </div>
                  <span className="text-[6px] text-slate-500 font-mono">{orb.dist}</span>
                </div>
              </div>
            ))}
          </div>
        </SciFiPanel>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 h-full w-64 shrink-0 bg-black/40">

      {/* Top Module: Orbital Bodies (Reference: Left Top) */}
      <SciFiPanel className="h-1/3 min-h-[250px]" title="ORBITAL_SCAN" borderColor="cyan">
        <div className="flex flex-col gap-4 h-full items-center justify-center py-2">
            {/* Orb 1 */}
            <div className="flex items-center gap-3 w-full px-2">
                <div className="w-12 h-12 rounded-full border border-cyan-500/30 bg-[radial-gradient(circle_at_30%_30%,_rgba(6,182,212,0.4),_transparent)] relative shrink-0">
                    <div className="absolute inset-0 rounded-full border-t border-cyan-200/50 animate-spin duration-[3s]"></div>
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-cyan-300 font-bold tracking-widest">ALPHA_7</span>
                    <div className="w-20 h-0.5 bg-cyan-900/50 relative overflow-hidden">
                        <div className="absolute inset-0 bg-cyan-500 w-2/3 animate-pulse"></div>
                    </div>
                    <span className="text-[8px] text-slate-500 font-mono">DIST: 4.2 AU</span>
                </div>
            </div>

            {/* Orb 2 */}
            <div className="flex items-center gap-3 w-full px-2">
                <div className="w-12 h-12 rounded-full border border-cyan-500/30 bg-[radial-gradient(circle_at_30%_30%,_rgba(50,50,90,0.8),_transparent)] relative shrink-0 overflow-hidden">
                     <div className="absolute top-2 left-0 right-0 h-[1px] bg-cyan-500/20"></div>
                     <div className="absolute top-4 left-0 right-0 h-[1px] bg-cyan-500/20"></div>
                     <div className="absolute top-6 left-0 right-0 h-[1px] bg-cyan-500/20"></div>
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-cyan-300 font-bold tracking-widest">BETA_PRIME</span>
                    <div className="w-20 h-0.5 bg-cyan-900/50 relative overflow-hidden">
                        <div className="absolute inset-0 bg-cyan-500 w-1/3"></div>
                    </div>
                    <span className="text-[8px] text-slate-500 font-mono">DIST: 8.9 AU</span>
                </div>
            </div>

             {/* Orb 3 */}
             <div className="flex items-center gap-3 w-full px-2">
                <div className="w-12 h-12 rounded-full border border-cyan-500/30 bg-[radial-gradient(circle_at_70%_30%,_rgba(100,50,50,0.4),_transparent)] relative shrink-0">
                     <div className="absolute inset-0 border border-dotted border-white/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-cyan-300 font-bold tracking-widest">GAMMA_IX</span>
                    <div className="w-20 h-0.5 bg-cyan-900/50 relative overflow-hidden">
                        <div className="absolute inset-0 bg-cyan-500 w-full"></div>
                    </div>
                    <span className="text-[8px] text-slate-500 font-mono">DIST: 0.2 AU</span>
                </div>
            </div>
        </div>
      </SciFiPanel>

      {/* Middle Module: Data Stream (Reference: Left Middle) */}
      <SciFiPanel className="flex-1" title="SYS.DIRECTORY" borderColor="cyan" noPadding>
        <div className="h-full flex flex-col font-mono text-[9px] leading-tight p-2">
            <div className="flex text-cyan-600 border-b border-cyan-900/30 mb-1 pb-1">
                <span className="w-8">ID</span>
                <span className="flex-1">MODULE</span>
                <span className="w-8 text-right">STS</span>
            </div>
            {Array.from({length: 12}).map((_, i) => (
                <div key={i} className="flex hover:bg-cyan-500/10 cursor-crosshair">
                    <span className="w-8 text-slate-600">0{i}</span>
                    <span className="flex-1 text-cyan-400 opacity-80">SYS_CORE_{800+i}</span>
                    <span className={`w-8 text-right ${i % 3 === 0 ? 'text-amber-500' : 'text-cyan-600'}`}>
                        {i % 3 === 0 ? 'WRN' : 'OK'}
                    </span>
                </div>
            ))}
            <div className="mt-auto border-t border-cyan-900/30 pt-1">
                <div className="text-[8px] text-slate-500">MEMORY_BUFFER</div>
                <div className="flex gap-0.5 mt-0.5 h-2">
                    {mounted && memoryBuffer.map((isActive, i) => (
                        <div key={i} className={`flex-1 ${isActive ? 'bg-cyan-600' : 'bg-cyan-900/30'}`}></div>
                    ))}
                    {!mounted && Array.from({length: 20}).map((_, i) => (
                        <div key={i} className="flex-1 bg-cyan-900/30"></div>
                    ))}
                </div>
            </div>
        </div>
      </SciFiPanel>

      {/* Bottom Module: Spectrum/Graphs (Reference: Left Bottom) */}
      <SciFiPanel className="h-1/3" title="SPECTRAL_ANALYSIS" borderColor="cyan">
        <div className="h-full flex items-end gap-1 px-1 pb-1">
            {mounted && spectrumHeights.map((height, i) => (
                <div key={i} className="flex-1 flex flex-col-reverse gap-[1px]">
                     {Array.from({length: Math.floor(height/5)}).map((_, j) => (
                         <div
                            key={j}
                            className={`w-full h-1 ${j > 12 ? 'bg-amber-500' : 'bg-cyan-500'} opacity-60`}
                         ></div>
                     ))}
                </div>
            ))}
            {!mounted && Array.from({length: 16}).map((_, i) => (
                <div key={i} className="flex-1 flex flex-col-reverse gap-[1px]">
                     {Array.from({length: 10}).map((_, j) => (
                         <div
                            key={j}
                            className={`w-full h-1 ${j > 7 ? 'bg-amber-500' : 'bg-cyan-500'} opacity-60`}
                         ></div>
                     ))}
                </div>
            ))}
        </div>
      </SciFiPanel>

    </div>
  );
};

'use client';

import React from 'react';
import { SciFiPanel } from './SciFiPanel';

// Generate random values using lazy initializer to avoid impure function calls during render
const BottomConsoleData: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);
  const [data] = React.useState(() =>
    Array.from({length: 8}).map(() => ({
      addr: Math.floor(Math.random()*10000).toString(16).toUpperCase().padStart(4,'0'),
      bytes: Array.from({length: 4}).map(() => Math.floor(Math.random()*255).toString(16).padStart(2,'0')).join(' ')
    }))
  );

  React.useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      {mounted && data.map((item, i) => (
        <div key={i} className="flex gap-2">
          <span>0x{item.addr}</span>
          <span>{item.bytes}</span>
          <span className="text-amber-500/40">..|.</span>
        </div>
      ))}
      {!mounted && Array.from({length: 8}).map((_, i) => (
        <div key={i} className="flex gap-2">
          <span>0x----</span>
          <span>-- -- -- --</span>
          <span className="text-amber-500/40">..|.</span>
        </div>
      ))}
    </>
  );
};

export const BottomConsole: React.FC = () => {
  return (
    <div className="h-auto sm:h-40 shrink-0 flex flex-col sm:flex-row gap-1 pt-1 pb-2">

      {/* Left Panel: Waveform/EQ (Reference: Bottom Left) */}
      <SciFiPanel className="w-full sm:w-1/4 h-20 sm:h-auto" title="SIGNAL_PROC" borderColor="cyan" noPadding>
        <div className="h-full flex items-center gap-0.5 px-1 sm:px-2 py-0.5 sm:py-1 bg-[#020617]">
             {Array.from({length: 20}).map((_, i) => (
                 <div key={i} className="flex-1 flex flex-col gap-[1px] sm:gap-[2px] h-full justify-center">
                     {Array.from({length: 10}).map((_, j) => (
                         <div
                            key={j}
                            className={`w-full flex-1 rounded-[1px] ${
                                10 - j < (Math.sin(i) * 5 + 5) ? 'bg-cyan-500/60' : 'bg-slate-800/20'
                            }`}
                         ></div>
                     ))}
                 </div>
             ))}
        </div>
      </SciFiPanel>

      {/* Middle Panel: Logs & Hex Dump (Reference: Bottom Center) */}
      <SciFiPanel className="flex-1" title="KERNEL_DEBUG" borderColor="amber">
        <div className="flex h-full gap-1 sm:gap-2 text-[7px] sm:text-[9px] font-mono p-1 sm:p-2">
            <div className="flex-1 text-amber-700/60 overflow-hidden flex flex-col select-none">
                 <BottomConsoleData />
            </div>
            <div className="w-32 sm:w-48 border-l border-amber-900/30 pl-1 sm:pl-2 flex flex-col justify-between">
                <div>
                    <div className="text-amber-500 font-bold mb-0.5 sm:mb-1 text-[8px] sm:text-[9px]">SYSTEM_STATUS</div>
                    <div className="flex justify-between text-amber-300/80 text-[7px] sm:text-[9px]">
                        <span>CORE_TEMP</span>
                        <span>450K</span>
                    </div>
                    <div className="flex justify-between text-amber-300/80 text-[7px] sm:text-[9px]">
                        <span>FLUX_CAP</span>
                        <span>98%</span>
                    </div>
                </div>
                <div className="w-full bg-amber-900/20 h-4 sm:h-6 border border-amber-500/30 flex items-center px-0.5 sm:px-1">
                    <span className="animate-pulse text-amber-500 text-[7px] sm:text-[9px]">&gt;&gt; AWAITING_CMD</span>
                </div>
            </div>
        </div>
      </SciFiPanel>

      {/* Right Panel: Schematics (Reference: Bottom Right) */}
      <SciFiPanel className="w-full sm:w-1/4 h-20 sm:h-auto" title="AUX_POWER" borderColor="rose">
        <div className="h-full p-1 sm:p-2 flex gap-1 sm:gap-2">
            <div className="flex-1 border border-rose-900/30 bg-rose-950/10 relative overflow-hidden p-0.5 sm:p-1">
                 <div className="text-[7px] sm:text-[8px] text-rose-500 mb-0.5 sm:mb-1">REACTOR_A</div>
                 <div className="w-full h-1.5 sm:h-2 bg-rose-900/30 mb-0.5 sm:mb-1">
                     <div className="h-full w-[80%] bg-rose-600"></div>
                 </div>
                 <div className="w-full h-1.5 sm:h-2 bg-rose-900/30 mb-0.5 sm:mb-1">
                     <div className="h-full w-[60%] bg-rose-600"></div>
                 </div>
                 <div className="w-full h-1.5 sm:h-2 bg-rose-900/30">
                     <div className="h-full w-[90%] bg-rose-600"></div>
                 </div>
            </div>
            <div className="w-1/3 flex flex-col gap-0.5 sm:gap-1">
                 <button className="flex-1 border border-rose-500/30 bg-rose-500/10 text-[7px] sm:text-[8px] text-rose-400 hover:bg-rose-500/20 touch-manipulation">RESET</button>
                 <button className="flex-1 border border-rose-500/30 bg-rose-500/10 text-[7px] sm:text-[8px] text-rose-400 hover:bg-rose-500/20 touch-manipulation">DUMP</button>
            </div>
        </div>
      </SciFiPanel>

    </div>
  );
};

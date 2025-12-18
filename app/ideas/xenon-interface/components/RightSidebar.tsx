'use client';

import React from 'react';
import { SciFiPanel } from './SciFiPanel';

// Generate random values using lazy initializer to avoid impure function calls during render
const TelemetryMatrix: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);
  const [data] = React.useState(() =>
    Array.from({length: 32}).map(() => ({
      isAmber: Math.random() > 0.8,
      value: Math.floor(Math.random() * 999)
    }))
  );

  React.useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <SciFiPanel className="flex-1" title="TELEMETRY_MATRIX" borderColor="cyan" noPadding>
      <div className="grid grid-cols-4 gap-[1px] bg-cyan-900/20 border-collapse h-full content-start">
        {mounted && data.map((item, i) => (
          <div key={i} className="bg-[#050b14] p-1 flex flex-col items-center justify-center hover:bg-cyan-900/20 transition-colors">
            <span className="text-[7px] text-slate-500">VAL_{i}</span>
            <span className={`text-[10px] font-bold ${item.isAmber ? 'text-amber-400' : 'text-cyan-300'}`}>
              {item.value}
            </span>
          </div>
        ))}
        {!mounted && Array.from({length: 32}).map((_, i) => (
          <div key={i} className="bg-[#050b14] p-1 flex flex-col items-center justify-center">
            <span className="text-[7px] text-slate-500">VAL_{i}</span>
            <span className="text-[10px] font-bold text-cyan-300">---</span>
          </div>
        ))}
      </div>
    </SciFiPanel>
  );
};
import { SystemLog } from '../types';

interface RightSidebarProps {
  logs: SystemLog[];
  isMobile?: boolean;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ logs, isMobile = false }) => {
  if (isMobile) {
    return (
      <div className="flex flex-col gap-1 h-full bg-black/40">
        {/* Mobile: Show command stack with telemetry preview */}
        <SciFiPanel className="flex-1 min-h-0" title="CMD_STACK" borderColor="rose" noPadding>
          <div className="flex flex-col gap-0.5 p-1 font-mono text-[7px] h-full overflow-hidden">
            {['OVERRIDE_AUTH_SEQ', 'SECURE_LINK_EST', 'PROXY_HANDSHAKE'].map((item, i) => (
              <div key={i} className="flex justify-between items-center gap-1">
                <div className="flex items-center gap-1 min-w-0 flex-1">
                  <div className={`w-0.5 h-0.5 shrink-0 ${i === 0 ? 'bg-rose-500 animate-pulse' : 'bg-rose-900'}`}></div>
                  <span className="text-rose-400 truncate">{item}</span>
                </div>
                <span className="text-rose-700 shrink-0">0{i+1}</span>
              </div>
            ))}
            <div className="mt-auto pt-1 border-t border-rose-900/30">
              <div className="flex justify-between text-rose-300/50 text-[6px] mb-0.5">
                <span>UPLOAD_RATE</span>
                <span>45 TB/s</span>
              </div>
              <div className="w-full h-0.5 bg-rose-900/20">
                <div className="w-[60%] h-full bg-rose-600/50"></div>
              </div>
            </div>
            {logs.slice(-1).map((log, i) => (
              <div key={i} className="text-[6px] text-rose-500/70 truncate mt-0.5">
                &gt; {log.message}
              </div>
            ))}
          </div>
        </SciFiPanel>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 h-full w-72 shrink-0 bg-black/40">

      {/* Top Module: Command Stack (Reference: Top Right - Red/White list) */}
      <SciFiPanel className="h-1/3" title="CMD_STACK" borderColor="rose">
        <div className="flex flex-col gap-1 p-2 font-mono text-[9px] h-full overflow-hidden">
             {['OVERRIDE_AUTH_SEQ', 'SECURE_LINK_EST', 'PROXY_HANDSHAKE', 'ENCRYPTION_KEY_GEN', 'FIREWALL_TRAVERSAL'].map((item, i) => (
                 <div key={i} className="flex justify-between items-center group">
                     <div className="flex items-center gap-2">
                         <div className={`w-1 h-1 ${i === 0 ? 'bg-rose-500 animate-pulse' : 'bg-rose-900'}`}></div>
                         <span className="text-rose-400 group-hover:text-rose-200">{item}</span>
                     </div>
                     <span className="text-rose-700">0{i+1}</span>
                 </div>
             ))}
             <div className="my-2 h-[1px] bg-rose-900/30"></div>
             <div className="flex flex-col gap-1">
                 <div className="flex justify-between text-rose-300/50">
                    <span>UPLOAD_RATE</span>
                    <span>45 TB/s</span>
                 </div>
                 <div className="w-full h-0.5 bg-rose-900/20">
                    <div className="w-[60%] h-full bg-rose-600/50"></div>
                 </div>
             </div>
             {logs.slice(-3).map((log, i) => (
                 <div key={i} className="mt-1 text-[8px] text-rose-500/70 truncate">
                    &gt; {log.message}
                 </div>
             ))}
        </div>
      </SciFiPanel>

      {/* Middle Module: Numeric Grid (Reference: Right Middle) */}
      <TelemetryMatrix />

      {/* Bottom Module: Radar (Reference: Right Bottom) */}
      <SciFiPanel className="h-64" title="L.R. SENSORS" borderColor="amber">
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#020100] relative overflow-hidden">

            {/* Radar Container - Perfectly Square */}
            <div className="relative w-full aspect-square max-w-[220px] rounded-full border border-amber-900/30 bg-amber-950/10 shadow-[0_0_20px_rgba(245,158,11,0.05)]">

                {/* Grid Lines */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_69%,_rgba(245,158,11,0.1)_70%,_transparent_71%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_39%,_rgba(245,158,11,0.1)_40%,_transparent_41%)]"></div>
                <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-amber-900/30"></div>
                <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-amber-900/30"></div>

                {/* Rotating Sweep */}
                <div className="absolute inset-0 rounded-full animate-[spin_3s_linear_infinite] overflow-hidden">
                    <div className="w-full h-full bg-[conic-gradient(from_0deg,transparent_75%,rgba(245,158,11,0.2)_100%)]"></div>
                </div>

                {/* Blips */}
                <div className="absolute top-[30%] right-[30%] w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse shadow-[0_0_4px_#f59e0b]"></div>
                <div className="absolute bottom-[40%] left-[20%] w-1 h-1 bg-amber-700 rounded-full opacity-60"></div>

                {/* Status Text */}
                <div className="absolute -bottom-6 w-full text-center text-[8px] text-amber-700 tracking-widest">
                    SCANNING SECTOR 7G...
                </div>
            </div>
        </div>
      </SciFiPanel>

    </div>
  );
};

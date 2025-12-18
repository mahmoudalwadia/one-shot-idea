import React, { useEffect, useRef, useState } from 'react';
import { useClientOnly } from '../hooks/useClientOnly';
import { LogEntry } from '../types';

interface DataStreamProps {
  logs: LogEntry[];
}

const DataStream: React.FC<DataStreamProps> = ({ logs }) => {
  const mounted = useClientOnly();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [matrixChars, setMatrixChars] = useState<string[]>([]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Background random chars effect
  useEffect(() => {
    const chars = "ABCDEF0123456789$#@%&*[]{}<>";
    const updateBg = () => {
      const arr = Array.from({ length: 50 }, () =>
        chars[Math.floor(Math.random() * chars.length)]
      );
      setMatrixChars(arr);
    };
    const interval = setInterval(updateBg, 150);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="relative w-full h-full bg-black overflow-hidden font-mono text-xs md:text-sm p-4 select-none">
        <div className="flex items-center gap-2 mb-4 text-blue-400">
          <div className="w-3 h-3 bg-blue-500 animate-pulse" />
          <h2 className="uppercase tracking-widest font-bold">Sys.Monitor</h2>
          <span className="text-gray-600 ml-auto">V.0.9.1</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-black overflow-hidden font-mono text-xs md:text-sm p-4 select-none">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-2 text-gray-800 pointer-events-none select-none text-[10px] w-32 break-words opacity-20">
        {matrixChars.join(' ')}
      </div>

      <div className="flex items-center gap-2 mb-4 text-blue-400">
        <div className="w-3 h-3 bg-blue-500 animate-pulse" />
        <h2 className="uppercase tracking-widest font-bold">Sys.Monitor</h2>
        <span className="text-gray-600 ml-auto">V.0.9.1</span>
      </div>

      <div
        ref={scrollRef}
        className="h-[calc(100%-3rem)] overflow-y-auto font-retro leading-tight overscroll-contain"
        style={{ touchAction: 'pan-y' }}
      >
        {logs.map((log) => (
          <div key={log.id} className="mb-1 hover:bg-white/5 p-1 rounded transition-colors group">
            <span className="text-gray-500 mr-2">[{log.timestamp}]</span>
            <span className={`
              ${log.type === 'error' ? 'text-red-500 font-bold' : ''}
              ${log.type === 'warning' ? 'text-yellow-500' : ''}
              ${log.type === 'success' ? 'text-green-400' : ''}
              ${log.type === 'info' ? 'text-blue-300' : ''}
            `}>
              {log.type === 'error' ? 'CRITICAL >> ' : ''}
              {log.message}
            </span>
            {log.type === 'error' && (
               <div className="ml-16 text-[10px] text-red-900 opacity-0 group-hover:opacity-100 transition-opacity">
                 STACK_TRACE: 0x{(() => {
                   // Generate stable hash from log id
                   let hash = 0;
                   for (let i = 0; i < log.id.length; i++) {
                     hash = ((hash << 5) - hash) + log.id.charCodeAt(i);
                     hash = hash & hash;
                   }
                   return Math.abs(hash % 99999).toString(16).toUpperCase();
                 })()} {/* NULL_POINTER */}
               </div>
            )}
          </div>
        ))}
        <div className="text-blue-500 animate-pulse">_</div>
      </div>
    </div>
  );
};

export default DataStream;

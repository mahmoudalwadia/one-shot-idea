import React, { useEffect, useState } from 'react';
import { useClientOnly } from '../hooks/useClientOnly';

const COLS = 45; // Increased from 20 to fit double-wide span
const ROWS = 12;

const AsciiWaveform: React.FC = () => {
  const mounted = useClientOnly();
  const [heights, setHeights] = useState<number[]>(new Array(COLS).fill(2));

  useEffect(() => {
    const interval = setInterval(() => {
      setHeights(prev => prev.map((h) => {
        // Random fluctuation
        let change = Math.random() > 0.5 ? 1 : -1;
        // Occasional spike
        if (Math.random() > 0.85) change += (Math.random() > 0.5 ? 3 : -3);
        
        let newH = h + change;
        // Constrain and pull to center
        if (newH < 0) newH = 1;
        if (newH >= ROWS) newH = ROWS - 1;
        if (newH > 8 && Math.random() > 0.4) newH -= 2;
        if (newH < 3 && Math.random() > 0.4) newH += 1;
        
        return newH;
      }));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-black flex flex-col items-center justify-center font-mono relative overflow-hidden select-none">
        <div className="absolute top-2 left-2 text-amber-600 text-[10px] font-retro tracking-widest animate-pulse">
          FREQ.MODULATOR
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center font-mono relative overflow-hidden select-none">
        <div className="absolute top-2 left-2 text-amber-600 text-[10px] font-retro tracking-widest animate-pulse">
            FREQ.MODULATOR
        </div>
        <div className="flex items-end gap-[1px] md:gap-1">
            {heights.map((h, i) => (
                <div key={i} className="flex flex-col-reverse text-amber-500 text-[10px] md:text-xs leading-none">
                    {Array.from({length: ROWS}).map((_, y) => (
                        <span key={y} className={`${y < h ? 'opacity-100' : 'opacity-10 text-amber-900'}`}>
                            {y < h ? '█' : '|'}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    </div>
  );
};

export default AsciiWaveform;

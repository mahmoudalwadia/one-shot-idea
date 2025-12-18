import React, { useEffect, useState } from 'react';

const AsciiSwirl: React.FC = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setPhase(p => p + 0.2), 50);
    return () => clearInterval(interval);
  }, []);

  const renderSwirl = () => {
      const size = 12;
      const center = size/2;
      const grid = [];
      
      for(let y=0; y<size; y++) {
          let row = "";
          for(let x=0; x<size; x++) {
              const dx = x - center;
              const dy = y - center;
              const dist = Math.sqrt(dx*dx + dy*dy);
              const angle = Math.atan2(dy, dx);
              
              // Archimedean spiral formula modified
              const val = Math.sin(dist * 1.5 + angle * 3 - phase);
              
              if(dist > center) row += " ";
              else if(val > 0.5) row += "@";
              else if(val > 0) row += "o";
              else row += ".";
          }
          grid.push(row);
      }
      return grid;
  }

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden font-mono text-violet-400">
        <div className="absolute top-1 left-1 text-violet-800 text-[8px]">VORTEX</div>
        <div className="text-[10px] leading-[0.6rem] whitespace-pre">
            {renderSwirl().map((r,i) => <div key={i}>{r}</div>)}
        </div>
    </div>
  );
};

export default AsciiSwirl;

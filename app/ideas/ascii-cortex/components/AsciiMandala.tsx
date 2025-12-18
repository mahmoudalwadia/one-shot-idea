import React, { useEffect, useState } from 'react';

const AsciiMandala: React.FC = () => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setAngle(a => a + 0.1), 100);
    return () => clearInterval(interval);
  }, []);

  const renderMandala = () => {
      const size = 11;
      const center = size/2;
      const grid = [];
      
      for(let y=0; y<size; y++) {
          let row = "";
          for(let x=0; x<size; x++) {
             const dx = x - center;
             const dy = y - center;
             const dist = Math.sqrt(dx*dx + dy*dy);
             const a = Math.atan2(dy, dx) + angle;
             
             const val = Math.sin(dist * 2 - angle * 2) * Math.cos(a * 4);
             
             if (dist > center) row += " ";
             else if (val > 0.8) row += "@";
             else if (val > 0.4) row += "%";
             else if (val > 0) row += ":";
             else row += ".";
          }
          grid.push(row);
      }
      return grid;
  }

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden font-mono text-fuchsia-400">
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-fuchsia-800 text-[8px]">PSYCH.CORE</div>
        <div className="text-[10px] leading-[0.6rem] whitespace-pre">
            {renderMandala().map((r,i) => <div key={i}>{r}</div>)}
        </div>
    </div>
  );
};

export default AsciiMandala;

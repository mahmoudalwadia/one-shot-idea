import React, { useEffect, useState } from 'react';

const AsciiSolar: React.FC = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let frameId = requestAnimationFrame(function loop() {
        setTick(t => t + 1);
        frameId = requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

  const renderSystem = () => {
      const W = 30, H = 15;
      const grid = Array.from({length: H}, () => Array(W).fill(' '));
      const cx = W / 2, cy = H / 2;
      
      // Sun
      grid[Math.floor(cy)][Math.floor(cx)] = '☼';

      const planets = [
          { r: 4, s: 0.1, c: 'o', label: '1' },
          { r: 7, s: 0.06, c: 'O', label: '2' },
          { r: 10, s: 0.04, c: '@', label: '3' },
      ];

      planets.forEach(p => {
          const angle = tick * p.s;
          const px = cx + Math.cos(angle) * p.r * 1.8; // stretch x for aspect ratio
          const py = cy + Math.sin(angle) * p.r;
          
          const ix = Math.floor(px);
          const iy = Math.floor(py);
          
          if(ix >= 0 && ix < W && iy >= 0 && iy < H) {
              grid[iy][ix] = p.c;
          }
      });
      
      return grid.map(r => r.join(''));
  }

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden text-yellow-500 font-mono text-[10px] leading-[0.6rem]">
        <div className="absolute bottom-1 right-1 text-yellow-800 text-[8px]">ORBITAL_MECH</div>
        <div className="whitespace-pre">{renderSystem().map((r,i) => <div key={i}>{r}</div>)}</div>
    </div>
  );
};

export default AsciiSolar;

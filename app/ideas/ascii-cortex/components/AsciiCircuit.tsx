import React, { useEffect, useState } from 'react';
import { useClientOnly } from '../hooks/useClientOnly';

const AsciiCircuit: React.FC = () => {
  const mounted = useClientOnly();
  const [pulses, setPulses] = useState<{x: number, y: number, dir: number}[]>([]);

  useEffect(() => {
      const interval = setInterval(() => {
          setPulses(current => {
              // Move existing
              const next = current.map(p => {
                  let nx = p.x, ny = p.y;
                  if (p.dir === 0) nx++; // R
                  if (p.dir === 1) ny++; // D
                  if (p.dir === 2) nx--; // L
                  if (p.dir === 3) ny--; // U
                  
                  // Chance to turn
                  let ndir = p.dir;
                  if (Math.random() > 0.8) ndir = Math.floor(Math.random() * 4);
                  
                  return {x: nx, y: ny, dir: ndir};
              }).filter(p => p.x >= 0 && p.x < 15 && p.y >= 0 && p.y < 10);

              // Spawn new
              if (Math.random() > 0.7) {
                  next.push({
                      x: Math.floor(Math.random() * 15),
                      y: Math.floor(Math.random() * 10),
                      dir: Math.floor(Math.random() * 4)
                  });
              }
              return next;
          });
      }, 100);
      return () => clearInterval(interval);
  }, []);

  const renderBoard = () => {
      const W = 15, H = 10;
      const grid = Array.from({length: H}, () => Array(W).fill('·'));
      pulses.forEach(p => {
          if(p.x >=0 && p.x < W && p.y >=0 && p.y < H) {
              grid[p.y][p.x] = 'o';
          }
      });
      return grid;
  }

  if (!mounted) {
    return (
      <div className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden font-mono text-teal-600">
        <div className="absolute bottom-1 right-1 text-teal-800 text-[8px]">PCB.TRACE</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden font-mono text-teal-600">
        <div className="absolute bottom-1 right-1 text-teal-800 text-[8px]">PCB.TRACE</div>
        <div className="flex flex-col text-[10px] leading-[0.7rem]">
            {renderBoard().map((r, y) => (
                <div key={y} className="flex">
                    {r.map((c, x) => (
                         <span key={x} className={c === 'o' ? 'text-teal-300 font-bold' : 'opacity-20'}>{c}</span>
                    ))}
                </div>
            ))}
        </div>
    </div>
  );
};

export default AsciiCircuit;

import React, { useEffect, useState } from 'react';
import { useClientOnly } from '../hooks/useClientOnly';

const W = 20;
const H = 12;

const AsciiSnow: React.FC = () => {
  const mounted = useClientOnly();
  const [flakes, setFlakes] = useState<{x: number, y: number}[]>([]);
  const [pile, setPile] = useState<number[]>(new Array(W).fill(0));

  useEffect(() => {
    const interval = setInterval(() => {
      setFlakes(current => {
          const next = [];
          // Spawn
          if(Math.random() > 0.6) {
              next.push({x: Math.floor(Math.random() * W), y: 0});
          }

          // Move
          for(const f of current) {
              const ny = f.y + 1;
              setPile(p => {
                if (ny >= H - p[f.x]) {
                  // Landed
                  const np = [...p];
                  if(np[f.x] < H) np[f.x]++;
                  return np;
                } else {
                  // Fall
                  // Simple wind
                  let nx = f.x + (Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0);
                  if (nx < 0) nx = W - 1;
                  if (nx >= W) nx = 0;
                  next.push({x: nx, y: ny});
                }
                return p;
              });
          }
          return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const renderScene = () => {
      const grid = Array.from({length: H}, () => Array(W).fill(' '));

      // Draw Flakes
      flakes.forEach(f => {
          if(f.y < H && f.x < W) grid[f.y][f.x] = '*';
      });

      // Draw Pile
      for(let x=0; x<W; x++) {
          const h = pile[x];
          for(let i=0; i<h; i++) {
              grid[H - 1 - i][x] = '#';
          }
      }
      return grid.map(r => r.join(''));
  }

  if (!mounted) {
    return (
      <div className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden font-mono text-white">
        <div className="absolute top-1 left-1 text-gray-600 text-[8px]">CRYO.CHAMBER</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden font-mono text-white">
        <div className="absolute top-1 left-1 text-gray-600 text-[8px]">CRYO.CHAMBER</div>
        <div className="whitespace-pre text-[10px] leading-[0.6rem] text-slate-300">
            {renderScene().map((r,i) => <div key={i}>{r}</div>)}
        </div>
    </div>
  );
};

export default AsciiSnow;

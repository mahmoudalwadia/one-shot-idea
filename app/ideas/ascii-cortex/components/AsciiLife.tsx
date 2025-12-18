import React, { useEffect, useState } from 'react';
import { useClientOnly } from '../hooks/useClientOnly';

const COLS = 20;
const ROWS = 12;

const AsciiLife: React.FC = () => {
  const mounted = useClientOnly();
  const [grid, setGrid] = useState<number[][]>([]);

  useEffect(() => {
    // Initialize grid only on client to prevent hydration mismatch
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGrid(Array.from({length: ROWS}, () =>
        Array.from({length: COLS}, () => Math.random() > 0.7 ? 1 : 0)
    ));
  }, []);

  useEffect(() => {
    if (grid.length === 0) return;

    const interval = setInterval(() => {
        setGrid(g => {
            const next = g.map(row => [...row]);
            for(let y=0; y<ROWS; y++) {
                for(let x=0; x<COLS; x++) {
                    let neighbors = 0;
                    for(let dy=-1; dy<=1; dy++) {
                        for(let dx=-1; dx<=1; dx++) {
                            if(dx===0 && dy===0) continue;
                            const ny = y+dy, nx = x+dx;
                            if(ny>=0 && ny<ROWS && nx>=0 && nx<COLS) {
                                neighbors += g[ny][nx];
                            }
                        }
                    }
                    if (g[y][x] === 1 && (neighbors < 2 || neighbors > 3)) next[y][x] = 0;
                    if (g[y][x] === 0 && neighbors === 3) next[y][x] = 1;
                }
            }
            // Add some noise if empty to keep it alive in this small view
            if(Math.random() > 0.9) {
                next[Math.floor(Math.random()*ROWS)][Math.floor(Math.random()*COLS)] = 1;
            }
            return next;
        });
    }, 200);

    return () => clearInterval(interval);
  }, [grid.length]);

  if (!mounted || grid.length === 0) {
    return (
      <div className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden font-mono">
        <div className="absolute top-1 right-1 text-lime-800 text-[8px]">CELL.AUTO</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden font-mono">
        <div className="absolute top-1 right-1 text-lime-800 text-[8px]">CELL.AUTO</div>
        <div className="flex flex-col text-[10px] leading-none text-lime-500">
            {grid.map((row, y) => (
                <div key={y} className="flex">
                    {row.map((cell, x) => (
                        <span key={x} className={cell ? 'opacity-100' : 'opacity-10'}>
                            {cell ? '■' : '·'}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    </div>
  );
};

export default AsciiLife;

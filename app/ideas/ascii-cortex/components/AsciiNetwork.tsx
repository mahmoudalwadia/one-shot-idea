import React, { useEffect, useState } from 'react';
import { useClientOnly } from '../hooks/useClientOnly';

const POINTS = 8;
const AsciiNetwork: React.FC = () => {
  const mounted = useClientOnly();
  const [nodes, setNodes] = useState<{x:number, y:number, vx:number, vy:number}[]>([]);

  useEffect(() => {
    // Initialize nodes only on client to prevent hydration mismatch
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNodes(Array.from({length: POINTS}, () => ({
        x: Math.random() * 20,
        y: Math.random() * 10,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2
    })));
  }, []);

  useEffect(() => {
    if (nodes.length === 0) return;
    const interval = setInterval(() => {
        setNodes(prev => prev.map(n => {
            const nx = n.x + n.vx;
            const ny = n.y + n.vy;
            const vx = (nx < 0 || nx > 20) ? -n.vx : n.vx;
            const vy = (ny < 0 || ny > 10) ? -n.vy : n.vy;
            return { ...n, x: nx, y: ny, vx, vy };
        }));
    }, 50);
    return () => clearInterval(interval);
  }, [nodes.length]);

  const renderGrid = () => {
      const grid = Array(12).fill("").map(() => Array(24).fill(" "));

      // Draw Connections
      nodes.forEach((n1, i) => {
          nodes.forEach((n2, j) => {
              if (i >= j) return;
              const dx = n1.x - n2.x;
              const dy = n1.y - n2.y;
              const dist = Math.sqrt(dx*dx + dy*dy);
              if (dist < 6) {
                  const midX = Math.floor((n1.x + n2.x)/2);
                  const midY = Math.floor((n1.y + n2.y)/2);
                  if(midY >= 0 && midY < 12 && midX >= 0 && midX < 24) {
                      grid[midY][midX] = dist < 3 ? '+' : '.';
                  }
              }
          });
      });

      // Draw Nodes
      nodes.forEach(n => {
          const ix = Math.floor(n.x);
          const iy = Math.floor(n.y);
          if(iy >= 0 && iy < 12 && ix >= 0 && ix < 24) {
              grid[iy][ix] = 'O';
          }
      });

      return grid.map(row => row.join(""));
  };

  if (!mounted || nodes.length === 0) {
    return (
      <div className="w-full h-full bg-black flex flex-col items-center justify-center font-mono overflow-hidden relative text-indigo-400">
        <div className="absolute bottom-2 right-2 text-indigo-800 text-[9px]">
          NET.TOPOLOGY
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center font-mono overflow-hidden relative text-indigo-400">
        <div className="absolute bottom-2 right-2 text-indigo-800 text-[9px]">
            NET.TOPOLOGY
        </div>
        <div className="whitespace-pre text-[10px] leading-[0.6rem]">
            {renderGrid().map((row, i) => <div key={i}>{row}</div>)}
        </div>
    </div>
  );
};

export default AsciiNetwork;

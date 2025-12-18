import React, { useEffect, useState } from 'react';
import { useClientOnly } from '../hooks/useClientOnly';

const W = 45; // Increased from 20 for double column span

const AsciiLandscape: React.FC = () => {
  const mounted = useClientOnly();
  const [offset, setOffset] = useState(0);
  const [terrainPattern, setTerrainPattern] = useState<boolean[][]>([]);

  useEffect(() => {
    // Initialize terrainPattern only on client to prevent hydration mismatch
    const pattern: boolean[][] = [];
    for(let x=0; x<W*2; x++) {
      pattern[x] = [];
      for(let y=0; y<8; y++) {
        pattern[x][y] = Math.random() > 0.8;
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTerrainPattern(pattern);
  }, []);

  useEffect(() => {
    if (terrainPattern.length === 0) return;
    const interval = setInterval(() => setOffset(o => o + 1), 150);
    return () => clearInterval(interval);
  }, [terrainPattern.length]);

  const renderTerrain = () => {
      const rows = 8;
      const grid = Array.from({length: rows}, () => Array(W).fill(' '));

      for(let x=0; x<W; x++) {
          const worldX = x + offset;
          // Simple noise function
          const h1 = Math.sin(worldX * 0.2) * 2 + 3; // Hills
          const h2 = Math.sin(worldX * 0.5) * 1 + 1; // Detail
          const height = Math.floor(h1 + h2);

          for(let y=0; y<rows; y++) {
              if (rows - y <= height) {
                 const patternX = worldX % (W*2);
                 grid[y][x] = (rows - y === height) ? 'A' : (terrainPattern[patternX]?.[y] ? '░' : '█');
              }
          }
      }
      return grid.map(r => r.join(''));
  }

  if (!mounted || terrainPattern.length === 0) {
    return (
      <div className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden font-mono text-stone-400">
        <div className="absolute top-1 right-1 text-stone-600 text-[8px]">TERRA.SIM</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden font-mono text-stone-400">
        <div className="absolute top-1 right-1 text-stone-600 text-[8px]">TERRA.SIM</div>
        <div className="whitespace-pre text-[10px] leading-[0.6rem]">
            {renderTerrain().map((r, i) => <div key={i} className={i < 3 ? 'text-stone-600' : 'text-stone-400'}>{r}</div>)}
        </div>
    </div>
  );
};

export default AsciiLandscape;

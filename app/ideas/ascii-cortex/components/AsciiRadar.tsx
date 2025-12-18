import React, { useEffect, useState } from 'react';
import { useClientOnly } from '../hooks/useClientOnly';

const SIZE = 13;

const AsciiRadar: React.FC = () => {
  const mounted = useClientOnly();
  const [angle, setAngle] = useState(0);
  const [blips, setBlips] = useState<{x: number, y: number}[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
        setAngle(a => (a + 5) % 360);
        // Random blip generation
        if (Math.random() > 0.995) {
          const center = Math.floor(SIZE / 2);
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * (center - 1);
          const x = Math.floor(center + Math.cos(angle) * dist);
          const y = Math.floor(center + Math.sin(angle) * dist);
          setBlips(prev => [...prev, {x, y}]);
          setTimeout(() => {
            setBlips(prev => prev.slice(1));
          }, 2000);
        }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const renderRadar = () => {
    const grid = [];
    const center = Math.floor(SIZE / 2);

    for (let y = 0; y < SIZE; y++) {
        const row = [];
        for (let x = 0; x < SIZE; x++) {
            const dx = x - center;
            const dy = y - center;
            const dist = Math.sqrt(dx*dx + dy*dy);

            // Calculate angle of this point
            let theta = Math.atan2(dy, dx) * (180 / Math.PI);
            if (theta < 0) theta += 360;

            const diff = Math.abs(theta - angle);
            const isSweep = diff < 15 || diff > 345;

            let char = ' ';
            let color = 'text-gray-900';

            // Circular rim
            if (Math.abs(dist - center + 1) < 0.5) {
                char = '+';
                color = 'text-green-900';
            }

            // Sweep line
            if (dist < center && isSweep) {
                char = '.';
                color = 'text-green-400';
            }

            // Random blip
            if (blips.some(b => b.x === x && b.y === y)) {
                char = 'O';
                color = 'text-red-500 animate-pulse';
            }

            // Center
            if (x === center && y === center) {
                char = '+';
                color = 'text-green-500';
            }

            row.push(<span key={x} className={color}>{char}</span>);
        }
        grid.push(<div key={y} className="flex">{row}</div>);
    }
    return grid;
  }

  if (!mounted) {
    return (
      <div className="w-full h-full bg-black flex flex-col items-center justify-center font-mono overflow-hidden relative">
        <div className="absolute top-1 left-1 text-green-700 text-[9px]">L.R.SCAN</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center font-mono overflow-hidden relative">
      <div className="absolute top-1 left-1 text-green-700 text-[9px]">L.R.SCAN</div>
      <div className="text-[10px] leading-[0.6rem] font-bold">
        {renderRadar()}
      </div>
    </div>
  );
};

export default AsciiRadar;

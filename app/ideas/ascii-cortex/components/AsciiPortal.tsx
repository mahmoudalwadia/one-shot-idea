import React, { useEffect, useState } from 'react';

const AsciiPortal: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setStep(s => (s + 1) % 4), 150);
    return () => clearInterval(interval);
  }, []);

  const renderPortal = () => {
    const size = 15;
    const center = Math.floor(size / 2);
    const grid = Array.from({length: size}, () => Array(size).fill(' '));

    for (let r = 0; r <= center; r++) {
        // Calculate "depth" relative to step for movement effect
        // We want rings to move outwards or inwards. Let's move inwards (larger r to smaller r?)
        // Or just shift the character set based on step.
        
        const layerChar = (r + step) % 4 === 0 ? '#' : 
                          (r + step) % 4 === 1 ? '+' : 
                          (r + step) % 4 === 2 ? ':' : '.';
        
        // Draw square ring at radius r
        for(let i = r; i < size - r; i++) {
            grid[r][i] = layerChar;
            grid[size - 1 - r][i] = layerChar;
            grid[i][r] = layerChar;
            grid[i][size - 1 - r] = layerChar;
        }
    }
    
    // Clear center
    grid[center][center] = '·';
    
    return grid.map(row => row.join(' ')); // Add space for aspect ratio
  }

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden font-mono text-purple-500">
        <div className="absolute top-1 right-1 text-purple-800 text-[8px]">WARP.GATE</div>
        <div className="text-[8px] leading-[0.5rem] whitespace-pre flex flex-col items-center">
            {renderPortal().map((r,i) => <div key={i}>{r}</div>)}
        </div>
    </div>
  );
};

export default AsciiPortal;

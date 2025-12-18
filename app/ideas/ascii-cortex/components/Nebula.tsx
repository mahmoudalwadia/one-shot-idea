import React, { useEffect, useMemo, useState } from 'react';

const COLS = 20;
const ROWS = 16;
const CHARS = ['@', '#', '&', '%', '=', '+', '*', ':', '-', '.', ' '];

const Nebula: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [hoverPos, setHoverPos] = useState({ x: -1, y: -1 });

  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      setOffset(prev => prev + 0.05);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const grid = useMemo(() => {
    const cells = [];
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        // Simple procedural generation math to simulate a cloud/nebula shape
        const dx = x - COLS / 2;
        const dy = y - ROWS / 2;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Time based wobble
        const wobble = Math.sin(x * 0.5 + offset) + Math.cos(y * 0.5 + offset * 1.5);
        const noiseValue = (Math.sin(dx * 0.3) * Math.cos(dy * 0.3)) + (wobble * 0.2);
        
        // Determine Color
        // The image has Purples, Blues, and Cyans
        let colorClass = 'text-gray-900';
        let charIndex = CHARS.length - 1;

        if (dist < 4 + Math.abs(wobble)) {
            charIndex = Math.floor(Math.abs(noiseValue * 4)) % 5;
            // Core
            colorClass = 'text-fuchsia-500 drop-shadow-[0_0_5px_rgba(217,70,239,0.8)]';
        } else if (dist < 7) {
            charIndex = 3 + Math.floor(Math.abs(noiseValue * 5)) % 5;
            // Mid
            colorClass = 'text-blue-500 drop-shadow-[0_0_3px_rgba(59,130,246,0.5)]';
        } else if (dist < 9) {
            charIndex = 6 + Math.floor(Math.abs(noiseValue * 3)) % 3;
            // Outer
            colorClass = 'text-cyan-800';
        }

        // Mouse interaction glow
        const isHovered = Math.abs(x - hoverPos.x) <= 1 && Math.abs(y - hoverPos.y) <= 1;
        if (isHovered) {
          colorClass = 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,1)]';
          charIndex = 0; // Solid block for highlight
        }

        cells.push({
          x,
          y,
          char: CHARS[Math.min(charIndex, CHARS.length - 1)],
          colorClass
        });
      }
    }
    return cells;
  }, [offset, hoverPos]);

  return (
    <div 
      className="w-full h-full bg-black overflow-hidden flex items-center justify-center relative cursor-crosshair"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = Math.floor(((e.clientX - rect.left) / rect.width) * COLS);
        const y = Math.floor(((e.clientY - rect.top) / rect.height) * ROWS);
        setHoverPos({ x, y });
      }}
      onMouseLeave={() => setHoverPos({ x: -1, y: -1 })}
    >
       <div className="absolute top-2 right-2 text-xs text-fuchsia-700 font-mono">
        ENTITY: UNKNOWN
      </div>
      
      <div 
        className="grid font-mono text-xl md:text-2xl leading-none select-none"
        style={{ 
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          width: 'fit-content'
        }}
      >
        {grid.map((cell, i) => (
          <span key={i} className={`${cell.colorClass} transition-colors duration-75`}>
            {cell.char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Nebula;

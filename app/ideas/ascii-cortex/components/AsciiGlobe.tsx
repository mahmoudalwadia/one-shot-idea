import React, { useEffect, useState } from 'react';

const AsciiGlobe: React.FC = () => {
  const [frame, setFrame] = useState(0);
  const WIDTH = 24;
  const HEIGHT = 12;
  
  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      setFrame(f => f + 0.05);
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const renderGlobe = () => {
    const chars = new Array(HEIGHT * WIDTH).fill(' ');
    const radius = 5;
    const cx = WIDTH / 2;
    const cy = HEIGHT / 2;

    for (let lat = -Math.PI / 2; lat <= Math.PI / 2; lat += 0.3) {
      for (let lon = 0; lon <= 2 * Math.PI; lon += 0.3) {
        // Rotate longitude with time
        const rLon = lon + frame;
        
        // 3D Coordinates
        const x = radius * Math.cos(lat) * Math.cos(rLon);
        const y = radius * Math.sin(lat);
        const z = radius * Math.cos(lat) * Math.sin(rLon);

        // Project to 2D
        const px = Math.floor(cx + x * 2); // Scale X for aspect ratio
        const py = Math.floor(cy + y);

        if (px >= 0 && px < WIDTH && py >= 0 && py < HEIGHT) {
           // Z-buffering check (only draw front face)
           if (z > 0) {
               const idx = py * WIDTH + px;
               // Shading based on Z
               chars[idx] = z > 3 ? '#' : (z > 1.5 ? '+' : '.');
           }
        }
      }
    }
    
    // Convert to rows
    const rows = [];
    for (let i = 0; i < HEIGHT; i++) {
        rows.push(chars.slice(i * WIDTH, (i + 1) * WIDTH).join(''));
    }
    return rows;
  };

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center font-mono overflow-hidden relative">
      <div className="absolute top-2 right-2 text-cyan-600 text-[10px] animate-pulse">
        GEO.SYNC
      </div>
      <div className="text-cyan-400 text-xs leading-[0.6rem] md:leading-[0.8rem] whitespace-pre font-bold">
        {renderGlobe().map((row, i) => (
            <div key={i}>{row}</div>
        ))}
      </div>
    </div>
  );
};

export default AsciiGlobe;

import React, { useEffect, useState } from 'react';

const ROWS = 14;
const WIDTH = 28;

const AsciiDna: React.FC = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let frameId: number;
    const animate = () => {
        setTick(t => t + 0.08); // Speed
        frameId = requestAnimationFrame(animate);
    }
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const renderRow = (y: number) => {
    const phase = tick + (y * 0.5);
    const center = WIDTH / 2;
    const amplitude = 8;

    // Sine waves for the two strands
    const x1 = center + Math.sin(phase) * amplitude;
    const x2 = center + Math.sin(phase + Math.PI) * amplitude;

    const chars = new Array(WIDTH).fill(' ');

    const idx1 = Math.floor(x1);
    const idx2 = Math.floor(x2);

    // Render Strands
    if (idx1 >= 0 && idx1 < WIDTH) chars[idx1] = (idx1 > idx2) ? 'O' : 'o'; // Depth effect
    if (idx2 >= 0 && idx2 < WIDTH) chars[idx2] = (idx2 > idx1) ? 'O' : 'o';

    // Render Connections
    const min = Math.min(idx1, idx2);
    const max = Math.max(idx1, idx2);
    // Draw connection only if strands are far enough apart
    if (max - min > 1) {
        // Only draw connection occasionally or every few rows for "ladder" effect
        // Or continuously for "mesh" effect. Let's do continuously.
        const mid = Math.floor((min + max) / 2);
        if (min >= 0 && max < WIDTH) {
            chars[mid] = '·';
            if (max - min > 4) {
                 chars[Math.floor((min+mid)/2)] = '-';
                 chars[Math.floor((max+mid)/2)] = '-';
            }
        }
    }

    return chars.join('');
  }

  return (
     <div className="w-full h-full bg-black flex items-center justify-center relative overflow-hidden font-mono text-xs text-emerald-500">
         <div className="absolute top-2 right-2 text-emerald-800 text-xs font-retro">
            SEQ_ANALYSIS
        </div>
        <div className="flex flex-col whitespace-pre leading-[0.85rem] md:leading-4">
            {Array.from({length: ROWS}).map((_, i) => (
                <div key={i}>{renderRow(i)}</div>
            ))}
        </div>
     </div>
  );
}

export default AsciiDna;

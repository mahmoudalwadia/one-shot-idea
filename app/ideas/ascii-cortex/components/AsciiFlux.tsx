import React, { useEffect, useState } from 'react';
import { useClientOnly } from '../hooks/useClientOnly';

const COLS = 20;

const AsciiFlux: React.FC = () => {
  const mounted = useClientOnly();
  const [lines, setLines] = useState<number[][]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
        setLines(prev => {
            const nextRow = Array.from({length: COLS}, () => Math.random() > 0.7 ? 1 : 0);
            const newLines = [nextRow, ...prev];
            if (newLines.length > 12) newLines.pop();
            return newLines;
        });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-black flex flex-col items-center justify-center font-mono overflow-hidden relative">
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-pink-700 text-[9px]">
          FLUX.CAP
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center font-mono overflow-hidden relative">
         <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-pink-700 text-[9px]">
            FLUX.CAP
        </div>
        <div className="flex gap-[2px]">
            {Array.from({length: COLS}).map((_, x) => (
                <div key={x} className="flex flex-col text-[10px] leading-none">
                    {lines.map((row, y) => (
                        <span key={y} className={row[x] ? "text-pink-400" : "text-pink-900 opacity-20"}>
                            {row[x] ? "|" : ":"}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    </div>
  );
};

export default AsciiFlux;

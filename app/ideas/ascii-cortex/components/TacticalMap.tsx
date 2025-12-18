import React, { useEffect, useState } from 'react';
import { useClientOnly } from '../hooks/useClientOnly';

const TacticalMap: React.FC = () => {
  const mounted = useClientOnly();
  const GRID_SIZE = 15;
  const [scanLine, setScanLine] = useState(0);
  const [targets] = useState<{x: number, y: number}[]>([{x: 7, y: 7}, {x: 3, y: 10}]);
  const [randomCoord, setRandomCoord] = useState<number | null>(null);

  useEffect(() => {
    // Initialize randomCoord only on client to prevent hydration mismatch
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRandomCoord(Math.floor(Math.random() * 100));
  }, []);

  useEffect(() => {
    if (randomCoord === null) return;
    const interval = setInterval(() => {
      setScanLine(prev => (prev + 1) % GRID_SIZE);
    }, 150);
    return () => clearInterval(interval);
  }, [randomCoord]);

  if (!mounted || randomCoord === null) {
    return (
      <div className="w-full h-full bg-black relative p-4 flex flex-col items-center justify-center font-mono overflow-hidden group">
        <div className="absolute top-2 left-2 text-term-green text-xs animate-pulse">
          SECTOR SCANNING...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black relative p-4 flex flex-col items-center justify-center font-mono overflow-hidden group">
        <div className="absolute top-2 left-2 text-term-green text-xs animate-pulse">
            SECTOR SCANNING...
        </div>

        {/* Grid Container */}
        <div className="relative">
            {/* SVG Overlay for Grid Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" width="100%" height="100%">
                <defs>
                    <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-green-900"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#smallGrid)" />
            </svg>

            {/* ASCII Layer */}
            <div
                className="grid gap-0 leading-none relative z-10"
                style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
            >
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                    const x = i % GRID_SIZE;
                    const y = Math.floor(i / GRID_SIZE);

                    const isTarget = targets.some(t => t.x === x && t.y === y);
                    const isScanLine = x === scanLine;

                    // Background terrain noise
                    const isTerrain = (Math.sin(x * 0.4) * Math.cos(y * 0.4)) > 0.3;

                    let char = isTerrain ? '.' : ' ';
                    let color = 'text-green-900';

                    if (isScanLine) {
                        color = 'text-green-400 bg-green-900/20';
                        char = isTerrain ? ':' : '|';
                    }

                    if (isTarget) {
                        char = '⌖';
                        color = isScanLine ? 'text-white bg-green-500' : 'text-green-500 animate-pulse';
                    }

                    return (
                        <div
                            key={i}
                            className={`w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-sm ${color}`}
                        >
                            {char}
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Interactive Element */}
        <div className="absolute bottom-4 left-4 text-[10px] text-green-700">
            COORDS: {scanLine} : {randomCoord}
        </div>
    </div>
  );
};

export default TacticalMap;

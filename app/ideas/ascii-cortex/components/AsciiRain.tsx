import React, { useEffect, useState } from 'react';
import { useClientOnly } from '../hooks/useClientOnly';

const COLS = 15;
const ROWS = 12;
const CHARS = '01xyzw';

const AsciiRain: React.FC = () => {
  const mounted = useClientOnly();
  const [drops, setDrops] = useState<number[]>([]);
  const [charMap, setCharMap] = useState<string[][]>([]);

  useEffect(() => {
    // Initialize drops and charMap only on client to prevent hydration mismatch
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDrops(new Array(COLS).fill(0).map(() => Math.random() * -20));
    const map: string[][] = [];
    for (let x = 0; x < COLS; x++) {
      map[x] = [];
      for (let r = 0; r < ROWS; r++) {
        map[x][r] = CHARS[Math.floor(Math.random() * CHARS.length)];
      }
    }
    setCharMap(map);
  }, []);

  useEffect(() => {
    if (drops.length === 0) return;
    const interval = setInterval(() => {
      setDrops(prev => prev.map(y => {
        return y > ROWS ? Math.random() * -10 : y + 0.5 + Math.random() * 0.5;
      }));
    }, 50);
    return () => clearInterval(interval);
  }, [drops.length]);

  if (!mounted || drops.length === 0 || charMap.length === 0) {
    return (
      <div className="w-full h-full bg-black flex justify-center overflow-hidden relative">
        <div className="absolute bottom-2 left-2 text-green-800 text-[10px] font-mono">
          DATA.LEAK
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black flex justify-center overflow-hidden relative">
      <div className="absolute bottom-2 left-2 text-green-800 text-[10px] font-mono">
        DATA.LEAK
      </div>
      <div className="flex gap-1 font-mono text-xs leading-none mt-2">
        {drops.map((y, x) => (
          <div key={x} className="flex flex-col text-green-500">
            {Array.from({ length: ROWS }).map((_, r) => {
              const isHead = Math.floor(y) === r;
              const isTrail = r < y && r > y - 4;
              const char = charMap[x]?.[r] || CHARS[0];

              let opacity = 'opacity-0';
              if (isHead) opacity = 'opacity-100 text-white font-bold';
              else if (isTrail) opacity = 'opacity-50';

              return (
                <span key={r} className={`${opacity}`}>
                  {char}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AsciiRain;

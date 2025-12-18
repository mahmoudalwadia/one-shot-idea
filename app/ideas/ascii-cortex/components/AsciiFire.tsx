import React, { useEffect, useRef, useState } from 'react';
import { useClientOnly } from '../hooks/useClientOnly';

// Character palette from dark to light
const CHARS = [' ', '.', ':', 's', 'S', '#', '$', '%', '8', '@'];
const COLORS = [
  'text-black',            // 0
  'text-red-900',          // 1
  'text-red-800',          // 2
  'text-orange-800',       // 3
  'text-orange-600',       // 4
  'text-orange-500',       // 5
  'text-yellow-600',       // 6
  'text-yellow-500',       // 7
  'text-yellow-400',       // 8
  'text-white',            // 9
];

const WIDTH = 30;
const HEIGHT = 20;

const AsciiFire: React.FC = () => {
  const mounted = useClientOnly();
  const [firePixels, setFirePixels] = useState<number[]>(() => {
    const initialFire = new Array(WIDTH * HEIGHT).fill(0);
    for (let i = 0; i < WIDTH; i++) {
        initialFire[(HEIGHT - 1) * WIDTH + i] = 9; // Max heat at bottom
    }
    return initialFire;
  });
  const frameRef = useRef<number>(0);

  useEffect(() => {

    const updateFire = () => {
        setFirePixels(prevPixels => {
            const newPixels = [...prevPixels];

            for (let x = 0; x < WIDTH; x++) {
                for (let y = 1; y < HEIGHT; y++) {
                    const index = y * WIDTH + x;

                    // Spread fire logic: look at pixel below
                    const srcIndex = index + WIDTH;

                    if (srcIndex >= WIDTH * HEIGHT) {
                        // Keep bottom row burning randomly
                        newPixels[index] = Math.random() > 0.4 ? 9 : 6;
                    } else {
                        // Decay
                        const decay = Math.floor(Math.random() * 3);
                        const srcHeat = newPixels[srcIndex];
                        const newHeat = srcHeat - decay >= 0 ? srcHeat - decay : 0;

                        // Wind effect (shifting index slightly left/right)
                        // Because we are iterating differently (calculating target from source in DOOM),
                        // here we calculate current pixel based on below.
                        // Let's stick to a simpler cellular automata for React state ease:
                        // Current cell gets heat from cell below minus decay.

                        newPixels[index] = newHeat;
                    }
                }
            }
            return newPixels;
        });
        frameRef.current = requestAnimationFrame(updateFire);
    };

    // Slow down the fire a bit for aesthetics
    const interval = setInterval(updateFire, 80);

    return () => {
        clearInterval(interval);
        cancelAnimationFrame(frameRef.current);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center overflow-hidden relative">
        <div className="absolute top-2 left-2 text-orange-800 text-xs font-mono uppercase">
          Thermal.Critical
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black flex items-center justify-center overflow-hidden relative">
      <div className="absolute top-2 left-2 text-orange-800 text-xs font-mono uppercase">
        Thermal.Critical
      </div>

      <div
        className="grid font-mono leading-none select-none"
        style={{
            gridTemplateColumns: `repeat(${WIDTH}, 1fr)`,
            width: 'fit-content',
            fontSize: '18px',
            lineHeight: '16px'
        }}
      >
        {firePixels.map((heat, i) => (
            <span key={i} className={`${COLORS[heat]} transition-colors duration-75`}>
                {CHARS[heat]}
            </span>
        ))}
      </div>
    </div>
  );
};

export default AsciiFire;

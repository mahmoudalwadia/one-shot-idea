import React, { useEffect, useState } from 'react';
import { useClientOnly } from '../hooks/useClientOnly';

const AsciiHex: React.FC = () => {
  const mounted = useClientOnly();
  const [breath, setBreath] = useState(0);
  const [hexChars, setHexChars] = useState<string[][]>([]);

  useEffect(() => {
    // Initialize hexChars only on client to prevent hydration mismatch
    const rows = 6;
    const cols = 6;
    const chars: string[][] = [];
    for(let y=0; y<rows; y++) {
      chars[y] = [];
      for(let x=0; x<cols; x++) {
        chars[y][x] = Math.random() > 0.5 ? "H" : "X";
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHexChars(chars);
  }, []);

  useEffect(() => {
    if (hexChars.length === 0) return;
    const interval = setInterval(() => {
        setBreath(Date.now() / 1000);
    }, 100);
    return () => clearInterval(interval);
  }, [hexChars.length]);

  if (!mounted || hexChars.length === 0) {
    return (
      <div className="w-full h-full bg-black flex flex-col items-center justify-center font-mono overflow-hidden relative">
        <div className="absolute top-2 right-2 text-amber-900 text-[9px] border border-amber-900 px-1">
          HIVE.MIND
        </div>
      </div>
    );
  }

  const renderHex = () => {
      const rows = 6;
      const cols = 6;
      const output = [];

      for(let y=0; y<rows; y++) {
          let line1 = "";
          let line2 = "";
          for(let x=0; x<cols; x++) {
              const val = Math.sin(x*0.5 + y*0.5 + breath);
              const active = val > 0.5;
              line1 += active ? " / \\" : " . .";
              line2 += active ? "| " + hexChars[y][x] + " |" : " . .";
          }
          // Offset rows
          const indent = y % 2 === 0 ? "" : "  ";

          output.push(<div key={`1-${y}`} className={y%2===0 ? "text-amber-600" : "text-amber-800"}>{indent + line1}</div>);
          output.push(<div key={`2-${y}`} className={y%2===0 ? "text-amber-500 font-bold" : "text-amber-700"}>{indent + line2}</div>);
          output.push(<div key={`3-${y}`} className={y%2===0 ? "text-amber-600" : "text-amber-800"}>{indent + " \\ /"}</div>);
      }
      return output;
  }

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center font-mono overflow-hidden relative">
        <div className="absolute top-2 right-2 text-amber-900 text-[9px] border border-amber-900 px-1">
            HIVE.MIND
        </div>
        <div className="text-[8px] leading-[0.5rem] whitespace-pre">
            {renderHex()}
        </div>
    </div>
  );
};

export default AsciiHex;

import React, { useEffect, useState } from 'react';

const AsciiDonut: React.FC = () => {
  const [frame, setFrame] = useState('');

  useEffect(() => {
    let A = 0;
    let B = 0;
    const interval = setInterval(() => {
      const b = [];
      const z = [];
      A += 0.07;
      B += 0.03;
      const cA = Math.cos(A), sA = Math.sin(A),
            cB = Math.cos(B), sB = Math.sin(B);
      
      for(let k = 0; k < 1760; k++) {
        b[k] = k % 80 == 79 ? "\n" : " ";
        z[k] = 0;
      }

      for(let j = 0; j < 6.28; j += 0.07) {
        const ct = Math.cos(j), st = Math.sin(j);
        for(let i = 0; i < 6.28; i += 0.02) {
          const sp = Math.sin(i), cp = Math.cos(i),
                h = ct + 2,
                D = 1 / (sp * h * sA + st * cA + 5),
                t = sp * h * cA - st * sA;

          const x = 0 | (40 + 30 * D * (cp * h * cB - t * sB)),
                y = 0 | (12 + 15 * D * (cp * h * sB + t * cB)),
                o = x + 80 * y,
                N = 0 | (8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));
          
          if(y < 22 && y >= 0 && x >= 0 && x < 79 && D > z[o]) {
            z[o] = D;
            b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
          }
        }
      }
      // Trim to fit the small box better
      const text = b.join("").split('\n').slice(4, 20).map(l => l.substring(20, 60)).join('\n');
      setFrame(text);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center overflow-hidden relative font-mono text-[8px] leading-[0.5rem] text-cyan-300">
         <div className="absolute top-1 left-1 text-cyan-700 text-[8px]">TORUS.OBJ</div>
         <pre>{frame}</pre>
    </div>
  );
};

export default AsciiDonut;

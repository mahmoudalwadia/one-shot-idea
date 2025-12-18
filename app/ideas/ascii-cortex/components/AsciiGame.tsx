import React, { useEffect, useState } from 'react';

const W = 20;
const H = 10;

const AsciiGame: React.FC = () => {
  const [ball, setBall] = useState({x: 10, y: 5, dx: 1, dy: 1});
  const [p1, setP1] = useState(5);
  const [p2, setP2] = useState(5);

  useEffect(() => {
      const interval = setInterval(() => {
          setBall(b => {
              const nx = b.x + b.dx;
              const ny = b.y + b.dy;
              let ndx = b.dx;
              let ndy = b.dy;

              // Wall Collisions
              if (ny <= 0 || ny >= H - 1) ndy *= -1;

              // Paddle Collisions (Simplified)
              if (nx <= 1 || nx >= W - 2) ndx *= -1;

              return { x: nx, y: ny, dx: ndx, dy: ndy };
          });

          // Simple AI for paddles
          setP1(y => ball.y > y ? Math.min(y+1, H-2) : Math.max(y-1, 1));
          setP2(y => ball.y > y ? Math.min(y+1, H-2) : Math.max(y-1, 1));

      }, 100);
      return () => clearInterval(interval);
  }, [ball.y]); // Depend on ball.y to update AI target

  const renderBoard = () => {
      const rows = [];
      for(let y=0; y<H; y++) {
          let row = "";
          for(let x=0; x<W; x++) {
              if (x === Math.round(ball.x) && y === Math.round(ball.y)) row += "O";
              else if (x === 0 && Math.abs(y - p1) < 2) row += "]";
              else if (x === W-1 && Math.abs(y - p2) < 2) row += "[";
              else if (x === W/2) row += "|";
              else row += " ";
          }
          rows.push(row);
      }
      return rows;
  }

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center font-mono overflow-hidden relative text-gray-300">
        <div className="absolute top-1 left-2 text-[8px] text-gray-600">SIM_01</div>
        <div className="whitespace-pre text-xs leading-[0.8rem] border border-gray-800 p-1">
            {renderBoard().map((r, i) => <div key={i}>{r}</div>)}
        </div>
    </div>
  );
};

export default AsciiGame;

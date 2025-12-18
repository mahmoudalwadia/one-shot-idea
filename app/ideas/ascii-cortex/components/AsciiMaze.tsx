import React, { useEffect, useState } from 'react';
import { useClientOnly } from '../hooks/useClientOnly';

const W = 15;
const H = 9;

const AsciiMaze: React.FC = () => {
  const mounted = useClientOnly();
  const [maze, setMaze] = useState<string[][]>([]);

  useEffect(() => {
      let grid = Array.from({length: H}, () => Array(W).fill('#'));
      const stack: {x: number, y:number}[] = [];
      let current = {x: 1, y: 1};
      grid[1][1] = ' ';
      stack.push(current);

      const interval = setInterval(() => {
          if(stack.length === 0) {
              // Reset
              grid = Array.from({length: H}, () => Array(W).fill('#'));
              current = {x: 1, y: 1};
              grid[1][1] = ' ';
              stack.push(current);
              setMaze([...grid.map(r => [...r])]);
              return;
          }

          const neighbors = [];
          const directions = [[0, -2], [2, 0], [0, 2], [-2, 0]];

          for(const d of directions) {
              const nx = current.x + d[0];
              const ny = current.y + d[1];
              if(nx > 0 && nx < W && ny > 0 && ny < H && grid[ny][nx] === '#') {
                  neighbors.push({x: nx, y: ny, dx: d[0]/2, dy: d[1]/2});
              }
          }

          if(neighbors.length > 0) {
              const next = neighbors[Math.floor(Math.random() * neighbors.length)];
              grid[current.y + next.dy][current.x + next.dx] = ' ';
              grid[next.y][next.x] = ' '; // Head
              stack.push(current);
              current = {x: next.x, y: next.y};
          } else {
              current = stack.pop()!;
          }

          // Visualize head
          const displayGrid = grid.map(r => [...r]);
          if(stack.length > 0) displayGrid[current.y][current.x] = '█';

          setMaze(displayGrid);
      }, 50);

      return () => clearInterval(interval);
  }, []);

  if (!mounted || maze.length === 0) {
    return (
      <div className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden font-mono text-indigo-300">
        <div className="absolute bottom-1 left-1 text-indigo-800 text-[8px]">PATH.FINDER</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden font-mono text-indigo-300">
        <div className="absolute bottom-1 left-1 text-indigo-800 text-[8px]">PATH.FINDER</div>
        <div className="flex flex-col text-[12px] leading-[0.6rem] whitespace-pre font-bold">
            {maze.map((row, i) => (
                <div key={i}>{row.join('')}</div>
            ))}
        </div>
    </div>
  );
};

export default AsciiMaze;

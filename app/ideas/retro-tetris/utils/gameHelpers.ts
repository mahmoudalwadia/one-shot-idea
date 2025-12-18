import { Player, Grid } from '../types';

export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;

export const createStage = (): Grid =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill(0).map(() => [0, 'clear'])
  );

export const checkCollision = (
  player: Player,
  stage: Grid,
  { x: moveX, y: moveY }: { x: number; y: number }
) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      if (player.tetromino[y][x] !== 0) {
        const targetX = x + player.pos.x + moveX;
        const targetY = y + player.pos.y + moveY;

        // Explicit left/right boundary checks
        if (targetX < 0 || targetX >= STAGE_WIDTH) {
          return true;
        }

        // Explicit bottom boundary check
        if (targetY >= STAGE_HEIGHT) {
          return true;
        }

        // Allow spawning above board (negative Y during spawn)
        if (targetY >= 0) {
          if (stage[targetY][targetX][1] !== 'clear') {
            return true;
          }
        }
      }
    }
  }
  return false;
};

export type TetrominoShape = (string | number)[][];

export interface Tetromino {
  shape: TetrominoShape;
  color: string;
}

export type TetrominoType = 0 | '0' | 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

export interface ITetrominos {
  [key: string]: Tetromino;
}

export type GridCell = [TetrominoType, string];
export type Grid = GridCell[][];

export interface Player {
  pos: { x: number; y: number };
  tetromino: TetrominoShape;
  collided: boolean;
  type: TetrominoType;
}

export interface GameState {
  score: number;
  rows: number;
  level: number;
  gameOver: boolean;
  paused: boolean;
}
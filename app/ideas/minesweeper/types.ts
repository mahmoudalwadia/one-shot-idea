export enum CellValue {
  MINE = -1,
  EMPTY = 0,
}

export enum CellState {
  HIDDEN = 'HIDDEN',
  REVEALED = 'REVEALED',
  FLAGGED = 'FLAGGED',
  QUESTION = 'QUESTION', // Optional, standard minesweeper feature
}

export enum GameStatus {
  IDLE = 'IDLE',
  PLAYING = 'PLAYING',
  WON = 'WON',
  LOST = 'LOST',
}

export enum Difficulty {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  EXPERT = 'EXPERT',
}

export interface CellData {
  row: number;
  col: number;
  value: number; // -1 for mine, 0-8 for neighbor count
  state: CellState;
  isMine: boolean;
}

export interface BoardConfig {
  rows: number;
  cols: number;
  mines: number;
}

export const DIFFICULTY_CONFIGS: Record<Difficulty, BoardConfig> = {
  [Difficulty.BEGINNER]: { rows: 9, cols: 9, mines: 10 },
  [Difficulty.INTERMEDIATE]: { rows: 16, cols: 16, mines: 40 },
  [Difficulty.EXPERT]: { rows: 16, cols: 30, mines: 99 },
};

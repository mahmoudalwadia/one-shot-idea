import { CellData, CellState, CellValue } from '../types';

// Directions for neighbor checking (N, NE, E, SE, S, SW, W, NW)
const DIRECTIONS = [
  [-1, 0], [-1, 1], [0, 1], [1, 1],
  [1, 0], [1, -1], [0, -1], [-1, -1]
];

export const createEmptyBoard = (rows: number, cols: number): CellData[][] => {
  const board: CellData[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: CellData[] = [];
    for (let c = 0; c < cols; c++) {
      row.push({
        row: r,
        col: c,
        value: CellValue.EMPTY,
        state: CellState.HIDDEN,
        isMine: false,
      });
    }
    board.push(row);
  }
  return board;
};

export const initializeBoard = (
  rows: number,
  cols: number,
  mines: number,
  firstClickRow: number,
  firstClickCol: number
): CellData[][] => {
  const board = createEmptyBoard(rows, cols);
  let minesPlaced = 0;

  while (minesPlaced < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);

    // Don't place mine on existing mine
    if (board[r][c].isMine) continue;

    // Don't place mine on the first click or its neighbors (ensure safe start)
    if (Math.abs(r - firstClickRow) <= 1 && Math.abs(c - firstClickCol) <= 1) continue;

    board[r][c].isMine = true;
    board[r][c].value = CellValue.MINE;
    minesPlaced++;
  }

  // Calculate numbers
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].isMine) continue;

      let neighbors = 0;
      DIRECTIONS.forEach(([dr, dc]) => {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].isMine) {
          neighbors++;
        }
      });
      board[r][c].value = neighbors;
    }
  }

  return board;
};

export const revealCell = (board: CellData[][], row: number, col: number): { newBoard: CellData[][], exploded: boolean } => {
  // Deep copy to avoid mutation issues
  const newBoard = board.map(r => r.map(c => ({ ...c })));
  const cell = newBoard[row][col];

  if (cell.state !== CellState.HIDDEN && cell.state !== CellState.QUESTION) {
    return { newBoard, exploded: false };
  }

  if (cell.isMine) {
    cell.state = CellState.REVEALED;
    return { newBoard, exploded: true };
  }

  // Flood fill for empty cells
  const stack = [[row, col]];

  while (stack.length > 0) {
    const [currR, currC] = stack.pop()!;
    const current = newBoard[currR][currC];

    if (current.state === CellState.REVEALED || current.state === CellState.FLAGGED) continue;

    current.state = CellState.REVEALED;

    if (current.value === 0) {
      DIRECTIONS.forEach(([dr, dc]) => {
        const nr = currR + dr;
        const nc = currC + dc;
        if (nr >= 0 && nr < newBoard.length && nc >= 0 && nc < newBoard[0].length) {
          if (newBoard[nr][nc].state === CellState.HIDDEN || newBoard[nr][nc].state === CellState.QUESTION) {
             // If it's not already processed in this pass (though check above handles it)
             stack.push([nr, nc]);
          }
        }
      });
    }
  }

  return { newBoard, exploded: false };
};

export const toggleFlag = (board: CellData[][], row: number, col: number): CellData[][] => {
  const newBoard = board.map(r => r.map(c => ({ ...c })));
  const cell = newBoard[row][col];

  if (cell.state === CellState.HIDDEN) {
    cell.state = CellState.FLAGGED;
  } else if (cell.state === CellState.FLAGGED) {
    cell.state = CellState.QUESTION;
  } else if (cell.state === CellState.QUESTION) {
    cell.state = CellState.HIDDEN;
  }

  return newBoard;
};

export const checkWin = (board: CellData[][]): boolean => {
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[0].length; c++) {
      const cell = board[r][c];
      // If a non-mine cell is still hidden/flagged, not won yet
      if (!cell.isMine && cell.state !== CellState.REVEALED) {
        return false;
      }
      // If a mine is revealed (should be caught by exploded check, but strictly speaking)
      if (cell.isMine && cell.state === CellState.REVEALED) {
        return false;
      }
    }
  }
  return true;
};

// Reveal all mines on loss
export const revealAllMines = (board: CellData[][]): CellData[][] => {
  return board.map(row => row.map(cell => {
    if (cell.isMine) {
      return { ...cell, state: CellState.REVEALED };
    }
    return cell;
  }));
};

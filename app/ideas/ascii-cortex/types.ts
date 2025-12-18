export interface QuadrantProps {
  isActive: boolean;
  onActivate: () => void;
  className?: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
}

export enum CellType {
  EMPTY = 0,
  WALL = 1,
  TARGET = 2,
  PLAYER = 3,
  PATH = 4
}

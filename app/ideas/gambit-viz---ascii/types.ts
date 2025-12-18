
export type MoveClassification =
  | 'Brilliant'
  | 'Great'
  | 'Best'
  | 'Excellent'
  | 'Good'
  | 'Inaccuracy'
  | 'Mistake'
  | 'Blunder'
  | 'Miss'
  | 'Book'
  | 'Forced'
  | 'Unclassified';

export interface TreeNode {
  id: string;
  name: string; // The move SAN (e.g., "e4")
  fen: string; // The board state after this move
  children: TreeNode[];
  parentId: string | null;
  moveNumber: number;
  turn: 'w' | 'b';
  isMainLine?: boolean;
  analysis?: string;
  classification?: MoveClassification;
  isVariation?: boolean; // If true, this is a computer-suggested alternative, not played yet
  evalScore?: number; // Engine evaluation
}

export type TreeData = TreeNode;

export interface GameState {
  fen: string;
  turn: 'w' | 'b';
  inCheck: boolean;
  isCheckmate: boolean;
  isDraw: boolean;
  history: string[];
}

export type Square =
  | 'a8' | 'b8' | 'c8' | 'd8' | 'e8' | 'f8' | 'g8' | 'h8'
  | 'a7' | 'b7' | 'c7' | 'd7' | 'e7' | 'f7' | 'g7' | 'h7'
  | 'a6' | 'b6' | 'c6' | 'd6' | 'e6' | 'f6' | 'g6' | 'h6'
  | 'a5' | 'b5' | 'c5' | 'd5' | 'e5' | 'f5' | 'g5' | 'h5'
  | 'a4' | 'b4' | 'c4' | 'd4' | 'e4' | 'f4' | 'g4' | 'h4'
  | 'a3' | 'b3' | 'c3' | 'd3' | 'e3' | 'f3' | 'g3' | 'h3'
  | 'a2' | 'b2' | 'c2' | 'd2' | 'e2' | 'f2' | 'g2' | 'h2'
  | 'a1' | 'b1' | 'c1' | 'd1' | 'e1' | 'f1' | 'g1' | 'h1';

export interface Piece {
  type: 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
  color: 'w' | 'b';
}

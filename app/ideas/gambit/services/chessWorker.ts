/**
 * Chess Engine Web Worker
 *
 * Runs AI move search in a background thread to keep UI responsive.
 *
 * === MINIMAX WITH ALPHA-BETA PRUNING ===
 * Recursively explores the game tree, alternating between maximizing (white)
 * and minimizing (black) players. Alpha-beta pruning cuts branches that
 * can't affect the final decision:
 * - Alpha: best score maximizer can guarantee
 * - Beta: best score minimizer can guarantee
 * - If beta <= alpha, stop searching (opponent won't allow this line)
 *
 * === QUIESCENCE SEARCH ===
 * At leaf nodes (depth 0), don't stop immediately - continue searching
 * captures until the position is "quiet". This prevents the horizon effect
 * where the engine misses a recapture just beyond its search depth.
 * Example: Without quiescence, engine might play QxR thinking it's +5,
 * but miss the immediate RxQ response.
 *
 * === MOVE ORDERING (MVV-LVA) ===
 * Search captures first, ordered by Most Valuable Victim - Least Valuable Attacker.
 * QxP (score: 900-100=800) searched before PxP (score: 100-100=0).
 * Good ordering makes alpha-beta pruning much more effective.
 *
 * === TRANSPOSITION TABLE ===
 * Hash table storing previously evaluated positions (keyed by Zobrist hash).
 * If we've seen this position before at equal/greater depth, reuse the result.
 * Stores: depth, value, flag (exact/lower/upper bound), best move.
 *
 * === ZOBRIST HASHING ===
 * Fast position hashing using XOR of random numbers for each piece/square.
 * Much faster than FEN string comparison for transposition table lookups.
 *
 * === ITERATIVE DEEPENING ===
 * Instead of searching directly at max depth (slow), we:
 * 1. Search at depth 1 (instant)
 * 2. Search at depth 2, 3, 4... until time limit
 * 3. Always keep the best move from last completed depth
 * This guarantees a response within the time limit while searching as deep as possible.
 *
 * === DIFFICULTY SETTINGS ===
 * Easy:   max depth 2, 500ms limit, 30% random (~800-1000 Elo)
 * Medium: max depth 3, 1000ms limit, 5% random (~1200-1400 Elo)
 * Hard:   max depth 6, 2000ms limit, full features (~1600-1900 Elo)
 *
 * === OUTPUT ===
 * Returns: { move: "e2e4", pv: ["e2e4", "e7e5", ...], eval: 35 }
 * - move: Best move in UCI format
 * - pv: Principal Variation (best line of play)
 * - eval: Position evaluation in centipawns
 */

import { Chess } from 'chess.js';
import { getBookMove, getAllBookMoves, simplifyFen } from './openingBook';

type Difficulty = 'easy' | 'medium' | 'hard';

// Piece values in centipawns
const PIECE_VALUES: Record<string, number> = {
  p: 100, n: 320, b: 330, r: 500, q: 900, k: 20000,
};

// Piece-Square Tables
const PAWN_PST = [
  0,  0,  0,  0,  0,  0,  0,  0,
  50, 50, 50, 50, 50, 50, 50, 50,
  10, 10, 20, 30, 30, 20, 10, 10,
  5,  5, 10, 25, 25, 10,  5,  5,
  0,  0,  0, 20, 20,  0,  0,  0,
  5, -5,-10,  0,  0,-10, -5,  5,
  5, 10, 10,-20,-20, 10, 10,  5,
  0,  0,  0,  0,  0,  0,  0,  0
];

const KNIGHT_PST = [
  -50,-40,-30,-30,-30,-30,-40,-50,
  -40,-20,  0,  0,  0,  0,-20,-40,
  -30,  0, 10, 15, 15, 10,  0,-30,
  -30,  5, 15, 20, 20, 15,  5,-30,
  -30,  0, 15, 20, 20, 15,  0,-30,
  -30,  5, 10, 15, 15, 10,  5,-30,
  -40,-20,  0,  5,  5,  0,-20,-40,
  -50,-40,-30,-30,-30,-30,-40,-50
];

const BISHOP_PST = [
  -20,-10,-10,-10,-10,-10,-10,-20,
  -10,  0,  0,  0,  0,  0,  0,-10,
  -10,  0,  5, 10, 10,  5,  0,-10,
  -10,  5,  5, 10, 10,  5,  5,-10,
  -10,  0, 10, 10, 10, 10,  0,-10,
  -10, 10, 10, 10, 10, 10, 10,-10,
  -10,  5,  0,  0,  0,  0,  5,-10,
  -20,-10,-10,-10,-10,-10,-10,-20
];

const ROOK_PST = [
  0,  0,  0,  0,  0,  0,  0,  0,
  5, 10, 10, 10, 10, 10, 10,  5,
 -5,  0,  0,  0,  0,  0,  0, -5,
 -5,  0,  0,  0,  0,  0,  0, -5,
 -5,  0,  0,  0,  0,  0,  0, -5,
 -5,  0,  0,  0,  0,  0,  0, -5,
 -5,  0,  0,  0,  0,  0,  0, -5,
  0,  0,  0,  5,  5,  0,  0,  0
];

const QUEEN_PST = [
  -20,-10,-10, -5, -5,-10,-10,-20,
  -10,  0,  0,  0,  0,  0,  0,-10,
  -10,  0,  5,  5,  5,  5,  0,-10,
   -5,  0,  5,  5,  5,  5,  0, -5,
    0,  0,  5,  5,  5,  5,  0, -5,
  -10,  5,  5,  5,  5,  5,  0,-10,
  -10,  0,  5,  0,  0,  0,  0,-10,
  -20,-10,-10, -5, -5,-10,-10,-20
];

const KING_MIDDLEGAME_PST = [
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -30,-40,-40,-50,-50,-40,-40,-30,
  -20,-30,-30,-40,-40,-30,-30,-20,
  -10,-20,-20,-20,-20,-20,-20,-10,
   20, 20,  0,  0,  0,  0, 20, 20,
   20, 30, 10,  0,  0, 10, 30, 20
];

const KING_ENDGAME_PST = [
  -50,-40,-30,-20,-20,-30,-40,-50,
  -30,-20,-10,  0,  0,-10,-20,-30,
  -30,-10, 20, 30, 30, 20,-10,-30,
  -30,-10, 30, 40, 40, 30,-10,-30,
  -30,-10, 30, 40, 40, 30,-10,-30,
  -30,-10, 20, 30, 30, 20,-10,-30,
  -30,-30,  0,  0,  0,  0,-30,-30,
  -50,-30,-30,-30,-30,-30,-30,-50
];

const PSTS: Record<string, number[]> = {
  p: PAWN_PST, n: KNIGHT_PST, b: BISHOP_PST, r: ROOK_PST, q: QUEEN_PST, k: KING_MIDDLEGAME_PST
};

// Zobrist hashing
const ZOBRIST_SEED = 1070372;
const mulberry32 = (seed: number) => {
  return () => {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0);
  };
};

const rng = mulberry32(ZOBRIST_SEED);
const ZOBRIST_PIECES: number[][][] = [];
const ZOBRIST_CASTLING: number[] = [];
const ZOBRIST_EP: number[] = [];
const ZOBRIST_SIDE = rng();

for (let sq = 0; sq < 64; sq++) {
  ZOBRIST_PIECES[sq] = [];
  for (let pieceType = 0; pieceType < 6; pieceType++) {
    ZOBRIST_PIECES[sq][pieceType] = [];
    for (let color = 0; color < 2; color++) {
      ZOBRIST_PIECES[sq][pieceType][color] = rng();
    }
  }
}
for (let i = 0; i < 16; i++) ZOBRIST_CASTLING[i] = rng();
for (let i = 0; i < 8; i++) ZOBRIST_EP[i] = rng();

const PIECE_TYPE_INDEX: Record<string, number> = { p: 0, n: 1, b: 2, r: 3, q: 4, k: 5 };

const computeZobristHash = (game: Chess): number => {
  let hash = 0;
  const board = game.board();
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece) {
        const sq = row * 8 + col;
        const pieceIdx = PIECE_TYPE_INDEX[piece.type];
        const colorIdx = piece.color === 'w' ? 0 : 1;
        hash ^= ZOBRIST_PIECES[sq][pieceIdx][colorIdx];
      }
    }
  }
  if (game.turn() === 'b') hash ^= ZOBRIST_SIDE;
  return hash;
};

// Transposition table
interface TTEntry {
  depth: number;
  value: number;
  flag: 'exact' | 'lower' | 'upper';
  bestMove?: string;
}

const transpositionTable = new Map<number, TTEntry>();
let useQuiescence = true;
let maxQuiescenceDepth = 4;

// Killer moves - moves that caused beta cutoffs at each depth (non-captures)
// Store 2 killers per depth level
const MAX_DEPTH = 20;
const killerMoves: [string | null, string | null][] = Array.from({ length: MAX_DEPTH }, () => [null, null]);

// History heuristic - tracks moves that frequently cause cutoffs
// Indexed by [pieceType][fromSquare][toSquare]
const historyTable: number[][][] = Array.from({ length: 6 }, () =>
  Array.from({ length: 64 }, () => Array(64).fill(0))
);

// Clear killer and history tables for new search
const clearSearchTables = () => {
  for (let i = 0; i < MAX_DEPTH; i++) {
    killerMoves[i] = [null, null];
  }
  for (let p = 0; p < 6; p++) {
    for (let from = 0; from < 64; from++) {
      for (let to = 0; to < 64; to++) {
        historyTable[p][from][to] = 0;
      }
    }
  }
};

// Convert square notation to index (a1=0, h8=63)
const squareToIndex = (sq: string): number => {
  const file = sq.charCodeAt(0) - 'a'.charCodeAt(0);
  const rank = parseInt(sq[1]) - 1;
  return rank * 8 + file;
};

// Store a killer move at given depth
const storeKiller = (move: string, depth: number) => {
  if (depth >= MAX_DEPTH) return;
  // Don't store if it's already the first killer
  if (killerMoves[depth][0] === move) return;
  // Shift killers: second = first, first = new
  killerMoves[depth][1] = killerMoves[depth][0];
  killerMoves[depth][0] = move;
};

// Update history table on beta cutoff
const updateHistory = (pieceType: string, from: string, to: string, depth: number) => {
  const pieceIdx = PIECE_TYPE_INDEX[pieceType];
  if (pieceIdx === undefined) return;
  const fromIdx = squareToIndex(from);
  const toIdx = squareToIndex(to);
  // Bonus is depth^2 (deeper cutoffs are more valuable)
  historyTable[pieceIdx][fromIdx][toIdx] += depth * depth;
  // Prevent overflow
  if (historyTable[pieceIdx][fromIdx][toIdx] > 10000) {
    // Age all history values
    for (let p = 0; p < 6; p++) {
      for (let f = 0; f < 64; f++) {
        for (let t = 0; t < 64; t++) {
          historyTable[p][f][t] = Math.floor(historyTable[p][f][t] / 2);
        }
      }
    }
  }
};

// Get history score for a move
const getHistoryScore = (pieceType: string, from: string, to: string): number => {
  const pieceIdx = PIECE_TYPE_INDEX[pieceType];
  if (pieceIdx === undefined) return 0;
  const fromIdx = squareToIndex(from);
  const toIdx = squareToIndex(to);
  return historyTable[pieceIdx][fromIdx][toIdx];
};

const DIFFICULTY_SETTINGS: Record<Difficulty, { depth: number; randomness: number; quiescence: boolean; maxQuiescenceDepth: number; timeLimitMs: number }> = {
  easy: { depth: 2, randomness: 0.3, quiescence: false, maxQuiescenceDepth: 0, timeLimitMs: 500 },
  medium: { depth: 3, randomness: 0.05, quiescence: true, maxQuiescenceDepth: 2, timeLimitMs: 1000 },
  hard: { depth: 6, randomness: 0, quiescence: true, maxQuiescenceDepth: 3, timeLimitMs: 2000 },
};

// Time limit for iterative deepening
let searchStartTime = 0;
let searchTimeLimit = 2000;
let searchAborted = false;

// Game phase detection
const getGamePhase = (game: Chess): number => {
  let phase = 0;
  const board = game.board();
  for (const row of board) {
    for (const piece of row) {
      if (piece) {
        if (piece.type === 'n' || piece.type === 'b') phase += 1;
        else if (piece.type === 'r') phase += 2;
        else if (piece.type === 'q') phase += 4;
      }
    }
  }
  return Math.min(phase, 24);
};

// Evaluation functions
const evaluatePawnStructure = (game: Chess): number => {
  let score = 0;
  const board = game.board();
  const whitePawnsPerFile: number[] = new Array(8).fill(0);
  const blackPawnsPerFile: number[] = new Array(8).fill(0);

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece?.type === 'p') {
        if (piece.color === 'w') whitePawnsPerFile[col]++;
        else blackPawnsPerFile[col]++;
      }
    }
  }

  for (let col = 0; col < 8; col++) {
    if (whitePawnsPerFile[col] > 1) score -= (whitePawnsPerFile[col] - 1) * 15;
    if (blackPawnsPerFile[col] > 1) score += (blackPawnsPerFile[col] - 1) * 15;

    const hasNeighbor = (col > 0 && whitePawnsPerFile[col - 1] > 0) || (col < 7 && whitePawnsPerFile[col + 1] > 0);
    if (whitePawnsPerFile[col] > 0 && !hasNeighbor) score -= 10;

    const hasNeighborB = (col > 0 && blackPawnsPerFile[col - 1] > 0) || (col < 7 && blackPawnsPerFile[col + 1] > 0);
    if (blackPawnsPerFile[col] > 0 && !hasNeighborB) score += 10;
  }

  return score;
};

const evaluateKingSafety = (game: Chess): number => {
  let score = 0;
  const board = game.board();
  let whiteKingPos = { row: 7, col: 4 };
  let blackKingPos = { row: 0, col: 4 };

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece?.type === 'k') {
        if (piece.color === 'w') whiteKingPos = { row, col };
        else blackKingPos = { row, col };
      }
    }
  }

  const evaluatePawnShield = (kingPos: { row: number; col: number }, color: 'w' | 'b'): number => {
    let shield = 0;
    const pawnRow = color === 'w' ? kingPos.row - 1 : kingPos.row + 1;
    if (pawnRow >= 0 && pawnRow < 8) {
      for (let dc = -1; dc <= 1; dc++) {
        const col = kingPos.col + dc;
        if (col >= 0 && col < 8) {
          const piece = board[pawnRow][col];
          if (piece?.type === 'p' && piece.color === color) shield += 10;
        }
      }
    }
    return shield;
  };

  score += evaluatePawnShield(whiteKingPos, 'w');
  score -= evaluatePawnShield(blackKingPos, 'b');

  return score;
};

// Simplified mobility - just count current side's moves (much faster)
const evaluateMobility = (game: Chess): number => {
  const moves = game.moves().length;
  // Positive for white's turn (more options = good), negative for black
  return game.turn() === 'w' ? moves * 2 : -moves * 2;
};

// Bishop pair bonus - having two bishops is a significant advantage
const evaluateBishopPair = (board: ReturnType<Chess['board']>): number => {
  let whiteBishops = 0;
  let blackBishops = 0;

  for (const row of board) {
    for (const piece of row) {
      if (piece?.type === 'b') {
        if (piece.color === 'w') whiteBishops++;
        else blackBishops++;
      }
    }
  }

  let score = 0;
  if (whiteBishops >= 2) score += 50;
  if (blackBishops >= 2) score -= 50;
  return score;
};

// Rook on open/semi-open file bonus
const evaluateRookFiles = (board: ReturnType<Chess['board']>): number => {
  // Count pawns per file
  const whitePawnsPerFile: number[] = new Array(8).fill(0);
  const blackPawnsPerFile: number[] = new Array(8).fill(0);
  const whiteRookFiles: number[] = [];
  const blackRookFiles: number[] = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece?.type === 'p') {
        if (piece.color === 'w') whitePawnsPerFile[col]++;
        else blackPawnsPerFile[col]++;
      } else if (piece?.type === 'r') {
        if (piece.color === 'w') whiteRookFiles.push(col);
        else blackRookFiles.push(col);
      }
    }
  }

  let score = 0;

  for (const file of whiteRookFiles) {
    if (whitePawnsPerFile[file] === 0 && blackPawnsPerFile[file] === 0) {
      score += 25; // Open file
    } else if (whitePawnsPerFile[file] === 0) {
      score += 15; // Semi-open file
    }
  }

  for (const file of blackRookFiles) {
    if (whitePawnsPerFile[file] === 0 && blackPawnsPerFile[file] === 0) {
      score -= 25; // Open file
    } else if (blackPawnsPerFile[file] === 0) {
      score -= 15; // Semi-open file
    }
  }

  return score;
};

// Knight outpost bonus - knight on opponent's side protected by pawn
const evaluateKnightOutposts = (board: ReturnType<Chess['board']>): number => {
  let score = 0;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece?.type !== 'n') continue;

      if (piece.color === 'w') {
        // White knight on rows 0-3 (black's side)
        if (row <= 3) {
          // Check if protected by white pawn
          const leftPawnRow = row + 1;
          const rightPawnRow = row + 1;
          const hasPawnSupport =
            (col > 0 && leftPawnRow < 8 && board[leftPawnRow][col - 1]?.type === 'p' && board[leftPawnRow][col - 1]?.color === 'w') ||
            (col < 7 && rightPawnRow < 8 && board[rightPawnRow][col + 1]?.type === 'p' && board[rightPawnRow][col + 1]?.color === 'w');

          if (hasPawnSupport) {
            // Check if can't be attacked by enemy pawn
            const canBeAttacked =
              (col > 0 && row > 0 && board[row - 1]?.[col - 1]?.type === 'p' && board[row - 1][col - 1]?.color === 'b') ||
              (col < 7 && row > 0 && board[row - 1]?.[col + 1]?.type === 'p' && board[row - 1][col + 1]?.color === 'b');

            if (!canBeAttacked) score += 30;
          }
        }
      } else {
        // Black knight on rows 4-7 (white's side)
        if (row >= 4) {
          // Check if protected by black pawn
          const leftPawnRow = row - 1;
          const rightPawnRow = row - 1;
          const hasPawnSupport =
            (col > 0 && leftPawnRow >= 0 && board[leftPawnRow][col - 1]?.type === 'p' && board[leftPawnRow][col - 1]?.color === 'b') ||
            (col < 7 && rightPawnRow >= 0 && board[rightPawnRow][col + 1]?.type === 'p' && board[rightPawnRow][col + 1]?.color === 'b');

          if (hasPawnSupport) {
            // Check if can't be attacked by enemy pawn
            const canBeAttacked =
              (col > 0 && row < 7 && board[row + 1]?.[col - 1]?.type === 'p' && board[row + 1][col - 1]?.color === 'w') ||
              (col < 7 && row < 7 && board[row + 1]?.[col + 1]?.type === 'p' && board[row + 1][col + 1]?.color === 'w');

            if (!canBeAttacked) score -= 30;
          }
        }
      }
    }
  }

  return score;
};

// Connected rooks bonus - rooks on same rank with no pieces between
const evaluateConnectedRooks = (board: ReturnType<Chess['board']>): number => {
  let score = 0;

  for (let row = 0; row < 8; row++) {
    const whiteRookCols: number[] = [];
    const blackRookCols: number[] = [];

    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece?.type === 'r') {
        if (piece.color === 'w') whiteRookCols.push(col);
        else blackRookCols.push(col);
      }
    }

    // Check if white rooks are connected (on same rank with nothing between)
    if (whiteRookCols.length === 2) {
      const [col1, col2] = whiteRookCols.sort((a, b) => a - b);
      let connected = true;
      for (let c = col1 + 1; c < col2; c++) {
        if (board[row][c]) { connected = false; break; }
      }
      if (connected) score += 15;
    }

    // Check if black rooks are connected
    if (blackRookCols.length === 2) {
      const [col1, col2] = blackRookCols.sort((a, b) => a - b);
      let connected = true;
      for (let c = col1 + 1; c < col2; c++) {
        if (board[row][c]) { connected = false; break; }
      }
      if (connected) score -= 15;
    }
  }

  return score;
};

// Endgame knowledge - drive enemy king to corner/edge in winning endgames
const evaluateEndgame = (board: ReturnType<Chess['board']>, phase: number): number => {
  // Only apply in endgame (phase <= 6 means very few pieces left)
  if (phase > 6) return 0;

  let score = 0;
  let whiteKingPos = { row: 0, col: 0 };
  let blackKingPos = { row: 0, col: 0 };
  let whiteMaterial = 0;
  let blackMaterial = 0;
  let whiteHasQueen = false;
  let whiteHasRook = false;
  let blackHasQueen = false;
  let blackHasRook = false;
  let whitePawns = 0;
  let blackPawns = 0;

  // Count material and find kings
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (!piece) continue;

      if (piece.type === 'k') {
        if (piece.color === 'w') whiteKingPos = { row, col };
        else blackKingPos = { row, col };
      } else {
        const value = PIECE_VALUES[piece.type] || 0;
        if (piece.color === 'w') {
          whiteMaterial += value;
          if (piece.type === 'q') whiteHasQueen = true;
          if (piece.type === 'r') whiteHasRook = true;
          if (piece.type === 'p') whitePawns++;
        } else {
          blackMaterial += value;
          if (piece.type === 'q') blackHasQueen = true;
          if (piece.type === 'r') blackHasRook = true;
          if (piece.type === 'p') blackPawns++;
        }
      }
    }
  }

  // Distance to corner (0-3 = corner, higher = center)
  const distToCorner = (pos: { row: number; col: number }): number => {
    const fileFromEdge = Math.min(pos.col, 7 - pos.col);
    const rankFromEdge = Math.min(pos.row, 7 - pos.row);
    return fileFromEdge + rankFromEdge;
  };

  // Distance to edge (0 = edge, higher = center)
  const distToEdge = (pos: { row: number; col: number }): number => {
    return Math.min(
      Math.min(pos.col, 7 - pos.col),
      Math.min(pos.row, 7 - pos.row)
    );
  };

  // King distance (Manhattan)
  const kingDistance = Math.abs(whiteKingPos.row - blackKingPos.row) +
                       Math.abs(whiteKingPos.col - blackKingPos.col);

  // K+Q vs K or K+R vs K: Drive enemy king to corner/edge
  if (whiteMaterial > 0 && blackMaterial === 0 && blackPawns === 0) {
    // White is winning - drive black king to corner
    if (whiteHasQueen) {
      // K+Q vs K: corner is best
      score += (7 - distToCorner(blackKingPos)) * 20;
      // Bring king closer
      score += (14 - kingDistance) * 5;
    } else if (whiteHasRook) {
      // K+R vs K: edge is good
      score += (3 - distToEdge(blackKingPos)) * 25;
      // Bring king closer
      score += (14 - kingDistance) * 5;
    }
  }

  if (blackMaterial > 0 && whiteMaterial === 0 && whitePawns === 0) {
    // Black is winning - drive white king to corner
    if (blackHasQueen) {
      score -= (7 - distToCorner(whiteKingPos)) * 20;
      score -= (14 - kingDistance) * 5;
    } else if (blackHasRook) {
      score -= (3 - distToEdge(whiteKingPos)) * 25;
      score -= (14 - kingDistance) * 5;
    }
  }

  // K+P vs K: Basic passed pawn evaluation
  if (whitePawns > 0 && blackMaterial === 0 && blackPawns === 0) {
    // Bonus for advancing pawns in K+P vs K
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece?.type === 'p' && piece.color === 'w') {
          // Pawn advancement bonus (row 0 = 8th rank = promotion)
          score += (7 - row) * 15;
          // King support for pawn
          const kingDistToPawn = Math.abs(whiteKingPos.row - row) + Math.abs(whiteKingPos.col - col);
          score += (8 - kingDistToPawn) * 5;
        }
      }
    }
  }

  if (blackPawns > 0 && whiteMaterial === 0 && whitePawns === 0) {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece?.type === 'p' && piece.color === 'b') {
          // Pawn advancement bonus (row 7 = 1st rank = promotion for black)
          score -= row * 15;
          // King support for pawn
          const kingDistToPawn = Math.abs(blackKingPos.row - row) + Math.abs(blackKingPos.col - col);
          score -= (8 - kingDistToPawn) * 5;
        }
      }
    }
  }

  return score;
};

const evaluateBoard = (game: Chess): number => {
  if (game.isCheckmate()) return game.turn() === 'w' ? -30000 : 30000;
  if (game.isDraw()) return 0;

  let score = 0;
  const board = game.board();
  const phase = getGamePhase(game);
  const endgameWeight = 1 - (phase / 24);

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece) {
        const value = PIECE_VALUES[piece.type];
        const pstIndex = piece.color === 'w' ? row * 8 + col : (7 - row) * 8 + col;

        let pstValue: number;
        if (piece.type === 'k') {
          const mgValue = KING_MIDDLEGAME_PST[pstIndex];
          const egValue = KING_ENDGAME_PST[pstIndex];
          pstValue = mgValue * (1 - endgameWeight) + egValue * endgameWeight;
        } else {
          pstValue = PSTS[piece.type]?.[pstIndex] || 0;
        }

        const totalValue = value + pstValue;
        score += piece.color === 'w' ? totalValue : -totalValue;
      }
    }
  }

  score += evaluatePawnStructure(game);
  score += evaluateKingSafety(game) * (1 - endgameWeight);
  score += evaluateMobility(game) * 0.5;

  // Additional evaluation terms
  score += evaluateBishopPair(board);
  score += evaluateRookFiles(board);
  score += evaluateKnightOutposts(board);
  score += evaluateConnectedRooks(board) * (1 - endgameWeight); // Less important in endgame

  // Endgame knowledge
  score += evaluateEndgame(board, phase);

  return score;
};

// Move ordering
const getMVVLVAScore = (move: { captured?: string; piece: string }): number => {
  if (!move.captured) return 0;
  const victimValue = PIECE_VALUES[move.captured] || 0;
  const attackerValue = PIECE_VALUES[move.piece] || 0;
  return victimValue * 10 - attackerValue;
};

const orderMoves = (game: Chess, moves: string[], depth: number = 0): { san: string; score: number; moveObj?: { piece: string; from: string; to: string; captured?: string } }[] => {
  const ttKey = computeZobristHash(game);
  const ttEntry = transpositionTable.get(ttKey);

  return moves.map(san => {
    const moveObj = game.move(san);
    let score = 0;

    // TT best move (highest priority)
    if (ttEntry?.bestMove === san) score += 10000;

    // Captures (MVV-LVA ordering)
    if (moveObj.captured) {
      score += getMVVLVAScore(moveObj) + 5000;
    } else {
      // Non-captures: check killer moves
      if (depth < MAX_DEPTH) {
        if (killerMoves[depth][0] === san) score += 9000;
        else if (killerMoves[depth][1] === san) score += 8000;
      }

      // History heuristic for quiet moves
      score += getHistoryScore(moveObj.piece, moveObj.from, moveObj.to);
    }

    // Promotions
    if (moveObj.promotion) score += PIECE_VALUES[moveObj.promotion] + 500;

    // Check bonus
    if (game.isCheck()) score += 50;

    const moveData = { piece: moveObj.piece, from: moveObj.from, to: moveObj.to, captured: moveObj.captured };
    game.undo();
    return { san, score, moveObj: moveData };
  }).sort((a, b) => b.score - a.score);
};

// Quiescence search with depth limit
const quiescenceSearch = (game: Chess, alpha: number, beta: number, maximizing: boolean, depth: number = 0): number => {
  const standPat = evaluateBoard(game);

  // Stop if we've reached max quiescence depth
  if (depth >= maxQuiescenceDepth) return standPat;

  if (maximizing) {
    if (standPat >= beta) return beta;
    if (alpha < standPat) alpha = standPat;
  } else {
    if (standPat <= alpha) return alpha;
    if (beta > standPat) beta = standPat;
  }

  const moves = game.moves({ verbose: true });
  const captures = moves.filter(m => m.captured || m.promotion);

  if (captures.length === 0) return standPat;

  for (const move of captures) {
    game.move(move.san);
    const score = quiescenceSearch(game, alpha, beta, !maximizing, depth + 1);
    game.undo();

    if (maximizing) {
      if (score >= beta) return beta;
      if (score > alpha) alpha = score;
    } else {
      if (score <= alpha) return alpha;
      if (score < beta) beta = score;
    }
  }

  return maximizing ? alpha : beta;
};

// Check if time limit exceeded
const isTimeUp = (): boolean => {
  return Date.now() - searchStartTime > searchTimeLimit;
};

// Minimax with alpha-beta and transposition table
const minimaxWithTT = (
  game: Chess,
  depth: number,
  alpha: number,
  beta: number,
  maximizing: boolean
): number => {
  // Check time limit periodically
  if (isTimeUp()) {
    searchAborted = true;
    return evaluateBoard(game);
  }

  const ttKey = computeZobristHash(game);
  const ttEntry = transpositionTable.get(ttKey);

  if (ttEntry && ttEntry.depth >= depth) {
    if (ttEntry.flag === 'exact') return ttEntry.value;
    if (ttEntry.flag === 'lower') alpha = Math.max(alpha, ttEntry.value);
    else if (ttEntry.flag === 'upper') beta = Math.min(beta, ttEntry.value);
    if (alpha >= beta) return ttEntry.value;
  }

  if (depth === 0 || game.isGameOver()) {
    const value = useQuiescence ? quiescenceSearch(game, alpha, beta, maximizing) : evaluateBoard(game);
    return value;
  }

  const moves = game.moves();
  if (moves.length === 0) return evaluateBoard(game);

  // Null move pruning (only in non-endgame positions)
  if (depth >= 3 && !game.isCheck() && getGamePhase(game) > 6) {
    const nullMoveReduction = 2;
    const fen = game.fen();
    const parts = fen.split(' ');
    parts[1] = parts[1] === 'w' ? 'b' : 'w';
    try {
      const nullGame = new Chess(parts.join(' '));
      const nullScore = minimaxWithTT(nullGame, depth - 1 - nullMoveReduction, alpha, beta, !maximizing);
      if (maximizing && nullScore >= beta) return beta;
      if (!maximizing && nullScore <= alpha) return alpha;
    } catch { /* ignore */ }
  }

  const orderedMoves = orderMoves(game, moves, depth);
  let bestMove: string | undefined;
  let bestMoveData: { piece: string; from: string; to: string; captured?: string } | undefined;
  let bestValue = maximizing ? -Infinity : Infinity;
  let flag: 'exact' | 'lower' | 'upper' = 'exact';

  for (let i = 0; i < orderedMoves.length; i++) {
    const move = orderedMoves[i];
    game.move(move.san);

    // Late move reductions
    let reduction = 0;
    if (i >= 4 && depth >= 3 && !game.isCheck() && move.score < 100) {
      reduction = 1;
    }

    let value = minimaxWithTT(game, depth - 1 - reduction, alpha, beta, !maximizing);

    // Re-search if reduced search found something good
    if (reduction > 0) {
      if (maximizing && value > alpha) {
        value = minimaxWithTT(game, depth - 1, alpha, beta, !maximizing);
      } else if (!maximizing && value < beta) {
        value = minimaxWithTT(game, depth - 1, alpha, beta, !maximizing);
      }
    }

    game.undo();

    if (maximizing) {
      if (value > bestValue) {
        bestValue = value;
        bestMove = move.san;
        bestMoveData = move.moveObj;
      }
      if (value > alpha) alpha = value;
      if (alpha >= beta) {
        // Beta cutoff - store killer and update history for quiet moves
        if (move.moveObj && !move.moveObj.captured) {
          storeKiller(move.san, depth);
          updateHistory(move.moveObj.piece, move.moveObj.from, move.moveObj.to, depth);
        }
        flag = 'lower';
        break;
      }
    } else {
      if (value < bestValue) {
        bestValue = value;
        bestMove = move.san;
        bestMoveData = move.moveObj;
      }
      if (value < beta) beta = value;
      if (alpha >= beta) {
        // Beta cutoff - store killer and update history for quiet moves
        if (move.moveObj && !move.moveObj.captured) {
          storeKiller(move.san, depth);
          updateHistory(move.moveObj.piece, move.moveObj.from, move.moveObj.to, depth);
        }
        flag = 'upper';
        break;
      }
    }
  }

  if (bestValue <= alpha) flag = 'upper';
  else if (bestValue >= beta) flag = 'lower';

  transpositionTable.set(ttKey, { depth, value: bestValue, flag, bestMove });
  return bestValue;
};

// Extract PV from transposition table
const extractPV = (game: Chess, maxLength: number = 6): string[] => {
  const pv: string[] = [];
  const visited = new Set<number>();

  for (let i = 0; i < maxLength; i++) {
    const key = computeZobristHash(game);
    if (visited.has(key)) break;
    visited.add(key);

    const entry = transpositionTable.get(key);
    if (!entry || !entry.bestMove) break;

    const moves = game.moves();
    if (!moves.includes(entry.bestMove)) break;

    pv.push(entry.bestMove);
    game.move(entry.bestMove);
  }

  for (let i = 0; i < pv.length; i++) {
    game.undo();
  }

  return pv;
};

// Search at a specific depth with aspiration window
const searchAtDepth = (game: Chess, depth: number, alpha: number = -Infinity, beta: number = Infinity): { move: string | null; value: number } => {
  const moves = game.moves();
  if (moves.length === 0) return { move: null, value: 0 };

  let bestMove: string | null = null;
  let bestValue = game.turn() === 'w' ? -Infinity : Infinity;
  const orderedMoves = orderMoves(game, moves, depth);

  for (const move of orderedMoves) {
    if (searchAborted) break;

    game.move(move.san);
    const boardValue = minimaxWithTT(game, depth - 1, alpha, beta, game.turn() === 'w');
    game.undo();

    if (searchAborted) break;

    if (game.turn() === 'w') {
      if (boardValue > bestValue) {
        bestValue = boardValue;
        bestMove = move.san;
      }
      if (boardValue > alpha) alpha = boardValue;
    } else {
      if (boardValue < bestValue) {
        bestValue = boardValue;
        bestMove = move.san;
      }
      if (boardValue < beta) beta = boardValue;
    }
  }

  return { move: bestMove, value: bestValue };
};

// Main search function with iterative deepening
const getBestMoveWithPV = (fen: string, difficulty: Difficulty): { move: string | null; pv: string[]; eval: number } => {
  const game = new Chess(fen);
  const moves = game.moves();

  if (moves.length === 0) {
    return { move: null, pv: [], eval: 0 };
  }

  // Check opening book first (instant response)
  const bookMove = getBookMove(fen);
  if (bookMove && moves.includes(bookMove)) {
    return { move: bookMove, pv: [bookMove], eval: 0 };
  }

  // Only one legal move - return immediately
  if (moves.length === 1) {
    return { move: moves[0], pv: [moves[0]], eval: 0 };
  }

  const settings = DIFFICULTY_SETTINGS[difficulty];
  const maxDepth = settings.depth;
  useQuiescence = settings.quiescence;
  maxQuiescenceDepth = settings.maxQuiescenceDepth;
  searchTimeLimit = settings.timeLimitMs;
  searchStartTime = Date.now();
  searchAborted = false;

  // Clear killer moves and history for new search
  clearSearchTables();

  // Don't clear TT - reuse from previous searches for better move ordering
  if (transpositionTable.size > 100000) {
    transpositionTable.clear(); // Only clear if too large
  }

  // Random move for easy difficulty
  if (Math.random() < settings.randomness) {
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    return { move: randomMove, pv: [randomMove], eval: 0 };
  }

  // Iterative deepening with aspiration windows
  let bestMove: string | null = moves[0]; // Default to first move
  let bestValue = 0;
  const ASPIRATION_WINDOW = 50; // 0.5 pawns initial window

  for (let depth = 1; depth <= maxDepth; depth++) {
    searchAborted = false;
    let result: { move: string | null; value: number };

    // Use aspiration windows starting from depth 2
    if (depth >= 2) {
      let alpha = bestValue - ASPIRATION_WINDOW;
      let beta = bestValue + ASPIRATION_WINDOW;

      result = searchAtDepth(game, depth, alpha, beta);

      // If search fell outside window and wasn't aborted, re-search with full window
      if (!searchAborted && result.move) {
        if (result.value <= alpha || result.value >= beta) {
          searchAborted = false;
          result = searchAtDepth(game, depth, -Infinity, Infinity);
        }
      }
    } else {
      // Depth 1: use full window
      result = searchAtDepth(game, depth);
    }

    // Only use result if search completed (wasn't aborted)
    if (!searchAborted && result.move) {
      bestMove = result.move;
      bestValue = result.value;
    }

    // Stop if time is up
    if (isTimeUp()) break;
  }

  const pv = extractPV(game);
  return { move: bestMove, pv, eval: bestValue };
};

/**
 * Analyze all legal moves in a position using deep search.
 * Returns moves ranked by evaluation with book move recognition.
 * Used for game analysis (reviewing past moves for accuracy).
 */
interface AnalyzedMove {
  san: string;
  score: number;
  isBookMove: boolean;
}

const analyzeAllMoves = (fen: string, depth: number = 4): AnalyzedMove[] => {
  const game = new Chess(fen);
  const moves = game.moves();

  if (moves.length === 0) return [];

  // Get book moves for this position
  const simplifiedFen = simplifyFen(fen);
  const bookMoves = getAllBookMoves(simplifiedFen);
  const bookMoveSet = new Set(bookMoves);

  // Configure search settings for analysis (no randomness, deep search)
  useQuiescence = true;
  maxQuiescenceDepth = 3;
  searchTimeLimit = 30000; // 30 seconds max for full analysis
  searchStartTime = Date.now();
  searchAborted = false;

  // Clear search tables for fresh analysis
  clearSearchTables();

  const results: AnalyzedMove[] = [];
  const isWhite = game.turn() === 'w';

  // Analyze each move
  for (const san of moves) {
    game.move(san);

    // Search from opponent's perspective after the move
    const score = minimaxWithTT(
      game,
      depth - 1,
      -Infinity,
      Infinity,
      game.turn() === 'w' // Now it's opponent's turn
    );

    game.undo();

    results.push({
      san,
      // Negate score since we searched from opponent's perspective
      score: isWhite ? score : -score,
      isBookMove: bookMoveSet.has(san)
    });
  }

  // Sort by score (best first for current player)
  results.sort((a, b) => {
    if (isWhite) {
      return b.score - a.score; // White wants highest score
    } else {
      return a.score - b.score; // Black wants lowest score
    }
  });

  return results;
};

// Worker message handler
self.onmessage = (e: MessageEvent<{ type: string; fen: string; difficulty?: Difficulty; depth?: number }>) => {
  const { type, fen, difficulty, depth } = e.data;

  if (type === 'getBestMove') {
    const result = getBestMoveWithPV(fen, difficulty || 'medium');
    self.postMessage(result);
  } else if (type === 'analyze') {
    const evaluatedMoves = analyzeAllMoves(fen, depth || 4);
    self.postMessage({ type: 'analysis', moves: evaluatedMoves });
  }
};

export {};

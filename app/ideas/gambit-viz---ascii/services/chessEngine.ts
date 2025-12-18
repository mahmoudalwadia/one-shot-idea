/**
 * Chess Engine (Main Thread)
 *
 * Fast position evaluation for UI responsiveness. Deep search runs in Web Worker.
 *
 * === EVALUATION (evaluateBoard) ===
 * Score = Material + Positional + Structure + King Safety + Mobility
 *
 * 1. Material: Piece values in centipawns (pawn=100, knight=320, bishop=330, rook=500, queen=900)
 * 2. Positional: Piece-Square Tables (PST) - bonus/penalty based on piece location
 *    - Knights prefer center, bishops like diagonals, rooks want open files
 *    - King PST changes: middlegame (stay safe, castle) vs endgame (centralize)
 * 3. Pawn Structure: Penalties for doubled pawns (-10cp each), isolated pawns (-10cp)
 * 4. King Safety: Pawn shield bonus (+10cp per pawn), open file penalty (-15cp)
 * 5. Mobility: Simplified - just counts legal moves (2cp per move advantage)
 *
 * === GAME PHASE ===
 * Phase = sum of minor pieces (1 each) + rooks (2 each) + queens (4 each)
 * - High phase (>16): Middlegame - king safety matters, use middlegame PST
 * - Low phase (<8): Endgame - king centralization, use endgame PST
 *
 * === KEY FUNCTIONS ===
 * - evaluateBoard(game): Static eval in centipawns (+ = white better)
 * - getEvaluatedMoves(fen): All legal moves with static eval scores
 * - analyzeBoardLocal(fen): Quick board state (material, checks, etc.)
 *
 * Note: Minimax search is defined here but actually runs in chessWorker.ts
 */

import { Chess, Move } from 'chess.js';
import { MoveClassification } from '../types';
import { classifyMove } from './moveReview';

// Difficulty level type
export type Difficulty = 'easy' | 'medium' | 'hard';

// Piece values in centipawns
const PIECE_VALUES: Record<string, number> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

// Complete Piece-Square Tables (PST) - from white's perspective, row 0 = rank 8
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

// King PST for middlegame - prioritizes castled position and safety
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

// King PST for endgame - king should be active and centralized
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

// All PSTs indexed by piece type
const PSTS: Record<string, number[]> = {
  p: PAWN_PST,
  n: KNIGHT_PST,
  b: BISHOP_PST,
  r: ROOK_PST,
  q: QUEEN_PST,
  k: KING_MIDDLEGAME_PST, // Default, will be overridden based on game phase
};

// Game phase detection - returns value from 0 (endgame) to 256 (opening)
const getGamePhase = (game: Chess): number => {
  const board = game.board();
  let phase = 0;

  // Phase weights: knight/bishop = 1, rook = 2, queen = 4
  const phaseWeights: Record<string, number> = { n: 1, b: 1, r: 2, q: 4 };
  const totalPhase = 24; // 2*1 + 2*1 + 2*2 + 1*4 = 12 per side = 24 total

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece && phaseWeights[piece.type]) {
        phase += phaseWeights[piece.type];
      }
    }
  }

  // Scale to 0-256 range
  return Math.floor((phase * 256 + totalPhase / 2) / totalPhase);
};

// Get King PST based on game phase (interpolates between middlegame and endgame)
const getKingPst = (phase: number): number[] => {
  const result: number[] = [];
  for (let i = 0; i < 64; i++) {
    // Linear interpolation between endgame (phase=0) and middlegame (phase=256)
    const mg = KING_MIDDLEGAME_PST[i];
    const eg = KING_ENDGAME_PST[i];
    result[i] = Math.floor((mg * phase + eg * (256 - phase)) / 256);
  }
  return result;
};

// MVV-LVA (Most Valuable Victim - Least Valuable Attacker) scoring for move ordering
const getMvvLvaScore = (move: Move): number => {
  if (!move.captured) return 0;

  const victimValue = PIECE_VALUES[move.captured] || 0;
  const attackerValue = PIECE_VALUES[move.piece] || 0;

  // Score = 10 * victim - attacker (ensures capturing with lower value pieces is preferred)
  return 10 * victimValue - attackerValue;
};

// Order moves for better alpha-beta pruning
const orderMoves = (game: Chess, moves: string[]): Move[] => {
  const verboseMoves = moves.map(m => {
    game.move(m);
    const move = game.history({ verbose: true }).pop()!;
    game.undo();
    return move;
  });

  return verboseMoves.sort((a, b) => {
    // 1. Captures first, ordered by MVV-LVA
    const aCapture = getMvvLvaScore(a);
    const bCapture = getMvvLvaScore(b);
    if (aCapture !== bCapture) return bCapture - aCapture;

    // 2. Promotions
    if (a.promotion && !b.promotion) return -1;
    if (!a.promotion && b.promotion) return 1;

    // 3. Checks (if we had that info readily available)

    return 0;
  });
};

// Pawn structure evaluation
const evaluatePawnStructure = (board: ReturnType<Chess['board']>, color: 'w' | 'b'): number => {
    let score = 0;
    const pawns: number[] = []; // Track pawn files

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = board[i][j];
            if (piece && piece.type === 'p' && piece.color === color) {
                pawns.push(j);

                // Passed pawn bonus (no enemy pawns ahead on same or adjacent files)
                let isPassed = true;
                const direction = color === 'w' ? -1 : 1;
                const startRow = color === 'w' ? i - 1 : i + 1;
                const endRow = color === 'w' ? -1 : 8;

                for (let row = startRow; row !== endRow; row += direction) {
                    if (row < 0 || row > 7) break;
                    for (let col = Math.max(0, j - 1); col <= Math.min(7, j + 1); col++) {
                        const p = board[row][col];
                        if (p && p.type === 'p' && p.color !== color) {
                            isPassed = false;
                            break;
                        }
                    }
                    if (!isPassed) break;
                }

                if (isPassed) {
                    // Bonus increases as pawn advances
                    const advancement = color === 'w' ? (7 - i) : i;
                    score += 20 + advancement * 10;
                }

                // Isolated pawn penalty (no friendly pawns on adjacent files)
                let isIsolated = true;
                for (let row = 0; row < 8; row++) {
                    for (const col of [j - 1, j + 1]) {
                        if (col >= 0 && col < 8) {
                            const p = board[row][col];
                            if (p && p.type === 'p' && p.color === color) {
                                isIsolated = false;
                                break;
                            }
                        }
                    }
                    if (!isIsolated) break;
                }
                if (isIsolated) score -= 15;
            }
        }
    }

    // Doubled pawns penalty
    const fileCounts = new Map<number, number>();
    for (const file of pawns) {
        fileCounts.set(file, (fileCounts.get(file) || 0) + 1);
    }
    for (const count of fileCounts.values()) {
        if (count > 1) score -= 10 * (count - 1);
    }

    return score;
};

// King safety evaluation
const evaluateKingSafety = (_game: Chess, board: ReturnType<Chess['board']>, color: 'w' | 'b', phase: number): number => {
    // King safety matters more in middlegame
    if (phase < 100) return 0; // Skip in endgame

    let score = 0;
    let kingRow = -1, kingCol = -1;

    // Find king position
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = board[i][j];
            if (piece && piece.type === 'k' && piece.color === color) {
                kingRow = i;
                kingCol = j;
                break;
            }
        }
        if (kingRow !== -1) break;
    }

    if (kingRow === -1) return 0;

    // Pawn shield bonus (pawns in front of king)
    const shieldRow = color === 'w' ? kingRow - 1 : kingRow + 1;
    if (shieldRow >= 0 && shieldRow < 8) {
        for (let col = Math.max(0, kingCol - 1); col <= Math.min(7, kingCol + 1); col++) {
            const piece = board[shieldRow][col];
            if (piece && piece.type === 'p' && piece.color === color) {
                score += 10;
            }
        }
    }

    // Open file penalty near king
    for (let col = Math.max(0, kingCol - 1); col <= Math.min(7, kingCol + 1); col++) {
        let hasPawn = false;
        for (let row = 0; row < 8; row++) {
            const piece = board[row][col];
            if (piece && piece.type === 'p') {
                hasPawn = true;
                break;
            }
        }
        if (!hasPawn) score -= 15;
    }

    // Scale by game phase (more important in middlegame)
    return Math.floor(score * phase / 256);
};

// Mobility evaluation (count of legal moves)
const evaluateMobility = (game: Chess): number => {
    const myMoves = game.moves().length;
    // ~2-3 centipawns per move advantage
    return myMoves * 2;
};

const evaluateBoard = (game: Chess): number => {
    let totalEvaluation = 0;
    const board = game.board();
    const phase = getGamePhase(game);
    const kingPst = getKingPst(phase);

    // Material and positional evaluation
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = board[i][j];
            if (piece) {
                const isWhite = piece.color === 'w';
                let value = PIECE_VALUES[piece.type];

                // Add positional value
                const index = i * 8 + j;
                const mirroredIndex = 63 - index;

                if (piece.type === 'k') {
                    // Use phase-interpolated King PST
                    value += isWhite ? kingPst[index] : kingPst[mirroredIndex];
                } else if (PSTS[piece.type]) {
                    // For white, index is standard. For black, we mirror the index.
                    value += isWhite ? PSTS[piece.type][index] : PSTS[piece.type][mirroredIndex];
                }

                totalEvaluation += isWhite ? value : -value;
            }
        }
    }

    // Pawn structure
    totalEvaluation += evaluatePawnStructure(board, 'w');
    totalEvaluation -= evaluatePawnStructure(board, 'b');

    // King safety
    totalEvaluation += evaluateKingSafety(game, board, 'w', phase);
    totalEvaluation -= evaluateKingSafety(game, board, 'b', phase);

    // Mobility (simplified - bonus for side to move)
    const mobilityBonus = evaluateMobility(game);
    totalEvaluation += game.turn() === 'w' ? mobilityBonus : -mobilityBonus;

    return totalEvaluation;
};

// Quiescence Search - searches captures until position is "quiet" to avoid horizon effect
const quiescenceSearch = (
    game: Chess,
    alpha: number,
    beta: number,
    isMaximizingPlayer: boolean,
    maxDepth: number = 4 // Limit quiescence depth to avoid explosion
): number => {
    // Stand-pat: evaluate the current position
    const standPat = evaluateBoard(game);

    if (maxDepth === 0) return standPat;

    if (isMaximizingPlayer) {
        if (standPat >= beta) return beta; // Beta cutoff
        if (standPat > alpha) alpha = standPat;
    } else {
        if (standPat <= alpha) return alpha; // Alpha cutoff
        if (standPat < beta) beta = standPat;
    }

    // Get only captures and promotions (tactical moves)
    const allMoves = game.moves({ verbose: true });
    const tacticalMoves = allMoves.filter(m => m.captured || m.promotion);

    if (tacticalMoves.length === 0) return standPat;

    // Order captures by MVV-LVA
    tacticalMoves.sort((a, b) => getMvvLvaScore(b) - getMvvLvaScore(a));

    if (isMaximizingPlayer) {
        let bestEval = standPat;
        for (const move of tacticalMoves) {
            game.move(move.san);
            const evalNum = quiescenceSearch(game, alpha, beta, false, maxDepth - 1);
            game.undo();
            bestEval = Math.max(bestEval, evalNum);
            alpha = Math.max(alpha, evalNum);
            if (beta <= alpha) break;
        }
        return bestEval;
    } else {
        let bestEval = standPat;
        for (const move of tacticalMoves) {
            game.move(move.san);
            const evalNum = quiescenceSearch(game, alpha, beta, true, maxDepth - 1);
            game.undo();
            bestEval = Math.min(bestEval, evalNum);
            beta = Math.min(beta, evalNum);
            if (beta <= alpha) break;
        }
        return bestEval;
    }
};

// Enable/disable quiescence search based on difficulty
let useQuiescence = true;

// Note: minimax is defined here for reference but actual search runs in chessWorker.ts
const _minimax = (
    game: Chess,
    depth: number,
    alpha: number,
    beta: number,
    isMaximizingPlayer: boolean
): number => {
    // Terminal conditions
    if (game.isGameOver()) {
        if (game.isCheckmate()) {
            // Return large negative/positive value for checkmate
            return isMaximizingPlayer ? -20000 + depth : 20000 - depth;
        }
        return 0; // Draw
    }

    // At depth 0, use quiescence search to avoid horizon effect
    if (depth === 0) {
        if (useQuiescence) {
            return quiescenceSearch(game, alpha, beta, isMaximizingPlayer);
        }
        return evaluateBoard(game);
    }

    const moves = game.moves();
    if (moves.length === 0) return evaluateBoard(game);

    // Order moves for better pruning
    const orderedMoves = orderMoves(game, moves);

    if (isMaximizingPlayer) {
        let bestEval = -Infinity;
        for (const move of orderedMoves) {
            game.move(move.san);
            const evalNum = _minimax(game, depth - 1, alpha, beta, false);
            game.undo();
            bestEval = Math.max(bestEval, evalNum);
            alpha = Math.max(alpha, evalNum);
            if (beta <= alpha) break;
        }
        return bestEval;
    } else {
        let bestEval = Infinity;
        for (const move of orderedMoves) {
            game.move(move.san);
            const evalNum = _minimax(game, depth - 1, alpha, beta, true);
            game.undo();
            bestEval = Math.min(bestEval, evalNum);
            beta = Math.min(beta, evalNum);
            if (beta <= alpha) break;
        }
        return bestEval;
    }
};

// Difficulty settings
const DIFFICULTY_SETTINGS: Record<Difficulty, { depth: number; randomness: number; quiescence: boolean }> = {
  easy: { depth: 2, randomness: 0.3, quiescence: false },    // Depth 2, 30% random, no quiescence
  medium: { depth: 3, randomness: 0.05, quiescence: true },  // Depth 3, 5% random, quiescence
  hard: { depth: 4, randomness: 0, quiescence: true },       // Depth 4, always best, quiescence
};

// Zobrist Hashing for fast position identification
// Using pseudo-random numbers seeded for consistency
const ZOBRIST_SEED = 1070372;

// Simple mulberry32 PRNG for consistent random numbers
const mulberry32 = (seed: number) => {
  return () => {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0);
  };
};

// Generate Zobrist keys
const initZobristKeys = () => {
  const rng = mulberry32(ZOBRIST_SEED);

  // 12 pieces (6 types * 2 colors) * 64 squares
  const pieceKeys: number[][][] = [];
  for (let piece = 0; piece < 12; piece++) {
    pieceKeys[piece] = [];
    for (let square = 0; square < 64; square++) {
      // Use two 32-bit numbers for ~53-bit effective hash
      pieceKeys[piece][square] = [rng(), rng()];
    }
  }

  // 4 castling rights
  const castlingKeys: number[][] = [];
  for (let i = 0; i < 4; i++) {
    castlingKeys[i] = [rng(), rng()];
  }

  // 8 en passant files
  const epKeys: number[][] = [];
  for (let i = 0; i < 8; i++) {
    epKeys[i] = [rng(), rng()];
  }

  // Side to move
  const sideKey = [rng(), rng()];

  return { pieceKeys, castlingKeys, epKeys, sideKey };
};

const ZOBRIST = initZobristKeys();

// Map piece type and color to index (0-11)
const pieceToIndex = (type: string, color: string): number => {
  const types: Record<string, number> = { p: 0, n: 1, b: 2, r: 3, q: 4, k: 5 };
  return types[type] + (color === 'w' ? 0 : 6);
};

// XOR two number pairs (simulating 64-bit XOR with two 32-bit numbers)
const xorHash = (a: number[], b: number[]): number[] => {
  return [a[0] ^ b[0], a[1] ^ b[1]];
};

// Convert hash to string key for Map
const hashToKey = (hash: number[]): string => {
  return `${hash[0]}_${hash[1]}`;
};

// Compute Zobrist hash for a position
const computeZobristHash = (game: Chess): number[] => {
  let hash = [0, 0];
  const board = game.board();

  // Hash pieces
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece) {
        const pieceIdx = pieceToIndex(piece.type, piece.color);
        const squareIdx = i * 8 + j;
        hash = xorHash(hash, ZOBRIST.pieceKeys[pieceIdx][squareIdx]);
      }
    }
  }

  // Hash castling rights
  const fen = game.fen();
  const castling = fen.split(' ')[2];
  if (castling.includes('K')) hash = xorHash(hash, ZOBRIST.castlingKeys[0]);
  if (castling.includes('Q')) hash = xorHash(hash, ZOBRIST.castlingKeys[1]);
  if (castling.includes('k')) hash = xorHash(hash, ZOBRIST.castlingKeys[2]);
  if (castling.includes('q')) hash = xorHash(hash, ZOBRIST.castlingKeys[3]);

  // Hash en passant
  const epSquare = fen.split(' ')[3];
  if (epSquare !== '-') {
    const file = epSquare.charCodeAt(0) - 'a'.charCodeAt(0);
    hash = xorHash(hash, ZOBRIST.epKeys[file]);
  }

  // Hash side to move
  if (game.turn() === 'b') {
    hash = xorHash(hash, ZOBRIST.sideKey);
  }

  return hash;
};

// Simple Transposition Table for caching evaluated positions
interface TTEntry {
  depth: number;
  score: number;
  flag: 'exact' | 'lowerbound' | 'upperbound';
  bestMove?: string; // Store best move for PV extraction
}

const transpositionTable = new Map<string, TTEntry>();
const TT_MAX_SIZE = 100000; // Limit table size to ~20MB

// Extract Principal Variation from transposition table
const extractPV = (game: Chess, maxLength: number = 6): string[] => {
  const pv: string[] = [];
  const visited = new Set<string>();

  for (let i = 0; i < maxLength; i++) {
    const key = getTTKey(game);

    // Avoid infinite loops
    if (visited.has(key)) break;
    visited.add(key);

    const entry = transpositionTable.get(key);
    if (!entry || !entry.bestMove) break;

    // Verify the move is legal
    const moves = game.moves();
    if (!moves.includes(entry.bestMove)) break;

    pv.push(entry.bestMove);
    game.move(entry.bestMove);
  }

  // Undo all moves to restore position
  for (let i = 0; i < pv.length; i++) {
    game.undo();
  }

  return pv;
};

const getTTKey = (game: Chess): string => {
  const hash = computeZobristHash(game);
  return hashToKey(hash);
};

const probeTT = (key: string, depth: number, alpha: number, beta: number): { hit: boolean; score?: number } => {
  const entry = transpositionTable.get(key);
  if (!entry || entry.depth < depth) {
    return { hit: false };
  }

  if (entry.flag === 'exact') {
    return { hit: true, score: entry.score };
  } else if (entry.flag === 'lowerbound' && entry.score >= beta) {
    return { hit: true, score: entry.score };
  } else if (entry.flag === 'upperbound' && entry.score <= alpha) {
    return { hit: true, score: entry.score };
  }

  return { hit: false };
};

const storeTT = (key: string, depth: number, score: number, flag: 'exact' | 'lowerbound' | 'upperbound', bestMove?: string) => {
  // Simple size management - clear if too large
  if (transpositionTable.size >= TT_MAX_SIZE) {
    // Clear half the table (simple approach)
    const keys = Array.from(transpositionTable.keys());
    for (let i = 0; i < keys.length / 2; i++) {
      transpositionTable.delete(keys[i]);
    }
  }

  transpositionTable.set(key, { depth, score, flag, bestMove });
};

// Null Move Pruning constants
const NULL_MOVE_REDUCTION = 2; // R value for null move pruning
const LMR_FULL_SEARCH_MOVES = 4; // Search first N moves at full depth
const LMR_REDUCTION = 1; // Depth reduction for late moves

// Check if position allows null move pruning (not in check, has non-pawn material)
const canNullMove = (game: Chess): boolean => {
  if (game.inCheck()) return false;

  // Must have at least one non-pawn piece (avoid zugzwang)
  const board = game.board();
  const turn = game.turn();
  let hasNonPawn = false;

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece && piece.color === turn && piece.type !== 'p' && piece.type !== 'k') {
        hasNonPawn = true;
        break;
      }
    }
    if (hasNonPawn) break;
  }

  return hasNonPawn;
};

// Make a null move (pass turn to opponent without moving)
const makeNullMove = (game: Chess): Chess => {
  const fen = game.fen();
  const parts = fen.split(' ');
  // Swap side to move
  parts[1] = parts[1] === 'w' ? 'b' : 'w';
  // Clear en passant square
  parts[3] = '-';
  // Increment halfmove clock
  parts[4] = String(parseInt(parts[4]) + 1);
  // Increment fullmove number if black just "moved"
  if (parts[1] === 'w') {
    parts[5] = String(parseInt(parts[5]) + 1);
  }
  return new Chess(parts.join(' '));
};

// Minimax with Transposition Table, Null Move Pruning, and Late Move Reductions
const minimaxWithTT = (
    game: Chess,
    depth: number,
    alpha: number,
    beta: number,
    isMaximizingPlayer: boolean,
    allowNullMove: boolean = true
): number => {
    const ttKey = getTTKey(game);
    const origAlpha = alpha;

    // Probe transposition table
    const ttResult = probeTT(ttKey, depth, alpha, beta);
    if (ttResult.hit && ttResult.score !== undefined) {
        return ttResult.score;
    }

    // Terminal conditions
    if (game.isGameOver()) {
        if (game.isCheckmate()) {
            return isMaximizingPlayer ? -20000 + depth : 20000 - depth;
        }
        return 0; // Draw
    }

    // At depth 0, use quiescence search
    if (depth === 0) {
        if (useQuiescence) {
            return quiescenceSearch(game, alpha, beta, isMaximizingPlayer);
        }
        return evaluateBoard(game);
    }

    // Null Move Pruning
    // If giving opponent a free move still results in a beta cutoff, prune
    if (allowNullMove && depth >= NULL_MOVE_REDUCTION + 1 && canNullMove(game)) {
        const nullGame = makeNullMove(game);
        const nullScore = minimaxWithTT(
            nullGame,
            depth - 1 - NULL_MOVE_REDUCTION,
            isMaximizingPlayer ? beta - 1 : alpha + 1,
            isMaximizingPlayer ? beta : alpha,
            !isMaximizingPlayer,
            false // Don't allow consecutive null moves
        );

        // Beta cutoff from null move
        if (isMaximizingPlayer && nullScore >= beta) {
            return beta;
        }
        if (!isMaximizingPlayer && nullScore <= alpha) {
            return alpha;
        }
    }

    const moves = game.moves();
    if (moves.length === 0) return evaluateBoard(game);

    // Order moves for better pruning
    const orderedMoves = orderMoves(game, moves);

    let bestEval: number;
    let bestMoveSan: string | undefined;
    let moveIndex = 0;

    if (isMaximizingPlayer) {
        bestEval = -Infinity;
        for (const move of orderedMoves) {
            game.move(move.san);

            let evalNum: number;

            // Late Move Reductions - reduce depth for later moves
            if (moveIndex >= LMR_FULL_SEARCH_MOVES && depth >= 3 && !move.captured && !move.promotion) {
                // Search with reduced depth first
                evalNum = minimaxWithTT(game, depth - 1 - LMR_REDUCTION, alpha, beta, false, true);

                // If it looks promising, re-search at full depth
                if (evalNum > alpha) {
                    evalNum = minimaxWithTT(game, depth - 1, alpha, beta, false, true);
                }
            } else {
                evalNum = minimaxWithTT(game, depth - 1, alpha, beta, false, true);
            }

            game.undo();
            if (evalNum > bestEval) {
                bestEval = evalNum;
                bestMoveSan = move.san;
            }
            alpha = Math.max(alpha, evalNum);
            if (beta <= alpha) break;
            moveIndex++;
        }
    } else {
        bestEval = Infinity;
        for (const move of orderedMoves) {
            game.move(move.san);

            let evalNum: number;

            // Late Move Reductions
            if (moveIndex >= LMR_FULL_SEARCH_MOVES && depth >= 3 && !move.captured && !move.promotion) {
                evalNum = minimaxWithTT(game, depth - 1 - LMR_REDUCTION, alpha, beta, true, true);

                if (evalNum < beta) {
                    evalNum = minimaxWithTT(game, depth - 1, alpha, beta, true, true);
                }
            } else {
                evalNum = minimaxWithTT(game, depth - 1, alpha, beta, true, true);
            }

            game.undo();
            if (evalNum < bestEval) {
                bestEval = evalNum;
                bestMoveSan = move.san;
            }
            beta = Math.min(beta, evalNum);
            if (beta <= alpha) break;
            moveIndex++;
        }
    }

    // Store in transposition table
    let flag: 'exact' | 'lowerbound' | 'upperbound';
    if (bestEval <= origAlpha) {
        flag = 'upperbound';
    } else if (bestEval >= beta) {
        flag = 'lowerbound';
    } else {
        flag = 'exact';
    }
    storeTT(ttKey, depth, bestEval, flag, bestMoveSan);

    return bestEval;
};

export const getBestMove = (game: Chess, _depth: number = 3, difficulty: Difficulty = 'medium'): Promise<string | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const moves = game.moves();
            if (moves.length === 0) {
                resolve(null);
                return;
            }

            const settings = DIFFICULTY_SETTINGS[difficulty];
            const actualDepth = settings.depth;

            // Set quiescence search based on difficulty
            useQuiescence = settings.quiescence;

            // Clear transposition table for new search
            transpositionTable.clear();

            // Easy mode: occasionally make random moves
            if (Math.random() < settings.randomness) {
                resolve(moves[Math.floor(Math.random() * moves.length)]);
                return;
            }

            let bestMove: string | null = null;
            let bestValue = game.turn() === 'w' ? -Infinity : Infinity;

            // Use MVV-LVA move ordering for better pruning
            const orderedMoves = orderMoves(game, moves);

            for (const move of orderedMoves) {
                game.move(move.san);
                const boardValue = minimaxWithTT(game, actualDepth - 1, -Infinity, Infinity, game.turn() === 'w');
                game.undo();

                if (game.turn() === 'w') {
                     if (boardValue > bestValue) {
                        bestValue = boardValue;
                        bestMove = move.san;
                     }
                } else {
                    if (boardValue < bestValue) {
                        bestValue = boardValue;
                        bestMove = move.san;
                     }
                }
            }

            if (!bestMove) {
                bestMove = moves[Math.floor(Math.random() * moves.length)];
            }

            // Store root position's best move for PV extraction
            const rootKey = getTTKey(game);
            storeTT(rootKey, actualDepth, bestValue, 'exact', bestMove);

            resolve(bestMove);
        }, 10);
    });
};

// Get best move with principal variation
export const getBestMoveWithPV = (game: Chess, depth: number = 3, difficulty: Difficulty = 'medium'): Promise<{ move: string | null; pv: string[]; eval: number }> => {
    return new Promise((resolve) => {
        setTimeout(async () => {
            const moves = game.moves();
            if (moves.length === 0) {
                resolve({ move: null, pv: [], eval: 0 });
                return;
            }

            const settings = DIFFICULTY_SETTINGS[difficulty];
            const actualDepth = settings.depth;

            useQuiescence = settings.quiescence;
            transpositionTable.clear();

            if (Math.random() < settings.randomness) {
                const randomMove = moves[Math.floor(Math.random() * moves.length)];
                resolve({ move: randomMove, pv: [randomMove], eval: 0 });
                return;
            }

            let bestMove: string | null = null;
            let bestValue = game.turn() === 'w' ? -Infinity : Infinity;

            const orderedMoves = orderMoves(game, moves);

            for (const move of orderedMoves) {
                game.move(move.san);
                const boardValue = minimaxWithTT(game, actualDepth - 1, -Infinity, Infinity, game.turn() === 'w');
                game.undo();

                if (game.turn() === 'w') {
                    if (boardValue > bestValue) {
                        bestValue = boardValue;
                        bestMove = move.san;
                    }
                } else {
                    if (boardValue < bestValue) {
                        bestValue = boardValue;
                        bestMove = move.san;
                    }
                }
            }

            if (!bestMove) {
                bestMove = moves[Math.floor(Math.random() * moves.length)];
            }

            // Store root best move for PV extraction
            const rootKey = getTTKey(game);
            storeTT(rootKey, actualDepth, bestValue, 'exact', bestMove);

            // Extract PV from transposition table
            const pv = extractPV(game, depth + 2);

            resolve({ move: bestMove, pv, eval: bestValue });
        }, 10);
    });
};

export const getEvaluatedMoves = (game: Chess, limit: number = 3, _depth: number = 2): Promise<{san: string, score: number, fen: string}[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const moves = game.moves();
            const evaluatedMoves = [];

            // Quick evaluation: just evaluate resulting positions (no deep search)
            // This is much faster - only static evaluation, no minimax
            for (const move of moves) {
                game.move(move);
                const score = evaluateBoard(game); // Static eval only - much faster
                const fen = game.fen();
                game.undo();
                evaluatedMoves.push({ san: move, score, fen });
            }

            // Sort by best score for current player
            if (game.turn() === 'w') {
                evaluatedMoves.sort((a, b) => b.score - a.score);
            } else {
                evaluatedMoves.sort((a, b) => a.score - b.score);
            }

            resolve(evaluatedMoves.slice(0, limit));
        }, 0);
    });
};

// Local Analysis Implementation - Optimized for speed
export const analyzeBoardLocal = async (gameObj: Chess): Promise<{ analysis: string, classification: MoveClassification, evalScore?: number }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // 1. Get current status
            if (gameObj.isCheckmate()) {
                resolve({
                    analysis: "Checkmate! The game is over.",
                    classification: "Brilliant",
                    evalScore: gameObj.turn() === 'w' ? -20000 : 20000
                });
                return;
            }
            if (gameObj.isDraw()) {
                resolve({
                    analysis: "Draw position.",
                    classification: "Book",
                    evalScore: 0
                });
                return;
            }

            const history = gameObj.history({ verbose: true });
            if (history.length === 0) {
                 resolve({
                    analysis: "Game Start.",
                    classification: "Book",
                    evalScore: 0
                });
                return;
            }

            const lastMove = history[history.length - 1];
            const moveSan = lastMove.san;

            // 2. Clone to go back one step to evaluate the position BEFORE the move
            const tempGame = new Chess(gameObj.fen());
            tempGame.undo();

            const isWhiteTurn = tempGame.turn() === 'w';

            // 3. FAST evaluation: Only use static eval (no minimax) for speed
            const moves = tempGame.moves();
            const evaluatedCandidates: { san: string; score: number }[] = [];

            for (const m of moves) {
                tempGame.move(m);
                const score = evaluateBoard(tempGame); // Static eval only - much faster
                tempGame.undo();
                evaluatedCandidates.push({ san: m, score });
            }

            // Sort candidates to find best and rank
            if (isWhiteTurn) {
                evaluatedCandidates.sort((a, b) => b.score - a.score);
            } else {
                evaluatedCandidates.sort((a, b) => a.score - b.score);
            }

            const bestMoveObj = evaluatedCandidates[0];
            const bestScore = bestMoveObj ? bestMoveObj.score : 0;
            const bestMoveSan = bestMoveObj ? bestMoveObj.san : "";

            // Find rank of played move
            const playedMoveIndex = evaluatedCandidates.findIndex(c => c.san === moveSan);
            const playedMoveScore = playedMoveIndex !== -1 ? evaluatedCandidates[playedMoveIndex].score : 0;
            const playedMoveRank = playedMoveIndex !== -1 ? playedMoveIndex + 1 : moves.length;

            // 4. Use Move Review Module
            const review = classifyMove({
                evalBefore: bestScore,
                evalAfter: playedMoveScore,
                fenBefore: tempGame.fen(),
                fenAfter: gameObj.fen(),
                moveSan: moveSan,
                bestMoveSan: bestMoveSan,
                turn: tempGame.turn(),
                rank: playedMoveRank
            });

            resolve({
                analysis: review.explanation,
                classification: review.classification,
                evalScore: playedMoveScore
            });

        }, 0); // Reduced timeout from 10ms to 0
    });
};

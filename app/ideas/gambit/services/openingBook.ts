/**
 * Opening Book
 *
 * Pre-computed opening moves from master games for instant responses.
 * Keys are simplified FEN positions (board + side to move + castling).
 * Values are arrays of good moves with weights for variety.
 *
 * Positions are stored without the halfmove clock and fullmove number
 * to allow matching regardless of move count.
 */

interface BookEntry {
  moves: string[];  // Array of good moves (SAN notation)
  weights?: number[]; // Optional weights for weighted random selection
}

// Simplify FEN to just board, turn, and castling (for consistent lookups)
export const simplifyFen = (fen: string): string => {
  const parts = fen.split(' ');
  // board + turn + castling (ignore en passant, halfmove, fullmove for book lookups)
  return `${parts[0]} ${parts[1]} ${parts[2]}`;
};

// Opening book - common responses to opening positions
// Each position maps to an array of good moves
const OPENING_BOOK: Record<string, BookEntry> = {
  // Starting position - White's first move
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq": {
    moves: ["e4", "d4", "Nf3", "c4"],
    weights: [40, 35, 15, 10]
  },

  // === After 1. e4 ===
  "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq": {
    moves: ["e5", "c5", "e6", "c6", "d5", "Nf6"],
    weights: [25, 25, 15, 15, 10, 10]
  },

  // === After 1. d4 ===
  "rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq": {
    moves: ["d5", "Nf6", "e6", "f5"],
    weights: [35, 35, 20, 10]
  },

  // === After 1. e4 e5 ===
  "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq": {
    moves: ["Nf3", "Nc3", "Bc4", "f4"],
    weights: [50, 20, 20, 10]
  },

  // === After 1. e4 c5 (Sicilian) ===
  "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq": {
    moves: ["Nf3", "Nc3", "c3", "d4"],
    weights: [50, 25, 15, 10]
  },

  // === After 1. e4 e6 (French) ===
  "rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq": {
    moves: ["d4", "d3", "Nf3"],
    weights: [60, 25, 15]
  },

  // === After 1. e4 c6 (Caro-Kann) ===
  "rnbqkbnr/pp1ppppp/2p5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq": {
    moves: ["d4", "Nc3", "Nf3", "c4"],
    weights: [50, 25, 15, 10]
  },

  // === After 1. e4 d5 (Scandinavian) ===
  "rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq": {
    moves: ["exd5", "Nc3", "e5"],
    weights: [70, 20, 10]
  },

  // === After 1. d4 d5 ===
  "rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq": {
    moves: ["c4", "Nf3", "Bf4", "e3"],
    weights: [50, 25, 15, 10]
  },

  // === After 1. d4 Nf6 ===
  "rnbqkb1r/pppppppp/5n2/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq": {
    moves: ["c4", "Nf3", "Bf4", "Bg5"],
    weights: [50, 30, 10, 10]
  },

  // === Italian Game: 1. e4 e5 2. Nf3 Nc6 ===
  "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq": {
    moves: ["Bc4", "Bb5", "Nc3", "d4"],
    weights: [40, 35, 15, 10]
  },

  // === After 1. e4 e5 2. Nf3 Nc6 3. Bc4 (Italian) ===
  "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq": {
    moves: ["Bc5", "Nf6", "Be7"],
    weights: [50, 35, 15]
  },

  // === After 1. e4 e5 2. Nf3 Nc6 3. Bb5 (Ruy Lopez) ===
  "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq": {
    moves: ["a6", "Nf6", "f5"],
    weights: [60, 30, 10]
  },

  // === Sicilian Dragon: 1. e4 c5 2. Nf3 d6 ===
  "rnbqkbnr/pp2pppp/3p4/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq": {
    moves: ["d4", "Bb5+", "c3", "Nc3"],
    weights: [50, 20, 15, 15]
  },

  // === Sicilian Najdorf: 1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 ===
  "rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq": {
    moves: ["Be3", "Bg5", "Be2", "f3"],
    weights: [30, 30, 25, 15]
  },

  // === Queen's Gambit: 1. d4 d5 2. c4 ===
  "rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq": {
    moves: ["e6", "c6", "dxc4", "Nf6"],
    weights: [35, 30, 20, 15]
  },

  // === Queen's Gambit Declined: 1. d4 d5 2. c4 e6 ===
  "rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq": {
    moves: ["Nc3", "Nf3", "cxd5"],
    weights: [50, 35, 15]
  },

  // === Slav Defense: 1. d4 d5 2. c4 c6 ===
  "rnbqkbnr/pp2pppp/2p5/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq": {
    moves: ["Nf3", "Nc3", "e3", "cxd5"],
    weights: [40, 30, 20, 10]
  },

  // === King's Indian: 1. d4 Nf6 2. c4 g6 ===
  "rnbqkb1r/pppppp1p/5np1/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq": {
    moves: ["Nc3", "Nf3", "g3"],
    weights: [50, 30, 20]
  },

  // === Nimzo-Indian: 1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 ===
  "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PP2PPPP/R1BQKBNR w KQkq": {
    moves: ["e3", "Qc2", "Nf3", "Bg5"],
    weights: [35, 30, 20, 15]
  },

  // === London System: 1. d4 d5 2. Nf3 ===
  "rnbqkbnr/ppp1pppp/8/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R b KQkq": {
    moves: ["Nf6", "e6", "c6", "Bf5"],
    weights: [35, 25, 25, 15]
  },

  // === English Opening: 1. c4 ===
  "rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq": {
    moves: ["e5", "Nf6", "e6", "c5", "c6"],
    weights: [25, 25, 20, 20, 10]
  },

  // === Reti Opening: 1. Nf3 ===
  "rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq": {
    moves: ["d5", "Nf6", "c5", "g6"],
    weights: [35, 30, 20, 15]
  },

  // === Italian Game mainline: 1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 ===
  "r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq": {
    moves: ["c3", "d3", "O-O", "b4"],
    weights: [40, 30, 20, 10]
  },

  // === Giuoco Piano: 1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 ===
  "r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R b KQkq": {
    moves: ["Nf6", "d6", "Qe7"],
    weights: [50, 35, 15]
  },

  // === Ruy Lopez Morphy Defense: 1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 ===
  "r1bqkbnr/1ppp1ppp/p1n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq": {
    moves: ["Ba4", "Bxc6"],
    weights: [70, 30]
  },

  // === Ruy Lopez Closed: 1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 ===
  "r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R w KQkq": {
    moves: ["O-O", "d3", "Nc3"],
    weights: [60, 25, 15]
  },

  // === Scotch Game: 1. e4 e5 2. Nf3 Nc6 3. d4 ===
  "r1bqkbnr/pppp1ppp/2n5/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq": {
    moves: ["exd4", "Nf6"],
    weights: [80, 20]
  },

  // === Two Knights Defense: 1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 ===
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq": {
    moves: ["Ng5", "d3", "Nc3", "d4"],
    weights: [40, 25, 20, 15]
  },

  // === Four Knights Game: 1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 ===
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq": {
    moves: ["Bb5", "Bc4", "d4"],
    weights: [50, 30, 20]
  },

  // === King's Gambit: 1. e4 e5 2. f4 ===
  "rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq": {
    moves: ["exf4", "Bc5", "d5"],
    weights: [50, 30, 20]
  },

  // === Vienna Game: 1. e4 e5 2. Nc3 ===
  "rnbqkbnr/pppp1ppp/8/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR b KQkq": {
    moves: ["Nf6", "Nc6", "Bc5"],
    weights: [45, 35, 20]
  },

  // === Philidor Defense: 1. e4 e5 2. Nf3 d6 ===
  "rnbqkbnr/ppp2ppp/3p4/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq": {
    moves: ["d4", "Bc4", "Nc3"],
    weights: [50, 30, 20]
  },

  // === Petroff Defense: 1. e4 e5 2. Nf3 Nf6 ===
  "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq": {
    moves: ["Nxe5", "Nc3", "d4"],
    weights: [50, 30, 20]
  },

  // === Alekhine's Defense: 1. e4 Nf6 ===
  "rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq": {
    moves: ["e5", "Nc3", "d3"],
    weights: [60, 25, 15]
  },

  // === Pirc Defense: 1. e4 d6 ===
  "rnbqkbnr/ppp1pppp/3p4/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq": {
    moves: ["d4", "Nc3", "Nf3"],
    weights: [50, 30, 20]
  },

  // === Modern Defense: 1. e4 g6 ===
  "rnbqkbnr/pppppp1p/6p1/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq": {
    moves: ["d4", "Nc3", "Nf3"],
    weights: [50, 30, 20]
  },

  // === Grünfeld Defense: 1. d4 Nf6 2. c4 g6 3. Nc3 d5 ===
  "rnbqkb1r/ppp1pp1p/5np1/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq": {
    moves: ["cxd5", "Nf3", "Bf4"],
    weights: [50, 30, 20]
  },

  // === Catalan Opening: 1. d4 Nf6 2. c4 e6 3. g3 ===
  "rnbqkb1r/pppp1ppp/4pn2/8/2PP4/6P1/PP2PP1P/RNBQKBNR b KQkq": {
    moves: ["d5", "Bb4+", "c5"],
    weights: [50, 30, 20]
  },

  // === Dutch Defense: 1. d4 f5 ===
  "rnbqkbnr/ppppp1pp/8/5p2/3P4/8/PPP1PPPP/RNBQKBNR w KQkq": {
    moves: ["c4", "g3", "Nf3", "Bg5"],
    weights: [35, 30, 25, 10]
  },

  // === Benoni Defense: 1. d4 Nf6 2. c4 c5 ===
  "rnbqkb1r/pp1ppppp/5n2/2p5/2PP4/8/PP2PPPP/RNBQKBNR w KQkq": {
    moves: ["d5", "Nf3", "e3"],
    weights: [50, 35, 15]
  }
};

/**
 * Get a book move for the current position
 * @param fen Full FEN string of the position
 * @returns A book move in SAN notation, or null if not in book
 */
export const getBookMove = (fen: string): string | null => {
  const simplifiedFen = simplifyFen(fen);
  const entry = OPENING_BOOK[simplifiedFen];

  if (!entry || entry.moves.length === 0) {
    return null;
  }

  // If weights are provided, use weighted random selection
  if (entry.weights && entry.weights.length === entry.moves.length) {
    const totalWeight = entry.weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < entry.moves.length; i++) {
      random -= entry.weights[i];
      if (random <= 0) {
        return entry.moves[i];
      }
    }
  }

  // Fallback to uniform random selection
  return entry.moves[Math.floor(Math.random() * entry.moves.length)];
};

/**
 * Check if position is in the opening book
 */
export const isInBook = (fen: string): boolean => {
  const simplifiedFen = simplifyFen(fen);
  return simplifiedFen in OPENING_BOOK;
};

/**
 * Get all book moves for a position (for debugging/display)
 */
export const getAllBookMoves = (fen: string): string[] => {
  const simplifiedFen = simplifyFen(fen);
  const entry = OPENING_BOOK[simplifiedFen];
  return entry ? entry.moves : [];
};

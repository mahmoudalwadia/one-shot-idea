/**
 * Move Review & Classification System
 *
 * Analyzes player moves using Expected Points (EP) model like chess.com/lichess.
 *
 * === EXPECTED POINTS MODEL ===
 * Converts centipawn evaluation to winning probability using sigmoid function:
 *   EP = 1 / (1 + e^(-k * eval))
 * where k=0.0035 controls sensitivity. Results:
 *   - eval = 0 (equal) → EP = 0.50 (50% win chance)
 *   - eval = +200 (2 pawns up) → EP ≈ 0.67 (67% win chance)
 *   - eval = +500 (rook up) → EP ≈ 0.85 (85% win chance)
 *   - eval = +1000 (queen up) → EP ≈ 0.97 (97% win chance)
 *
 * === EP LOSS CALCULATION ===
 * EP_loss = EP_before - EP_after (from player's perspective)
 * Example: Position was +200cp (67% win), after move it's +50cp (54% win)
 *   → EP_loss = 0.67 - 0.54 = 0.13 → Inaccuracy
 *
 * === CLASSIFICATION THRESHOLDS ===
 * Based on EP loss (how much winning chance was lost):
 *   Best:       ≤0.005 (essentially perfect)
 *   Excellent:  ≤0.03  (very good)
 *   Good:       ≤0.09  (acceptable)
 *   Inaccuracy: ≤0.18  (small mistake, ~5-15% win chance lost)
 *   Mistake:    ≤0.35  (significant error, ~15-35% lost)
 *   Blunder:    >0.35  (major error, >35% win chance thrown away)
 *
 * === SPECIAL LABELS ===
 * Brilliant (!!)
 *   - Must be at least Excellent (EP_loss ≤ 0.05)
 *   - Position wasn't already totally winning (EP < 0.9)
 *   - Involves material sacrifice (piece given up)
 *   Example: Queen sacrifice leading to forced mate
 *
 * Great (!)
 *   - Must be essentially Best (EP_loss ≤ 0.01)
 *   - "Only move" situation: next best option is much worse (0.15+ EP worse)
 *   - Position is critical (swing of 0.2+ EP if wrong move played)
 *   Example: Finding the only defense in a lost-looking position
 *
 * Miss (?)
 *   - Position was winning (EP ≥ 0.8)
 *   - Move throws away significant advantage (blunders)
 *   Example: Missing a mate-in-3
 *
 * === ACCURACY FORMULA ===
 * accuracy = max(0, 100 - (EP_loss / 0.5) * 100)
 * Capped so max loss of 0.5 EP = 0% accuracy
 */

import { MoveClassification } from '../types';

// --- Configuration ---
const CONFIG = {
    // Expected Points Model
    kBase: 0.0035,        // Sensitivity to centipawn diff
    mateScore: 20000,     // Threshold where we consider it a forced mate sequence

    // Classification Thresholds (Expected Points Loss)
    thresholds: {
        best: 0.005,
        excellent: 0.03,
        good: 0.09,
        inaccuracy: 0.18,
        mistake: 0.35
        // > 0.35 is Blunder
    },

    // Special Label Heuristics
    brilliant: {
        epLossCap: 0.05,        // Must be at least excellent
        winningCeiling: 0.9,    // Can't be brilliant if already totally winning
        materialSacrifice: true // Requires material drop
    },
    great: {
        epLossCap: 0.01,        // Must be essentially best
        turningPoint: 0.2,      // Significant EP shift (swing) if this move wasn't found
        onlyMoveFloor: 0.6,     // If it maintains a win/draw
        onlyMoveDelta: 0.15     // And next best is much worse
    },
    miss: {
        minWinEp: 0.8,          // Position must be winning to be a "Miss"
        blunderThreshold: 0.2   // Must drop significant EP
    },

    // Accuracy Calculation
    accuracy: {
        lossCap: 0.5            // Max loss considered for 0% accuracy on a move
    }
};

interface MoveReviewInput {
    evalBefore: number;   // Evaluation of best move in position before (Absolute cp)
    evalAfter: number;    // Evaluation of played move (Absolute cp)
    fenBefore: string;
    fenAfter: string;
    moveSan: string;
    bestMoveSan: string;
    turn: 'w' | 'b';      // Turn of the player making the move
    rank?: number;        // Rank of the move (1 = best)
    rating?: number;
}

interface MoveReviewOutput {
    classification: MoveClassification;
    accuracy: number;     // 0-100
    epLoss: number;
    explanation: string;
}

// --- Helpers ---

// Logistic Function for Expected Points
const evalToExpectedPoints = (evalCp: number, mateDetected: boolean): number => {
    // Handle Mates
    if (mateDetected) {
        // If eval is positive (Mate for White), EP is 1. If negative, EP is 0.
        // We assume high magnitude eval is passed if mate.
        if (evalCp > 0) return 1.0;
        return 0.0;
    }

    // Standard sigmoid
    // k scales with rating slightly? For now fixed for simplicity/consistency.
    const k = CONFIG.kBase;
    return 1 / (1 + Math.exp(-k * evalCp));
};

const getMaterialValue = (fen: string, color: 'w' | 'b'): number => {
    const pieceValues: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
    const boardStr = fen.split(' ')[0];
    let material = 0;

    for (const char of boardStr) {
        const piece = char.toLowerCase();
        if (pieceValues[piece]) {
            const isWhite = char === char.toUpperCase();
            if ((color === 'w' && isWhite) || (color === 'b' && !isWhite)) {
                material += pieceValues[piece];
            }
        }
    }
    return material;
};

// --- Main Classification Logic ---

export const classifyMove = (input: MoveReviewInput): MoveReviewOutput => {
    const { evalBefore, evalAfter, turn, fenBefore, fenAfter, bestMoveSan, moveSan, rank } = input;

    // 1. Determine Mover's perspective values
    const isWhite = turn === 'w';
    const perspectiveMultiplier = isWhite ? 1 : -1;

    // Is it a mate score?
    const isMateBefore = Math.abs(evalBefore) > CONFIG.mateScore / 2;
    const isMateAfter = Math.abs(evalAfter) > CONFIG.mateScore / 2;

    // Calculate Expected Points (EP)
    // IMPORTANT: EP is calculated from Mover's perspective.
    const cpBefore = evalBefore * perspectiveMultiplier;
    const cpAfter = evalAfter * perspectiveMultiplier;

    const epBefore = evalToExpectedPoints(cpBefore, isMateBefore);
    const epAfter = evalToExpectedPoints(cpAfter, isMateAfter);

    // 2. Compute Loss
    const epLoss = Math.max(0, epBefore - epAfter);

    // 3. Base Classification
    let classification: MoveClassification = 'Unclassified';

    // Use rank as a strong hint if available
    // If Rank 1, it's effectively Best unless loss is high (which implies engine noise or fail low)

    if (epLoss <= CONFIG.thresholds.best) classification = 'Best';
    else if (epLoss <= CONFIG.thresholds.excellent) classification = 'Excellent';
    else if (epLoss <= CONFIG.thresholds.good) classification = 'Good';
    else if (epLoss <= CONFIG.thresholds.inaccuracy) classification = 'Inaccuracy';
    else if (epLoss <= CONFIG.thresholds.mistake) classification = 'Mistake';
    else classification = 'Blunder';

    // Override: If Rank is 1 (Best found by engine) force Best, unless loss is weirdly high
    if (rank === 1 && epLoss < 0.1) {
        classification = 'Best';
    }

    // 4. Special Labels (Overrides)

    // MISS: Blunder that missed a win
    if (classification === 'Blunder' || classification === 'Mistake') {
        // If we were winning (EP > 0.8) and now we are not (EP dropped significantly)
        if (epBefore > CONFIG.miss.minWinEp && epLoss > CONFIG.miss.blunderThreshold) {
            classification = 'Miss';
        }
    }

    // BRILLIANT: Sacrifice that maintains or improves position
    // Criteria: Material was sacrificed AND position stayed good or improved
    if (epLoss <= CONFIG.brilliant.epLossCap && epBefore < CONFIG.brilliant.winningCeiling) {
        const materialBefore = getMaterialValue(fenBefore, turn);
        const materialAfter = getMaterialValue(fenAfter, turn);
        const materialLost = materialBefore - materialAfter;

        // Check for sacrifice: lost at least a pawn worth of material
        // AND position evaluation stayed good (cpAfter >= cpBefore - 50 or improved)
        if (materialLost >= 1) {
            // Sacrifice detected - did we maintain or improve the position?
            const evalMaintained = cpAfter >= cpBefore - 50; // Within ~0.5 pawns
            const evalImproved = cpAfter > cpBefore;

            // Brilliant if we sacrificed AND (maintained or improved) AND not already totally winning
            if ((evalMaintained || evalImproved) && cpBefore < 500) {
                classification = 'Brilliant';
            }
        }
    }

    // GREAT: Best move that saved a difficult position or is clearly the only good move
    // Criteria: Must be Best/Excellent AND either:
    // 1. Turned a losing/equal position into a winning one
    // 2. Maintained a draw when all other moves lose
    // 3. Rank 1 in a position where it significantly outperforms alternatives
    if ((classification === 'Best' || classification === 'Excellent') && rank === 1) {
        // Turned the tables: Was bad/equal, now clearly better
        const wasLosing = cpBefore < -100;
        const wasEqual = cpBefore >= -100 && cpBefore <= 100;
        const nowWinning = cpAfter > 150;
        const nowMuchBetter = cpAfter > cpBefore + 150;

        // Found the saving move in a difficult position
        if ((wasLosing || wasEqual) && (nowWinning || nowMuchBetter)) {
            classification = 'Great';
        }

        // Critical defensive move: maintained evaluation in what looks like a tough spot
        // (position was close to losing threshold but stayed stable)
        if (cpBefore < 0 && cpBefore > -300 && cpAfter >= cpBefore - 20) {
            // Holding the position under pressure with the only good move
            if (epAfter > 0.35 && epBefore < 0.45) {
                classification = 'Great';
            }
        }
    }

    // 5. Calculate Accuracy (0-100) for this move
    const accuracy = Math.max(0, 100 * (1 - (epLoss / CONFIG.accuracy.lossCap)));

    // 6. Explanation Generation
    let explanation = "";

    // Rank Info
    if (rank) {
        explanation += rank === 1 ? `Rank 1 (Best). ` : `Rank ${rank}. `;
    }

    if (classification === 'Brilliant') explanation += "Brilliant sacrifice!";
    else if (classification === 'Great') explanation += "Great find!";
    else if (classification === 'Best') explanation += "Optimal.";
    else if (classification === 'Excellent') explanation += "Strong move.";
    else if (classification === 'Good') explanation += "Decent.";
    else if (classification === 'Inaccuracy') explanation += "Inaccurate.";
    else if (classification === 'Mistake') explanation += "Mistake.";
    else if (classification === 'Blunder') explanation += "Blunder.";
    else if (classification === 'Miss') explanation += "Missed win.";

    // Add stats
    const evalDisplay = (Math.abs(evalAfter) > 10000)
        ? (evalAfter > 0 ? "+M" : "-M")
        : (evalAfter / 100).toFixed(2);

    explanation += ` [Eval: ${evalDisplay}] [Acc: ${accuracy.toFixed(0)}]`;

    if (bestMoveSan && moveSan !== bestMoveSan) {
        explanation += ` Best: ${bestMoveSan}`;
    }

    return {
        classification,
        accuracy,
        epLoss,
        explanation
    };
};

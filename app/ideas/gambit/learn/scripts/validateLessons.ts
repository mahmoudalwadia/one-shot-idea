/**
 * Comprehensive Chess Lesson Validation Script
 *
 * Validates all chess lesson data for:
 * 1. Valid FEN positions (can be loaded by chess.js)
 * 2. Legal correctMoves (each move is actually legal from the position)
 * 3. Goal achievement (checkmate puzzles actually deliver checkmate)
 * 4. Missing alternative solutions (all valid checkmates included)
 * 5. Hint text verification (escape claims, stalemate/checkmate claims)
 * 6. Piece location verification in text
 * 7. Success message verification
 *
 * Run with: npx tsx app/ideas/gambit/learn/scripts/validateLessons.ts
 */

import { Chess, Square, Color, PieceSymbol } from 'chess.js';
import { Course, LessonStep } from '../data/types';

// Import all courses
import { fundamentalsCourse } from '../data/fundamentals';
import { tacticsCourse } from '../data/tactics';
import { endgamesCourse } from '../data/endgames';
import { openingsCourse } from '../data/openings';
import { midgameCourse } from '../data/midgame';
import { strategyCourse } from '../data/strategy';
import { positionalCourse } from '../data/positional';

// =============================================================================
// Types
// =============================================================================

type ErrorType =
  | 'invalid_fen'
  | 'illegal_move'
  | 'move_parse_error'
  | 'goal_not_achieved'
  | 'missing_alternative'
  | 'wrong_hint_escape'
  | 'wrong_hint_state'
  | 'wrong_piece_location'
  | 'wrong_success_message';

type Severity = 'error' | 'warning';

interface ValidationIssue {
  courseId: string;
  courseTitle: string;
  lessonId: string;
  lessonTitle: string;
  stepId: string;
  stepIndex: number;
  stepType: string;
  errorType: ErrorType;
  severity: Severity;
  fen: string;
  move?: string;
  message: string;
  details?: string;
  legalMoves?: string[];
}

interface ValidationSummary {
  totalCourses: number;
  totalLessons: number;
  totalSteps: number;
  totalInteractiveSteps: number;
  totalFens: number;
  totalMoves: number;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
}

// =============================================================================
// Utility Functions
// =============================================================================

// Normalize move notation for comparison (strip check/checkmate symbols)
function normalizeMove(move: string): string {
  return move.replace(/[+#]$/, '');
}

// Check if a square is attacked by any piece of the given color
function isSquareAttacked(game: Chess, square: string, byColor: Color): boolean {
  return game.isAttacked(square as Square, byColor);
}

// Get the opposite color
function oppositeColor(color: Color): Color {
  return color === 'w' ? 'b' : 'w';
}

// Find all moves that result in checkmate
function findAllCheckmates(fen: string): string[] {
  const game = new Chess(fen);
  const checkmates: string[] = [];

  for (const move of game.moves()) {
    const test = new Chess(fen);
    test.move(move);
    if (test.isCheckmate()) {
      checkmates.push(move);
    }
  }

  return checkmates;
}

// Find all moves that result in stalemate
function findAllStalemates(fen: string): string[] {
  const game = new Chess(fen);
  const stalemates: string[] = [];

  for (const move of game.moves()) {
    const test = new Chess(fen);
    test.move(move);
    if (test.isStalemate()) {
      stalemates.push(move);
    }
  }

  return stalemates;
}

// Parse FEN to get piece at square
function getPieceAtSquare(
  fen: string,
  square: string
): { type: PieceSymbol; color: Color } | null {
  const game = new Chess(fen);
  const piece = game.get(square as Square);
  return piece ?? null;
}

// Map piece names to chess.js piece symbols
const pieceNameToSymbol: Record<string, PieceSymbol> = {
  king: 'k',
  queen: 'q',
  rook: 'r',
  bishop: 'b',
  knight: 'n',
  pawn: 'p',
};

// Map piece symbols to names
const pieceSymbolToName: Record<PieceSymbol, string> = {
  k: 'King',
  q: 'Queen',
  r: 'Rook',
  b: 'Bishop',
  n: 'Knight',
  p: 'Pawn',
};

// =============================================================================
// Phase 1: Goal Achievement Validation
// =============================================================================

function detectGoal(
  step: LessonStep
): 'checkmate' | 'stalemate' | 'check' | 'capture' | 'defense' | 'sequence' | null {
  const text =
    `${step.title || ''} ${step.explanation || ''} ${step.successMessage || ''}`.toLowerCase();

  // Check for defensive goals FIRST - these take priority
  // Phrases like "defend against checkmate", "prevent mate", "save from checkmate"
  if (
    /defend\s+(?:against\s+)?(?:the\s+)?(?:check)?mate/i.test(text) ||
    /prevent\s+(?:the\s+)?(?:check)?mate/i.test(text) ||
    /save\s+(?:from|yourself\s+from)\s+(?:check)?mate/i.test(text) ||
    /stop\s+(?:the\s+)?(?:check)?mate/i.test(text) ||
    /threat(?:en)?(?:s|ing)?\s+(?:qxf7)?#?\s*(?:check)?mate/i.test(text) ||
    /back\s+rank\s+mate.*\s+threat/i.test(text) ||
    text.includes('find a defense') ||
    text.includes('find the defense') ||
    text.includes('spot the threat') ||
    text.includes('defend against')
  ) {
    return 'defense';
  }

  // Check for multi-move sequences that LEAD TO checkmate (not immediate)
  // Patterns like "after Rxe8, Rxe8# is checkmate" or "leads to checkmate"
  // These should not be validated as immediate checkmate goals
  if (
    /after\s+[a-z]+x?[a-h]?[1-8]?,?\s+[a-z]+.*(?:is\s+)?(?:check)?mate/i.test(text) ||
    /leads?\s+to\s+(?:forced\s+)?(?:check)?mate/i.test(text) ||
    /forces?\s+(?:a\s+)?(?:check)?mate\s+(?:in\s+)?\d+/i.test(text) ||
    /brings?\s+(?:the\s+)?king\s+closer/i.test(text) ||
    /approaching.*(?:check)?mate/i.test(text) ||
    /keep\s+bringing.*(?:check)?mate/i.test(text) ||
    /set(?:s|ting)?\s+up\s+(?:a\s+)?(?:check)?mate/i.test(text) ||
    /x-?ray/i.test(text) ||  // X-ray attacks are typically multi-move
    /deflect/i.test(text) || // Deflection tactics are typically multi-move
    /decoy/i.test(text)      // Decoy tactics are typically multi-move
  ) {
    return 'sequence';
  }

  // Check for checkmate goal - must be about DELIVERING checkmate, not defending
  // Use explicit patterns that indicate the player should deliver IMMEDIATE mate
  if (
    /find\s+(?:the\s+)?(?:check)?mate/i.test(text) ||
    /deliver\s+(?:the\s+)?(?:check)?mate/i.test(text) ||
    /mate\s+in\s+1\b/i.test(text) || // Only mate in 1 is immediate
    /it['']?s\s+(?:check)?mate/i.test(text) ||
    /(?:this\s+is\s+)?checkmate!/i.test(text)
  ) {
    return 'checkmate';
  }

  // Check for stalemate goal
  if (
    /find\s+(?:the\s+)?stalemate/i.test(text) ||
    /force\s+(?:a\s+)?(?:the\s+)?stalemate/i.test(text) ||
    /stalemate\s+(?:the\s+)?(?:king|opponent)/i.test(text) ||
    text.includes('force a draw')
  ) {
    return 'stalemate';
  }

  return null;
}

function validateGoalAchievement(
  step: LessonStep,
  context: {
    courseId: string;
    courseTitle: string;
    lessonId: string;
    lessonTitle: string;
    stepIndex: number;
  }
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const goal = detectGoal(step);

  // Skip validation for defense/sequence goals or if no goal/moves
  if (!goal || goal === 'defense' || goal === 'sequence' || !step.correctMoves || step.correctMoves.length === 0) {
    return issues;
  }

  for (const correctMove of step.correctMoves) {
    // Skip UCI notation
    if (/^[a-h][1-8][a-h][1-8]$/.test(correctMove)) {
      continue;
    }

    try {
      const game = new Chess(step.fen);
      const normalizedMove = normalizeMove(correctMove);
      game.move(normalizedMove);

      if (goal === 'checkmate' && !game.isCheckmate()) {
        issues.push({
          courseId: context.courseId,
          courseTitle: context.courseTitle,
          lessonId: context.lessonId,
          lessonTitle: context.lessonTitle,
          stepId: step.id,
          stepIndex: context.stepIndex,
          stepType: step.type,
          errorType: 'goal_not_achieved',
          severity: 'error',
          fen: step.fen,
          move: correctMove,
          message: `Move "${correctMove}" doesn't deliver checkmate`,
          details: `Position after move: ${game.isCheck() ? 'check' : 'no check'}, ${game.isStalemate() ? 'stalemate' : 'game continues'}`,
        });
      }

      if (goal === 'stalemate' && !game.isStalemate()) {
        issues.push({
          courseId: context.courseId,
          courseTitle: context.courseTitle,
          lessonId: context.lessonId,
          lessonTitle: context.lessonTitle,
          stepId: step.id,
          stepIndex: context.stepIndex,
          stepType: step.type,
          errorType: 'goal_not_achieved',
          severity: 'error',
          fen: step.fen,
          move: correctMove,
          message: `Move "${correctMove}" doesn't deliver stalemate`,
          details: `Position after move: ${game.isCheckmate() ? 'checkmate' : game.isCheck() ? 'check' : 'game continues'}`,
        });
      }
    } catch {
      // Move validation errors are handled elsewhere
    }
  }

  return issues;
}

// =============================================================================
// Phase 2: Missing Alternative Solutions
// =============================================================================

function validateMissingAlternatives(
  step: LessonStep,
  context: {
    courseId: string;
    courseTitle: string;
    lessonId: string;
    lessonTitle: string;
    stepIndex: number;
  }
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const goal = detectGoal(step);

  // Skip validation for defense/sequence goals or if no goal/moves
  if (!goal || goal === 'defense' || goal === 'sequence' || !step.correctMoves) {
    return issues;
  }

  // Normalize the correct moves for comparison
  const normalizedCorrectMoves = step.correctMoves.map((m) => normalizeMove(m));

  if (goal === 'checkmate') {
    const allCheckmates = findAllCheckmates(step.fen);
    const missingCheckmates = allCheckmates.filter(
      (mate) => !normalizedCorrectMoves.includes(normalizeMove(mate))
    );

    if (missingCheckmates.length > 0) {
      issues.push({
        courseId: context.courseId,
        courseTitle: context.courseTitle,
        lessonId: context.lessonId,
        lessonTitle: context.lessonTitle,
        stepId: step.id,
        stepIndex: context.stepIndex,
        stepType: step.type,
        errorType: 'missing_alternative',
        severity: 'warning',
        fen: step.fen,
        message: `Missing checkmate alternative(s): ${missingCheckmates.join(', ')}`,
        details: `Correct moves listed: ${step.correctMoves.join(', ')}. All checkmates: ${allCheckmates.join(', ')}`,
      });
    }
  }

  if (goal === 'stalemate') {
    const allStalemates = findAllStalemates(step.fen);
    const missingStalemates = allStalemates.filter(
      (stale) => !normalizedCorrectMoves.includes(normalizeMove(stale))
    );

    if (missingStalemates.length > 0) {
      issues.push({
        courseId: context.courseId,
        courseTitle: context.courseTitle,
        lessonId: context.lessonId,
        lessonTitle: context.lessonTitle,
        stepId: step.id,
        stepIndex: context.stepIndex,
        stepType: step.type,
        errorType: 'missing_alternative',
        severity: 'warning',
        fen: step.fen,
        message: `Missing stalemate alternative(s): ${missingStalemates.join(', ')}`,
        details: `Correct moves listed: ${step.correctMoves.join(', ')}`,
      });
    }
  }

  return issues;
}

// =============================================================================
// Phase 3: Hint Text Verification
// =============================================================================

function validateHintClaims(
  step: LessonStep,
  context: {
    courseId: string;
    courseTitle: string;
    lessonId: string;
    lessonTitle: string;
    stepIndex: number;
  }
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!step.wrongMoveHints) {
    return issues;
  }

  for (const [move, hint] of Object.entries(step.wrongMoveHints)) {
    try {
      const game = new Chess(step.fen);
      const normalizedMove = normalizeMove(move);
      game.move(normalizedMove);

      const opponentColor = game.turn(); // After the move, it's opponent's turn
      const playerColor = oppositeColor(opponentColor);

      // Check for "escape to [square]" claims
      const escapePattern = /(?:can\s+)?escapes?\s+to\s+([a-h][1-8])/gi;
      let escapeMatch;
      while ((escapeMatch = escapePattern.exec(hint)) !== null) {
        const escapeSquare = escapeMatch[1].toLowerCase();

        // Check if the escape square is attacked by the player
        if (isSquareAttacked(game, escapeSquare, playerColor)) {
          issues.push({
            courseId: context.courseId,
            courseTitle: context.courseTitle,
            lessonId: context.lessonId,
            lessonTitle: context.lessonTitle,
            stepId: step.id,
            stepIndex: context.stepIndex,
            stepType: step.type,
            errorType: 'wrong_hint_escape',
            severity: 'error',
            fen: step.fen,
            move: move,
            message: `Hint claims King can escape to ${escapeSquare}, but ${escapeSquare} is attacked`,
            details: `Hint: "${hint}"`,
          });
        }
      }

      // Check for "stalemate" claims
      if (/\bstalemate\b/i.test(hint) && !game.isStalemate()) {
        issues.push({
          courseId: context.courseId,
          courseTitle: context.courseTitle,
          lessonId: context.lessonId,
          lessonTitle: context.lessonTitle,
          stepId: step.id,
          stepIndex: context.stepIndex,
          stepType: step.type,
          errorType: 'wrong_hint_state',
          severity: 'error',
          fen: step.fen,
          move: move,
          message: `Hint claims stalemate but position isn't stalemate`,
          details: `Hint: "${hint}". Actual: ${game.isCheckmate() ? 'checkmate' : game.isCheck() ? 'check' : 'game continues'}`,
        });
      }

      // Check for "checkmate" claims (but not "not checkmate" or "isn't checkmate")
      if (/\bcheckmate\b/i.test(hint) && !/\b(not|isn'?t|no)\s+checkmate\b/i.test(hint)) {
        // Check if the hint mentions a DIFFERENT move that's checkmate (e.g., "Qxf7# is checkmate")
        // Pattern: [Move notation] is checkmate
        const altMovePattern = /([KQRBN]?[a-h]?x?[a-h][1-8](?:=[QRBN])?[+#]?)\s+is\s+(?:a\s+)?checkmate/i;
        const altMoveMatch = hint.match(altMovePattern);

        if (altMoveMatch) {
          // The hint says "X is checkmate" where X is a specific move
          // This could mean:
          // 1. X is checkmate from the original position (same side to move)
          // 2. X is checkmate as a RESPONSE after the hinted move (opponent's turn)
          const altMove = altMoveMatch[1];
          const normalizedAltMove = normalizeMove(altMove);

          // Only validate if the alternative move is different from the hinted move
          if (normalizedAltMove.toLowerCase() !== normalizedMove.toLowerCase()) {
            let isValidCheckmate = false;

            // Try 1: Check if the move is checkmate from the original position
            try {
              const originalGame = new Chess(step.fen);
              originalGame.move(normalizedAltMove);
              if (originalGame.isCheckmate()) {
                isValidCheckmate = true;
              }
            } catch {
              // Move not legal from original position - try after hinted move
            }

            // Try 2: Check if the move is checkmate AFTER the hinted move (as a response)
            // This handles hints like "Nxe4 wins a pawn, but Qxf7# is checkmate"
            // where Qxf7# is the opponent's response after Nxe4
            if (!isValidCheckmate) {
              try {
                const afterHintGame = new Chess(step.fen);
                afterHintGame.move(normalizedMove); // Play the hinted move
                afterHintGame.move(normalizedAltMove); // Then play the alternative
                if (afterHintGame.isCheckmate()) {
                  isValidCheckmate = true;
                }
              } catch {
                // Move not legal from position after hint either
              }
            }

            if (!isValidCheckmate) {
              issues.push({
                courseId: context.courseId,
                courseTitle: context.courseTitle,
                lessonId: context.lessonId,
                lessonTitle: context.lessonTitle,
                stepId: step.id,
                stepIndex: context.stepIndex,
                stepType: step.type,
                errorType: 'wrong_hint_state',
                severity: 'error',
                fen: step.fen,
                move: move,
                message: `Hint claims ${altMove} is checkmate, but it isn't`,
                details: `Hint: "${hint}"`,
              });
            }
          }
        } else if (/\b(is|delivers?|this is)\s+(a\s+)?checkmate\b/i.test(hint)) {
          // General claim that the position is checkmate (no specific move mentioned)
          if (!game.isCheckmate()) {
            issues.push({
              courseId: context.courseId,
              courseTitle: context.courseTitle,
              lessonId: context.lessonId,
              lessonTitle: context.lessonTitle,
              stepId: step.id,
              stepIndex: context.stepIndex,
              stepType: step.type,
              errorType: 'wrong_hint_state',
              severity: 'error',
              fen: step.fen,
              move: move,
              message: `Hint claims checkmate but position isn't checkmate`,
              details: `Hint: "${hint}". Actual: ${game.isStalemate() ? 'stalemate' : game.isCheck() ? 'check' : 'game continues'}`,
            });
          }
        }
      }

      // Check for "not checkmate" or "isn't checkmate" claims
      if (/\b(not|isn'?t|no)\s+checkmate\b/i.test(hint) && game.isCheckmate()) {
        issues.push({
          courseId: context.courseId,
          courseTitle: context.courseTitle,
          lessonId: context.lessonId,
          lessonTitle: context.lessonTitle,
          stepId: step.id,
          stepIndex: context.stepIndex,
          stepType: step.type,
          errorType: 'wrong_hint_state',
          severity: 'error',
          fen: step.fen,
          move: move,
          message: `Hint claims move is not checkmate, but it actually IS checkmate`,
          details: `Hint: "${hint}"`,
        });
      }
    } catch {
      // Move is illegal - handled elsewhere
    }
  }

  return issues;
}

// =============================================================================
// Phase 4: Piece Location Verification
// =============================================================================

function verifyPieceLocations(
  fen: string,
  text: string,
  context: {
    courseId: string;
    courseTitle: string;
    lessonId: string;
    lessonTitle: string;
    stepId: string;
    stepIndex: number;
    stepType: string;
    move?: string;
  }
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Pattern: "Bishop on g4", "Knight at f3", "Queen on d1", "the knight on c3"
  const pieceLocationPattern =
    /\b(?:the\s+)?(King|Queen|Rook|Bishop|Knight|pawn)\s+(?:on|at)\s+([a-h][1-8])\b/gi;

  let match;
  while ((match = pieceLocationPattern.exec(text)) !== null) {
    const pieceName = match[1].toLowerCase();
    const square = match[2].toLowerCase();
    const expectedSymbol = pieceNameToSymbol[pieceName];

    const actualPiece = getPieceAtSquare(fen, square);

    if (!actualPiece) {
      issues.push({
        ...context,
        errorType: 'wrong_piece_location',
        severity: 'warning',
        fen: fen,
        message: `Text claims ${pieceName} on ${square}, but square is empty`,
        details: `Text: "...${match[0]}..."`,
      });
    } else if (actualPiece.type !== expectedSymbol) {
      const actualName = pieceSymbolToName[actualPiece.type];
      issues.push({
        ...context,
        errorType: 'wrong_piece_location',
        severity: 'warning',
        fen: fen,
        message: `Text claims ${pieceName} on ${square}, but actual piece is ${actualName}`,
        details: `Text: "...${match[0]}..."`,
      });
    }
  }

  return issues;
}

function validatePieceLocations(
  step: LessonStep,
  context: {
    courseId: string;
    courseTitle: string;
    lessonId: string;
    lessonTitle: string;
    stepIndex: number;
  }
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Check explanation
  if (step.explanation) {
    issues.push(
      ...verifyPieceLocations(step.fen, step.explanation, {
        ...context,
        stepId: step.id,
        stepType: step.type,
      })
    );
  }

  // Check hints
  if (step.wrongMoveHints) {
    for (const [move, hint] of Object.entries(step.wrongMoveHints)) {
      // For hints, we need to check against the position AFTER the move
      try {
        const game = new Chess(step.fen);
        game.move(normalizeMove(move));
        issues.push(
          ...verifyPieceLocations(game.fen(), hint, {
            ...context,
            stepId: step.id,
            stepType: step.type,
            move: move,
          })
        );
      } catch {
        // Invalid move - checked elsewhere
      }
    }
  }

  return issues;
}

// =============================================================================
// Phase 5: Success/Failure Message Verification
// =============================================================================

function validateSuccessMessage(
  step: LessonStep,
  context: {
    courseId: string;
    courseTitle: string;
    lessonId: string;
    lessonTitle: string;
    stepIndex: number;
  }
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!step.successMessage || !step.correctMoves || step.correctMoves.length === 0) {
    return issues;
  }

  // Validate against the first correct move (most common case)
  const firstCorrectMove = step.correctMoves[0];

  // Skip UCI notation
  if (/^[a-h][1-8][a-h][1-8]$/.test(firstCorrectMove)) {
    return issues;
  }

  // Skip validation if success message describes a multi-move sequence
  // Patterns like "after Rxe8, Rxe8# is checkmate" indicate the immediate move
  // doesn't deliver checkmate, but the sequence does
  const describesSequence =
    /after\s+[a-z]+x?[a-h]?[1-8]?,?\s+[a-z]+.*(?:is\s+)?(?:check)?mate/i.test(step.successMessage) ||
    /leads?\s+to\s+(?:forced\s+)?(?:check)?mate/i.test(step.successMessage) ||
    /forces?\s+(?:a\s+)?(?:check)?mate\s+(?:in\s+)?\d+/i.test(step.successMessage) ||
    /keep\s+bringing.*(?:check)?mate/i.test(step.successMessage) ||
    /\bis\s+forced.*(?:check)?mate/i.test(step.successMessage) ||
    /x-?ray/i.test(step.successMessage) ||
    /deflect/i.test(step.successMessage);

  if (describesSequence) {
    return issues;
  }

  try {
    const game = new Chess(step.fen);
    game.move(normalizeMove(firstCorrectMove));
    const fenAfterMove = game.fen();

    // Check "checkmate" claims in success message - only for immediate claims
    // Skip if message talks about NOT checkmate, or describes what happens after
    if (
      /\bcheckmate\b/i.test(step.successMessage) &&
      !/\b(not|isn'?t|no)\s+(?:a\s+)?(?:check)?mate\b/i.test(step.successMessage) &&
      !/as\s+we\s+warned/i.test(step.successMessage)  // Skip "not stalemate as we warned"
    ) {
      // Only flag if it's claiming IMMEDIATE checkmate
      // Patterns like "Checkmate!" or "is checkmate" at the start suggest immediate
      if (/^(?:checkmate|mate)!/i.test(step.successMessage) ||
          /^[a-z]+[1-8]?[+#]?!?\s+(?:is\s+)?(?:check)?mate/i.test(step.successMessage)) {
        if (!game.isCheckmate()) {
          issues.push({
            courseId: context.courseId,
            courseTitle: context.courseTitle,
            lessonId: context.lessonId,
            lessonTitle: context.lessonTitle,
            stepId: step.id,
            stepIndex: context.stepIndex,
            stepType: step.type,
            errorType: 'wrong_success_message',
            severity: 'error',
            fen: step.fen,
            move: firstCorrectMove,
            message: `Success message claims checkmate, but position isn't checkmate`,
            details: `Success message: "${step.successMessage.substring(0, 100)}..."`,
          });
        }
      }
    }

    // Check "stalemate" claims in success message - skip if talking about avoiding stalemate
    if (/\bstalemate\b/i.test(step.successMessage) &&
        !/\b(not|isn'?t|no|avoid|avoiding)\s+(?:a\s+)?stalemate\b/i.test(step.successMessage) &&
        !/as\s+we\s+warned/i.test(step.successMessage)) {
      if (!game.isStalemate()) {
        issues.push({
          courseId: context.courseId,
          courseTitle: context.courseTitle,
          lessonId: context.lessonId,
          lessonTitle: context.lessonTitle,
          stepId: step.id,
          stepIndex: context.stepIndex,
          stepType: step.type,
          errorType: 'wrong_success_message',
          severity: 'error',
          fen: step.fen,
          move: firstCorrectMove,
          message: `Success message claims stalemate, but position isn't stalemate`,
          details: `Success message: "${step.successMessage.substring(0, 100)}..."`,
        });
      }
    }

    // Verify piece locations in success message (against position AFTER the move)
    issues.push(
      ...verifyPieceLocations(fenAfterMove, step.successMessage, {
        ...context,
        stepId: step.id,
        stepType: step.type,
        move: firstCorrectMove,
      })
    );
  } catch {
    // Invalid move - handled elsewhere
  }

  return issues;
}

// =============================================================================
// Core Validation (Original + New Phases)
// =============================================================================

function validateStep(
  course: Course,
  lessonIndex: number,
  stepIndex: number,
  step: LessonStep
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const lesson = course.lessons[lessonIndex];

  const context = {
    courseId: course.id,
    courseTitle: course.title,
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    stepIndex,
  };

  // Try to load FEN
  let game: Chess;
  try {
    game = new Chess(step.fen);
  } catch (e) {
    issues.push({
      ...context,
      stepId: step.id,
      stepType: step.type,
      errorType: 'invalid_fen',
      severity: 'error',
      fen: step.fen,
      message: `Invalid FEN: ${e instanceof Error ? e.message : 'Unknown error'}`,
    });
    return issues; // Can't validate moves without valid FEN
  }

  // For interactive/puzzle steps, validate correctMoves
  if ((step.type === 'interactive' || step.type === 'puzzle') && step.correctMoves) {
    const legalMoves = game.moves();

    for (const correctMove of step.correctMoves) {
      // Skip UCI notation (e.g., "e2e4") - these are handled differently in the code
      if (/^[a-h][1-8][a-h][1-8]$/.test(correctMove)) {
        continue;
      }

      // Try to parse the move (strip check/checkmate symbols first)
      const normalizedMove = normalizeMove(correctMove);
      try {
        const move = game.move(normalizedMove);
        if (!move) {
          issues.push({
            ...context,
            stepId: step.id,
            stepType: step.type,
            errorType: 'illegal_move',
            severity: 'error',
            fen: step.fen,
            move: correctMove,
            message: `Move "${correctMove}" is NOT legal from this position`,
            legalMoves: legalMoves.slice(0, 20), // Show first 20 legal moves
          });
        }
        // Undo the move to keep the position unchanged for next validation
        game.undo();
      } catch (e) {
        issues.push({
          ...context,
          stepId: step.id,
          stepType: step.type,
          errorType: 'move_parse_error',
          severity: 'error',
          fen: step.fen,
          move: correctMove,
          message: `Failed to parse move "${correctMove}": ${e instanceof Error ? e.message : 'Unknown error'}`,
          legalMoves: legalMoves.slice(0, 20),
        });
      }
    }
  }

  // Phase 1: Goal Achievement Validation
  issues.push(...validateGoalAchievement(step, context));

  // Phase 2: Missing Alternative Solutions
  issues.push(...validateMissingAlternatives(step, context));

  // Phase 3: Hint Text Verification
  issues.push(...validateHintClaims(step, context));

  // Phase 4: Piece Location Verification
  issues.push(...validatePieceLocations(step, context));

  // Phase 5: Success/Failure Message Verification
  issues.push(...validateSuccessMessage(step, context));

  return issues;
}

function validateCourse(course: Course): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  for (let lessonIndex = 0; lessonIndex < course.lessons.length; lessonIndex++) {
    const lesson = course.lessons[lessonIndex];

    for (let stepIndex = 0; stepIndex < lesson.steps.length; stepIndex++) {
      const step = lesson.steps[stepIndex];
      const stepIssues = validateStep(course, lessonIndex, stepIndex, step);
      issues.push(...stepIssues);
    }
  }

  return issues;
}

function validateAllCourses(): ValidationSummary {
  const courses: Course[] = [
    fundamentalsCourse,
    tacticsCourse,
    endgamesCourse,
    openingsCourse,
    midgameCourse,
    strategyCourse,
    positionalCourse,
  ];

  const allIssues: ValidationIssue[] = [];
  let totalLessons = 0;
  let totalSteps = 0;
  let totalInteractiveSteps = 0;
  let totalMoves = 0;

  for (const course of courses) {
    const issues = validateCourse(course);
    allIssues.push(...issues);

    totalLessons += course.lessons.length;
    for (const lesson of course.lessons) {
      totalSteps += lesson.steps.length;
      for (const step of lesson.steps) {
        if (step.type === 'interactive' || step.type === 'puzzle') {
          totalInteractiveSteps++;
          totalMoves += step.correctMoves?.length || 0;
        }
      }
    }
  }

  return {
    totalCourses: courses.length,
    totalLessons,
    totalSteps,
    totalInteractiveSteps,
    totalFens: totalSteps,
    totalMoves,
    errors: allIssues.filter((i) => i.severity === 'error'),
    warnings: allIssues.filter((i) => i.severity === 'warning'),
  };
}

// =============================================================================
// Report Printing
// =============================================================================

function printReport(summary: ValidationSummary): void {
  console.log('\n' + '='.repeat(80));
  console.log('COMPREHENSIVE CHESS LESSON VALIDATION REPORT');
  console.log('='.repeat(80) + '\n');

  // Summary stats
  console.log('📊 STATISTICS');
  console.log('-'.repeat(40));
  console.log(`   Courses:           ${summary.totalCourses}`);
  console.log(`   Lessons:           ${summary.totalLessons}`);
  console.log(`   Total Steps:       ${summary.totalSteps}`);
  console.log(`   Interactive Steps: ${summary.totalInteractiveSteps}`);
  console.log(`   Total FENs:        ${summary.totalFens}`);
  console.log(`   Total Moves:       ${summary.totalMoves}`);
  console.log('');

  // Error summary by type
  const errorsByType = new Map<ErrorType, number>();
  for (const error of summary.errors) {
    errorsByType.set(error.errorType, (errorsByType.get(error.errorType) || 0) + 1);
  }

  const warningsByType = new Map<ErrorType, number>();
  for (const warning of summary.warnings) {
    warningsByType.set(warning.errorType, (warningsByType.get(warning.errorType) || 0) + 1);
  }

  if (summary.errors.length === 0 && summary.warnings.length === 0) {
    console.log('✅ ALL VALIDATIONS PASSED - No issues found!\n');
    return;
  }

  if (summary.errors.length > 0) {
    console.log('❌ ERRORS FOUND');
    console.log('-'.repeat(40));
    for (const [type, count] of errorsByType) {
      console.log(`   ${type}: ${count}`);
    }
    console.log(`   TOTAL ERRORS: ${summary.errors.length}`);
    console.log('');
  }

  if (summary.warnings.length > 0) {
    console.log('⚠️  WARNINGS FOUND');
    console.log('-'.repeat(40));
    for (const [type, count] of warningsByType) {
      console.log(`   ${type}: ${count}`);
    }
    console.log(`   TOTAL WARNINGS: ${summary.warnings.length}`);
    console.log('');
  }

  // Detailed error listing
  if (summary.errors.length > 0) {
    console.log('📋 DETAILED ERROR LIST');
    console.log('='.repeat(80));
    printIssuesByCourse(summary.errors);
  }

  // Detailed warning listing
  if (summary.warnings.length > 0) {
    console.log('\n📋 DETAILED WARNING LIST');
    console.log('='.repeat(80));
    printIssuesByCourse(summary.warnings);
  }

  console.log('\n' + '='.repeat(80));
  console.log(
    `SUMMARY: ${summary.errors.length} error(s), ${summary.warnings.length} warning(s)`
  );
  console.log('='.repeat(80) + '\n');
}

function printIssuesByCourse(issues: ValidationIssue[]): void {
  // Group issues by course
  const issuesByCourse = new Map<string, ValidationIssue[]>();
  for (const issue of issues) {
    const key = issue.courseId;
    if (!issuesByCourse.has(key)) {
      issuesByCourse.set(key, []);
    }
    issuesByCourse.get(key)!.push(issue);
  }

  for (const [courseId, courseIssues] of issuesByCourse) {
    const firstIssue = courseIssues[0];
    console.log(`\n📚 ${firstIssue.courseTitle} (${courseId})`);
    console.log('-'.repeat(60));

    for (const issue of courseIssues) {
      console.log(
        `\n[${issue.errorType.toUpperCase()}] "${issue.lessonTitle}" > Step ${issue.stepIndex + 1} (${issue.stepId})`
      );
      console.log(`   Type: ${issue.stepType}`);
      console.log(`   FEN:  ${issue.fen}`);
      if (issue.move) {
        console.log(`   Move: ${issue.move}`);
      }
      console.log(`   ${issue.severity === 'error' ? '❌' : '⚠️ '} ${issue.message}`);
      if (issue.details) {
        console.log(`   Details: ${issue.details}`);
      }
      if (issue.legalMoves && issue.legalMoves.length > 0) {
        console.log(
          `   Legal moves: ${issue.legalMoves.join(', ')}${issue.legalMoves.length === 20 ? '...' : ''}`
        );
      }
    }
  }
}

// =============================================================================
// Main Execution
// =============================================================================

const summary = validateAllCourses();
printReport(summary);

// Exit with error code if there are errors (but not just warnings)
process.exit(summary.errors.length > 0 ? 1 : 0);

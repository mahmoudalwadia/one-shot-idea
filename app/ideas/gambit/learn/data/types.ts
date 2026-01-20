/**
 * Chess Learning System - Type Definitions
 */

// Arrow overlay for showing move suggestions, threats, etc.
export interface Arrow {
  from: string;  // Square in algebraic notation (e.g., "e2")
  to: string;    // Target square (e.g., "e4")
  color: 'green' | 'yellow' | 'red' | 'blue';
}

// Square highlight for emphasizing important squares
export interface Highlight {
  square: string;
  color: 'green' | 'yellow' | 'red' | 'blue';
}

// Different types of lesson steps
export type StepType =
  | 'explanation'    // Text/diagram explanation - no interaction needed
  | 'demonstration'  // Animated move sequence to watch
  | 'interactive'    // User must find the correct move
  | 'puzzle';        // Tactical puzzle (may have multiple moves)

// A single step within a lesson
export interface LessonStep {
  id: string;
  type: StepType;
  fen: string;                              // Board position for this step
  title?: string;                           // Optional step title
  explanation: string;                      // Main instructional text (markdown supported)

  // Visual aids
  arrows?: Arrow[];
  highlights?: Highlight[];

  // For 'interactive' and 'puzzle' steps
  correctMoves?: string[];                  // Acceptable moves in SAN (e.g., ["Nxf7", "Bxf7+"])
  wrongMoveHints?: Record<string, string>;  // Specific hints for common wrong moves
  successMessage?: string;                  // Shown after correct move
  failureMessage?: string;                  // General hint for wrong moves

  // For 'demonstration' steps
  moves?: string[];                         // Sequence of moves to animate (SAN)

  // For 'puzzle' steps with multiple moves
  solutionLine?: string[];                  // Full solution line
}

// Difficulty levels
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

// A complete lesson
export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  tags: string[];                           // For filtering/search
  steps: LessonStep[];
}

// A course containing multiple lessons
export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;                             // Lucide icon name
  color: string;                            // Theme color for the course card
  lessons: Lesson[];
}

// Standalone puzzle (from Lichess database)
export interface Puzzle {
  id: string;
  fen: string;
  solution: string[];                       // Sequence of moves (SAN)
  themes: string[];                         // e.g., ["fork", "middlegame", "short"]
  rating: number;                           // Difficulty rating (800-2500)
}

// User progress tracking
export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  currentStepIndex: number;
  attempts: number;
  correctOnFirstTry: number;
  lastAttempt: string;                      // ISO date string
}

export interface CourseProgress {
  courseId: string;
  lessonsCompleted: number;
  totalLessons: number;
}

export interface UserProgress {
  courses: Record<string, CourseProgress>;
  lessons: Record<string, LessonProgress>;
  puzzlesSolved: number;
  puzzlesAttempted: number;
  streakDays: number;
  lastActiveDate: string;                   // ISO date string
}

// Default empty progress
export const DEFAULT_PROGRESS: UserProgress = {
  courses: {},
  lessons: {},
  puzzlesSolved: 0,
  puzzlesAttempted: 0,
  streakDays: 0,
  lastActiveDate: '',
};

/**
 * Color mappings for arrows and highlights
 *
 * Color meanings:
 * - GREEN:  Best/correct moves, safe squares, good positions, attacking opportunities
 * - YELLOW: Caution - alternatives, defended squares, moves to consider, attention needed
 * - RED:    Danger - threats, hanging pieces, bad squares, opponent's attacking moves
 * - BLUE:   Neutral - key squares, piece positions, last move indicator, general emphasis
 */
export const ANNOTATION_COLORS: Record<Arrow['color'], string> = {
  green: '#15803d',   // Best moves, safe squares, correct answers
  yellow: '#ca8a04',  // Alternatives, defended squares, caution
  red: '#dc2626',     // Threats, hanging pieces, danger zones
  blue: '#2563eb',    // Key squares, neutral emphasis, last move
};

// Course metadata for navigation
export interface CourseMetadata {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessonCount: number;
}

'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Chess, Square } from 'chess.js';
import { Lesson, LessonStep, Arrow } from './data/types';
import LessonBoard from './components/LessonBoard';
import ExplanationPanel from './components/ExplanationPanel';
import FeedbackOverlay from './components/FeedbackOverlay';

interface LessonViewerProps {
  lesson: Lesson;
  courseId: string;
  onComplete: (stats: { attempts: number; correctOnFirstTry: number }) => void;
  onExit: () => void;
  onUpdateStep: (stepIndex: number) => void;
  initialStepIndex?: number;
}

const LessonViewer: React.FC<LessonViewerProps> = ({
  lesson,
  courseId,
  onComplete,
  onExit,
  onUpdateStep,
  initialStepIndex = 0,
}) => {
  // Core state
  const [currentStepIndex, setCurrentStepIndex] = useState(initialStepIndex);

  // Derived: Get current step (not state, just computed)
  const currentStep = lesson.steps[currentStepIndex] || lesson.steps[0];

  // Display FEN - starts from step FEN, changes when user makes moves
  // This is separate from currentStep.fen because interactive moves update it
  const [displayFen, setDisplayFen] = useState(currentStep?.fen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');

  // Step completion and UI state
  const [stepCompleted, setStepCompleted] = useState(() => {
    return currentStep?.type === 'explanation' || currentStep?.type === 'demonstration';
  });
  const [attempts, setAttempts] = useState(0);
  const [correctOnFirstTry, setCorrectOnFirstTry] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [totalCorrectFirst, setTotalCorrectFirst] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showOverlay, setShowOverlay] = useState<'correct' | 'incorrect' | 'complete' | null>(null);
  const [hintShown, setHintShown] = useState(false);
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null);
  const [isModernTheme, setIsModernTheme] = useState(false);
  const [solutionArrow, setSolutionArrow] = useState<Arrow | null>(null);

  // Reset displayFen and step-specific state when step index changes
  // This is the ONLY place where displayFen gets reset to match a step
  useEffect(() => {
    const step = lesson.steps[currentStepIndex];
    if (!step) return;

    // Reset FEN to new step's position
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Reset UI state when step changes
    setDisplayFen(step.fen);
    // Reset step-specific state

    setStepCompleted(step.type === 'explanation' || step.type === 'demonstration');

    setAttempts(0);

    setHintShown(false);

    setFeedback(null);

    setLastMove(null);

    setSolutionArrow(null);
  }, [currentStepIndex, lesson]); // Reset when step changes or lesson data changes

  // Theme detection
  useEffect(() => {
    const checkTheme = () => {
      setIsModernTheme(document.body.classList.contains('theme-modern'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Handle move validation for interactive steps
  const handleMove = useCallback((from: Square, to: Square) => {
    if (stepCompleted) return;

    try {
      const game = new Chess(displayFen);

      // Try the move
      const move = game.move({ from, to, promotion: 'q' }); // Auto-promote to queen for simplicity

      if (!move) {
        return;
      }

      const moveSan = move.san;

      // Normalize move notation for comparison (strip check/checkmate symbols)
      const normalizeMove = (m: string) => m.replace(/[+#]$/, '').toLowerCase();

      const isCorrect = currentStep.correctMoves?.some(
        cm => normalizeMove(cm) === normalizeMove(moveSan) ||
              cm.toLowerCase() === `${from}${to}`.toLowerCase()
      );

      setAttempts(prev => prev + 1);
      setTotalAttempts(prev => prev + 1);

      if (isCorrect) {
        // Correct move - update displayed position
        setDisplayFen(game.fen());
        setLastMove({ from, to });
        setStepCompleted(true);

        if (attempts === 0 && !hintShown) {
          setCorrectOnFirstTry(1);
          setTotalCorrectFirst(prev => prev + 1);
        }

        const successMsg = currentStep.successMessage || 'Correct!';
        setFeedback({ type: 'success', message: successMsg });
        setShowOverlay('correct');
      } else {
        // Wrong move - don't update FEN, show hint
        const specificHint = currentStep.wrongMoveHints?.[moveSan];
        const failMsg = specificHint || currentStep.failureMessage || 'Not quite. Try again!';
        setFeedback({ type: 'error', message: failMsg });
        setShowOverlay('incorrect');
      }
    } catch {
      // Invalid move
    }
  }, [displayFen, currentStep, stepCompleted, attempts, hintShown]);

  // Navigation
  const goToNextStep = useCallback(() => {
    if (currentStepIndex < lesson.steps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      onUpdateStep(nextIndex);
      setStepCompleted(false);
      setFeedback(null);
    } else {
      // Lesson complete
      setShowOverlay('complete');
      onComplete({
        attempts: totalAttempts,
        correctOnFirstTry: totalCorrectFirst,
      });
    }
  }, [currentStepIndex, lesson.steps.length, onUpdateStep, onComplete, totalAttempts, totalCorrectFirst]);

  const goToPreviousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      setStepCompleted(false);
      setFeedback(null);
    }
  }, [currentStepIndex]);

  const handleHint = useCallback(() => {
    setHintShown(true);
    if (currentStep.correctMoves && currentStep.correctMoves.length > 0) {
      const hint = `Look for ${currentStep.correctMoves[0].charAt(0)}...`;
      setFeedback({ type: 'error', message: `Hint: ${hint}` });
    }
  }, [currentStep]);

  const handleShowAnswer = useCallback(() => {
    setHintShown(true);
    if (currentStep.correctMoves && currentStep.correctMoves.length > 0) {
      const moveNotation = currentStep.correctMoves[0];
      setFeedback({ type: 'success', message: `Answer: ${moveNotation}` });

      // Try to parse the move and show an arrow
      try {
        const game = new Chess(displayFen);
        // Remove check/checkmate symbols for parsing
        const cleanMove = moveNotation.replace(/[+#]$/, '');
        const move = game.move(cleanMove);
        if (move) {
          setSolutionArrow({ from: move.from, to: move.to, color: 'green' });
        }
      } catch {
        // If parsing fails, no arrow shown
      }

      // Allow continuing after showing answer
      setStepCompleted(true);
    }
  }, [currentStep, displayFen]);

  const dismissOverlay = useCallback(() => {
    setShowOverlay(null);
  }, []);

  const containerClass = isModernTheme
    ? 'h-full bg-[#262421] overflow-y-auto overflow-x-hidden'
    : 'h-full bg-[var(--term-bg)] overflow-y-auto overflow-x-hidden';

  return (
    <div className={containerClass}>
      {/* Mobile: Exit button at top */}
      <div className={`md:hidden sticky top-0 z-30 px-3 py-1.5 flex justify-between items-center ${isModernTheme ? 'bg-[#262421] border-b border-[#3d3a37]' : 'bg-[var(--term-bg)] border-b border-[var(--term-dim)]'}`}>
        <button
          onClick={onExit}
          className={`text-xs py-1 px-2 rounded cursor-pointer focus:outline-none focus-visible:ring-2 ${isModernTheme ? 'text-[#8b8987] hover:text-white focus-visible:ring-white' : 'text-[var(--term-dim)] hover:text-[var(--term-main)] focus-visible:ring-[var(--term-main)]'}`}
        >
          ← Exit
        </button>
        <span className={`text-[10px] ${isModernTheme ? 'text-[#8b8987]' : 'text-[var(--term-dim)]'}`}>
          Step {currentStepIndex + 1}/{lesson.steps.length}
        </span>
      </div>

      {/* Centered content wrapper */}
      <div className="min-h-0 flex flex-col lg:flex-row lg:h-full lg:justify-center lg:items-start p-2 lg:p-3 gap-2 lg:gap-3">
        {/* Board Section */}
        <div className="flex-shrink-0 w-full max-w-[500px] lg:max-w-[600px] mx-auto lg:mx-0 lg:pt-9">
          <div className="relative w-full">
            <div className="aspect-square">
              <LessonBoard
                fen={displayFen}
                onMove={handleMove}
                arrows={solutionArrow ? [...(currentStep.arrows || []), solutionArrow] : currentStep.arrows}
                highlights={currentStep.highlights}
                interactive={
                  (currentStep.type === 'interactive' || currentStep.type === 'puzzle') &&
                  !stepCompleted
                }
                lastMove={lastMove}
              />
            </div>

            {/* Overlay */}
            {showOverlay && showOverlay !== 'complete' && (
              <FeedbackOverlay
                type={showOverlay}
                message={feedback?.message}
                onDismiss={dismissOverlay}
                autoDismiss
                autoDismissDelay={1200}
              />
            )}
          </div>
        </div>

        {/* Explanation Panel - full height on desktop, auto height on mobile */}
        <div className={`w-full lg:w-[480px] lg:flex-shrink-0 lg:h-full lg:max-h-full ${isModernTheme ? 'bg-[#312e2b]' : 'bg-[var(--term-bg)]'} rounded-lg`}>
          <div className="flex flex-col lg:h-full lg:max-h-full">
            {/* Exit button - desktop only */}
            <div className={`hidden lg:flex px-4 py-2 justify-end ${isModernTheme ? 'border-b border-[#3d3a37]' : 'border-b border-[var(--term-dim)]'}`}>
              <button
                onClick={onExit}
                className={`text-sm cursor-pointer focus:outline-none focus-visible:ring-2 ${isModernTheme ? 'text-[#8b8987] hover:text-white focus-visible:ring-white' : 'text-[var(--term-dim)] hover:text-[var(--term-main)] focus-visible:ring-[var(--term-main)]'}`}
              >
                ✕ Exit Lesson
              </button>
            </div>

            <div className="flex-1 min-h-0">
              <ExplanationPanel
                step={currentStep}
                lessonTitle={lesson.title}
                difficulty={lesson.difficulty}
                currentStepIndex={currentStepIndex}
                totalSteps={lesson.steps.length}
                onNext={goToNextStep}
                onPrevious={goToPreviousStep}
                onHint={handleHint}
                onShowAnswer={handleShowAnswer}
                showHintButton={
                  (currentStep.type === 'interactive' || currentStep.type === 'puzzle') &&
                  !stepCompleted &&
                  !hintShown
                }
                showAnswerButton={
                  (currentStep.type === 'interactive' || currentStep.type === 'puzzle') &&
                  !stepCompleted &&
                  attempts >= 2
                }
                isComplete={stepCompleted}
                feedback={feedback}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Complete Overlay */}
      {showOverlay === 'complete' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className={`
            p-8 rounded-lg text-center max-w-md
            ${isModernTheme
              ? 'bg-[#312e2b] border-2 border-[#81b64c]'
              : 'bg-[var(--term-bg)] border-2 border-[var(--term-main)]'
            }
          `}>
            <div className="text-5xl mb-4">🏆</div>
            <h2 className={`text-2xl font-bold mb-2 ${isModernTheme ? 'text-white' : 'text-[var(--term-main)]'}`}>
              Lesson Complete!
            </h2>
            <p className={`mb-4 ${isModernTheme ? 'text-[#bababa]' : 'text-[var(--term-main)]'}`}>
              {lesson.title}
            </p>
            <div className={`text-sm mb-6 ${isModernTheme ? 'text-[#8b8987]' : 'text-[var(--term-dim)]'}`}>
              <div>Total attempts: {totalAttempts}</div>
              <div>Correct on first try: {totalCorrectFirst}</div>
            </div>
            <button
              onClick={onExit}
              className={`
                px-6 py-2 font-bold rounded cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                ${isModernTheme
                  ? 'bg-[#81b64c] text-white hover:bg-[#9ac964] focus-visible:ring-[#81b64c] focus-visible:ring-offset-[#312e2b]'
                  : 'border-2 border-[var(--term-main)] text-[var(--term-main)] hover:bg-[var(--term-main)] hover:text-[var(--term-bg)] focus-visible:ring-[var(--term-main)] focus-visible:ring-offset-[var(--term-bg)]'
                }
              `}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonViewer;

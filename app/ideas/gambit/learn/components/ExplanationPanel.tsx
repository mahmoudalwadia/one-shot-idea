'use client';

import React, { useState, useEffect } from 'react';
import { LessonStep, Difficulty } from '../data/types';
import MarkdownText from './MarkdownText';

interface ExplanationPanelProps {
  step: LessonStep;
  lessonTitle: string;
  difficulty: Difficulty;
  currentStepIndex: number;
  totalSteps: number;
  onNext?: () => void;
  onPrevious?: () => void;
  onHint?: () => void;
  onShowAnswer?: () => void;
  showHintButton?: boolean;
  showAnswerButton?: boolean;
  isComplete?: boolean;
  feedback?: { type: 'success' | 'error'; message: string } | null;
}

const ExplanationPanel: React.FC<ExplanationPanelProps> = ({
  step,
  lessonTitle,
  difficulty,
  currentStepIndex,
  totalSteps,
  onNext,
  onPrevious,
  onHint,
  onShowAnswer,
  showHintButton = false,
  showAnswerButton = false,
  isComplete = false,
  feedback = null,
}) => {
  const [isModernTheme, setIsModernTheme] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsModernTheme(document.body.classList.contains('theme-modern'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const difficultyColors: Record<Difficulty, string> = {
    beginner: isModernTheme ? 'text-green-500' : 'text-green-400',
    intermediate: isModernTheme ? 'text-yellow-500' : 'text-yellow-400',
    advanced: isModernTheme ? 'text-red-500' : 'text-red-400',
  };

  const stepTypeLabels: Record<string, string> = {
    explanation: 'LEARN',
    demonstration: 'WATCH',
    interactive: 'YOUR TURN',
    puzzle: 'PUZZLE',
  };

  const containerClass = isModernTheme
    ? 'h-full flex flex-col bg-[#262421] text-[#bababa] font-sans'
    : 'h-full flex flex-col bg-[var(--term-bg)] text-[var(--term-main)]';

  const headerClass = isModernTheme
    ? 'px-3 md:px-4 py-2 md:py-3 border-b border-[#3d3a37]'
    : 'px-3 md:px-4 py-2 md:py-3 border-b border-[var(--term-dim)]';

  const buttonClass = isModernTheme
    ? 'px-4 py-3 md:py-2 bg-[#81b64c] text-white rounded hover:bg-[#9ac964] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base font-medium'
    : 'px-4 py-3 md:py-2 border border-[var(--term-main)] text-[var(--term-main)] hover:bg-[var(--term-main)] hover:text-[var(--term-bg)] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base font-medium';

  const secondaryButtonClass = isModernTheme
    ? 'px-4 py-2 text-sm text-[#8b8987] hover:text-white transition-colors cursor-pointer'
    : 'px-4 py-2 text-sm text-[var(--term-dim)] hover:text-[var(--term-main)] transition-colors cursor-pointer';

  return (
    <div className={containerClass}>
      {/* Header */}
      <div className={headerClass}>
        <div className="flex items-center justify-between mb-1">
          <span className={`text-xs uppercase ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
          <span className={`text-xs ${isModernTheme ? 'text-[#8b8987]' : 'text-[var(--term-dim)]'}`}>
            Step {currentStepIndex + 1} / {totalSteps}
          </span>
        </div>
        <h2 className={`text-lg font-bold ${isModernTheme ? 'text-white' : 'terminal-text-shadow'}`}>
          {lessonTitle}
        </h2>
      </div>

      {/* Progress Bar */}
      <div className={`h-1 ${isModernTheme ? 'bg-[#3d3a37]' : 'bg-[var(--term-dim)]'}`}>
        <div
          className={`h-full transition-all duration-300 ${isModernTheme ? 'bg-[#81b64c]' : 'bg-[var(--term-main)]'}`}
          style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Step Type Badge */}
        <div className="mb-3">
          <span className={`
            inline-block px-2 py-1 text-xs font-bold uppercase rounded
            ${isModernTheme
              ? 'bg-[#3d3a37] text-[#bababa]'
              : 'border border-[var(--term-main)] text-[var(--term-main)]'
            }
          `}>
            {stepTypeLabels[step.type]}
          </span>
        </div>

        {/* Step Title */}
        {step.title && (
          <h3 className={`text-base font-bold mb-2 ${isModernTheme ? 'text-white' : ''}`}>
            {step.title}
          </h3>
        )}

        {/* Explanation Text */}
        <MarkdownText
          content={step.explanation}
          className={`
            text-sm leading-relaxed
            ${isModernTheme ? 'text-[#bababa]' : 'text-[var(--term-main)]'}
          `}
        />

        {/* Feedback Message */}
        {feedback && (
          <div className={`
            mt-4 p-3 rounded text-sm font-medium
            ${feedback.type === 'success'
              ? (isModernTheme ? 'bg-green-900/30 text-green-400 border border-green-700' : 'bg-green-900/50 text-green-400')
              : (isModernTheme ? 'bg-red-900/30 text-red-400 border border-red-700' : 'bg-red-900/50 text-red-400')
            }
          `}>
            {feedback.type === 'success' ? '✓ ' : '✗ '}
            {feedback.message}
          </div>
        )}

        {/* Interactive prompt */}
        {step.type === 'interactive' && !isComplete && !feedback && (
          <div className={`
            mt-4 p-3 rounded text-sm
            ${isModernTheme ? 'bg-[#3d3a37] text-[#bababa]' : 'border border-dashed border-[var(--term-main)]'}
          `}>
            Make your move on the board.
          </div>
        )}

        {/* Puzzle prompt */}
        {step.type === 'puzzle' && !isComplete && !feedback && (
          <div className={`
            mt-4 p-3 rounded text-sm
            ${isModernTheme ? 'bg-[#3d3a37] text-[#bababa]' : 'border border-dashed border-[var(--term-main)]'}
          `}>
            Find the best move.
          </div>
        )}
      </div>

      {/* Actions */}
      <div className={`
        p-4 border-t flex flex-col gap-2
        ${isModernTheme ? 'border-[#3d3a37]' : 'border-[var(--term-dim)]'}
      `}>
        {/* Hint/Answer buttons for interactive steps */}
        {(step.type === 'interactive' || step.type === 'puzzle') && !isComplete && (
          <div className="flex gap-2 justify-center mb-2">
            {showHintButton && onHint && (
              <button onClick={onHint} className={secondaryButtonClass}>
                💡 Hint
              </button>
            )}
            {showAnswerButton && onShowAnswer && (
              <button onClick={onShowAnswer} className={secondaryButtonClass}>
                👁 Show Answer
              </button>
            )}
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex gap-2 justify-between">
          <button
            onClick={onPrevious}
            disabled={currentStepIndex === 0}
            className={buttonClass}
          >
            ← Previous
          </button>

          {isComplete || step.type === 'explanation' || step.type === 'demonstration' ? (
            <button
              onClick={onNext}
              disabled={currentStepIndex === totalSteps - 1 && !isComplete}
              className={buttonClass}
            >
              {currentStepIndex === totalSteps - 1 ? 'Finish →' : 'Next →'}
            </button>
          ) : (
            <span className={`text-xs self-center ${isModernTheme ? 'text-[#8b8987]' : 'text-[var(--term-dim)]'}`}>
              Complete the move to continue
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExplanationPanel;

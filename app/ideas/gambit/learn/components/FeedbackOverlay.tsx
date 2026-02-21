'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface FeedbackOverlayProps {
  type: 'correct' | 'incorrect' | 'hint' | 'complete';
  message?: string;
  onDismiss?: () => void;
  autoDismiss?: boolean;
  autoDismissDelay?: number;
}

const FeedbackOverlay: React.FC<FeedbackOverlayProps> = ({
  type,
  message,
  onDismiss,
  autoDismiss = true,
  autoDismissDelay = 1500,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isModernTheme, setIsModernTheme] = useState(false);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => onDismiss?.(), 200);
  }, [onDismiss]);

  useEffect(() => {
    const checkTheme = () => {
      setIsModernTheme(document.body.classList.contains('theme-modern'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleDismiss]);

  useEffect(() => {
    if (autoDismiss) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onDismiss?.(), 200);
      }, autoDismissDelay);
      return () => clearTimeout(timer);
    }
  }, [autoDismiss, autoDismissDelay, onDismiss]);

  const configs = {
    correct: {
      icon: '✓',
      title: 'Correct!',
      defaultMessage: 'Great move!',
      bgClass: isModernTheme
        ? 'bg-green-600/90 border-green-400'
        : 'bg-green-900/90 border-green-500',
      textClass: 'text-green-100',
      iconClass: 'text-green-300',
    },
    incorrect: {
      icon: '✗',
      title: 'Not quite',
      defaultMessage: 'Try again!',
      bgClass: isModernTheme
        ? 'bg-red-600/90 border-red-400'
        : 'bg-red-900/90 border-red-500',
      textClass: 'text-red-100',
      iconClass: 'text-red-300',
    },
    hint: {
      icon: '💡',
      title: 'Hint',
      defaultMessage: '',
      bgClass: isModernTheme
        ? 'bg-yellow-600/90 border-yellow-400'
        : 'bg-yellow-900/90 border-yellow-500',
      textClass: 'text-yellow-100',
      iconClass: 'text-yellow-300',
    },
    complete: {
      icon: '🏆',
      title: 'Lesson Complete!',
      defaultMessage: 'Well done!',
      bgClass: isModernTheme
        ? 'bg-blue-600/90 border-blue-400'
        : 'bg-blue-900/90 border-blue-500',
      textClass: 'text-blue-100',
      iconClass: 'text-blue-300',
    },
  };

  const config = configs[type];
  const displayMessage = message || config.defaultMessage;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="feedback-title"
      className={`
        absolute inset-0 flex items-center justify-center z-50
        transition-opacity duration-200
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
      style={{ overscrollBehavior: 'contain' }}
      onClick={handleDismiss}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Feedback Card */}
      <div
        className={`
          relative px-6 py-4 rounded-lg border-2 shadow-xl
          transform transition-transform duration-200
          ${isVisible ? 'scale-100' : 'scale-95'}
          ${config.bgClass}
          ${isModernTheme ? '' : 'shadow-[0_0_20px_rgba(var(--term-main-rgb),0.3)]'}
        `}
      >
        <div className="flex items-center gap-3">
          {/* Icon */}
          <span className={`text-3xl ${config.iconClass}`}>
            {config.icon}
          </span>

          {/* Content */}
          <div>
            <h3 id="feedback-title" className={`font-bold text-lg ${config.textClass}`}>
              {config.title}
            </h3>
            {displayMessage && (
              <p className={`text-sm opacity-90 ${config.textClass}`}>
                {displayMessage}
              </p>
            )}
          </div>
        </div>

        {/* Tap to dismiss hint */}
        <p className={`text-xs mt-2 text-center opacity-60 ${config.textClass}`}>
          Tap to dismiss
        </p>
      </div>
    </div>
  );
};

export default FeedbackOverlay;

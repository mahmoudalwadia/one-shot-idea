'use client';

import { useState, useEffect, useCallback } from 'react';
import { UserProgress, LessonProgress, DEFAULT_PROGRESS } from '../data/types';

const STORAGE_KEY = 'gambit-learn-progress';

export interface UseProgressReturn {
  progress: UserProgress;
  isLoaded: boolean;

  // Lesson progress
  getLessonProgress: (lessonId: string) => LessonProgress | undefined;
  startLesson: (lessonId: string) => void;
  updateLessonStep: (lessonId: string, stepIndex: number) => void;
  completeLesson: (lessonId: string, stats: { attempts: number; correctOnFirstTry: number }) => void;

  // Course progress
  getCourseProgress: (courseId: string, totalLessons: number) => { completed: number; total: number; percentage: number };

  // Puzzle progress
  recordPuzzleAttempt: (solved: boolean) => void;

  // Streak
  updateStreak: () => void;

  // Reset
  resetProgress: () => void;
}

export const useProgress = (): UseProgressReturn => {
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Load from localStorage on mount
        setProgress({ ...DEFAULT_PROGRESS, ...parsed });
      }
    } catch (err) {
      console.error('Failed to load progress:', err);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (!isLoaded || typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (err) {
      console.error('Failed to save progress:', err);
    }
  }, [progress, isLoaded]);

  // Get lesson progress
  const getLessonProgress = useCallback((lessonId: string): LessonProgress | undefined => {
    return progress.lessons[lessonId];
  }, [progress.lessons]);

  // Start a lesson (always resets step index to 0)
  const startLesson = useCallback((lessonId: string) => {
    setProgress(prev => {
      const existing = prev.lessons[lessonId];

      // Always reset to step 0 when starting a lesson for consistent behavior
      return {
        ...prev,
        lessons: {
          ...prev.lessons,
          [lessonId]: {
            lessonId,
            completed: false,
            currentStepIndex: 0,
            attempts: existing?.attempts ?? 0,
            correctOnFirstTry: existing?.correctOnFirstTry ?? 0,
            lastAttempt: new Date().toISOString(),
          },
        },
      };
    });
  }, []);

  // Update lesson step progress
  const updateLessonStep = useCallback((lessonId: string, stepIndex: number) => {
    setProgress(prev => {
      const existing = prev.lessons[lessonId];
      if (!existing) return prev;

      return {
        ...prev,
        lessons: {
          ...prev.lessons,
          [lessonId]: {
            ...existing,
            currentStepIndex: Math.max(existing.currentStepIndex, stepIndex),
            lastAttempt: new Date().toISOString(),
          },
        },
      };
    });
  }, []);

  // Complete a lesson
  const completeLesson = useCallback((
    lessonId: string,
    stats: { attempts: number; correctOnFirstTry: number }
  ) => {
    setProgress(prev => {
      const existing = prev.lessons[lessonId];

      return {
        ...prev,
        lessons: {
          ...prev.lessons,
          [lessonId]: {
            lessonId,
            completed: true,
            currentStepIndex: existing?.currentStepIndex ?? 0,
            attempts: (existing?.attempts ?? 0) + stats.attempts,
            correctOnFirstTry: (existing?.correctOnFirstTry ?? 0) + stats.correctOnFirstTry,
            lastAttempt: new Date().toISOString(),
          },
        },
      };
    });
  }, []);

  // Get course progress
  const getCourseProgress = useCallback((courseId: string, totalLessons: number) => {
    // Count completed lessons that belong to this course
    const completedCount = Object.values(progress.lessons)
      .filter(l => l.lessonId.startsWith(courseId) && l.completed)
      .length;

    return {
      completed: completedCount,
      total: totalLessons,
      percentage: totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0,
    };
  }, [progress.lessons]);

  // Record puzzle attempt
  const recordPuzzleAttempt = useCallback((solved: boolean) => {
    setProgress(prev => ({
      ...prev,
      puzzlesAttempted: prev.puzzlesAttempted + 1,
      puzzlesSolved: prev.puzzlesSolved + (solved ? 1 : 0),
    }));
  }, []);

  // Update streak
  const updateStreak = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];

    setProgress(prev => {
      const lastDate = prev.lastActiveDate?.split('T')[0];

      if (lastDate === today) {
        // Already active today
        return prev;
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      const newStreak = lastDate === yesterdayStr
        ? prev.streakDays + 1  // Continue streak
        : 1;                    // Reset streak

      return {
        ...prev,
        streakDays: newStreak,
        lastActiveDate: today,
      };
    });
  }, []);

  // Reset all progress
  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return {
    progress,
    isLoaded,
    getLessonProgress,
    startLesson,
    updateLessonStep,
    completeLesson,
    getCourseProgress,
    recordPuzzleAttempt,
    updateStreak,
    resetProgress,
  };
};

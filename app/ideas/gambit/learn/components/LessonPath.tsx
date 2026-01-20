'use client';

import React, { useEffect, useRef } from 'react';
import { Course } from '../data/types';

interface LessonPathProps {
  course: Course;
  getLessonCompleted: (fullLessonId: string) => boolean;
  onSelectLesson: (lessonId: string) => void;
  onBack: () => void;
  isModernTheme: boolean;
}

type LessonState = 'not-started' | 'current' | 'completed';

const LessonPath: React.FC<LessonPathProps> = ({
  course,
  getLessonCompleted,
  onSelectLesson,
  onBack,
  isModernTheme,
}) => {
  const currentRef = useRef<HTMLDivElement>(null);

  // Determine lesson state
  const getLessonState = (index: number): LessonState => {
    const fullId = `${course.id}-${course.lessons[index].id}`;
    const isCompleted = getLessonCompleted(fullId);

    if (isCompleted) return 'completed';

    // Find first incomplete lesson to mark as current
    for (let i = 0; i < index; i++) {
      const id = `${course.id}-${course.lessons[i].id}`;
      if (!getLessonCompleted(id)) return 'not-started';
    }

    return 'current';
  };

  // Find current lesson for scrolling
  const currentIndex = course.lessons.findIndex((_, i) => {
    const state = getLessonState(i);
    return state === 'current';
  });

  // Auto-scroll to current lesson
  useEffect(() => {
    if (currentRef.current) {
      currentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  // Calculate overall progress
  const completedCount = course.lessons.filter((_, i) =>
    getLessonCompleted(`${course.id}-${course.lessons[i].id}`)
  ).length;

  // Style helpers
  const getNodeStyles = (state: LessonState, isCurrent: boolean) => {
    if (isModernTheme) {
      if (state === 'completed') {
        return 'border-[#81b64c] bg-[#81b64c] text-white';
      }
      if (isCurrent) {
        return 'border-[#81b64c] bg-[#312e2b] text-white ring-4 ring-[#81b64c]/30';
      }
      return 'border-[#5c5955] bg-[#312e2b] text-white hover:border-[#81b64c]';
    } else {
      if (state === 'completed') {
        return 'border-[var(--term-main)] bg-[var(--term-main)] text-[var(--term-bg)]';
      }
      if (isCurrent) {
        return 'border-[var(--term-main)] bg-transparent text-[var(--term-main)] ring-4 ring-[rgba(var(--term-main-rgb),0.3)]';
      }
      return 'border-[var(--term-dim)] bg-transparent text-[var(--term-main)] hover:border-[var(--term-main)]';
    }
  };

  const getConnectorColor = (prevCompleted: boolean) => {
    if (isModernTheme) {
      return prevCompleted ? 'bg-[#81b64c]' : 'bg-[#3d3a37]';
    }
    return prevCompleted ? 'bg-[var(--term-main)]' : 'bg-[var(--term-dim)]';
  };

  const difficultyColors = {
    beginner: isModernTheme ? 'text-green-400' : 'text-green-500',
    intermediate: isModernTheme ? 'text-yellow-400' : 'text-yellow-500',
    advanced: isModernTheme ? 'text-red-400' : 'text-red-500',
  };

  return (
    <div className={`h-full overflow-y-auto ${isModernTheme ? 'bg-[#262421]' : 'bg-[var(--term-bg)]'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-20 p-4 border-b ${isModernTheme ? 'border-[#3d3a37] bg-[#262421]' : 'border-[var(--term-dim)] bg-[var(--term-bg)]'}`}>
        <button
          onClick={onBack}
          className={`text-sm mb-2 cursor-pointer ${isModernTheme ? 'text-[#8b8987] hover:text-white' : 'text-[var(--term-dim)] hover:text-[var(--term-main)]'} transition-colors`}
        >
          ← Previous
        </button>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{course.icon}</span>
          <div className="flex-1">
            <h1 className={`text-lg font-bold ${isModernTheme ? 'text-white' : 'terminal-text-shadow'}`}>
              {course.title}
            </h1>
            <p className={`text-xs ${isModernTheme ? 'text-[#8b8987]' : 'text-[var(--term-dim)]'}`}>
              {completedCount}/{course.lessons.length} completed
            </p>
          </div>
        </div>
        {/* Progress bar */}
        <div className={`h-1.5 mt-3 rounded-full overflow-hidden ${isModernTheme ? 'bg-[#3d3a37]' : 'bg-[var(--term-dim)]'}`}>
          <div
            className={`h-full rounded-full transition-all duration-500 ${isModernTheme ? 'bg-[#81b64c]' : 'bg-[var(--term-main)]'}`}
            style={{ width: `${(completedCount / course.lessons.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Lesson Path */}
      <div className="py-6 px-4">
        <div className="flex flex-col items-center max-w-lg mx-auto">
          {course.lessons.map((lesson, index) => {
            const state = getLessonState(index);
            const isCurrent = state === 'current';
            const prevCompleted = index > 0 && getLessonState(index - 1) === 'completed';

            return (
              <div
                key={lesson.id}
                ref={isCurrent ? currentRef : null}
                className="w-full"
              >
                {/* Connector from previous */}
                {index > 0 && (
                  <div className="flex justify-center">
                    <div className={`w-0.5 h-6 ${getConnectorColor(prevCompleted)}`} />
                  </div>
                )}

                {/* Lesson Row */}
                <button
                  onClick={() => onSelectLesson(lesson.id)}
                  className={`
                    w-full p-3 rounded-xl border-2 transition-all cursor-pointer
                    flex items-center gap-3
                    ${getNodeStyles(state, isCurrent)}
                  `}
                >
                  {/* Node Circle */}
                  <div className={`
                    w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm
                    ${state === 'completed'
                      ? (isModernTheme ? 'border-white/30 bg-white/20' : 'border-[var(--term-bg)]/30 bg-[var(--term-bg)]/20')
                      : (isModernTheme ? 'border-[#5c5955] bg-[#262421]' : 'border-[var(--term-dim)] bg-[var(--term-bg)]')
                    }
                  `}>
                    {state === 'completed' ? '✓' : index + 1}
                  </div>

                  {/* Lesson Info */}
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="font-medium truncate">{lesson.title}</h3>
                    <div className="flex items-center gap-2 text-xs">
                      <span className={difficultyColors[lesson.difficulty]}>
                        {lesson.difficulty}
                      </span>
                      <span className={isModernTheme ? 'text-[#8b8987]' : 'text-[var(--term-dim)]'}>
                        • {lesson.estimatedMinutes}min
                      </span>
                    </div>
                  </div>

                  {/* Status indicator */}
                  {isCurrent && (
                    <span className={`
                      px-2 py-1 rounded text-xs font-bold uppercase
                      ${isModernTheme ? 'bg-[#81b64c] text-white' : 'bg-[var(--term-main)] text-[var(--term-bg)]'}
                    `}>
                      Start
                    </span>
                  )}
                  {state === 'completed' && (
                    <span className="text-lg">✓</span>
                  )}
                  {state === 'not-started' && (
                    <span className={isModernTheme ? 'text-[#8b8987]' : 'text-[var(--term-dim)]'}>→</span>
                  )}
                </button>
              </div>
            );
          })}

          {/* Completion Banner */}
          {completedCount === course.lessons.length && (
            <div className={`mt-8 px-6 py-4 rounded-lg text-center ${isModernTheme ? 'bg-[#81b64c]' : 'bg-[var(--term-main)]'}`}>
              <span className="text-3xl">🏆</span>
              <p className={`font-bold mt-2 ${isModernTheme ? 'text-white' : 'text-[var(--term-bg)]'}`}>
                Course Complete!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonPath;

'use client';

import React, { useEffect, useRef } from 'react';
import { Course } from '../data/types';

interface JourneyMapProps {
  courses: Course[];
  getCourseProgress: (courseId: string, totalLessons: number) => { completed: number; total: number; percentage: number };
  onSelectCourse: (course: Course) => void;
  onBack?: () => void;
  isModernTheme: boolean;
}

type NodeState = 'not-started' | 'in-progress' | 'completed';

const JourneyMap: React.FC<JourneyMapProps> = ({
  courses,
  getCourseProgress,
  onSelectCourse,
  onBack,
  isModernTheme,
}) => {
  const currentRef = useRef<HTMLDivElement>(null);

  // Determine node state for each course
  const getNodeState = (index: number): NodeState => {
    const progress = getCourseProgress(courses[index].id, courses[index].lessons.length);
    if (progress.percentage === 100) return 'completed';
    if (progress.percentage > 0) return 'in-progress';
    return 'not-started';
  };

  // Find first in-progress or not-started course
  const currentIndex = courses.findIndex((_, i) => {
    const state = getNodeState(i);
    return state === 'in-progress' || state === 'not-started';
  });

  // Auto-scroll to current position
  useEffect(() => {
    if (currentRef.current) {
      currentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  // Style helpers
  const getNodeStyles = (state: NodeState, isCurrentNode: boolean) => {
    if (isModernTheme) {
      if (state === 'completed') {
        return 'border-[#81b64c] bg-[#81b64c] text-white';
      }
      if (isCurrentNode) {
        return 'border-[#81b64c] bg-[#312e2b] text-white ring-4 ring-[#81b64c]/30';
      }
      return 'border-[#5c5955] bg-[#312e2b] text-white hover:border-[#81b64c]';
    } else {
      if (state === 'completed') {
        return 'border-[var(--term-main)] bg-[var(--term-main)] text-[var(--term-bg)]';
      }
      if (isCurrentNode) {
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

  return (
    <div className={`h-full overflow-y-auto ${isModernTheme ? 'bg-[#262421]' : 'bg-[var(--term-bg)]'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-20 p-4 border-b ${isModernTheme ? 'border-[#3d3a37] bg-[#262421]' : 'border-[var(--term-dim)] bg-[var(--term-bg)]'}`}>
        <div className="flex items-center justify-between">
          {onBack && (
            <button
              onClick={onBack}
              className={`text-sm cursor-pointer ${isModernTheme ? 'text-[#8b8987] hover:text-white' : 'text-[var(--term-dim)] hover:text-[var(--term-main)]'} transition-colors`}
            >
              ← Previous
            </button>
          )}
          <h1 className={`text-xl font-bold ${isModernTheme ? 'text-white' : 'terminal-text-shadow'}`}>
            Chess Journey
          </h1>
          <div className="w-16" />
        </div>
      </div>

      {/* Journey Path - Top to Bottom */}
      <div className="py-8 px-4">
        <div className="flex flex-col items-center max-w-md mx-auto">

          {/* Start Banner */}
          <div className={`mb-6 px-6 py-3 rounded-lg text-center ${isModernTheme ? 'bg-[#81b64c]' : 'bg-[var(--term-main)]'}`}>
            <span className="text-2xl">🚩</span>
            <p className={`text-sm font-bold uppercase tracking-wider ${isModernTheme ? 'text-white' : 'text-[var(--term-bg)]'}`}>
              Start Here
            </p>
          </div>

          {/* Course Nodes */}
          {courses.map((course, index) => {
            const state = getNodeState(index);
            const progress = getCourseProgress(course.id, course.lessons.length);
            const isCurrentNode = index === currentIndex;
            const prevCompleted = index > 0 && getNodeState(index - 1) === 'completed';

            return (
              <div
                key={course.id}
                ref={isCurrentNode ? currentRef : null}
                className="w-full"
              >
                {/* Connector from previous */}
                {index > 0 && (
                  <div className="flex justify-center">
                    <div className={`w-0.5 h-8 ${getConnectorColor(prevCompleted)}`} />
                  </div>
                )}

                {/* Course Node */}
                <button
                  onClick={() => onSelectCourse(course)}
                  className={`
                    w-full p-4 rounded-xl border-2 transition-all cursor-pointer
                    flex items-center gap-4
                    ${getNodeStyles(state, isCurrentNode)}
                  `}
                >
                  {/* Icon */}
                  <div className={`
                    w-14 h-14 rounded-full flex items-center justify-center text-2xl
                    ${isModernTheme ? 'bg-[#262421]' : 'bg-[var(--term-bg)]'}
                  `}>
                    {state === 'completed' ? '✓' : course.icon}
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-left">
                    <h3 className="font-bold text-lg">{course.title}</h3>
                    <p className={`text-sm ${isModernTheme ? 'text-[#8b8987]' : 'text-[var(--term-dim)]'}`}>
                      {progress.completed}/{progress.total} lessons
                    </p>
                    {/* Progress bar */}
                    {progress.percentage > 0 && progress.percentage < 100 && (
                      <div className={`h-1.5 mt-2 rounded-full overflow-hidden ${isModernTheme ? 'bg-[#262421]' : 'bg-[var(--term-bg)]'}`}>
                        <div
                          className={`h-full rounded-full ${isModernTheme ? 'bg-[#81b64c]' : 'bg-[var(--term-main)]'}`}
                          style={{ width: `${progress.percentage}%` }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Arrow / Status */}
                  <div className={`text-xl ${isModernTheme ? 'text-[#8b8987]' : 'text-[var(--term-dim)]'}`}>
                    {state === 'completed' ? '✓' : '→'}
                  </div>
                </button>
              </div>
            );
          })}

          {/* Connector to goal */}
          <div className="flex justify-center">
            <div className={`w-0.5 h-8 ${getConnectorColor(getNodeState(courses.length - 1) === 'completed')}`} />
          </div>

          {/* Goal Banner */}
          <div className={`mt-2 px-6 py-4 rounded-lg text-center border-2 ${
            isModernTheme
              ? 'border-[#3d3a37] bg-[#312e2b]'
              : 'border-[var(--term-dim)]'
          }`}>
            <span className="text-3xl">🏆</span>
            <p className={`text-sm font-bold uppercase tracking-wider mt-1 ${isModernTheme ? 'text-[#bababa]' : ''}`}>
              Verified Noob
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyMap;

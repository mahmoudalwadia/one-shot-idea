'use client';

import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Course, Lesson } from './data/types';
import { useProgress } from './hooks/useProgress';
import CourseNavigator from './CourseNavigator';
import LessonViewer from './LessonViewer';

// Import course data
import { fundamentalsCourse } from './data/fundamentals';
import { tacticsCourse } from './data/tactics';
import { openingsCourse } from './data/openings';
import { positionalCourse } from './data/positional';
import { midgameCourse } from './data/midgame';
import { endgamesCourse } from './data/endgames';
import { strategyCourse } from './data/strategy';

interface LearnModeProps {
  onBack: () => void;
  urlCourse: string | null;
  urlLesson: string | null;
  onUrlChange: (course: string | null, lesson: string | null) => void;
}

const LearnMode: React.FC<LearnModeProps> = ({ onBack, urlCourse, urlLesson, onUrlChange }) => {
  const [activeLesson, setActiveLesson] = useState<{
    courseId: string;
    lesson: Lesson;
    initialStep: number;
    startedAt: number; // Timestamp to force remount
  } | null>(null);

  // Ref to track intentional exit (prevents race condition with URL sync)
  const isExitingRef = useRef(false);

  const {
    progress,
    isLoaded,
    getLessonProgress,
    startLesson,
    updateLessonStep,
    completeLesson,
    getCourseProgress,
    updateStreak,
  } = useProgress();

  // Collect all courses
  const courses: Course[] = useMemo(() => [
    fundamentalsCourse,
    openingsCourse,
    tacticsCourse,
    positionalCourse,
    midgameCourse,
    endgamesCourse,
    strategyCourse,
  ], []);

  // Initialize activeLesson from URL on mount (not on intentional exit)
  useEffect(() => {
    // Reset exiting flag when URL lesson is cleared
    if (!urlLesson) {
      isExitingRef.current = false;
    }

    // Only initialize from URL if not intentionally exiting
    if (urlCourse && urlLesson && !activeLesson && !isExitingRef.current) {
      const course = courses.find(c => c.id === urlCourse);
      const lesson = course?.lessons.find(l => l.id === urlLesson);
      if (course && lesson) {
        const fullLessonId = `${urlCourse}-${urlLesson}`;
        startLesson(fullLessonId);
        updateStreak();
        // eslint-disable-next-line react-hooks/set-state-in-effect -- URL initialization on mount
        setActiveLesson({ courseId: urlCourse, lesson, initialStep: 0, startedAt: Date.now() });
      }
    }
  }, [urlCourse, urlLesson, courses, activeLesson, startLesson, updateStreak]);

  // Handle lesson selection
  const handleSelectLesson = useCallback((courseId: string, lessonId: string) => {
    const course = courses.find(c => c.id === courseId);
    const lesson = course?.lessons.find(l => l.id === lessonId);

    if (course && lesson) {
      const fullLessonId = `${courseId}-${lessonId}`;

      // Always start lessons from step 0 for consistent behavior
      startLesson(fullLessonId);
      updateStreak();
      setActiveLesson({ courseId, lesson, initialStep: 0, startedAt: Date.now() });
      onUrlChange(courseId, lessonId);
    }
  }, [courses, startLesson, updateStreak, onUrlChange]);

  // Handle lesson completion
  const handleLessonComplete = useCallback((stats: { attempts: number; correctOnFirstTry: number }) => {
    if (activeLesson) {
      const fullLessonId = `${activeLesson.courseId}-${activeLesson.lesson.id}`;
      completeLesson(fullLessonId, stats);
    }
  }, [activeLesson, completeLesson]);

  // Handle step update
  const handleUpdateStep = useCallback((stepIndex: number) => {
    if (activeLesson) {
      const fullLessonId = `${activeLesson.courseId}-${activeLesson.lesson.id}`;
      updateLessonStep(fullLessonId, stepIndex);
    }
  }, [activeLesson, updateLessonStep]);

  // Handle exit from lesson
  const handleExitLesson = useCallback(() => {
    // Set flag to prevent useEffect from re-initializing the lesson
    isExitingRef.current = true;
    setActiveLesson(null);
    // Clear lesson from URL but keep course if viewing a course
    onUrlChange(activeLesson?.courseId || null, null);
  }, [onUrlChange, activeLesson?.courseId]);

  // Check if lesson is completed
  const getLessonCompleted = useCallback((fullLessonId: string): boolean => {
    const lessonProgress = getLessonProgress(fullLessonId);
    return lessonProgress?.completed ?? false;
  }, [getLessonProgress]);

  // Show loading state
  if (!isLoaded) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-[var(--term-main)] animate-pulse">Loading...</div>
      </div>
    );
  }

  // Show lesson viewer if a lesson is active
  if (activeLesson) {
    return (
      <LessonViewer
        key={`${activeLesson.courseId}-${activeLesson.lesson.id}-${activeLesson.startedAt}`}
        lesson={activeLesson.lesson}
        courseId={activeLesson.courseId}
        onComplete={handleLessonComplete}
        onExit={handleExitLesson}
        onUpdateStep={handleUpdateStep}
        initialStepIndex={activeLesson.initialStep}
      />
    );
  }

  // Show course navigator
  return (
    <CourseNavigator
      courses={courses}
      onSelectLesson={handleSelectLesson}
      onBack={onBack}
      getCourseProgress={getCourseProgress}
      getLessonCompleted={getLessonCompleted}
      urlCourse={urlCourse}
      onCourseChange={(courseId) => onUrlChange(courseId, null)}
    />
  );
};

export default LearnMode;

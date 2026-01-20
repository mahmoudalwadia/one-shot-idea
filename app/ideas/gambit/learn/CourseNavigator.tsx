'use client';

import React, { useState, useEffect } from 'react';
import { Course } from './data/types';
import JourneyMap from './components/JourneyMap';
import LessonPath from './components/LessonPath';

interface CourseNavigatorProps {
  courses: Course[];
  onSelectLesson: (courseId: string, lessonId: string) => void;
  onBack?: () => void;
  getCourseProgress: (courseId: string, totalLessons: number) => { completed: number; total: number; percentage: number };
  getLessonCompleted: (lessonId: string) => boolean;
  urlCourse: string | null;
  onCourseChange: (courseId: string | null) => void;
}

const CourseNavigator: React.FC<CourseNavigatorProps> = ({
  courses,
  onSelectLesson,
  onBack,
  getCourseProgress,
  getLessonCompleted,
  urlCourse,
  onCourseChange,
}) => {
  const [isModernTheme, setIsModernTheme] = useState(false);

  // Initialize selectedCourse from URL or null
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(() => {
    if (urlCourse) {
      return courses.find(c => c.id === urlCourse) || null;
    }
    return null;
  });

  // Sync selectedCourse with URL when urlCourse changes (e.g., browser back/forward)
  useEffect(() => {
    if (urlCourse) {
      const course = courses.find(c => c.id === urlCourse);
      if (course && course.id !== selectedCourse?.id) {
        setSelectedCourse(course);
      }
    } else if (selectedCourse) {
      setSelectedCourse(null);
    }
  }, [urlCourse, courses, selectedCourse?.id]);

  // Handle course selection with URL update
  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    onCourseChange(course.id);
  };

  // Handle going back to course list with URL update
  const handleBackToCourses = () => {
    setSelectedCourse(null);
    onCourseChange(null);
  };

  // Handle lesson selection
  const handleSelectLesson = (lessonId: string) => {
    if (selectedCourse) {
      onSelectLesson(selectedCourse.id, lessonId);
    }
  };

  useEffect(() => {
    const checkTheme = () => {
      setIsModernTheme(document.body.classList.contains('theme-modern'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Journey Map View (Course Selection)
  if (!selectedCourse) {
    return (
      <JourneyMap
        courses={courses}
        getCourseProgress={getCourseProgress}
        onSelectCourse={handleSelectCourse}
        onBack={onBack}
        isModernTheme={isModernTheme}
      />
    );
  }

  // Lesson Path View (Lesson Selection)
  return (
    <LessonPath
      course={selectedCourse}
      getLessonCompleted={getLessonCompleted}
      onSelectLesson={handleSelectLesson}
      onBack={handleBackToCourses}
      isModernTheme={isModernTheme}
    />
  );
};

export default CourseNavigator;

import { useState, useContext } from 'react';
import { CourseSelectionManager, CourseDisplayInfo } from '@/api';
import { CourseDisplayInfoCtx } from '@/CourseDisplayInfoCtx';

export function useCourseSelection(initialSelection: number[] = []) {
  const courses = useContext(CourseDisplayInfoCtx);

  const [selectedCourseIds, setSelectedCourseIds] = useState<Set<number>>(new Set(initialSelection));
  const [courseManager] = useState<CourseSelectionManager>(new CourseSelectionManager(initialSelection));
  
  // Toggle a single course
  const toggleCourse = (courseId: number) => {
    courseManager.toggle(courseId);
    setSelectedCourseIds(new Set(courseManager.getSelectedCourseIds()));
  };
  
  // Add all courses from a term
  const addCoursesByTerm = (major: string, term: number) => {
    const coursesInTerm = courses[major]?.[term] ?? [];
    coursesInTerm.forEach((course) => {
      if (!courseManager.isin(course.id)) {
        courseManager.toggle(course.id);
      }
    });
    setSelectedCourseIds(new Set(courseManager.getSelectedCourseIds()));
  };
  
  // Get courses for a specific period
  const getCoursesForPeriod = (major: string, period: number): CourseDisplayInfo[] => {
    return courses[major]?.[period] ?? [];
  };
  
  return {
    selectedCourseIds,
    toggleCourse,
    addCoursesByTerm,
    getCoursesForPeriod,
    resetSelection: () => {
      courseManager.setSelectedCourseIds([]);
      setSelectedCourseIds(new Set());
    }
  };
}

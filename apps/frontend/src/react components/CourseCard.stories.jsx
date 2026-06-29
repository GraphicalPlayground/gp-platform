import React from 'react';
import CourseCard from './CourseCard.jsx';

export default { title: 'Components/CourseCard' };

const exampleCourse = {
  id: 'c1',
  track: 'Foundations',
  title: 'Intro to Math for Graphics',
  color: '#38bdf8',
  completedLessons: 2,
  totalLessons: 10,
  lastLesson: { title: 'Vectors 101', at: new Date().toISOString() }
};

export const Started = () => <CourseCard course={exampleCourse} onContinue={() => alert('continue')} onStart={() => alert('start')} />;

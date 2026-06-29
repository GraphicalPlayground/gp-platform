import React from 'react';
import RecentLessonRow from './RecentLessonRow.jsx';

export default { title: 'Components/RecentLessonRow' };

const course = { id: 'c1', title: 'Intro', color: '#38bdf8', lastLesson: { title: 'Vectors 101', at: new Date().toISOString() } };

export const Example = () => <RecentLessonRow course={course} />;

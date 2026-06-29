import React from 'react';
import ProgressBar from './ProgressBar.jsx';
import Icon from './Icons.jsx';

function pct(done, total) {
  return total > 0 ? Math.round((done / total) * 100) : 0;
}

export default function CourseCard({ animClass = '', course, onContinue = () => {}, onStart = () => {} }) {
  const p = pct(course.completedLessons, course.totalLessons);
  const started = course.completedLessons > 0;

  return (
    <div className={`db-card flex flex-col gap-4 p-5 ${animClass}`}>
      <div className='flex items-start justify-between gap-3'>
        <div>
          <span className='text-[10px] font-bold tracking-[1.5px] uppercase' style={{ color: course.color }}>
            {course.track}
          </span>
          <h3 className='mt-0.5 text-[14px] leading-snug font-bold text-white'>{course.title}</h3>
        </div>
        <span className='shrink-0 text-[12px] font-semibold' style={{ color: started ? course.color : '#475569' }}>
          {p}%
        </span>
      </div>

      <ProgressBar value={p} color={course.color} />

      <div className='flex items-center justify-between text-[12px] text-slate-500'>
        <span>
          {course.completedLessons} / {course.totalLessons} lessons
        </span>
        {course.lastLesson && (
          <span className='max-w-[180px] truncate text-slate-600'>Last: {course.lastLesson.title}</span>
        )}
      </div>

      <button className='db-btn-primary w-full justify-center' onClick={() => (started ? onContinue(course) : onStart(course))}>
        {started ? Icon.play : Icon.plus}
        {started ? 'Continue' : 'Start course'}
      </button>
    </div>
  );
}

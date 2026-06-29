import React from 'react';
import Icon from './Icons.jsx';

export default function RecentLessonRow({ course }) {
  if (!course.lastLesson) return null;

  const relTime = (iso) => {
    if (!iso) return '';
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1) return 'just now';
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    return `${d}d ago`;
  };

  return (
    <div className='group flex cursor-pointer items-center gap-4 rounded-[10px] px-3 py-3 transition-colors hover:bg-white/[.04]'>
      <div
        className='flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px]'
        style={{ background: `${course.color}18`, border: `1px solid ${course.color}30` }}
      >
        <span style={{ color: course.color }}>{Icon.play}</span>
      </div>
      <div className='min-w-0 flex-1'>
        <p className='truncate text-[13px] font-medium text-slate-200'>{course.lastLesson.title}</p>
        <p className='mt-0.5 text-[11px] text-slate-500'>{course.title}</p>
      </div>
      <div className='flex shrink-0 items-center gap-2'>
        <span className='text-[11px] text-slate-600'>{relTime(course.lastLesson.at)}</span>
        <span className='text-slate-600 opacity-0 transition-opacity group-hover:opacity-100'>{Icon.arrow}</span>
      </div>
    </div>
  );
}

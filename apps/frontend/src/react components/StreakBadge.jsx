import React from 'react';
import Icon from './Icons.jsx';

export default function StreakBadge({ streak = 1 }) {
  return (
    <div className='db-streak-anim flex flex-col items-center gap-1'>
      <div
        className='db-glow-pop flex h-12 w-12 items-center justify-center rounded-full'
        style={{
          background: 'linear-gradient(135deg,rgba(251,146,60,.15),rgba(239,68,68,.12))',
          border: '1px solid rgba(251,146,60,.3)'
        }}
      >
        <span style={{ color: '#fb923c', fontSize: 20 }}>{Icon.flame}</span>
      </div>
      <span className='text-[18px] font-extrabold' style={{ color: '#fb923c' }}>
        {streak}
      </span>
      <span className='text-[10px] tracking-[1px] text-slate-500 uppercase'>day streak</span>
    </div>
  );
}

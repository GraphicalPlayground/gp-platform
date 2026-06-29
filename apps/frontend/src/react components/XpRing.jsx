import React from 'react';

export default function XpRing({ level = 1, maxXp = 500, xp = 0 }) {
  const R = 44;
  const CIRC = 2 * Math.PI * R;
  const percent = Math.min(xp / maxXp, 1);
  const offset = CIRC * (1 - percent);

  return (
    <div className='relative flex items-center justify-center' style={{ height: 110, width: 110 }}>
      <div
        className='absolute inset-0 rounded-full opacity-30 blur-[18px]'
        style={{ background: 'radial-gradient(circle,#0ea5e9,transparent 70%)' }}
      />
      <svg width='110' height='110' viewBox='0 0 110 110' style={{ transform: 'rotate(-90deg)' }}>
        <circle cx='55' cy='55' r={R} fill='none' stroke='rgba(255,255,255,.06)' strokeWidth='7' />
        <circle
          className='db-ring'
          cx='55'
          cy='55'
          r={R}
          fill='none'
          stroke='url(#xpGrad)'
          strokeWidth='7'
          strokeLinecap='round'
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
          style={{ '--full': CIRC, '--offset': offset }}
        />
        <defs>
          <linearGradient id='xpGrad' x1='0' y1='0' x2='1' y2='0'>
            <stop offset='0%' stopColor='#0ea5e9' />
            <stop offset='100%' stopColor='#a855f7' />
          </linearGradient>
        </defs>
      </svg>
      <div className='absolute flex flex-col items-center leading-none'>
        <span className='mb-0.5 text-[11px] font-bold tracking-[1px] text-slate-500 uppercase'>LVL</span>
        <span className='db-shimmer-text text-[26px] font-extrabold'>{level}</span>
        <span className='mt-0.5 text-[10px] text-slate-600'>{xp} / {maxXp} XP</span>
      </div>
    </div>
  );
}

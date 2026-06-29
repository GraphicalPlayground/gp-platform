import React from 'react';

export default function ProgressBar({ color = '#38bdf8', value = 0 }) {
  return (
    <div className='h-1.5 w-full overflow-hidden rounded-full' style={{ background: 'rgba(255,255,255,.08)' }}>
      <div
        className='h-full rounded-full'
        style={{
          background: color,
          transition: 'width .5s ease',
          width: `${value}%`
        }}
      />
    </div>
  );
}

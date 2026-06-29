import React from 'react';

export default function Stat({ color = '#38bdf8', label, value }) {
  return (
    <div className='db-card flex flex-col gap-1 px-4 py-3'>
      <span className='text-[22px] font-extrabold' style={{ color }}>
        {value}
      </span>
      <span className='text-[11px] tracking-[1px] text-slate-500 uppercase'>{label}</span>
    </div>
  );
}

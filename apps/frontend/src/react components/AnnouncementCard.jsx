import React from 'react';
import Icon from './Icons.jsx';

export default function AnnouncementCard({ ann, onDismiss = () => {} }) {
  const ANN_META = {
    new: { bg: 'rgba(56,189,248,.10)', color: '#38bdf8', icon: Icon.new, label: 'New' },
    tip: { bg: 'rgba(251,191,36,.10)', color: '#fbbf24', icon: Icon.tip, label: 'Tip' },
    update: { bg: 'rgba(52,211,153,.10)', color: '#34d399', icon: Icon.check, label: 'Update' }
  };

  const meta = ANN_META[ann.type] ?? ANN_META.tip;

  return (
    <div className='db-card flex gap-3 px-4 py-4' style={{ opacity: ann.read ? 0.5 : 1, transition: 'opacity .3s' }}>
      <div
        className='mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px]'
        style={{ background: meta.bg, color: meta.color }}
      >
        {meta.icon}
      </div>
      <div className='min-w-0 flex-1'>
        <div className='flex items-start justify-between gap-2'>
          <p className='text-[13px] leading-snug font-semibold text-slate-200'>{ann.title}</p>
          <span className='shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold' style={{ background: meta.bg, color: meta.color }}>
            {meta.label}
          </span>
        </div>
        <p className='mt-1 text-[12px] leading-[1.6] text-slate-400'>{ann.body}</p>
        <div className='mt-2 flex items-center justify-between'>
          <span className='text-[11px] text-slate-600'>{ann.at}</span>
          {!ann.read && (
            <button className='text-[11px] text-sky-500 transition-colors hover:text-sky-400' onClick={() => onDismiss(ann.id)}>
              Mark read
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

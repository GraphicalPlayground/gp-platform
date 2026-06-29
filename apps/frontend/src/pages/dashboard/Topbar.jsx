import React from 'react';
import { LogoCompact } from '../../components/Logo.jsx';

export default function Topbar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div
      className='fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-4 py-3 md:hidden'
      style={{
        backdropFilter: 'blur(14px)',
        background: 'rgba(6,6,10,.90)',
        borderBottom: '1px solid rgba(255,255,255,.06)'
      }}
    >
      <LogoCompact size={28} />
      <button onClick={() => setSidebarOpen((v) => !v)} className='p-1 text-slate-400 hover:text-white'>
        {sidebarOpen ? (
          <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <line x1='18' y1='6' x2='6' y2='18' />
            <line x1='6' y1='6' x2='18' y2='18' />
          </svg>
        ) : (
          <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <line x1='3' y1='6' x2='21' y2='6' />
            <line x1='3' y1='12' x2='21' y2='12' />
            <line x1='3' y1='18' x2='21' y2='18' />
          </svg>
        )}
      </button>
    </div>
  );
}

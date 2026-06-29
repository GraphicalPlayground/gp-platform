import React from 'react';
import { LogoCompact } from './Logo.jsx';

export function NavItem({ active, icon, label, onClick }) {
  return (
    <button className={`db-nav-item${active ? ' active' : ''}`} onClick={onClick}>
      {icon}
      <span>{label}</span>
    </button>
  );
}

export function Sidebar({ mobile = false, children, style }) {
  return (
    <aside
      className={mobile ? 'flex flex-col gap-1' : 'flex h-full flex-col gap-1'}
      style={mobile ? {} : { flexShrink: 0, width: 220, ...style }}
    >
      {!mobile && (
        <div className='mb-6 px-1'>
          <LogoCompact size={30} href='/' />
        </div>
      )}

      {children}
    </aside>
  );
}

export default Sidebar;

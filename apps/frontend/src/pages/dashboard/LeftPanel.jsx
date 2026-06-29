import React from 'react';
import { LogoCompact } from '../../components/Logo.jsx';
import { NavItem, Sidebar as SidebarWrapper } from '../../components/Navbar.jsx';
import Icon from '../../components/Icons.jsx';

export default function LeftPanel({ unreadCount, tab, changeTab, logout, navigate }) {
  return (
    <div
      className='sticky top-0 hidden h-screen flex-col px-4 py-6 md:flex'
      style={{
        backdropFilter: 'blur(12px)',
        background: 'rgba(6,6,10,.6)',
        borderRight: '1px solid rgba(255,255,255,.06)',
        width: 240
      }}
    >
      <SidebarWrapper>
        <NavItem icon={Icon.grid} label='Dashboard' active={tab === 'dashboard'} onClick={() => changeTab('dashboard')} />
        <NavItem icon={Icon.book} label='My Courses' active={tab === 'courses'} onClick={() => changeTab('courses')} />
        <NavItem icon={Icon.map} label='Catalog' active={false} onClick={() => navigate('/catalog')} />
        <NavItem
          icon={Icon.bell}
          label={unreadCount > 0 ? `Notifications (${unreadCount})` : 'Notifications'}
          active={tab === 'notifs'}
          onClick={() => changeTab('notifs')}
        />

        <div className='flex-1' />
        <div className='mt-4 pt-4' style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <NavItem icon={Icon.user} label='Profile' active={tab === 'profile'} onClick={() => changeTab('profile')} />
          <NavItem icon={Icon.settings} label='Settings' active={tab === 'settings'} onClick={() => changeTab('settings')} />
          <NavItem
            icon={Icon.logout}
            label='Sign Out'
            active={false}
            onClick={() => {
              logout();
              navigate('/', { replace: true });
            }}
          />
        </div>
      </SidebarWrapper>
    </div>
  );
}

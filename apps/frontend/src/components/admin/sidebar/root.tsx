// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/utils/cn';
import { Link } from '@/components/link';
import { UserButton } from '@clerk/nextjs';
import { useMediaQuery, MediaQueries } from '@/hooks/use-media-query';

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  defaultCollapsed?: boolean;
}

export const SidebarContext = React.createContext<{
  collapsed: boolean;
  toggleCollapsed: () => void;
  mobileOpen: boolean;
  toggleMobileOpen: () => void;
}>({
  collapsed: false,
  toggleCollapsed: () => {},
  mobileOpen: false,
  toggleMobileOpen: () => {}
});

export const SidebarMobileTrigger: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  const { toggleMobileOpen } = React.useContext(SidebarContext);

  return (
    <button
      aria-label='Open navigation'
      onClick={toggleMobileOpen}
      className={cn(
        'flex md:hidden flex-col justify-center items-center gap-1.5 w-10 h-10 rounded-[10px] hover:bg-[#E3E9F0] transition-colors',
        className
      )}
      {...props}
    >
      <span className='block w-5 h-px bg-[#292D32]' />
      <span className='block w-5 h-px bg-[#292D32]' />
      <span className='block w-5 h-px bg-[#292D32]' />
    </button>
  );
};

export const SidebarRoot: React.FC<SidebarProps> = ({ className, defaultCollapsed = false, children, ...props }) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery(MediaQueries.isMobile);

  useEffect(() => {
    setCollapsed(!isMobile);
    if (isMobile && mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, mobileOpen]);

  const toggleCollapsed = useCallback(() => setCollapsed((c) => !c), []);
  const toggleMobileOpen = useCallback(() => setMobileOpen((o) => !o), []);

  const sidebarContent = (
    <>
      <Link href='/' className='w-full' onClick={() => isMobile && setMobileOpen(false)}>
        {collapsed && !isMobile ? (
          <div className='w-11 h-11 rounded-[10px] bg-(--gp-primary) flex justify-center items-center py-3'>
            <img src='/images/logo-icon-black.svg' alt='Graphical Playground Logo' className='h-full' />
          </div>
        ) : (
          <div className='w-full h-11 py-2.5 flex justify-center items-center bg-(--gp-primary) rounded-[10px]'>
            <img src='/images/logo-short-text-black.svg' alt='Graphical Playground Logo' className='h-full' />
          </div>
        )}
      </Link>
      <div className='flex flex-col w-full gap-2.5'>{children}</div>
      <div className='w-full h-full flex flex-col justify-end items-center'>
        <UserButton appearance={{ elements: { avatarBox: 'w-8! h-8!' } }} />
      </div>
    </>
  );

  return (
    <SidebarContext.Provider value={{ collapsed, toggleCollapsed, mobileOpen, toggleMobileOpen }}>
      <SidebarMobileTrigger />
      <aside
        className={cn(
          'hidden md:flex bg-white overflow-y-auto h-screen flex-col gap-3.75 px-2.5 py-5 shadow-xl duration-100',
          className
        )}
        style={{ width: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-expanded-width)' }}
        {...props}
      >
        {sidebarContent}
      </aside>

      {isMobile && (
        <>
          <div
            aria-hidden='true'
            onClick={() => setMobileOpen(false)}
            className={cn(
              'fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-200 md:hidden',
              mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            )}
          />

          <aside
            className={cn(
              'fixed inset-y-0 left-0 z-50 flex flex-col gap-3.75 px-2.5 py-5',
              'bg-white shadow-xl duration-200 ease-in-out md:hidden',
              'transition-transform overflow-y-auto',
              mobileOpen ? 'translate-x-0' : '-translate-x-full',
              className
            )}
            style={{ width: 'var(--sidebar-expanded-width)' }}
            aria-modal='true'
            role='dialog'
            aria-label='Navigation'
            {...props}
          >
            <button
              aria-label='Close navigation'
              onClick={() => setMobileOpen(false)}
              className='absolute top-4 right-3 w-8 h-8 flex items-center justify-center rounded-2xl hover:bg-[#E3E9F0] transition-colors'
            >
              <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
                <path d='M1 1l12 12M13 1L1 13' stroke='#292D32' strokeWidth='1.75' strokeLinecap='round' />
              </svg>
            </button>

            {sidebarContent}
          </aside>
        </>
      )}
    </SidebarContext.Provider>
  );
};

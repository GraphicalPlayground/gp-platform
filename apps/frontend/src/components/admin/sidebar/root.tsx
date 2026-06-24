// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { Link } from '@/components/link';
import { UserButton } from '@clerk/nextjs';

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  defaultCollapsed?: boolean;
}

export const SidebarContext = React.createContext<{ collapsed: boolean; toggleCollapsed: () => void }>({
  collapsed: false,
  toggleCollapsed: () => {}
});

export const SidebarRoot: React.FC<SidebarProps> = ({ className, defaultCollapsed = false, children, ...props }) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <SidebarContext.Provider value={{ collapsed, toggleCollapsed: () => setCollapsed(!collapsed) }}>
      <aside
        className={cn('bg-white h-screen flex flex-col gap-3.75 px-2.5 py-5 shadow-xl duration-100', className)}
        style={{ width: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-expanded-width)' }}
        {...props}
      >
        <Link href='/' className='w-full'>
          {collapsed ? (
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
      </aside>
    </SidebarContext.Provider>
  );
};

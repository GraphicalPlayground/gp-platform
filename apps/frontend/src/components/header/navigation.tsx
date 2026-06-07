// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { cn } from '@/utils/cn';
import React from 'react';

export interface HeaderNavigationProps extends React.HTMLAttributes<HTMLDivElement> {}

export const HeaderNavigation: React.FC<HeaderNavigationProps> = ({ children, className, ...rest }) => {
  return (
    <nav className={cn('h-full items-center flex-row hidden lg:flex absolute left-1/2 -translate-x-1/2', className)} {...rest}>
      <ul className='flex-row flex items-center h-full'>{children}</ul>
    </nav>
  );
};

export interface HeaderNavDropdownProps extends React.HTMLAttributes<HTMLLIElement> {
  label: string;
}

export const HeaderNavDropdown: React.FC<HeaderNavDropdownProps> = ({ children, label, className, ...rest }) => {
  return (
    <li className={cn('px-4', className)} {...rest}>
      <button className='pt-1 hover:font-bold cursor-pointer gap-1.25 flex-row flex h-full'>
        <span>{label}</span>
        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none'>
          <path stroke='#000' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m5 8 5 5 5-5'></path>
        </svg>
      </button>
      <div className='hidden'>{children}</div>
    </li>
  );
};

export interface HeaderNavItemProps extends React.HTMLAttributes<HTMLLIElement> {
  href: string;
}

export const HeaderNavItem: React.FC<HeaderNavItemProps> = ({ children, href, className, ...rest }) => {
  return (
    <li className={cn('px-4', className)} {...rest}>
      <a href={href} className='pt-1 flex flex-row gap-1.25 hover:font-bold cursor-pointer'>
        {children}
      </a>
    </li>
  );
};

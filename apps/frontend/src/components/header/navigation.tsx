// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { cn } from '@/utils/cn';
import React from 'react';
import { Link } from '@/components/link';

export interface HeaderNavigationProps extends React.HTMLAttributes<HTMLDivElement> { }

export const HeaderNavigation: React.FC<HeaderNavigationProps> = ({ children, className, ...rest }) => {
  return (
    <nav
      className={cn('h-full items-center flex-row hidden lg:flex absolute left-1/2 -translate-x-1/2', className)}
      {...rest}
    >
      <ul className='flex flex-row items-center h-full'>{children}</ul>
    </nav>
  );
};

export interface HeaderNavDropdownProps extends React.HTMLAttributes<HTMLLIElement> {
  label: string;
}

export interface HeaderNavDropdownItemProps {
  href: string;
  title: string;
  description?: string;
  className?: string;
}

const HeaderNavDropdownItem: React.FC<HeaderNavDropdownItemProps> = ({
  href,
  title,
  description,
  className
}) => {
  return (
    <Link
      href={href}
      className={cn('block rounded-lg p-3 hover:bg-neutral-100 transition-colors', className)}
    >
      <div className='font-medium'>{title}</div>
      {description && (
        <div className='mt-1 text-sm text-neutral-500'>
          {description}
        </div>
      )}
    </Link>
  );
};

type HeaderNavDropdownComponent = React.FC<HeaderNavDropdownProps> & {
  Item: typeof HeaderNavDropdownItem;
};

export const HeaderNavDropdown = (({
  children,
  label,
  className,
  ...rest
}) => {
  return (
    <li className={cn('relative px-4 group', className)} {...rest}>
      <button className='pt-1 hover:font-bold cursor-pointer gap-1.25 flex flex-row h-full items-center'>
        <span>{label}</span>

        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none'>
          <path
            stroke='#000'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            d='m5 8 5 5 5-5'
          />
        </svg>
      </button>

      <div className='absolute left-0 top-full pt-2'>
        <div className='hidden group-hover:block min-w-80 rounded-xl border bg-white shadow-xl p-2 z-50'>
          {children}
        </div>
      </div>
    </li>
  );
}) as HeaderNavDropdownComponent;

HeaderNavDropdown.Item = HeaderNavDropdownItem;

export interface HeaderNavItemProps extends React.HTMLAttributes<HTMLLIElement> {
  href: string;
}

export const HeaderNavItem: React.FC<HeaderNavItemProps> = ({
  children,
  href,
  className,
  ...rest
}) => {
  return (
    <li className={cn('px-4', className)} {...rest}>
      <Link
        href={href}
        className='pt-1 flex flex-row gap-1.25 hover:font-bold cursor-pointer'
      >
        {children}
      </Link>
    </li>
  );
};
// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import { Button, Tooltip } from '@gp/react';
import type { ButtonProps } from '@gp/react';
import { cn } from '@/utils/cn';
import { SidebarContext } from './root';
import { useRouter } from 'next/navigation';

export const SidebarNavSection: React.FC<React.HTMLAttributes<HTMLLIElement> & { title?: string }> = ({
  title,
  children,
  className,
  ...props
}) => {
  const { collapsed } = React.useContext(SidebarContext);

  return (
    <li className={cn('w-full flex flex-col gap-2.5', className)} {...props}>
      <div className='h-4.5 flex justify-between items-center px-3 gap-2.5'>
        {!collapsed && title && <h3 className='text-sm font-light'>{title}</h3>}
        <div className='w-full h-px bg-[#E3E9F0]'></div>
      </div>
      <ul className='flex flex-col gap-1'>{children}</ul>
    </li>
  );
};

export interface SidebarNavItemProps extends ButtonProps {
  href: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children?: React.ReactNode;
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ children, className, href, icon, ...props }) => {
  const { collapsed } = React.useContext(SidebarContext);
  const router = useRouter();

  return (
    <li className={cn('w-full', className)}>
      <Tooltip delay={100} closeDelay={200} isDisabled={!collapsed}>
        <Tooltip.Trigger className='w-full'>
          <Button
            {...props}
            variant='ghost'
            className='w-full rounded-[10px] h-10 justify-start overflow-hidden px-3 flex items-center py-0 hover:bg-[#E3E9F0]'
            onClick={(e) => {
              e.preventDefault();
              router.push(href);
            }}
          >
            {icon &&
              React.createElement(icon, {
                className: 'h-[20px] w-[20px] shrink-0 mx-0 my-0 px-0 py-0 gap-2.5',
                color: '#292D32'
              })}
            {!collapsed && <span className='text-xs mt-0.5'>{children}</span>}
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content placement='right' className='px-2 py-2'>
          {children}
        </Tooltip.Content>
      </Tooltip>
    </li>
  );
};

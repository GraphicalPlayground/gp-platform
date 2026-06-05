// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { cn } from '@/utils/cn';

export interface FooterNavGridProps extends React.HTMLAttributes<HTMLDivElement> {}

export const FooterNavGrid: React.FC<FooterNavGridProps> = ({ children, className, ...rest }) => {
  return (
    <div
      className={cn(
        `min-[860px]:flex min-[860px]:flex-wrap min-[860px]:justify-between min-[860px]:gap-x-[5%] min-[860px]:gap-y-16 xl:grid xl:grid-cols-[repeat(4,auto)] xl:justify-between xl:gap-0 w-full`,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export interface FooterColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const FooterColumn: React.FC<FooterColumnProps> = ({ children, className, title, ...rest }) => {
  return (
    <div className={cn('flex flex-col gap-5.5', className)} {...rest}>
      {title && <h3 className='uppercase text-white font-medium'>{title}</h3>}
      <ul className='border-none outline-none m-0 p-0 text-white'>{children}</ul>
    </div>
  );
};

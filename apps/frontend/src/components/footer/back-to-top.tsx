// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { cn } from '@/utils/cn';
import React from 'react';

export interface FooterBackToTopProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'children'> {}

export const FooterBackToTop: React.FC<FooterBackToTopProps> = ({ className, ...rest }) => {
  return (
    <button
      className={cn(
        'text-sm text-white rounded-full border border-white w-8.5 h-8.5 flex justify-center items-center cursor-pointer hover:text-black hover:bg-white transition-colors',
        className
      )}
      role='button'
      onClick={() => {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }}
      {...rest}
    >
      <svg xmlns='http://www.w3.org/2000/svg' width='26' height='26' fill='none'>
        <path
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.08'
          d='M19.12 14.8 13 8.68 6.88 14.8'
        ></path>
      </svg>
    </button>
  );
};

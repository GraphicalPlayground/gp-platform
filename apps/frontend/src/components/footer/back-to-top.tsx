// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { cn } from '@/utils/cn';
import React from 'react';
import { Button } from '@gp/react';
import type { ButtonProps } from '@gp/react';

export interface FooterBackToTopProps extends ButtonProps {}

export const FooterBackToTop: React.FC<FooterBackToTopProps> = ({ className, ...rest }) => {
  return (
    <Button
      className={cn(
        'text-sm text-white rounded-full border border-white w-8.5 h-8.5 bg-transparent cursor-pointer hover:text-black hover:bg-white transition-colors flex items-center justify-center',
        className
      )}
      type='button'
      onClick={() => {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }}
      {...rest}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='26'
        height='26'
        fill='none'
        className='w-6.5 h-6.5'
        viewBox='0 0 26 26'
      >
        <path
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.08'
          d='M19.12 14.8 13 8.68 6.88 14.8'
        ></path>
      </svg>
    </Button>
  );
};

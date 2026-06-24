// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { IconProps } from './types';

export const StatusUpIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    className={className}
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M5.73333 15.125V13.4' stroke={color} strokeWidth='1.5' strokeLinecap='round' />
    <path d='M10 15.125V11.675' stroke={color} strokeWidth='1.5' strokeLinecap='round' />
    <path d='M14.2667 15.125V9.94165' stroke={color} strokeWidth='1.5' strokeLinecap='round' />
    <path
      d='M14.2667 4.875L13.8833 5.325C11.7583 7.80833 8.90833 9.56667 5.73333 10.3583'
      stroke={color}
      strokeWidth='1.5'
      strokeLinecap='round'
    />
    <path
      d='M11.825 4.875H14.2667V7.30833'
      stroke={color}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M7.5 18.3334H12.5C16.6667 18.3334 18.3333 16.6667 18.3333 12.5V7.50002C18.3333 3.33335 16.6667 1.66669 12.5 1.66669H7.5C3.33333 1.66669 1.66667 3.33335 1.66667 7.50002V12.5C1.66667 16.6667 3.33333 18.3334 7.5 18.3334Z'
      stroke={color}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

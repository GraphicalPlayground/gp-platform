// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { IconProps } from './types';

export const DocumentTextIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    className={className}
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M18.3333 8.33335V12.5C18.3333 16.6667 16.6667 18.3334 12.5 18.3334H7.5C3.33333 18.3334 1.66667 16.6667 1.66667 12.5V7.50002C1.66667 3.33335 3.33333 1.66669 7.5 1.66669H11.6667'
      stroke={color}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M18.3333 8.33335H15C12.5 8.33335 11.6667 7.50002 11.6667 5.00002V1.66669L18.3333 8.33335Z'
      stroke={color}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path d='M5.83333 10.8333H10.8333' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M5.83333 14.1667H9.16667' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

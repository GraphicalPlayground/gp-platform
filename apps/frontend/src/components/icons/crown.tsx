// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { IconProps } from './types';

export const CrownIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    className={className}
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M16.7 18.9799H7.29995C6.87995 18.9799 6.40995 18.6499 6.26995 18.2499L2.12995 6.66986C1.53996 5.00986 2.22996 4.49986 3.64996 5.51986L7.54995 8.30986C8.19995 8.75986 8.93995 8.52986 9.21995 7.79986L10.98 3.10986C11.54 1.60986 12.47 1.60986 13.03 3.10986L14.79 7.79986C15.07 8.52986 15.81 8.75986 16.45 8.30986L20.11 5.69986C21.67 4.57986 22.42 5.14986 21.78 6.95986L17.74 18.2699C17.59 18.6499 17.12 18.9799 16.7 18.9799Z'
      stroke={color}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path d='M6.5 22H17.5' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M9.5 14H14.5' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

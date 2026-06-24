// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { IconProps } from './types';

export const BoxIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    className={className}
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M2.64168 6.20001L10 10.4583L17.3083 6.22499'
      stroke={color}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path d='M10 18.0084V10.45' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    <path
      d='M8.27499 2.06669L3.825 4.54171C2.81666 5.10005 1.99168 6.50003 1.99168 7.65003V12.3584C1.99168 13.5084 2.81666 14.9084 3.825 15.4667L8.27499 17.9417C9.22499 18.4667 10.7833 18.4667 11.7333 17.9417L16.1833 15.4667C17.1917 14.9084 18.0167 13.5084 18.0167 12.3584V7.65003C18.0167 6.50003 17.1917 5.10005 16.1833 4.54171L11.7333 2.06669C10.775 1.53335 9.22499 1.53335 8.27499 2.06669Z'
      stroke={color}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M14.1667 11.0333V7.98333L6.25834 3.41663'
      stroke={color}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

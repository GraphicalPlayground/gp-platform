// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { IconProps } from './types';

export const TeacherIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    className={className}
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M10.05 2.52979L4.03002 6.45979C2.10002 7.71979 2.10002 10.5398 4.03002 11.7998L10.05 15.7298C11.13 16.4398 12.91 16.4398 13.99 15.7298L19.98 11.7998C21.9 10.5398 21.9 7.72979 19.98 6.46979L13.99 2.53979C12.91 1.81979 11.13 1.81979 10.05 2.52979Z'
      stroke={color}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M5.63 13.0801L5.62 17.7701C5.62 19.0401 6.6 20.4001 7.8 20.8001L10.99 21.8601C11.54 22.0401 12.45 22.0401 13.01 21.8601L16.2 20.8001C17.4 20.4001 18.38 19.0401 18.38 17.7701V13.1301'
      stroke={color}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path d='M21.4 15V9' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

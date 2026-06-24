// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { IconProps } from './types';

export const ShieldSlashIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    className={className}
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M7.83997 20.0201L9.42997 21.2101C10.84 22.2701 13.16 22.2701 14.57 21.2101L18.87 18.0001C19.82 17.2901 20.6 15.7401 20.6 14.5601V7.12012'
      stroke={color}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M18.98 4.34006C18.83 4.25006 18.67 4.17006 18.51 4.10006L13.52 2.23006C12.69 1.92006 11.33 1.92006 10.5 2.23006L5.50003 4.11006C4.35003 4.54006 3.41003 5.90006 3.41003 7.12006V14.5501C3.41003 15.7301 4.19003 17.2801 5.14003 17.9901L5.34003 18.1401'
      stroke={color}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path d='M22 2L2 22' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

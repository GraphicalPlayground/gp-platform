// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { IconProps } from './types';

export const TextalignCenterIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    className={className}
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M3 4.5H21' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M7.26001 9.5H16.74' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M3 14.5H21' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M7.26001 19.5H16.74' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

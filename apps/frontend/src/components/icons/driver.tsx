// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { IconProps } from './types';

export const DriverIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    className={className}
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M19.32 9.99977H4.69002C3.21002 9.99977 2.01001 8.78978 2.01001 7.31978V4.68977C2.01001 3.20977 3.22002 2.00977 4.69002 2.00977H19.32C20.8 2.00977 22 3.21977 22 4.68977V7.31978C22 8.78978 20.79 9.99977 19.32 9.99977Z'
      stroke={color}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M19.32 21.9998H4.69002C3.21002 21.9998 2.01001 20.7898 2.01001 19.3198V16.6898C2.01001 15.2098 3.22002 14.0098 4.69002 14.0098H19.32C20.8 14.0098 22 15.2198 22 16.6898V19.3198C22 20.7898 20.79 21.9998 19.32 21.9998Z'
      stroke={color}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path d='M6 5V7' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M10 5V7' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M6 17V19' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M10 17V19' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M14 6H18' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M14 18H18' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

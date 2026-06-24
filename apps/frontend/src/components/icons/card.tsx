// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { IconProps } from './types';

export const CardIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    className={className}
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M1.66667 7.08746H18.3333'
      stroke={color}
      strokeWidth='1.5'
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M5 13.7542H6.66667'
      stroke={color}
      strokeWidth='1.5'
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M8.75 13.7542H12.0833'
      stroke={color}
      strokeWidth='1.5'
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M5.36667 2.92078H14.625C17.5917 2.92078 18.3333 3.65411 18.3333 6.57911V13.4208C18.3333 16.3458 17.5917 17.0791 14.6333 17.0791H5.36667C2.40833 17.0874 1.66667 16.3541 1.66667 13.4291V6.57911C1.66667 3.65411 2.40833 2.92078 5.36667 2.92078Z'
      stroke={color}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

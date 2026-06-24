// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { IconProps } from './types';

export const TickCircleIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    className={className}
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M10 18.3333C14.5833 18.3333 18.3333 14.5833 18.3333 9.99999C18.3333 5.41666 14.5833 1.66666 10 1.66666C5.41667 1.66666 1.66667 5.41666 1.66667 9.99999C1.66667 14.5833 5.41667 18.3333 10 18.3333Z'
      stroke={color}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M6.45833 10L8.81667 12.3583L13.5417 7.64166'
      stroke={color}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { IconProps } from './types';

export const FlashIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    className={className}
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M6.0901 13.2799H9.1801V20.4799C9.1801 22.1599 10.0901 22.4999 11.2001 21.2399L18.7701 12.6399C19.7001 11.5899 19.3101 10.7199 17.9001 10.7199H14.8101V3.5199C14.8101 1.8399 13.9001 1.4999 12.7901 2.7599L5.2201 11.3599C4.3001 12.4199 4.6901 13.2799 6.0901 13.2799Z'
      stroke={color}
      strokeWidth='1.5'
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

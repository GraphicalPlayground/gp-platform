// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { IconProps } from './types';

export const CpuChargeIcon: React.FC<IconProps> = ({ className, size = 24, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    className={className}
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M9.6 20H14.4C18.4 20 20 18.4 20 14.4V9.6C20 5.6 18.4 4 14.4 4H9.6C5.6 4 4 5.6 4 9.6V14.4C4 18.4 5.6 20 9.6 20Z'
      stroke={color}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M10.5 17H13.5C16 17 17 16 17 13.5V10.5C17 8 16 7 13.5 7H10.5C8 7 7 8 7 10.5V13.5C7 16 8 17 10.5 17Z'
      stroke={color}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path d='M8.01001 4V2' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M12 4V2' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M16 4V2' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M20 8H22' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M20 12H22' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M20 16H22' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M16 20V22' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M12.01 20V22' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M8.01001 20V22' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M2 8H4' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M2 12H4' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M2 16H4' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    <path
      d='M12 9.7002L11.06 11.3402C10.85 11.7002 11.02 12.0002 11.44 12.0002H12.56C12.98 12.0002 13.15 12.3002 12.94 12.6602L12 14.3002'
      stroke={color}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

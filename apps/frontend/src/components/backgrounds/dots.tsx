// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { cn } from '@/utils/cn';

export interface BackgroundDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  backgroundColor?: string;
  dotColor?: string;
  dotSize?: number;
}

export const BackgroundDots: React.FC<BackgroundDotsProps> = ({
  backgroundColor,
  dotColor = 'rgba(214, 214, 214, 0.18)',
  dotSize = 8,
  children,
  className,
  ...rest
}) => {
  return (
    <div
      className={cn('w-full h-full', className)}
      style={{
        backgroundColor,
        backgroundImage: `radial-gradient(${dotColor} 10.6%, transparent 23.6%)`,
        backgroundPosition: '10px 10px',
        backgroundSize: `${dotSize}px ${dotSize}px`
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

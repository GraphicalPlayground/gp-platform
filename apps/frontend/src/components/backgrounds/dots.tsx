// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { cn } from '@/utils/cn';

export interface BackgroundDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  backgroundColor?: string;
}

export const BackgroundDots: React.FC<BackgroundDotsProps> = ({ backgroundColor, children, className, ...rest }) => {
  return (
    <div
      className={cn('w-full h-full', className)}
      style={{
        backgroundColor,
        backgroundImage: 'radial-gradient(rgba(214, 214, 214, 0.18) 10.6%, transparent 23.6%)',
        backgroundPosition: '10px 10px',
        backgroundSize: '8px 8px'
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

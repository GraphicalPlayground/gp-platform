// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { cn } from '@/utils/cn';
import React from 'react';

export interface FooterBottomBarProps extends React.HTMLAttributes<HTMLDivElement> {}

export const FooterBottomBar: React.FC<FooterBottomBarProps> = ({ children, className, ...rest }) => {
  return (
    <div
      className={cn('flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 w-full', className)}
      {...rest}
    >
      {children}
    </div>
  );
};

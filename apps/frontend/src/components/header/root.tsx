// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { cn } from '@/utils/cn';
import React from 'react';

export interface HeaderRootProps extends React.HTMLAttributes<HTMLHeadElement> {}

export const HeaderRoot: React.FC<HeaderRootProps> = ({ children, className, ...rest }) => {
  return (
    <header
      className={cn('h-11.5 lg:h-14 bg-white w-full z-5 sticky top-0 left-0 shadow-md flex justify-between pl-5 items-center', className)}
      {...rest}
    >
      {children}
    </header>
  );
};

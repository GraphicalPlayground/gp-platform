// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { cn } from '@/utils/cn';
import React from 'react';

export interface HeaderActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const HeaderActions: React.FC<HeaderActionsProps> = ({ children, className, ...rest }) => {
  return (
    <div className={cn('flex flex-row h-full items-center gap-0 lg:gap-1.25', className)} {...rest}>
      {children}
    </div>
  );
};

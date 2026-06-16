// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { cn } from '@/utils/cn';
import React from 'react';
import { Button } from '@gp/react';
import type { ButtonProps } from '@gp/react';

export interface HeaderButtonProps extends ButtonProps {}

export const HeaderButton: React.FC<HeaderButtonProps> = ({ children, className, ...rest }) => {
  return (
    <Button
      className={cn('rounded-none h-full px-5 bg-black text-white hover:bg-gray-800 cursor-pointer', className)}
      {...rest}
    >
      {children}
    </Button>
  );
};

export interface HeaderIconButtonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const HeaderIconButton: React.FC<HeaderIconButtonProps> = ({ children, className, ...rest }) => {
  return (
    <div className={cn('', className)} {...rest}>
      {children}
    </div>
  );
};

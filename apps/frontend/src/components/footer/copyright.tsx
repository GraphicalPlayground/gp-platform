// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { cn } from '@/utils/cn';
import React from 'react';

export interface FooterCopyrightProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const FooterCopyright: React.FC<FooterCopyrightProps> = ({ children, className, ...rest }) => {
  return (
    <span className={cn('text-sm text-white', className)} {...rest}>
      {children}
    </span>
  );
};

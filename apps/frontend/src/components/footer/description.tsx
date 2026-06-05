// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { cn } from '@/utils/cn';

export interface FooterDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FooterDescription: React.FC<FooterDescriptionProps> = ({ children, className, ...rest }) => {
  return (
    <p className={cn('w-71 font-normal text-left text-sm', className)} {...rest}>
      {children}
    </p>
  );
};

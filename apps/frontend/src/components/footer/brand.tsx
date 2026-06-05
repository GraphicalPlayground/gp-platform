// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { cn } from '@/utils/cn';

export interface FooterBrandProps extends React.HTMLAttributes<HTMLDivElement> {}

export const FooterBrand: React.FC<FooterBrandProps> = ({ children, className, ...rest }) => {

  return (
    <div className={cn('', className)} {...rest}>
      {children}
    </div>
  );
};

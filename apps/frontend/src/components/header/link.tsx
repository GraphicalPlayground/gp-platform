// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { cn } from '@/utils/cn';
import React from 'react';
import { Link } from '@gp/react';
import type { LinkProps } from '@gp/react';

export interface HeaderLinkProps extends LinkProps {}

export const HeaderLink: React.FC<HeaderLinkProps> = ({ children, className, ...rest }) => {
  return (
    <Link className={cn('mx-4 text-base underline', className)} {...rest}>
      {children}
    </Link>
  );
};

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { cn } from '@/utils/cn';
import React from 'react';
import { Link } from '@/components/link';
import type { LinkProps } from '@/components/link';

export interface HeaderLinkProps extends LinkProps {
  href: string;
}

export const HeaderLink: React.FC<HeaderLinkProps> = ({ children, href, className, ...rest }) => {
  return (
    <Link href={href} className={cn('mx-4 text-base underline', className)} {...rest}>
      {children}
    </Link>
  );
};

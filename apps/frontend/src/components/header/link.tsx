// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { cn } from '@/utils/cn';
import React from 'react';
import { Link } from '@gp/react';
import type { LinkProps } from '@gp/react';
import NextLink from 'next/link';

export interface HeaderLinkProps extends LinkProps {
  href: string;
}

export const HeaderLink: React.FC<HeaderLinkProps> = ({ children, href, className, ...rest }) => {
  return (
    <Link
      href={href}
      className={cn('mx-4 text-base underline', className)}
      {...rest}
      render={({ ref, ...props }) => <NextLink {...props} href={href} ref={ref as React.Ref<HTMLAnchorElement>} />}
    >
      {children}
    </Link>
  );
};

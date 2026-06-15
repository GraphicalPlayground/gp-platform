// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import { Link } from '@gp/react';
import NextLink from 'next/link';

interface MdxLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export function MdxLink({ href, children, ...rest }: MdxLinkProps) {
  return (
    <Link
      {...(rest as any)}
      href={href}
      render={({ ref, ...props }) => <NextLink {...props} href={href} ref={ref as React.Ref<HTMLAnchorElement>} />}
    >
      {children}
    </Link>
  );
}

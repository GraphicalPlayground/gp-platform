// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { Link } from '@gp/react';
import { cn } from '@/utils/cn';

export interface FooterLegalLinksProps extends React.HTMLAttributes<HTMLUListElement> {}

export const FooterLegalLinks: React.FC<FooterLegalLinksProps> = ({ children, className, ...rest }) => {
  return (
    <ul className={cn('flex flex-row gap-6 text-sm text-white/50', className)} {...rest}>
      {children}
    </ul>
  );
};

export interface FooterLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export const FooterLink: React.FC<FooterLinkProps> = ({ children, className, href }) => {
  return (
    <li>
      <Link
        href={href}
        className={cn('w-fit text-inherit text-base leading-8.5 flex items-center cursor-pointer', className)}
      >
        {children}
      </Link>
    </li>
  );
};

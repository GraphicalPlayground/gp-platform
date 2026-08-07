// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './inline-link.module.css';

import type { BaseProps } from '../helper';
import NextLink from 'next/link';
import type { LinkProps as NextLinkProps } from 'next/link';

/**
 * @brief InlineLink component props interface.
 * @see InlineLink
 */
export type InlineLinkProps = BaseProps<HTMLAnchorElement> & {
  /**
   * @brief The href of the link.
   */
  href: string | NextLinkProps<any>['href'];
} & React.AnchorHTMLAttributes<HTMLAnchorElement> &
  React.HTMLAttributes<HTMLAnchorElement> &
  Omit<NextLinkProps, 'href'>;

/**
 * @brief InlineLink component.
 * @details
 */
export const InlineLink = React.forwardRef<HTMLAnchorElement, InlineLinkProps>(
  ({ children, className, href, ...rest }, ref) => {
    return (
      <NextLink href={href} className={clsx(styles['inline-link'], className)} {...rest} ref={ref}>
        {children}
      </NextLink>
    );
  }
);

/** Set the display name for the InlineLink component. */
InlineLink.displayName = 'gp.InlineLink';

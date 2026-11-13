// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './breadcrumbs.module.css';

import type { BaseProps } from '../helper';
import { InlineLink } from '../inline-link';
import { Text } from '../text';

export const BreadcrumbVariants = ['default', 'accent'] as const;

/**
 * @brief Breadcrumbs component props interface.
 * @see Breadcrumbs
 */
export type BreadcrumbsProps = {
  variant?: (typeof BreadcrumbVariants)[number];
} & BaseProps<HTMLElement> &
  React.HTMLAttributes<HTMLElement>;

/**
 * @brief Breadcrumbs Root component that renders a navigation element with a list of breadcrumb items.
 */
const BreadcrumbsRoot = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ children, className, variant = 'default', ...rest }, ref) => {
    return (
      <nav
        ref={ref}
        className={clsx(className, styles.breadcrumbs, styles[`breadcrumbs--${variant}`])}
        aria-label='Breadcrumbs'
        {...rest}
      >
        <ol className={clsx(styles.breadcrumbs__list)}>{children}</ol>
      </nav>
    );
  }
);

type BreadcrumbsItemProps = {
  href: string;
  selected?: boolean;
} & BaseProps<HTMLAnchorElement> &
  React.HTMLAttributes<HTMLAnchorElement>;

const BreadcrumbsItem = React.forwardRef<HTMLAnchorElement, BreadcrumbsItemProps>(
  ({ children, className, href, selected = false, ...rest }, ref) => {
    return (
      <li className={styles.breadcrumbs__item}>
        {selected ? (
          <Text
            size='100'
            variant='muted'
            className={clsx(styles.breadcrumbs__link, styles['breadcrumbs__link--selected'], className)}
            aria-current='page'
            {...rest}
          >
            {children}
          </Text>
        ) : (
          <InlineLink href={href} ref={ref} className={clsx(styles.breadcrumbs__link, className)} {...rest}>
            {children}
          </InlineLink>
        )}
      </li>
    );
  }
);

/**
 * @brief Use Breadcrumbs to display the current location within a navigational hierarchy.
 */
export const Breadcrumbs = Object.assign(BreadcrumbsRoot, {
  Root: BreadcrumbsRoot,
  Item: BreadcrumbsItem
});

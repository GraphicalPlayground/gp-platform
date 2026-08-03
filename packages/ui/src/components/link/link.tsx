// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useCallback } from 'react';
import clsx from 'clsx';
import { Text } from '../text';
import NextLink from 'next/link';
import type { LinkProps as NextLinkProps } from 'next/link';
import { ExpandableArrow } from '../expandable-arrow';
import styles from './link.module.css';
import { LinkExternalIcon } from '@primer/octicons-react';

export const linkVariants = ['default', 'accent'] as const;
export const linkSizes = ['small', 'medium', 'large'] as const;
export const linkArrowDirections = ['start', 'end', 'none'] as const;

const LinkTextSizes = {
  small: '100',
  medium: '200',
  large: '300'
} as const;

const LinkExternalIconSizes = {
  small: 16,
  medium: 16,
  large: 20
} as const;

/**
 * @brief Link component props interface.
 * @see Link
 */
export interface LinkProps extends Omit<NextLinkProps<any>, 'href'>, Omit<React.ComponentPropsWithoutRef<'a'>, 'href'> {
  /**
   * @brief The href of the link.
   */
  href: string | NextLinkProps<any>['href'];

  /**
   * @brief The size variations available in Link.
   */
  size?: (typeof linkSizes)[number];

  /**
   * @brief Position of the arrow.
   */
  arrowDirection?: (typeof linkArrowDirections)[number];

  /**
   * @brief Show an external link icon
   */
  isExternal?: boolean;

  /**
   * @brief The variant of the link.
   */
  variant?: (typeof linkVariants)[number];

  /**
   * @brief Reference to the anchor element.
   */
  ref?: React.Ref<HTMLAnchorElement>;
}

/**
 * @brief Link component.
 * @details
 */
export const Link: React.FC<LinkProps> = ({
  arrowDirection = 'none',
  children,
  className,
  href,
  isExternal: isExternalProp,
  onBlur,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  size = 'medium',
  variant = 'default',
  ...rest
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      setIsHovered(!isHovered);
      onMouseEnter?.(event);
    },
    [onMouseEnter, isHovered]
  );

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      setIsHovered(!isHovered);
      onMouseLeave?.(event);
    },
    [onMouseLeave, isHovered]
  );

  const handleOnFocus = useCallback(
    (event: React.FocusEvent<HTMLAnchorElement, Element>) => {
      setIsFocused(!isFocused);
      onFocus?.(event);
    },
    [onFocus, isFocused]
  );

  const handleOnBlur = useCallback(
    (event: React.FocusEvent<HTMLAnchorElement, Element>) => {
      setIsFocused(!isFocused);
      onBlur?.(event);
    },
    [onBlur, isFocused]
  );

  const isExternal =
    isExternalProp ?? (rest.target === '_blank' || (typeof href === 'string' && href.startsWith('http')));

  return (
    <NextLink
      href={href}
      className={clsx(
        styles.link,
        styles[`link--${size}`],
        styles[`link--${variant}`],
        isExternal ? styles['link--is-external'] : styles[`link--arrow-${arrowDirection}`],
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      {...rest}
    >
      {arrowDirection === 'start' && !isExternal && (
        <ExpandableArrow className={styles['link-arrow']} expanded={isHovered || isFocused} reverse hidden />
      )}

      <Text as='span' size={LinkTextSizes[size]} className={clsx(styles['link--label'])}>
        {children}
      </Text>

      {arrowDirection === 'end' && !isExternal && (
        <ExpandableArrow className={styles['link-arrow']} expanded={isHovered || isFocused} hidden />
      )}

      {isExternal && <LinkExternalIcon size={LinkExternalIconSizes[size]} aria-label='External link' />}
    </NextLink>
  );
};

/** Set the display name for the Link component. */
Link.displayName = 'gp.Link';

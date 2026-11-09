// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React, { forwardRef, useCallback } from 'react';
import type { PropsWithChildren } from 'react';
import { clsx } from 'clsx';
import type { Icon as IconProps } from '@primer/octicons-react';

import { Text } from '../text';
import { colors, biColorGradients } from '../constants';

import type { BaseProps } from '../helper';
import { ExpandableArrow } from '../expandable-arrow';

import styles from './eyebrow-banner.module.css';

export type EyebrowBannerProps = BaseProps<HTMLAnchorElement> & {
  href: string;
} & React.HTMLAttributes<HTMLAnchorElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

const _EyebrowBanner = forwardRef<HTMLAnchorElement, EyebrowBannerProps>(
  ({ className, children, href, onMouseEnter, onMouseLeave, onFocus, onBlur, ...rest }, ref) => {
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

    const HeadingChild = React.Children.toArray(children).filter((child) => {
      if (React.isValidElement(child)) {
        return child.type === EyebrowBannerHeading;
      }
    });

    const SubHeadingChild = React.Children.toArray(children).filter((child) => {
      if (React.isValidElement(child)) {
        return child.type === EyebrowBannerSubHeading;
      }
    });

    const VisualChild = React.Children.toArray(children).find((child) => {
      if (React.isValidElement(child)) {
        return child.type === EyebrowBannerVisual;
      }
    });

    const LabelChild = React.Children.toArray(children).find((child) => {
      if (React.isValidElement(child)) {
        return child.type === EyebrowBannerLabel;
      }
    });

    return (
      <a
        href={href}
        ref={ref}
        className={clsx(styles.EyebrowBanner, className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        {...rest}
      >
        <span className={styles['EyebrowBanner__inner']}>
          {VisualChild && <span className={styles['EyebrowBanner__leadingVisual']}>{VisualChild}</span>}
          <span className='visually-hidden'>&nbsp;</span>
          {LabelChild && !VisualChild && <>{LabelChild}</>}
          <span className='visually-hidden'>&nbsp;</span>
          <span className={styles['EyebrowBanner__headings']}>
            {HeadingChild}
            <span className='visually-hidden'>&nbsp;</span>
            {SubHeadingChild}
          </span>

          <span className={styles['EyebrowBanner__trailingVisual']}>
            <ExpandableArrow
              className={styles['EyebrowBanner__trailingVisual-icon']}
              expanded={isHovered || isFocused}
            />
          </span>
        </span>
      </a>
    );
  }
);

type EyebrowBannerHeadingProps = PropsWithChildren<BaseProps<HTMLSpanElement>>;

const EyebrowBannerHeading = forwardRef<HTMLSpanElement, EyebrowBannerHeadingProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <Text
        size='100'
        variant='default'
        weight='medium'
        ref={ref}
        className={clsx(styles[`EyebrowBanner__heading`], className)}
        {...rest}
      >
        {children}
      </Text>
    );
  }
);

type EyebrowBannerSubHeadingProps = PropsWithChildren<BaseProps<HTMLSpanElement>>;

const EyebrowBannerSubHeading = forwardRef<HTMLSpanElement, EyebrowBannerSubHeadingProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <Text
        size='100'
        variant='muted'
        ref={ref}
        className={clsx(styles[`EyebrowBanner__subHeading`], className)}
        {...rest}
      >
        {children}
      </Text>
    );
  }
);

export const EyebrowBannerIconColors = colors;

export const defaultEyebrowBannerIconColor = EyebrowBannerIconColors[0];

type EyebrowBannerVisual = BaseProps<HTMLSpanElement> & {
  icon?: React.ReactNode | IconProps;
  color?: (typeof EyebrowBannerIconColors)[number];
  hasBackground?: boolean;
  ['aria-hidden']?: boolean;
  children?: React.ReactNode;
};

const EyebrowBannerVisual = forwardRef<HTMLSpanElement, EyebrowBannerVisual>(
  (
    {
      className,
      children,
      'aria-hidden': ariaHidden,
      'icon': Icon,
      color = defaultEyebrowBannerIconColor,
      hasBackground = false,
      ...rest
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={clsx(
          styles[`EyebrowBanner__visual` as keyof typeof styles],
          Icon && styles.EyebrowBanner__icon,
          Icon && styles[`EyebrowBanner__icon--color-${color}`],
          hasBackground && styles['EyebrowBanner__icon--badge'],
          className
        )}
        aria-hidden={ariaHidden || typeof Icon !== 'function'}
        {...rest}
      >
        {Icon ? typeof Icon === 'function' ? <Icon /> : Icon : children}
      </span>
    );
  }
);

export const EyebrowBannerLabelColors = [...biColorGradients, ...colors] as const;

type EyebrowBannerLabel = BaseProps<HTMLSpanElement> & {
  /**
   * The color variations available in EyebrowBanner.Label
   */
  color?: (typeof EyebrowBannerLabelColors)[number];
};

const EyebrowBannerLabel = forwardRef<HTMLSpanElement, PropsWithChildren<EyebrowBannerLabel>>(
  ({ className, children, color, ...rest }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          styles[`EyebrowBanner__leadingLabel`],
          color && styles[`EyebrowBanner__leadingLabel--color-${color}` as keyof typeof styles],
          className
        )}
        {...rest}
      >
        {children}
      </span>
    );
  }
);

/**
 * Use EyebrowBanner to display a short message at the top of a page.
 */
export const EyebrowBanner = Object.assign(_EyebrowBanner, {
  Visual: EyebrowBannerVisual,
  Label: EyebrowBannerLabel,
  Heading: EyebrowBannerHeading,
  SubHeading: EyebrowBannerSubHeading
});

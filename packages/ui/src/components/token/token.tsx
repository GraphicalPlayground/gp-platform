// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { clsx } from 'clsx';
import React, { forwardRef } from 'react';
import type { Ref } from 'react';

import { Text } from '../text';
import { SmartLink } from '../helper';
import type { BaseProps } from '../helper';

import styles from './token.module.css';

export const TokenVariants = ['default', 'accent', 'outline', 'invisible'] as const;

export const defaultTokenVariant = TokenVariants[0];

type TokenLeadingVisual = React.ReactElement | React.ComponentType<{ className?: string }>;

type TokenSharedProps = {
  /**
   * @brief The leading visual appears before the Token content.
   * Pass an element to supply custom props, or a component type that accepts an optional className.
   */
  leadingVisual?: TokenLeadingVisual;
  /**
   * @brief The variant variations available in Token.
   */
  variant?: (typeof TokenVariants)[number];
  /**
   * @brief The HTML element rendered by Token.
   */
  as?: 'span' | 'a';
};

type TokenSpanProps = BaseProps<HTMLSpanElement> &
  TokenSharedProps & {
    as?: 'span';
  } & React.ComponentPropsWithoutRef<'span'>;

type TokenAnchorProps = BaseProps<HTMLAnchorElement> &
  TokenSharedProps & {
    as: 'a';
    href: string;
  } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

export type TokenProps = TokenSpanProps | TokenAnchorProps;

export const Token = forwardRef<HTMLSpanElement | HTMLAnchorElement, TokenProps>(
  (
    { variant = defaultTokenVariant, as = 'span', children, className, leadingVisual: LeadingVisual, ...props },
    ref: Ref<HTMLSpanElement | HTMLAnchorElement>
  ) => {
    const tokenClassName = clsx(
      styles.Token,
      LeadingVisual && styles['Token--hasLeadingVisual'],
      as === 'a' && styles['Token--interactive'],
      styles[`Token--variant-${variant}`],
      className
    );

    const tokenChildren = (
      <>
        {LeadingVisual && (
          <span className={styles['Token__leading-visual']} aria-hidden='true'>
            {typeof LeadingVisual === 'function' ? (
              <LeadingVisual className={styles['Token__visual']} />
            ) : (
              React.isValidElement<{ className?: string }>(LeadingVisual) &&
              React.cloneElement(LeadingVisual, {
                className: clsx(styles['Token__visual'], LeadingVisual.props.className)
              })
            )}
          </span>
        )}
        <Text as='span' size='100' className={styles['Token__label']}>
          {children}
        </Text>
      </>
    );

    if (as === 'a') {
      return (
        <SmartLink ref={ref as Ref<HTMLAnchorElement>} className={tokenClassName} {...props}>
          {tokenChildren}
        </SmartLink>
      );
    }

    return (
      <span ref={ref as Ref<HTMLSpanElement>} className={tokenClassName} {...props}>
        {tokenChildren}
      </span>
    );
  }
);

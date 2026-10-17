// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { Text } from '../text';
import type { TextProps } from '../text';

import type { BaseProps } from '../helper';

/** * Main Stylesheet (as a CSS Module) */
import styles from './eyebrow-text.module.css';

export const EyebrowTextVariants = ['default', 'muted', 'accent'] as const;

export type EyebrowTextVariant = (typeof EyebrowTextVariants)[number];

export type EyebrowTextProps = Omit<TextProps, 'as' | 'animate' | 'variant'> &
  Omit<BaseProps<HTMLSpanElement>, 'animate'> & {
    variant?: EyebrowTextVariant;
    ['data-testid']?: string;
  };

const testIds = {
  root: 'EyebrowText'
};

const _EyebrowText = forwardRef<HTMLSpanElement, EyebrowTextProps>(
  (
    {
      className,
      children,
      style,
      'data-testid': testId,
      font = 'monospace',
      size = '100',
      variant = 'muted',
      weight = 'normal',
      ...props
    },
    ref: React.Ref<HTMLSpanElement>
  ) => {
    const textVariant = variant === 'accent' ? 'default' : variant;

    return (
      <Text
        ref={ref}
        as='span'
        size={size}
        variant={textVariant}
        font={font}
        weight={weight}
        className={clsx(
          styles['eyebrow-text'],
          variant === 'accent' && styles['eyebrow-text--variant-accent'],
          className
        )}
        style={style}
        data-testid={testId || testIds.root}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

/**
 * EyebrowText is a simple text component that should be used above Headings.
 */
export const EyebrowText = Object.assign(_EyebrowText, { testIds });

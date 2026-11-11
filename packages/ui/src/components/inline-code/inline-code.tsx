// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React, { forwardRef } from 'react';
import clsx from 'clsx';
import type { BaseProps } from '../helper';
import styles from './inline-code.module.css';

export type InlineCodeProps = React.ComponentPropsWithoutRef<'code'> &
  BaseProps<HTMLElement> & {
    /**
     * Controls whether the code fragment can wrap.
     * Disable only for short fragments that must remain together.
     * @default true
     */
    wrap?: boolean;
  };

function InlineCodeRoot(
  { className, children, wrap = true, ...rest }: InlineCodeProps,
  ref: React.ForwardedRef<HTMLElement>
) {
  return (
    <code
      ref={ref}
      className={clsx(styles['inline-code'], !wrap && styles['inline-code--nowrap'], className)}
      {...rest}
    >
      <span className={styles['inline-code__text']}>{children}</span>
    </code>
  );
}

/**
 * Use InlineCode to render a short inline code fragment.
 */
export const InlineCode = forwardRef<HTMLElement, InlineCodeProps>(InlineCodeRoot);

InlineCode.displayName = 'gp.InlineCode';

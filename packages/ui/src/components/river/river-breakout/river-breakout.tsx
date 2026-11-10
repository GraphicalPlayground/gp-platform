// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React, { forwardRef } from 'react';
import type { Ref } from 'react';
import { clsx } from 'clsx';
import type { RiverProps, RiverVisualBaseProps } from '../river';
import { RiverVisualBase, RiverContent } from '../river';
import { Heading } from '../../heading';
import { findElementInChildren } from '../../helper';

import styles from '../river-shared.module.css';
import gridlineStyles from '../../shared.module.css';

export const RiverBreakoutVariants = ['default', 'gridline'] as const;
export type RiverBreakoutVariant = (typeof RiverBreakoutVariants)[number];

type RiverBreakoutProps = Omit<RiverProps, 'align' | 'imageTextRatio'> & {
  /**
   * Apply a visual variant. The default is `default`.
   * `gridline` adds horizontal border lines and lateral spacing.
   */
  variant?: RiverBreakoutVariant;
};

const Root = forwardRef(
  ({ className, children, variant = 'default', ...rest }: RiverBreakoutProps, ref: Ref<HTMLElement>) => {
    // TODO: when Firefox supports :has() selector, we should use that instead of JS
    const defaultColor =
      findElementInChildren(children, 'b') || findElementInChildren(children, 'em') ? 'muted' : 'default';

    if (!findElementInChildren(children, A11yHeading)) {
      if (process.env['NODE_ENV'] === 'development' || process.env['NODE_ENV'] === 'test') {
        // eslint-disable-next-line no-console
        console.warn(
          'RiverBreakout: A11yHeading child is required. This element will not be visible, only read by screenreaders.'
        );
      }
    }

    return (
      <section
        ref={ref}
        className={clsx(
          styles.RiverBreakout,
          variant === 'gridline' && styles['RiverBreakout--variant-gridline'],
          variant === 'gridline' && gridlineStyles.gridline,
          defaultColor === 'muted' && styles['RiverBreakout--muted'],
          className
        )}
        {...rest}
      >
        {children}
      </section>
    );
  }
);

const A11yHeading = ({ as = 'h3', children }: React.PropsWithChildren<{ as?: 'h2' | 'h3' }>) => (
  <Heading className='visually-hidden' as={as}>
    {children}
  </Heading>
);

const Visual = forwardRef<HTMLDivElement, RiverVisualBaseProps>(({ className, ...props }, ref) => (
  <RiverVisualBase ref={ref} className={className} {...props} />
));

export const RiverBreakout = Object.assign(Root, { Visual, Content: RiverContent, A11yHeading });

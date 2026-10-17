// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import type { BaseProps } from '../../helper';

import styles from '../hero.module.css';

export type HeroEyebrowProps = React.PropsWithChildren<BaseProps<HTMLDivElement>>;

/**
 * @brief HeroEyebrow is a component that renders an eyebrow for the hero section of a page.
 */
export const HeroEyebrow = forwardRef<HTMLDivElement, HeroEyebrowProps>(
  ({ children, className, ...rest }: React.PropsWithChildren<HeroEyebrowProps>, ref) => {
    return (
      <div ref={ref} className={clsx(styles['hero-eyebrow'], className)} {...rest}>
        {children}
      </div>
    );
  }
);

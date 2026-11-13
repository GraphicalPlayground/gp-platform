// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { Box } from '../../box';
import { ButtonGroup } from '../../button-group';
import { useHeroContext } from '../hero-context';

import styles from '../hero.module.css';

export type HeroButtonGroupProps = React.ComponentProps<typeof ButtonGroup>;

export const HeroButtonGroup = forwardRef<HTMLDivElement, HeroButtonGroupProps>(
  ({ className, children, ...props }, ref) => {
    const { variant, enableAnimation } = useHeroContext();
    const isGridline = variant === 'gridline' || variant === 'gridline-expressive';
    const Tag = isGridline ? Box : React.Fragment;
    const tagProps = isGridline
      ? {
          animate: enableAnimation
            ? {
                variant: 'slide-in-up' as const,
                delay: 750,
                duration: 1000
              }
            : undefined
        }
      : {};

    return (
      <Tag {...tagProps}>
        <ButtonGroup ref={ref} className={clsx(styles['hero-actions'], className)} {...props}>
          {children}
        </ButtonGroup>
      </Tag>
    );
  }
);

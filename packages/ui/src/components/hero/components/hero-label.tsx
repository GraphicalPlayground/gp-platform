// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { forwardRef } from 'react';
import clsx from 'clsx';
import type { TextProps } from '../../text';
import type { BaseProps } from '../../helper';
import { TextCursorAnimation } from '../../text-cursor-animation';

import styles from '../hero.module.css';
import { useHeroContext } from '../hero-context';

export type HeroLabelProps = Omit<TextProps, 'as' | 'ref' | 'animate'> &
  Omit<BaseProps<HTMLSpanElement>, 'animate'> & {
    animate?: boolean;
    animationDelay?: number;
    initialText?: string;
  };

export const HeroLabel = forwardRef<HTMLSpanElement, HeroLabelProps>(
  (
    {
      children,
      className,
      variant = 'muted',
      animate = false,
      animationDelay = 1000,
      initialText,
      ...rest
    }: React.PropsWithChildren<HeroLabelProps>,
    ref
  ) => {
    const { variant: heroVariant, enableAnimation } = useHeroContext();
    const isGridlineVariant = heroVariant === 'gridline' || heroVariant === 'gridline-expressive';

    const shouldAnimate = enableAnimation || animate;
    const shouldHaveDelay = (isGridlineVariant && enableAnimation) || animate;

    return (
      <span ref={ref} className={clsx(styles['hero-label'], className)} {...rest}>
        <TextCursorAnimation
          variant={variant}
          animate={shouldAnimate}
          delay={shouldHaveDelay ? animationDelay : 0}
          initialText={initialText}
        >
          {children}
        </TextCursorAnimation>
      </span>
    );
  }
);

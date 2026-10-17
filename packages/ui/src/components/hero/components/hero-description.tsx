// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { forwardRef } from 'react';
import clsx from 'clsx';
import { Text } from '../../text';
import type { TextProps, TextWeightVariants, ResponsiveWeightMap, TextSizeVariants } from '../../text';
import type { BaseProps } from '../../helper';

import styles from '../hero.module.css';

export type HeroDescriptionProps = {
  size?: TextSizeVariants;
  weight?: TextWeightVariants | ResponsiveWeightMap;
} & BaseProps<HTMLParagraphElement> &
  TextProps;

/**
 * @brief HeroDescription is a component that renders a description for the hero section of a page.
 */
export const HeroDescription = forwardRef<HTMLParagraphElement, React.PropsWithChildren<HeroDescriptionProps>>(
  (
    {
      children,
      className,
      size = '200',
      variant = 'muted',
      weight = 'normal'
    }: React.PropsWithChildren<HeroDescriptionProps>,
    ref
  ) => {
    return (
      <Text
        ref={ref}
        className={clsx(styles['hero-description'], className)}
        as='p'
        size={size}
        weight={weight}
        variant={variant}
      >
        {children}
      </Text>
    );
  }
);

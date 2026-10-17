// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { forwardRef } from 'react';
import clsx from 'clsx';
import { Image } from '../../image';
import type { ImageProps } from '../../image';
import type { BaseProps } from '../../helper';
import type { HeroMediaPadding, HeroMediaPosition } from '../hero-context';

import styles from '../hero.module.css';

export type HeroImageProps = {
  position?: HeroMediaPosition;
  padding?: HeroMediaPadding;
  enableBorder?: boolean;
} & ImageProps &
  BaseProps<HTMLImageElement>;

/**
 * @brief HeroImage is a component that renders an image within the Hero component.
 * It supports different positions and padding options.
 */
export const HeroImage = forwardRef<HTMLImageElement, HeroImageProps>(
  ({ className, padding = 'default', position = 'block-end', ...rest }: HeroImageProps, ref) => {
    const isInlinePosition = position.startsWith('inline');

    return (
      <Image
        ref={ref}
        className={clsx(
          styles['hero-image'],
          styles['hero-media'],
          styles[`hero-media--pos-${position}`],
          isInlinePosition && styles['hero-media--pos-inline'],
          padding === 'all' && styles['hero-media--padding-all'],
          padding === 'none' && styles['hero-media--padding-none'],
          className
        )}
        {...rest}
      />
    );
  }
);

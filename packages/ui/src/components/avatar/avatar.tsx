// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './avatar.module.css';

import type { StaticImageData } from 'next/image';
import type { BaseProps } from '../helper';

export const AvatarSizes = [32, 40, 48, 64, 80] as const;
export const AvatarShapes = ['circle', 'square'] as const;

type AvatarSizeVariants = (typeof AvatarSizes)[number];

type ResponsiveSizeMap = {
  narrow?: AvatarSizeVariants;
  regular?: AvatarSizeVariants;
  wide?: AvatarSizeVariants;
};

/**
 * @brief Props for the Avatar component.
 * @see Avatar
 */
export type AvatarProps = BaseProps<HTMLImageElement> & {
  size?: (typeof AvatarSizes)[number] | ResponsiveSizeMap;
  shape?: (typeof AvatarShapes)[number];
  src: string | StaticImageData;
  alt: string;
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'>;

/**
 * @brief A component that displays an avatar image with customizable size and shape.
 * @details The Avatar component allows you to display an image with a specified size and shape. You can choose from
 * predefined sizes or provide a responsive size map for different viewports. The shape can be either 'circle' or 'square'.
 */
export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ alt, className, shape = AvatarShapes[0], size = AvatarSizes[1], src, ...rest }, ref) => {
    const sizeClass = React.useMemo(() => {
      return typeof size === 'number'
        ? styles[`avatar--size-${size}`]
        : (Object.keys(size) as (keyof ResponsiveSizeMap)[])
            .map((viewport) => {
              return styles[`avatar-${viewport}--size-${size[viewport]}` as keyof typeof styles];
            })
            .join(' ');
    }, [size]);

    return (
      <span ref={ref} className={clsx(styles.avatar, sizeClass, styles[`avatar--shape-${shape}`], className)}>
        <img className={clsx(styles.avatar__image)} src={typeof src === 'string' ? src : src.src} alt={alt} {...rest} />
      </span>
    );
  }
);

/** Set the display name for the Avatar component. */
Avatar.displayName = 'gp.Avatar';

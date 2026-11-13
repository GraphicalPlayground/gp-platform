// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './image.module.css';

export const imageBorderRadiusOptions = ['small', 'medium', 'large', 'xlarge', 'full'] as const;
export type imageBorderRadiusOptions = (typeof imageBorderRadiusOptions)[number];
export type ImageAspectRatio = '1:1' | '16:9' | '16:10' | '4:3' | 'custom';

/**
 * @brief Props for the Image component, extending standard HTML image attributes with additional properties for aspect ratio, media queries, and border radius.
 */
export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  aspectRatio?: ImageAspectRatio;
  media?: string;
  borderRadius?: imageBorderRadiusOptions;
  srcSet?: Pick<React.ImgHTMLAttributes<HTMLImageElement>, 'srcSet'>;
} & (
    | {
        as?: 'img';
        srcSet?: Pick<React.ImgHTMLAttributes<HTMLImageElement>, 'srcSet'>;
        sources?: undefined;
      }
    | {
        as: 'picture';
        sources?: {
          srcset: string;
          media: string;
        }[];
        srcSet?: undefined;
      }
  );

/**
 * @brief Resolves the aspect ratio string into a format suitable for CSS class names.
 * @param ratio - The aspect ratio string (e.g., '16:9', '4:3', 'custom').
 * @returns A string representing the aspect ratio in a format suitable for CSS class names.
 */
const aspectRatioResolver = (ratio?: ImageAspectRatio) => {
  if (typeof ratio === 'string') {
    if (ratio === 'custom') return 'custom';
    const [width, height] = ratio.split(':').map(Number);

    return `${width}-${height}`;
  }
};

/**
 * @brief Creates a new object by removing a specified key from the original object.
 * @param object - The original object from which the key will be removed.
 * @param key - The key to be removed from the object.
 * @returns A new object without the specified key.
 */
const objectWithoutKey = (object: Record<string, unknown>, key: string) => {
  const { [key]: _, ...otherKeys } = object;

  return otherKeys;
};

/**
 * @brief Image component that renders an image with optional aspect ratio, border radius, and support for the <picture> element.
 */
export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ alt, as = 'img', aspectRatio, borderRadius, className, height, media, srcSet, width, ...rest }, ref) => {
    if (as === 'picture') {
      return (
        <picture
          className={clsx(
            styles['image__container'],
            aspectRatio && styles[`image--aspect-ratio-${aspectRatioResolver(aspectRatio)}` as keyof typeof styles],
            borderRadius && styles[`image--border-radius-${borderRadius}`],
            className
          )}
        >
          {rest['sources'] &&
            rest['sources'].map((source: { srcset: string; media: string }, index: number) => (
              <source key={index} srcSet={source.srcset} media={source.media} />
            ))}
          {srcSet && <source srcSet={srcSet} media={media} />}
          <img
            ref={ref}
            alt={alt}
            width={width ?? '100%'}
            height={height ?? '100%'}
            className={clsx(styles.image, borderRadius && styles[`image--border-radius-${borderRadius}`])}
            {...objectWithoutKey(rest, 'sources')}
          />
        </picture>
      );
    }
    if (aspectRatio) {
      return (
        <span
          className={clsx(
            styles['image__container'],
            styles[`image--aspect-ratio-${aspectRatioResolver(aspectRatio)}` as keyof typeof styles]
          )}
        >
          <img
            ref={ref}
            alt={alt}
            width={width ? width : '100%'}
            height={height ? height : '100%'}
            className={clsx(styles.image, borderRadius && styles[`image--border-radius-${borderRadius}`], className)}
            srcSet={srcSet}
            {...rest}
          />
        </span>
      );
    }

    return (
      <img
        ref={ref}
        alt={alt}
        className={clsx(styles.image, borderRadius && styles[`image--border-radius-${borderRadius}`], className)}
        width={width && width}
        height={height && height}
        srcSet={srcSet}
        {...rest}
      />
    );
  }
);

/** Set the display name for the Image component. */
Image.displayName = 'gp.Image';

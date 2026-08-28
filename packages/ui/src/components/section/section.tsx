// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './section.module.css';
import type { Loose } from '@gp/types';
import type { BaseProps } from '../helper';

export const SectionPaddingVariants = ['none', 'condensed', 'normal', 'spacious'] as const;
export const SectionBackgroundColors = ['default', 'subtle'] as const;

const defaultSectionPadding = SectionPaddingVariants[2];

type ResponsiveMap<T> = {
  narrow?: T;
  regular?: T;
  wide?: T;
};

type BackgroundColors = Loose<(typeof SectionBackgroundColors)[number]>;
type PaddingVariants = (typeof SectionPaddingVariants)[number];
type ResponsiveBackgroundColorMap = ResponsiveMap<BackgroundColors>;
type ResponsiveBackgroundImagePositionMap = ResponsiveMap<string | string[]>;
type ResponsiveBackgroundImageSizeMap = ResponsiveMap<string | string[]>;
type ResponsiveBackgroundImageSrcMap = ResponsiveMap<string | string[]>;
type ResponsivePaddingVariantsMap = ResponsiveMap<PaddingVariants>;

/**
 * @brief Section component props interface.
 * @see Section
 */
export interface SectionProps extends React.PropsWithChildren<BaseProps<HTMLDivElement>> {
  /**
   * @brief The HTML element used to render the section.
   */
  as?: 'section' | 'div';

  /**
   * @brief The padding applied to the start of the section.
   */
  paddingBlockStart?: PaddingVariants | ResponsivePaddingVariantsMap;

  /**
   * @brief The padding applied to the end of the section.
   */
  paddingBlockEnd?: PaddingVariants | ResponsivePaddingVariantsMap;

  /**
   * @brief The system-level or custom background color of the section.
   */
  backgroundColor?: BackgroundColors | ResponsiveBackgroundColorMap;

  /**
   * @brief The background image of the section.
   */
  backgroundImageSrc?: string | string[] | ResponsiveBackgroundImageSrcMap;

  /**
   * @brief The position of the background image.
   */
  backgroundImagePosition?: string | string[] | ResponsiveBackgroundImagePositionMap;

  /**
   * @brief The size of the background image.
   */
  backgroundImageSize?: string | string[] | ResponsiveBackgroundImageSizeMap;

  /**
   * @brief Makes the content of the section span the full width of its parent container.
   */
  fullWidth?: boolean;

  /**
   * @brief Adds rounded corners to the top of the section.
   */
  rounded?: boolean;

  /**
   * @brief Forward inline styles
   */
  style?: React.CSSProperties;
}

/**
 * @brief Section component.
 * @details
 */
export const Section = React.forwardRef<HTMLDivElement, React.PropsWithChildren<SectionProps>>(
  (
    {
      as: UnderlyingType = 'section',
      backgroundColor,
      backgroundImagePosition = '50%',
      backgroundImageSize = 'cover',
      backgroundImageSrc,
      children,
      className,
      fullWidth = false,
      paddingBlockEnd = defaultSectionPadding,
      paddingBlockStart = defaultSectionPadding,
      rounded = false,
      style,
      ...rest
    },
    ref
  ) => {
    const createPaddingClasses = React.useCallback(
      (paddingBlock: PaddingVariants | ResponsivePaddingVariantsMap, blockType: string) =>
        typeof paddingBlock === 'string'
          ? styles[`section--${blockType}-${paddingBlock}` as keyof typeof styles]
          : (Object.keys(paddingBlock) as Array<keyof typeof paddingBlock>)
              .map(
                (viewport) =>
                  styles[`section-${viewport}--${blockType}-${paddingBlock[viewport]}` as keyof typeof styles]
              )
              .join(' '),
      []
    );

    const processBackgroundValue = React.useCallback((value: string | string[], property: string) => {
      if (property === 'background-image-src') {
        return Array.isArray(value) ? value.map((img) => `url(${img})`).join() : `url(${value})`;
      }

      if (property === 'background-color' && typeof value === 'string') {
        return SectionBackgroundColors.includes(value as (typeof SectionBackgroundColors)[number])
          ? `var(--gp-color-canvas-${value})`
          : value;
      }

      return Array.isArray(value) ? value.join() : value;
    }, []);

    const createStyles = React.useCallback(
      (property: string, value: string | string[] | ResponsiveMap<string | string[]>) => {
        if (typeof value === 'string' || Array.isArray(value)) {
          return { [`--gp-section-${property}`]: processBackgroundValue(value, property) };
        }

        const styles: Record<string, string> = {};

        if (value.narrow !== undefined) {
          styles[`--gp-section-narrow-${property}`] = processBackgroundValue(value.narrow, property);
        }

        if (value.regular !== undefined) {
          styles[`--gp-section-regular-${property}`] = processBackgroundValue(value.regular, property);
        }

        if (value.wide !== undefined) {
          styles[`--gp-section-wide-${property}`] = processBackgroundValue(value.wide, property);
        }

        return styles;
      },
      [processBackgroundValue]
    );

    const addStyle = React.useCallback(
      (obj: React.CSSProperties, property: string, value: ResponsiveMap<any> | any) => {
        if (value) {
          Object.assign(obj, createStyles(property, value));
        }
      },
      [createStyles]
    );

    const paddingBlockStartClass = React.useMemo(
      () => createPaddingClasses(paddingBlockStart, 'padding-block-start'),
      [paddingBlockStart, createPaddingClasses]
    );

    const paddingBlockEndClass = React.useMemo(
      () => createPaddingClasses(paddingBlockEnd, 'padding-block-end'),
      [paddingBlockEnd, createPaddingClasses]
    );

    const backgroundStyles = React.useMemo(() => {
      const allStyles = {};

      addStyle(allStyles, 'background-color', backgroundColor);
      addStyle(allStyles, 'background-image-src', backgroundImageSrc);
      addStyle(allStyles, 'background-image-position', backgroundImagePosition);
      addStyle(allStyles, 'background-image-size', backgroundImageSize);

      return allStyles;
    }, [addStyle, backgroundColor, backgroundImageSrc, backgroundImagePosition, backgroundImageSize]);

    return (
      <UnderlyingType
        ref={ref}
        className={clsx(
          styles.section,
          paddingBlockStartClass,
          paddingBlockEndClass,
          rounded && styles['section--rounded'],
          className
        )}
        style={{ ...backgroundStyles, ...style }}
        {...rest}
      >
        <div className={clsx(styles[`section__container`], fullWidth && styles['section__container--full-width'])}>
          {children}
        </div>
      </UnderlyingType>
    );
  }
);

/** Set the display name for the Section component. */
Section.displayName = 'gp.Section';

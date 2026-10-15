// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './box.module.css';

import type { BaseProps } from '../helper';
import { baseSizeScale } from '../constants';
import type { Loose } from '@gp/types';

export const BoxSpacingValues = ['none', 'condensed', 'normal', 'spacious', ...baseSizeScale] as const;
type SpacingValues = (typeof BoxSpacingValues)[number];

type ResponsiveSpacingMap = {
  narrow?: SpacingValues;
  regular?: SpacingValues;
  wide?: SpacingValues;
};

export const BoxBackgroundColors = ['default', 'inset', 'subtle', 'overlay'] as const;
type BackgroundColors = Loose<(typeof BoxBackgroundColors)[number]>;

export const BoxBorderRadiusOptions = ['small', 'medium', 'large', 'xlarge', 'full'] as const;
type BorderRadiusOptions = (typeof BoxBorderRadiusOptions)[number];

export const BoxBorderWidthOptions = ['none', 'thin', 'thick', 'thicker'] as const;
type BorderWidthOptions = (typeof BoxBorderWidthOptions)[number];

type ResponsiveBorderWidthMap = {
  narrow?: BorderWidthOptions;
  regular?: BorderWidthOptions;
  wide?: BorderWidthOptions;
};

export const BoxBorderColorOptions = ['default', 'muted', 'subtle'] as const;
type BorderColorOptions = (typeof BoxBorderColorOptions)[number];

type BorderStyleOptions = Extract<React.CSSProperties['borderStyle'], 'solid' | 'none'>;

/**
 * @brief Box component props interface.
 * @see Box
 */
type BoxProps = {
  /**
   * @brief Adding padding all internal sides of the Box
   */
  padding?: SpacingValues | ResponsiveSpacingMap;

  /**
   * @brief Adding padding on the internal top side of the Box
   */
  paddingBlockStart?: SpacingValues | ResponsiveSpacingMap;

  /**
   * @brief Adding padding on the internal right side of the Box
   */
  paddingInlineEnd?: SpacingValues | ResponsiveSpacingMap;

  /**
   * @brief Adding padding on the internal bottom side of the Box
   */
  paddingBlockEnd?: SpacingValues | ResponsiveSpacingMap;

  /**
   * @brief Adding padding on the internal left side of the Box
   */
  paddingInlineStart?: SpacingValues | ResponsiveSpacingMap;

  /**
   * @brief Adding margin on all external sides of the Box
   */
  margin?: SpacingValues | ResponsiveSpacingMap;

  /**
   * @brief Adding margin on the external top side of the Box
   */
  marginBlockStart?: SpacingValues | ResponsiveSpacingMap;

  /**
   * @brief Adding margin on the external right side of the Box
   */
  marginInlineEnd?: SpacingValues | ResponsiveSpacingMap;

  /**
   * @brief Adding margin on the external bottom side of the Box
   */
  marginBlockEnd?: SpacingValues | ResponsiveSpacingMap;

  /**
   * @brief Adding margin on the external left side of the Box
   */
  marginInlineStart?: SpacingValues | ResponsiveSpacingMap;

  /**
   * @brief Apply a system-level background color
   */
  backgroundColor?: BackgroundColors;

  /**
   * @brief Apply a system-level border radius value
   */
  borderRadius?: BorderRadiusOptions;

  /**
   * @brief Apply a system-level border width value
   */
  borderWidth?: BorderWidthOptions | ResponsiveBorderWidthMap;

  /**
   * @brief Apply a directional border width value
   */
  borderBlockStartWidth?: BorderWidthOptions | ResponsiveBorderWidthMap;

  /**
   * @brief Apply a directional border width value
   */
  borderInlineEndWidth?: BorderWidthOptions | ResponsiveBorderWidthMap;

  /**
   * @brief Apply a directional border width value
   */
  borderBlockEndWidth?: BorderWidthOptions | ResponsiveBorderWidthMap;

  /**
   * @brief Apply a directional border width value
   */
  borderInlineStartWidth?: BorderWidthOptions | ResponsiveBorderWidthMap;

  /**
   * @brief Apply a system-level border color value
   */
  borderColor?: BorderColorOptions;

  /**
   * @brief Apply border style. Values corrospend to the CSS border-style property.
   */
  borderStyle?: BorderStyleOptions;
} & BaseProps<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement>;

const isNamedBackgroundColor = (value: string): value is (typeof BoxBackgroundColors)[number] =>
  BoxBackgroundColors.includes(value as (typeof BoxBackgroundColors)[number]);

const classBuilder = (
  property: string,
  value?:
    | SpacingValues
    | ResponsiveSpacingMap
    | BackgroundColors
    | BorderRadiusOptions
    | BorderWidthOptions
    | ResponsiveBorderWidthMap
    | BorderColorOptions
    | BorderStyleOptions
) => {
  if (!value) return '';

  if (typeof value === 'string' || typeof value === 'number') {
    return styles[`box-${property}--${value}` as keyof typeof styles];
  } else {
    return (Object.keys(value) as Array<keyof ResponsiveSpacingMap>)
      .map((viewport) => styles[`box-${viewport}-${property}--${value[viewport]}` as keyof typeof styles])
      .join(' ');
  }
};

/**
 * @brief Box component.
 * @details
 */
export const Box: React.FC<BoxProps> = ({
  backgroundColor,
  borderBlockEndWidth,
  borderBlockStartWidth,
  borderColor,
  borderInlineEndWidth,
  borderInlineStartWidth,
  borderRadius,
  borderStyle,
  borderWidth,
  children,
  className,
  margin,
  marginBlockEnd,
  marginBlockStart,
  marginInlineEnd,
  marginInlineStart,
  padding,
  paddingBlockEnd,
  paddingBlockStart,
  paddingInlineEnd,
  paddingInlineStart,
  style,
  ...rest
}) => {
  const paddingClasses = React.useMemo(() => classBuilder('padding', padding), [padding]);
  const paddingBlockStartClasses = React.useMemo(
    () => classBuilder('padding-block-start', paddingBlockStart),
    [paddingBlockStart]
  );
  const paddingInlineEndClasses = React.useMemo(
    () => classBuilder('padding-inline-end', paddingInlineEnd),
    [paddingInlineEnd]
  );
  const paddingBlockEndClasses = React.useMemo(
    () => classBuilder('padding-block-end', paddingBlockEnd),
    [paddingBlockEnd]
  );
  const paddingInlineStartClasses = React.useMemo(
    () => classBuilder('padding-inline-start', paddingInlineStart),
    [paddingInlineStart]
  );
  const marginClasses = React.useMemo(() => classBuilder('margin', margin), [margin]);
  const marginBlockStartClasses = React.useMemo(
    () => classBuilder('margin-block-start', marginBlockStart),
    [marginBlockStart]
  );
  const marginInlineEndClasses = React.useMemo(
    () => classBuilder('margin-inline-end', marginInlineEnd),
    [marginInlineEnd]
  );
  const marginBlockEndClasses = React.useMemo(() => classBuilder('margin-block-end', marginBlockEnd), [marginBlockEnd]);
  const marginInlineStartClasses = React.useMemo(
    () => classBuilder('margin-inline-start', marginInlineStart),
    [marginInlineStart]
  );
  const backgroundColorClasses = React.useMemo(
    () =>
      backgroundColor && isNamedBackgroundColor(backgroundColor)
        ? classBuilder('background-color', backgroundColor)
        : '',
    [backgroundColor]
  );
  const backgroundColorStyles = React.useMemo(
    () => (backgroundColor && !isNamedBackgroundColor(backgroundColor) ? { backgroundColor } : {}),
    [backgroundColor]
  );
  const borderRadiusClasses = React.useMemo(() => classBuilder('border-radius', borderRadius), [borderRadius]);
  const borderWidthClasses = React.useMemo(() => classBuilder('border-width', borderWidth), [borderWidth]);
  const borderBlockStartWidthClasses = React.useMemo(
    () => classBuilder('border-block-start-width', borderBlockStartWidth),
    [borderBlockStartWidth]
  );
  const borderInlineEndWidthClasses = React.useMemo(
    () => classBuilder('border-inline-end-width', borderInlineEndWidth),
    [borderInlineEndWidth]
  );
  const borderBlockEndWidthClasses = React.useMemo(
    () => classBuilder('border-block-end-width', borderBlockEndWidth),
    [borderBlockEndWidth]
  );
  const borderInlineStartWidthClasses = React.useMemo(
    () => classBuilder('border-inline-start-width', borderInlineStartWidth),
    [borderInlineStartWidth]
  );
  const borderColorClasses = React.useMemo(() => classBuilder('border-color', borderColor), [borderColor]);
  const borderStyleClasses = React.useMemo(() => classBuilder('border-style', borderStyle), [borderStyle]);

  return (
    <div
      className={clsx(
        paddingClasses,
        paddingBlockStartClasses,
        paddingInlineEndClasses,
        paddingBlockEndClasses,
        paddingInlineStartClasses,
        marginClasses,
        marginBlockStartClasses,
        marginInlineEndClasses,
        marginBlockEndClasses,
        marginInlineStartClasses,
        backgroundColorClasses,
        borderRadiusClasses,
        borderWidthClasses,
        borderBlockStartWidthClasses,
        borderInlineEndWidthClasses,
        borderBlockEndWidthClasses,
        borderInlineStartWidthClasses,
        borderColorClasses,
        borderStyleClasses,
        className
      )}
      style={{
        ...backgroundColorStyles,
        ...style
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

/** Set the display name for the Box component. */
Box.displayName = 'gp.Box';

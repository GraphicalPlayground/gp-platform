// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './text.module.css';
import type { BaseProps } from '../helper';

export const textSizes = ['1000', '900', '800', '700', '600', '500', '400', '300', '200', '100'] as const;
export const textTags = ['p', 'span', 'div', 'strong', 'em'] as const;
export const textVariants = ['default', 'muted'] as const;
export const textWeights = [
  'heavy',
  'extrabold',
  'bold',
  'semibold',
  'medium',
  'normal',
  'light',
  'extralight'
] as const;
export const textFontVariants = ['mona-sans', 'hubot-sans', 'monospace'] as const;

export const defaultTextTag = textTags[1]; // span
export const defaultTextSize = textSizes[9]; // 100
export const defaultTextVariant = textVariants[0]; // default
export const defaultTextFontVariant = textFontVariants[0]; // mona-sans

export type TextSizeVariants = (typeof textSizes)[number];
export type TextWeightVariants = (typeof textWeights)[number];
export type TextFontVariants = (typeof textFontVariants)[number];
export type TextVariants = (typeof textVariants)[number];

export type ResponsiveWeightMap = {
  narrow?: TextWeightVariants;
  regular?: TextWeightVariants;
  wide?: TextWeightVariants;
};

type RestrictedPolymorphism =
  | (React.HTMLAttributes<HTMLParagraphElement> & BaseProps<HTMLParagraphElement> & { as?: 'p' })
  | (React.HTMLAttributes<HTMLSpanElement> & BaseProps<HTMLSpanElement> & { as?: 'span' })
  | (React.HTMLAttributes<HTMLDivElement> & BaseProps<HTMLDivElement> & { as?: 'div' })
  | (React.HTMLAttributes<HTMLElement> & BaseProps<HTMLElement> & { as?: 'strong' })
  | (React.HTMLAttributes<HTMLElement> & BaseProps<HTMLElement> & { as?: 'em' });

type TextTags = {
  as?: (typeof textTags)[number];
} & RestrictedPolymorphism;

/**
 * @brief Text component props.
 * @see Text
 */
export type TextProps = {
  font?: TextFontVariants;
  size?: TextSizeVariants;
  variant?: TextVariants;
  weight?: TextWeightVariants | ResponsiveWeightMap;
  align?: 'start' | 'center' | 'end';
  hasAntiAliasing?: boolean;
} & TextTags;

/**
 * @brief Text component.
 * @details An abstraction for using typographic styles.
 */
export const Text: React.FC<TextProps> = ({
  align,
  as = defaultTextTag,
  children,
  className,
  font = defaultTextFontVariant,
  hasAntiAliasing = true,
  size = defaultTextSize,
  variant = defaultTextVariant,
  weight,
  ...rest
}) => {
  const weightClass = React.useMemo(() => {
    if (!weight) return null;

    if (typeof weight === 'string') {
      return styles[`text--weight-${weight}` as keyof typeof styles];
    }

    return (Object.keys(weight) as Array<keyof ResponsiveWeightMap>)
      .map((viewport) => {
        const viewportWeight = weight[viewport];

        if (!viewportWeight) return null;

        return styles[`text-${viewport}--weight-${viewportWeight}` as keyof typeof styles];
      })
      .filter(Boolean)
      .join(' ');
  }, [weight]);

  const dontApplyAA = Boolean(
    !hasAntiAliasing ||
    (weight && ['light', 'extralight'].includes(weight as TextWeightVariants) && ['100', '200'].includes(size)) ||
    size === '100'
  );

  const textClassName = clsx(
    styles.text,
    styles[`text-font--${font}`],
    styles[`text--${variant}`],
    styles[`text--${size}`],
    !dontApplyAA && styles['text--antialiased'],
    weight && weightClass,
    align && styles[`text-align--${align}`],
    className
  );

  const UnderlyingTag = as;

  return (
    <UnderlyingTag className={textClassName} {...(rest as React.HTMLAttributes<HTMLElement>)}>
      {children}
    </UnderlyingTag>
  );
};

/** Set the display name for the Text component. */
Text.displayName = 'gp.Text';

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './Text.module.css';

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
  | (React.HTMLAttributes<HTMLParagraphElement> & { as?: 'p' })
  | (React.HTMLAttributes<HTMLSpanElement> & { as?: 'span' })
  | (React.HTMLAttributes<HTMLDivElement> & { as?: 'div' })
  | (React.HTMLAttributes<HTMLElement> & { as?: 'strong' })
  | (React.HTMLAttributes<HTMLElement> & { as?: 'em' });

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
  className,
  children,
  font = defaultTextFontVariant,
  size = defaultTextSize,
  variant = defaultTextVariant,
  weight,
  hasAntiAliasing = true,
  ...rest
}) => {
  const weightClass = React.useMemo(() => {
    if (!weight) return null;

    if (typeof weight === 'string') {
      return styles[`Text--weight-${weight}` as keyof typeof styles];
    }

    return (Object.keys(weight) as Array<keyof ResponsiveWeightMap>)
      .map((viewport) => {
        const viewportWeight = weight[viewport];
        if (!viewportWeight) return null;
        return styles[`Text-${viewport}--weight-${viewportWeight}` as keyof typeof styles];
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
    styles.Text,
    styles[`Text-font--${font}`],
    styles[`Text--${variant}`],
    styles[`Text--${size}`],
    !dontApplyAA && styles['Text--antialiased'],
    weight && weightClass,
    align && styles[`Text-align--${align}`],
    className
  );

  const UnderlyingTag = as;
  return (
    <UnderlyingTag className={textClassName} {...rest}>
      {children}
    </UnderlyingTag>
  );
};

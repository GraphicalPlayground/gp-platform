// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './heading.module.css';

export const headingSizes = ['display', '1', '2', '3', '4', '5', '6', 'subhead-large', 'subhead-medium'] as const;
export const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

export const headingWeights = [
  'heavy',
  'extrabold',
  'bold',
  'semibold',
  'medium',
  'normal',
  'light',
  'extralight'
] as const;
export const headingStretch = ['condensed', 'normal', 'expanded'] as const;
export const headingLetterSpacing = ['condensed', 'normal', 'none'] as const;
export const headingFontVariants = ['mona-sans', 'hubot-sans', 'monospace'] as const;

export const defaultHeadingTag = headingTags[1];
export const defaultHeadingFont = headingFontVariants[0];

type HeadingWeightVariants = (typeof headingWeights)[number];
type HeadingStretchVariants = (typeof headingStretch)[number];
type HeadingLetterSpacingVariants = (typeof headingLetterSpacing)[number];
type HeadingFontVariants = (typeof headingFontVariants)[number];
type HeadingTextWrapVariants = 'wrap' | 'balance';

type ResponsiveStretchMap = {
  narrow?: HeadingStretchVariants;
  regular?: HeadingStretchVariants;
  wide?: HeadingStretchVariants;
};

type ResponsiveLetterSpacingMap = {
  narrow?: HeadingLetterSpacingVariants;
  regular?: HeadingLetterSpacingVariants;
  wide?: HeadingLetterSpacingVariants;
};

type ResponsiveWeightMap = {
  narrow?: HeadingWeightVariants;
  regular?: HeadingWeightVariants;
  wide?: HeadingWeightVariants;
};

export const classMap = {
  h1: headingSizes[1],
  h2: headingSizes[2],
  h3: headingSizes[3],
  h4: headingSizes[4],
  h5: headingSizes[5],
  h6: headingSizes[6]
};

/**
 * @brief Heading component props interface.
 * @see Heading
 */
export type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  /**
   * @brief Semantic heading level (`h1`–`h6`) only. Use `size` to apply the correct visual size.
   */
  as?: (typeof headingTags)[number];

  /**
   * @brief Controls the visual size, independent of `as`. Should be used whenever as prop is used, as the defaults may not be ideal for all use-cases.
   *
   * @example
   * <Heading as="h2" size="4">This h2 will appear visually identical to an h4</Heading>
   */
  size?: (typeof headingSizes)[number];
  weight?: HeadingWeightVariants | ResponsiveWeightMap;
  stretch?: HeadingStretchVariants | ResponsiveStretchMap;
  letterSpacing?: HeadingLetterSpacingVariants | ResponsiveLetterSpacingMap;
  font?: HeadingFontVariants;
  textWrap?: HeadingTextWrapVariants;

  /**
   * @brief React ref for the heading element.
   */
  ref?: React.Ref<HTMLHeadingElement>;
};

/**
 * @brief Heading component.
 * @details
 */
export const Heading: React.FC<HeadingProps> = ({
  as: HeadingComponent = defaultHeadingTag,
  children,
  className,
  font = 'mona-sans',
  letterSpacing,
  ref,
  size,
  stretch,
  textWrap = 'balance',
  weight,
  ...rest
}) => {
  const buildClass = (type: string, value: any) => {
    if (!value) return null;

    return typeof value === 'string'
      ? styles[`heading--${type}-${value}` as keyof typeof styles]
      : Object.keys(value)
          .map((viewport) => {
            return styles[`heading-${viewport}--${type}-${value[viewport]}` as keyof typeof styles];
          })
          .join(' ');
  };

  const weightClass = React.useMemo(() => buildClass('weight', weight), [weight]);
  const stretchClass = React.useMemo(() => buildClass('stretch', stretch), [stretch]);
  const letterSpacingClass = React.useMemo(() => buildClass('letter-spacing', letterSpacing), [letterSpacing]);

  const headingClassNames = clsx(
    styles.heading,
    styles[`heading-font--${font}`],
    !size && styles[`heading--${classMap[HeadingComponent]}`],
    size && styles[`heading--${size}`],
    styles[`heading--text-wrap-${textWrap}`],
    weight && weightClass,
    stretch && stretchClass,
    letterSpacingClass && letterSpacingClass,
    className
  );

  if (!headingTags.includes(HeadingComponent)) {
    // eslint-disable-next-line no-console
    console.error(`Heading: 'as' prop must be one of ${headingTags.join(', ')}`);

    return null;
  }

  return (
    <HeadingComponent ref={ref} className={headingClassNames} {...rest}>
      {children}
    </HeadingComponent>
  );
};

/** Set the display name for the Heading component. */
Heading.displayName = 'gp.Heading';

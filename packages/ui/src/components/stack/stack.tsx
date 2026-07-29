// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import { baseSizeScale } from '../constants';
import styles from './stack.module.css';

export const stackDirectionVariants = ['horizontal', 'vertical'] as const;
type StackDirectionVariants = (typeof stackDirectionVariants)[number];
export const defaultStackDirection = stackDirectionVariants[1];

export const stackSpacingVariants = ['none', 'condensed', 'normal', 'spacious', ...baseSizeScale] as const;
type StackSpacingVariants = (typeof stackSpacingVariants)[number];
export const defaultStackSpacing = stackSpacingVariants[1];

export const stackAlignItemVariants = ['center', 'flex-start', 'flex-end'] as const;
type StackAlignItemVariants = (typeof stackAlignItemVariants)[number];

export const stackFlexWrapVariants = ['wrap', 'nowrap'] as const;
type StackFlexWrapVariants = (typeof stackFlexWrapVariants)[number];

export const stackJustifyContentVariants = [
  ...stackAlignItemVariants,
  'space-between',
  'space-around',
  'space-evenly'
] as const;
type justifyContentVariants = (typeof stackJustifyContentVariants)[number];

type ResponsiveJustifyContentMap = {
  narrow?: justifyContentVariants;
  regular?: justifyContentVariants;
  wide?: justifyContentVariants;
};

type ResponsiveAlignItemsMap = {
  narrow?: StackAlignItemVariants;
  regular?: StackAlignItemVariants;
  wide?: StackAlignItemVariants;
};

type ResponsiveDirectionMap = {
  narrow?: StackDirectionVariants;
  regular?: StackDirectionVariants;
  wide?: StackDirectionVariants;
};

type ResponsiveSpacingMap = {
  narrow?: StackSpacingVariants;
  regular?: StackSpacingVariants;
  wide?: StackSpacingVariants;
};

type ResponsiveFlexWrapMap = {
  narrow?: StackFlexWrapVariants;
  regular?: StackFlexWrapVariants;
  wide?: StackFlexWrapVariants;
};

/**
 * @brief Stack component props interface.
 * @see Stack
 */
export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode[] | React.ReactNode;
  /**
   * @brief Defines the flex-direction CSS property.
   * A string value will be applied to all viewports.
   * An object can be used to define different values for different viewports.
   */
  direction?: StackDirectionVariants | ResponsiveDirectionMap;

  /**
   * @brief Defines the gap CSS property.
   * A string value will be applied to all viewports.
   * An object can be used to define different values for different viewports.
   */
  gap?: StackSpacingVariants | ResponsiveSpacingMap;

  /**
   * @brief Applies vertical alignment to child elements relative to the Stack, using the align-items CSS property.
   * A string value will be applied to all viewports.
   * An object can be used to define different values for different viewports.
   */
  alignItems?: StackAlignItemVariants | ResponsiveAlignItemsMap;

  /**
   * @brief Defines the padding CSS property on the parent Stack.
   * A string value will be applied to all viewports.
   * An object can be used to define different values for different viewports.
   */
  padding?: StackSpacingVariants | ResponsiveSpacingMap;

  /**
   * @brief Applies horizontal alignment to child elements relative to the Stack, using the justify-content CSS property.
   * A string value will be applied to all viewports.
   * An object can be used to define different values for different viewports.
   */
  justifyContent?: justifyContentVariants | ResponsiveJustifyContentMap;

  /**
   * @brief Applies flex-wrap to the Stack, using the flex-wrap CSS property.
   */
  flexWrap?: StackFlexWrapVariants | ResponsiveFlexWrapMap;

  /**
   * @brief Ref to the Stack component's root div element.
   */
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * @brief Stack component.
 */
export const Stack: React.FC<StackProps> = ({
  children,
  direction = defaultStackDirection,
  gap = defaultStackSpacing,
  alignItems,
  padding = defaultStackSpacing,
  justifyContent,
  className,
  flexWrap,
  ref,
  ...rest
}) => {
  const directionClass = React.useMemo(
    () =>
      typeof direction === 'string'
        ? styles[`stack--${direction}`]
        : (Object.keys(direction) as Array<keyof typeof direction>)
            .map((viewport) => styles[`stack-${viewport}--${direction[viewport]}` as keyof typeof styles])
            .join(' '),
    [direction]
  );

  const gapClass = React.useMemo(
    () =>
      typeof gap === 'string' || typeof gap === 'number'
        ? styles[`stack--gap-${gap}`]
        : (Object.keys(gap) as Array<keyof typeof gap>)
            .map((viewport) => styles[`stack-${viewport}--gap-${gap[viewport]}` as keyof typeof styles])
            .join(' '),
    [gap]
  );

  const paddingClass = React.useMemo(
    () =>
      typeof padding === 'string' || typeof padding === 'number'
        ? styles[`stack--padding-${padding}`]
        : (Object.keys(padding) as Array<keyof typeof padding>)
            .map((viewport) => styles[`stack-${viewport}--padding-${padding[viewport]}` as keyof typeof styles])
            .join(' '),
    [padding]
  );

  const alignItemsClass = React.useMemo(
    () =>
      typeof alignItems === 'string'
        ? styles[`stack--align-items-${alignItems}`]
        : typeof alignItems === 'object'
          ? (Object.keys(alignItems) as Array<keyof typeof alignItems>)
              .map(
                (viewport) => styles[`stack-${viewport}--align-items-${alignItems[viewport]}` as keyof typeof styles]
              )
              .join(' ')
          : null,
    [alignItems]
  );

  const justifyContentClass = React.useMemo(
    () =>
      typeof justifyContent === 'string'
        ? styles[`stack--justify-content-${justifyContent}`]
        : typeof justifyContent === 'object'
          ? (Object.keys(justifyContent) as Array<keyof typeof justifyContent>)
              .map(
                (viewport) =>
                  styles[`stack-${viewport}--justify-content-${justifyContent[viewport]}` as keyof typeof styles]
              )
              .join(' ')
          : null,
    [justifyContent]
  );

  const flexWrapClass = React.useMemo(
    () =>
      typeof flexWrap === 'string'
        ? styles[`stack-flex-wrap--${flexWrap}`]
        : typeof flexWrap === 'object'
          ? (Object.keys(flexWrap) as Array<keyof typeof flexWrap>)
              .map((viewport) => styles[`stack-${viewport}-flex-wrap--${flexWrap[viewport]}` as keyof typeof styles])
              .join(' ')
          : null,
    [flexWrap]
  );

  return (
    <div
      className={clsx(
        styles.stack,
        directionClass,
        gapClass,
        alignItemsClass,
        justifyContentClass,
        paddingClass,
        flexWrapClass,
        className
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  );
};

/** Set the display name for the Stack component. */
Stack.displayName = 'gp.Stack';

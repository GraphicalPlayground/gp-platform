// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { JSX } from 'react';
import clsx from 'clsx';
import styles from './grid.module.css';

/**
 * @brief Type definition for the GridColumn component.
 */
export type GridColumnIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * @brief Type definition for responsive grid column properties.
 */
type ResponsiveMap = {
  xsmall?: GridColumnIndex;
  small?: GridColumnIndex;
  medium?: GridColumnIndex;
  large?: GridColumnIndex;
  xlarge?: GridColumnIndex;
  xxlarge?: GridColumnIndex;
};

/**
 * @brief Grid component props interface.
 * @see Grid
 */
type GridRootProps<T extends keyof JSX.IntrinsicElements = 'div'> = React.HTMLAttributes<T> & {
  /**
   * @brief The HTML element used to render the grid.
   */
  as?: T | 'div' | 'span' | 'section';

  /**
   * @brief Visual aid to help with alignment.
   */
  enableOverlay?: boolean;

  /**
   * @brief Enable/disable default gutters
   */
  enableGutters?: boolean;

  /**
   * @brief Sets the gap between columns.
   */
  columnGap?: 'none' | 'default';

  /**
   * @brief Sets the gap between rows.
   */
  rowGap?: 'none' | 'default';

  /**
   * @brief Fills the width of the parent container and removes the max-width.
   */
  fullWidth?: boolean;
} & (T extends 'span'
    ? React.HTMLAttributes<HTMLSpanElement>
    : T extends 'section'
      ? React.HTMLAttributes<HTMLElement>
      : React.HTMLAttributes<HTMLDivElement>);

/**
 * @brief Grid component.
 */
const GridRoot: React.FC<GridRootProps> = React.memo(
  ({
    as = 'div',
    children,
    className,
    columnGap = 'default',
    enableGutters = true,
    enableOverlay = false,
    fullWidth = false,
    rowGap = 'default',
    ...rest
  }) => {
    const gridClass = clsx(
      styles.grid,
      styles[`grid--column-gap-${columnGap}`],
      styles[`grid--row-gap-${rowGap}`],
      enableOverlay && styles['grid--has-overlay'],
      fullWidth && styles['grid--full-width'],
      enableGutters && styles['grid--has-gutters'],
      className
    );

    const validElements = ['div', 'span', 'section'];
    const UnderlyingTag = validElements.includes(as) ? as : 'div';

    return (
      <UnderlyingTag className={gridClass} {...rest}>
        {children}
      </UnderlyingTag>
    );
  }
);

/** Set the display name for the Grid component. */
GridRoot.displayName = 'gp.Grid.Root';

/**
 * @brief Type definition for the GridColumn component.
 * @see GridColumn
 */
type GridColumnProps<T extends keyof JSX.IntrinsicElements = 'div'> = {
  as?: T | 'div' | 'span' | 'section';
  span?: GridColumnIndex | ResponsiveMap;
  start?: GridColumnIndex | ResponsiveMap;
} & (T extends 'span'
  ? React.HTMLAttributes<HTMLSpanElement>
  : T extends 'section'
    ? React.HTMLAttributes<HTMLElement>
    : React.HTMLAttributes<HTMLDivElement>);

const GridColumn: React.FC<GridColumnProps> = React.memo(
  ({ as = 'div', children, className, span = 12, start, ...rest }) => {
    const validElements = ['div', 'span', 'section'];
    const UnderlyingTag = validElements.includes(as) ? as : 'div';

    const columnClassArray = [styles['grid-column']];

    if (typeof span === 'number') {
      columnClassArray.push(styles[`grid-column--span-${span}`]);
    } else if (typeof span === 'object') {
      for (const [key, value] of Object.entries(span)) {
        if (key === 'xsmall') {
          columnClassArray.push(styles[`grid-column--xsmall-span-${value}`]);
        } else {
          columnClassArray.push(styles[`grid-column--${key}-span-${value}` as keyof typeof styles]);
        }
      }
    }

    if (typeof start === 'number') {
      columnClassArray.push(styles[`grid-column--start-${start}`]);
    } else if (typeof start === 'object') {
      for (const [key, value] of Object.entries(start)) {
        if (key === 'xsmall') {
          columnClassArray.push(styles[`grid-column--xsmall-start-${value}`]);
        } else {
          columnClassArray.push(styles[`grid-column--${key}-start-${value}` as keyof typeof styles]);
        }
      }
    }

    const classes = clsx(columnClassArray, className);

    return (
      <UnderlyingTag className={classes} {...rest}>
        {children}
      </UnderlyingTag>
    );
  }
);

/** Set the display name for the GridColumn component. */
GridColumn.displayName = 'gp.Grid.Column';

/**
 * @brief Grid component with subcomponents.
 */
export const Grid = Object.assign(GridRoot, {
  Root: GridRoot,
  Column: GridColumn
});

/**
 * @brief Type definition for the Grid component.
 */
export type Grid = {
  Props: React.ComponentProps<typeof GridRoot>;
  Root: React.ComponentType<GridRootProps>;
  Column: React.ComponentType<GridColumnProps>;
};

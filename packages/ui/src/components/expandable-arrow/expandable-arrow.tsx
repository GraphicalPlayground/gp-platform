// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './expandable-arrow.module.css';

/**
 * @brief Props for the ExpandableArrow component.
 * @see ExpandableArrow
 */
export interface ExpandableArrowProps {
  /**
   * @brief The class name to apply to the component.
   */
  className?: string;

  /**
   * @brief Whether the arrow is expanded or not.
   */
  expanded?: boolean;

  /**
   * @brief Whether the arrow is hidden or not.
   */
  hidden?: boolean;

  /**
   * @brief Whether the arrow is reversed or not.
   */
  reverse?: boolean;
}

/**
 * @brief A component that renders an expandable arrow.
 * @returns The rendered component.
 */
export const ExpandableArrow: React.FC<ExpandableArrowProps> = ({
  className,
  expanded = false,
  reverse = false,
  hidden,
  ...rest
}) => {
  return (
    <svg
      className={clsx(
        styles['expandable-arrow'],
        expanded && styles['expandable-arrow--expanded'],
        reverse && styles['expandable-arrow--reversed'],
        className
      )}
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      aria-hidden={hidden}
      focusable={hidden ? 'false' : undefined}
      {...rest}
    >
      <path
        fill='currentColor'
        d='M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z'
      />
      <path
        className={clsx(styles['expandable-arrow-stem'], expanded && styles['expandable-arrow-stem--expanded'])}
        stroke='currentColor'
        d='M1.75 8H11'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  );
};

/** Set the display name for the ExpandableArrow component. */
ExpandableArrow.displayName = 'gp.ExpandableArrow';

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './spinner.module.css';

export type SpinnerProps = {
  size?: 'small' | 'medium' | 'large' | number;
  accessibleLabel?: string | null;
  className?: string;
};

/**
 * @brief A loading spinner component that can be used to indicate that a process is ongoing.
 */
export const Spinner: React.FC<SpinnerProps> = ({ size = 'medium', accessibleLabel = 'Loading', className }) => {
  const customSize = typeof size === 'number' ? size : undefined;

  return (
    <span className={styles.spinner__box} data-component='Spinner'>
      <svg
        width={customSize}
        height={customSize}
        viewBox='0 0 16 16'
        fill='none'
        aria-hidden='true'
        focusable='false'
        className={clsx(styles.spinner, typeof size === 'string' && styles[`spinner--${size}`], className)}
      >
        <circle
          cx='8'
          cy='8'
          r='7'
          fill='none'
          stroke='currentColor'
          strokeOpacity='0.25'
          strokeWidth='2'
          vectorEffect='non-scaling-stroke'
        />
        <path
          d='M15 8a7.002 7.002 0 00-7-7'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          vectorEffect='non-scaling-stroke'
        />
      </svg>
      {accessibleLabel !== null ? <span className='visually-hidden'>{accessibleLabel}</span> : null}
    </span>
  );
};

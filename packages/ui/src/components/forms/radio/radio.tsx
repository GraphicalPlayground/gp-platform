// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { forwardRef, useCallback } from 'react';
import type { InputHTMLAttributes, ReactElement } from 'react';
import { clsx } from 'clsx';
import { useProvidedRefOrCreate, useId } from '../../../hooks';

import type { BaseProps } from '../../helper';

import styles from './radio.module.css';

export type RadioProps = {
  /**
   * Apply inactive visual appearance to the Radio
   */
  disabled?: boolean;
  /**
   * Indicates whether the Radio must be checked
   */
  required?: boolean;
  /**
   * A unique value that is never shown to the user.
   * Used during form submission and to identify which Radio inputs are selected
   */
  value?: string;
} & Exclude<InputHTMLAttributes<HTMLInputElement>, 'value'> &
  BaseProps<HTMLInputElement>;

const RadioInternal = (
  { checked, className, disabled, id, onChange, required, value, ...rest }: RadioProps,
  ref: React.Ref<HTMLInputElement>
): ReactElement => {
  const inputRef = useProvidedRefOrCreate<HTMLInputElement | null>(ref || null);
  const uniqueId = useId(id);

  const onClick = useCallback(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  }, [disabled, inputRef]);

  return (
    <span className={styles['Radio-wrapper']}>
      <input
        id={uniqueId}
        aria-checked={checked ? 'true' : 'false'}
        checked={checked}
        className={clsx(styles['Radio-input'])}
        disabled={disabled}
        name={value}
        onChange={onChange}
        ref={inputRef}
        required={required}
        type='radio'
        value={value}
        {...rest}
      />
      <span className={clsx(styles.Radio, className)} onClick={onClick} tabIndex={-1} aria-hidden='true'>
        <span className={styles['Radio-dot']} />
      </span>
    </span>
  );
};

export const Radio = forwardRef(RadioInternal);

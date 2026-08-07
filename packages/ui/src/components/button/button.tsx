// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import clsx from 'clsx';
import styles from './button.module.css';

import type { BaseProps } from '../helper';
import { Text } from '../text';
import type { Icon } from '@primer/octicons-react';

export const ButtonVariants = ['primary', 'secondary', 'subtle'] as const;
export const ButtonSizes = ['small', 'medium', 'large'] as const;

export const defaultButtonVariant = ButtonVariants[1];
export const defaultButtonSize = ButtonSizes[1];

export type ButtonVariant = (typeof ButtonVariants)[number];

export type ButtonBaseProps = {
  /**
   * @brief The leading visual appears before the button content
   */
  leadingVisual?: React.ReactElement | Icon;

  /**
   * @brief The trailing visual appears after the button content
   */
  trailingVisual?: React.ReactElement | Icon;

  /**
   * @brief The styling variations available in Button
   */
  variant?: ButtonVariant;

  /**
   * @brief The size variations available in Button
   */
  size?: (typeof ButtonSizes)[number];

  /**
   * @brief The Button spans the full width
   */
  block?: boolean;
};

/**
 * @brief Button component props interface.
 * @see Button
 */
export type ButtonProps<C extends React.ElementType> = BaseProps<C> & {
  as?: C;
} & ButtonBaseProps &
  React.ComponentPropsWithoutRef<C>;

/**
 * @brief Button component.
 * @details A customizable button component.
 */
export const Button = React.forwardRef(
  <C extends React.ElementType>(
    {
      'aria-disabled': ariaDisabled,
      as,
      block = false,
      children,
      className,
      disabled,
      'leadingVisual': LeadingVisual,
      onBlur,
      onFocus,
      onMouseEnter,
      onMouseLeave,
      size = defaultButtonSize,
      'trailingVisual': TrailingVisual,
      variant = defaultButtonVariant,
      ...rest
    }: ButtonProps<C>,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const [_isHovered, setIsHovered] = React.useState(false);
    const [_isFocused, setIsFocused] = React.useState(false);
    const Component = as || 'button';
    const isDisabled =
      disabled || ariaDisabled === 'true' || (typeof ariaDisabled === 'boolean' && ariaDisabled === true);

    const returnValidComponent = React.useCallback((component?: React.ReactElement | Icon) => {
      if (React.isValidElement(component)) {
        return component;
      }

      if (typeof component === 'function') {
        return React.createElement(component);
      }
    }, []);

    const LeadingVisualComponent = returnValidComponent(LeadingVisual);
    const TrailingVisualComponent = returnValidComponent(TrailingVisual);

    const handleOnMouseEnter = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!isDisabled) {
          setIsHovered(true);
          onMouseEnter?.(event);
        }
      },
      [isDisabled, onMouseEnter]
    );

    const handleOnMouseLeave = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!isDisabled) {
          setIsHovered(false);
          onMouseLeave?.(event);
        }
      },
      [isDisabled, onMouseLeave]
    );

    const handleOnFocus = React.useCallback(
      (event: React.FocusEvent<HTMLButtonElement>) => {
        if (!isDisabled) {
          setIsFocused(true);
          onFocus?.(event);
        }
      },
      [isDisabled, onFocus]
    );

    const handleOnBlur = React.useCallback(
      (event: React.FocusEvent<HTMLButtonElement>) => {
        if (!isDisabled) {
          setIsFocused(false);
          onBlur?.(event);
        }
      },
      [isDisabled, onBlur]
    );

    return (
      <Component
        ref={ref}
        className={clsx(
          styles.button,
          styles[`button--${variant}`],
          styles[`button--size-${size}`],
          block && styles['button--block'],
          isDisabled && styles[`button--disabled`],
          className
        )}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        disabled={(isDisabled && Component === 'button') || undefined}
        aria-disabled={(isDisabled && Component !== 'button') || undefined}
        {...rest}
      >
        {React.isValidElement<{ className?: string; ['aria-hidden']?: string; focusable?: string }>(
          LeadingVisualComponent
        ) && (
          <span className={styles['button__leading-visual']}>
            {React.cloneElement(LeadingVisualComponent, {
              className: clsx(styles['button__icon-visual'], isDisabled && styles['button__icon-visual--disabled']),
              ['aria-hidden']: 'true',
              focusable: 'false'
            })}
          </span>
        )}

        <span className={styles['button__text']}>
          <Text
            as='span'
            size={size === 'small' ? '100' : size === 'medium' ? '200' : '400'}
            weight='medium'
            className={clsx(
              styles['button--label'],
              styles[`button--label-${size}` as keyof typeof styles],
              styles[`button--label-${variant}`],
              isDisabled && styles[`button-label--disabled`]
            )}
          >
            {children}
          </Text>
        </span>

        {React.isValidElement<{ className?: string; ['aria-hidden']?: string; focusable?: string }>(
          TrailingVisualComponent
        ) && (
          <span className={clsx(styles['button__trailing-visual'])}>
            {React.cloneElement(TrailingVisualComponent, {
              className: clsx(styles['button__icon-visual'], isDisabled && styles['button__icon-visual--disabled']),
              ['aria-hidden']: 'true',
              focusable: 'false'
            })}
          </span>
        )}
      </Component>
    );
  }
);

/** Set the display name for the Button component. */
Button.displayName = 'gp.Button';

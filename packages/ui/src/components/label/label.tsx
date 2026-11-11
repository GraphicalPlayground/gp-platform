// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './label.module.css';

import { Text } from '../text';
import { colors, biColorGradients, triColorGradients } from '../constants';
import type { Icon } from '@primer/octicons-react';
import type { BaseProps } from '../helper';

const gradients = [...biColorGradients, ...triColorGradients] as const;

export const labelColors = [...colors, ...gradients] as const;
export const labelSizes = ['small', 'medium', 'large'] as const;

export const defaultLabelColor = labelColors[0];
export const defaultLabelSize = labelSizes[1];

/**
 * @brief Label component props interface.
 * @see Label
 */
export type LabelProps = BaseProps<HTMLSpanElement> & {
  /**
   * @brief The leading visual appears before the Label content.
   */
  leadingVisual?: React.ReactNode | Icon;

  /**
   * @brief The color variations available in Label.
   */
  color?: (typeof labelColors)[number];

  /**
   * @brief The size variations available in Label.
   */
  size?: (typeof labelSizes)[number];
} & React.ComponentPropsWithoutRef<'span'>;

/**
 * @brief Label component for displaying text with optional leading visual and customizable color and size.
 * @details The Label component is a versatile UI element that allows for the display of text with an
 * optional leading visual (icon or image).
 */
export const Label = React.forwardRef<HTMLSpanElement, LabelProps>(
  (
    { children, className, color = defaultLabelColor, leadingVisual: LeadingVisual, size = defaultLabelSize, ...rest },
    ref
  ) => {
    const isGradient = React.useMemo(() => gradients.find((gradient) => gradient === color), [color]);

    return (
      <span
        ref={ref}
        className={clsx(
          styles.label,
          styles[`label--color-${color}`],
          styles[`label--size-${size}`],
          isGradient && styles['label--gradient'],
          className
        )}
        {...rest}
      >
        {LeadingVisual && (
          <span aria-hidden='true' className={styles['label__leading-visual']}>
            {typeof LeadingVisual === 'function' ? (
              <LeadingVisual />
            ) : (
              React.isValidElement<{ className?: string }>(LeadingVisual) &&
              React.cloneElement(LeadingVisual, {
                className: clsx(styles['label__icon-visual'])
              })
            )}
          </span>
        )}
        <span className={clsx(styles['label__text'])}>
          <Text as='span' size={size === 'large' ? '200' : '100'} className={clsx(styles['label__label'])}>
            {children}
          </Text>
        </span>
      </span>
    );
  }
);

/** Set the display name for the Label component. */
Label.displayName = 'gp.Label';

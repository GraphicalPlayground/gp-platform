// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './icon.module.css';
import { colors } from '../constants';
import { type Icon as OcticonProps } from '@primer/octicons-react';
import type { BaseIconProps } from '../icons';

export const namedIconSizes = ['small', 'medium', 'large'] as const;
export type NamedIconSize = (typeof namedIconSizes)[number];

export const numericIconSizes = [20, 24, 28, 32, 36, 40, 44] as const;
export type NumericIconSize = (typeof numericIconSizes)[number];

export const iconSizes = [...namedIconSizes, ...numericIconSizes] as const;
export type IconSize = (typeof iconSizes)[number];

const isNumericIconSize = (size: IconSize): size is NumericIconSize => typeof size === 'number';

export const defaultIconSize = iconSizes[0];
export const iconSizeMap: Record<NamedIconSize, NumericIconSize> = {
  small: 20,
  medium: 32,
  large: 44
};

const getIconSize = (size: IconSize): NumericIconSize => {
  if (isNumericIconSize(size)) {
    return size;
  }

  return iconSizeMap[size];
};

export const iconColors = colors;
export type IconColor = (typeof iconColors)[number];
export const defaultIconColor = iconColors[0];

export interface IconProps extends React.SVGAttributes<SVGElement> {
  icon: OcticonProps | React.ReactElement<OcticonProps> | React.ReactElement<BaseIconProps>;
  color?: IconColor;
  hasBackground?: boolean;
  size?: IconSize;
}

export const Icon: React.FC<IconProps> = ({
  icon: Octicon,
  className,
  color = defaultIconColor,
  hasBackground = false,
  size = defaultIconSize,
  ...rest
}) => {
  const iconSize = getIconSize(size);

  const iconProps = {
    size: iconSize,
    ...rest
  };

  const iconComponent = React.isValidElement(Octicon) ? (
    React.cloneElement(Octicon as React.ReactElement<OcticonProps | BaseIconProps>, {
      ...Octicon.props,
      ...iconProps
    })
  ) : (
    <Octicon {...iconProps} />
  );

  return (
    <div
      className={clsx(
        styles['icon'],
        styles[`icon--size-${iconSize}`],
        styles[`icon--color-${color}`],
        hasBackground && [styles['icon--background'], styles[`icon--background-color-${color}`]],
        className
      )}
    >
      {iconComponent}
    </div>
  );
};

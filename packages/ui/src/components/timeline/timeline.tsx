// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React, { useMemo, useCallback } from 'react';
import type { PropsWithChildren } from 'react';
import { clsx } from 'clsx';
import styles from './timeline.module.css';
import type { BaseProps } from '../helper';
import { Text } from '../text';

export type TimelineProps = {
  fullWidth?: boolean;
} & BaseProps<HTMLUListElement>;

const TimelineBase = ({ className, children, fullWidth = false, ...rest }: PropsWithChildren<TimelineProps>) => {
  const timelineClassName = clsx(styles.Timeline, fullWidth && styles['Timeline--full-width'], className);

  return (
    <ul className={timelineClassName} {...rest}>
      {children}
    </ul>
  );
};

export type TimelineItemProps = BaseProps<HTMLLIElement>;

const Item = ({ className, children, ...rest }: PropsWithChildren<TimelineItemProps>) => {
  const itemClassName = clsx(styles['Timeline__item'], className);
  const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

  const getConditionalVariant = useCallback(() => {
    if (childrenArray.some((child) => React.isValidElement(child) && (child.type === 'b' || child.type === 'em'))) {
      return 'muted';
    }

    return 'default';
  }, [childrenArray]);

  const defaultColor = childrenArray.length === 1 ? 'default' : getConditionalVariant();

  return (
    <li className={itemClassName} {...rest}>
      <Text className={styles['Timeline__item-text']} size='200' variant={defaultColor}>
        {children}
      </Text>
    </li>
  );
};

/**
 * Use Timeline to display a list of connected items as a vertical timeline.
 * @see https://primer.style/brand/components/Timeline
 */
export const Timeline = Object.assign(TimelineBase, {
  Item
});

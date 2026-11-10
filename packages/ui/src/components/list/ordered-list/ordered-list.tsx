// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { PropsWithChildren } from 'react';
import { clsx } from 'clsx';
import type { BaseProps } from '../../helper';
import { ListContext } from '../list-context';
import { ListItem } from '../list-item';

import baseStyles from '../list-shared.module.css';
import styles from './ordered-list.module.css';

export type OrderedListProps = PropsWithChildren<BaseProps<HTMLOListElement>>;

function Root({ children, ...props }: OrderedListProps) {
  return (
    <ol className={clsx(baseStyles.List, styles.OrderedList, props.className)} {...props}>
      <ListContext.Provider value={{ variant: '' }}>{children}</ListContext.Provider>
    </ol>
  );
}

export const OrderedList = Object.assign(Root, { Item: ListItem });

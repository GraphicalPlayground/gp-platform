// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import { clsx } from 'clsx';
import React, { createContext, forwardRef, useContext } from 'react';
import type { Ref, PropsWithChildren } from 'react';
import { ArrowUpRightIcon } from '@primer/octicons-react';
import type { BaseProps } from '../helper';
import gridlineStyles from '../shared.module.css';
import { Text } from '../text';
import { isFragmentElement, SmartLink } from '../helper';

import styles from './tiles.module.css';

type TilesVariant = 'default' | 'gridlines';

type TilesLayout = 'default' | 'compact';

const maximumTilesPerRowByViewport = {
  default: { xsmall: 2, small: 3, medium: 4, large: 9 },
  compact: { xsmall: 4, small: 3, medium: 6, large: 9 }
} satisfies Record<TilesLayout, Record<'xsmall' | 'small' | 'medium' | 'large', number>>;

const TilesContext = createContext<TilesLayout>('default');

export type TilesProps = {
  /**
   * The visual variant of the Tiles component.
   */
  variant?: TilesVariant;
  /**
   * The layout density of the Tiles grid.
   */
  layout?: TilesLayout;
} & BaseProps<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement>;

const TilesRoot = forwardRef(
  (
    { variant = 'default', layout = 'default', children, className, ...rest }: PropsWithChildren<TilesProps>,
    ref: Ref<HTMLDivElement>
  ) => {
    const getChildCount = (childNodes: React.ReactNode): number =>
      React.Children.toArray(childNodes).reduce<number>(
        (count, child) => count + (isFragmentElement(child) ? getChildCount(child.props.children) : 1),
        0
      );

    const getBalancedColumnCount = (itemCount: number, maximumTilesPerRow: number) => {
      if (itemCount === 0) return 1;

      const fewestRowsNeeded = Math.ceil(itemCount / maximumTilesPerRow);

      return Math.ceil(itemCount / fewestRowsNeeded);
    };

    const itemCount = getChildCount(children);

    if ((process.env['NODE_ENV'] === 'development' || process.env['NODE_ENV'] === 'test') && itemCount > 9) {
      // eslint-disable-next-line no-console
      console.warn('Tiles: Use no more than 9 items.');
    }

    const maximumTilesPerRow = maximumTilesPerRowByViewport[layout];
    const gridStyle = {
      '--tiles-columns-xsmall': getBalancedColumnCount(itemCount, maximumTilesPerRow.xsmall),
      '--tiles-columns-small': getBalancedColumnCount(itemCount, maximumTilesPerRow.small),
      '--tiles-columns-medium': getBalancedColumnCount(itemCount, maximumTilesPerRow.medium),
      '--tiles-columns-large': getBalancedColumnCount(itemCount, maximumTilesPerRow.large)
    } as React.CSSProperties;

    return (
      <TilesContext.Provider value={layout}>
        <div
          ref={ref}
          className={clsx(
            styles.Tiles,
            styles[`Tiles--variant-${variant}` as keyof typeof styles],
            styles[`Tiles--layout-${layout}`],
            variant === 'gridlines' && gridlineStyles.gridline,
            className
          )}
          {...rest}
        >
          <ul className={styles['Tiles-grid']} style={gridStyle}>
            {children}
          </ul>
        </div>
      </TilesContext.Provider>
    );
  }
);

export type TilesItemProps = {
  /**
   * The accessible name for the tile item.
   */
  name: string;
  /**
   * Optional URL to link the tile to.
   */
  href?: string;
} & BaseProps<HTMLLIElement> &
  Omit<React.HTMLAttributes<HTMLLIElement>, 'children'> & {
    children: React.ReactNode;
  };

const _Item = forwardRef(({ name, href, children, className, ...rest }: TilesItemProps, ref: Ref<HTMLLIElement>) => {
  const layout = useContext(TilesContext);
  const hasLink = Boolean(href);
  const isLabelHidden = layout === 'compact' && !hasLink;

  const content = (
    <span className={styles['Tiles-item-content']}>
      <span className={styles['Tiles-item-media']} aria-hidden='true'>
        {children}
      </span>
      <span className={clsx(styles['Tiles-item-label'], isLabelHidden && 'visually-hidden')}>
        <Text as='span' size='100' className={styles['Tiles-item-name']}>
          {name}
        </Text>
        {hasLink && <ArrowUpRightIcon size={16} className={styles['Tiles-item-icon']} aria-hidden='true' />}
      </span>
    </span>
  );

  return (
    <li ref={ref} className={clsx(styles['Tiles-item'], className)} {...rest}>
      {hasLink ? (
        <SmartLink href={href} className={styles['Tiles-item-link']}>
          {content}
        </SmartLink>
      ) : (
        content
      )}
    </li>
  );
});

/**
 * Use Tiles to display a grid of logos or icons with optional links.
 */
export const Tiles = Object.assign(TilesRoot, {
  Item: _Item
});

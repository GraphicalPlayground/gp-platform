// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';

import { Text } from '../text';
import { NavLink } from '../nav-link';
import type { NavLinkProps } from '../nav-link';

import styles from './nav-group.module.css';

/**
 * @brief Props for the NavGroup component.
 */
export type NavGroupProps = {
  hasSeparator?: boolean;
  items: NavLinkProps[];
  render?: boolean;
  title: string;
};

/**
 * @brief A component that renders a group of navigation links.
 */
export const NavGroup: React.FC<NavGroupProps> = ({ hasSeparator = false, items, render, title = true }) => {
  const titleId = React.useId();

  if (render === false) {
    return null;
  }

  return (
    <div className={clsx(styles.group, { [styles.hasSeparator]: hasSeparator })}>
      <Text as='span' id={titleId} className={styles.title} font='monospace' variant='muted' size='100' weight='medium'>
        {title}
      </Text>

      <ul className={styles.list} aria-labelledby={titleId}>
        {items.map((item) => (
          <li key={item.title}>
            <NavLink {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

NavGroup.displayName = 'gp.NavGroup';

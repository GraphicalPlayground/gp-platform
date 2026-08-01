// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';

import { Heading } from '../heading';
import { Link } from '../link';

import styles from './link-column.module.css';

/**
 * @brief Props for the LinkColumn component.
 * @see LinkColumn
 */
export interface LinkColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  items: { text: string; href: string }[];
}

/**
 * @brief A component that renders a column of links with a heading.
 */
export const LinkColumn: React.FC<LinkColumnProps> = ({ className, heading, items, ...rest }) => {
  return (
    <nav className={clsx(styles['link-column'], className)} {...rest}>
      <Heading as='h3' font='monospace' size='6' className={styles['link-column--heading']}>
        {heading}
      </Heading>
      <ul className={styles['link-column--list']}>
        {items.map((item, index) => (
          <li key={index} className={styles['link-column--item']}>
            <Link href={item.href} arrowDirection='none' variant='default' size='small'>
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

/** Set the display name for the LinkColumn component. */
LinkColumn.displayName = 'gp.LinkColumn';

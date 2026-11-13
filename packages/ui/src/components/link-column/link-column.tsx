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
  id?: string;
  title: string;
  links: { label: string; href: string }[];
  hasAutoExternalLinks?: boolean;
}

/**
 * @brief A component that renders a column of links with a heading.
 */
export const LinkColumn: React.FC<LinkColumnProps> = ({
  className,
  hasAutoExternalLinks = true,
  id,
  links,
  title,
  ...rest
}) => {
  return (
    <nav aria-labelledby={id} className={clsx(styles['link-column'], className)} {...rest}>
      <Heading id={id} as='h3' font='monospace' size='6' className={styles['link-column--heading']}>
        {title}
      </Heading>
      <ul className={styles['link-column--list']}>
        {links.map((link, index) => (
          <li key={index} className={styles['link-column--item']}>
            <Link
              isExternal={hasAutoExternalLinks ? 'auto' : false}
              href={link.href}
              arrowDirection='none'
              variant='default'
              size='small'
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

/** Set the display name for the LinkColumn component. */
LinkColumn.displayName = 'gp.LinkColumn';

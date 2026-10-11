// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import styles from './nav-link.module.css';

import { Link } from '../link';
import { Text } from '../text';
import type { Icon } from '@primer/octicons-react';

/**
 * @brief Props for the NavLink component.
 */
export type NavLinkProps = {
  className?: string;
  external?: boolean;
  icon?: Icon;
  label?: string;
  render?: boolean;
  subtitle?: string;
  title: string;
  url: string;
  withArrow?: boolean;
};

/**
 * @brief NavLink component for navigation links.
 * @see NavLinkProps
 */
export const NavLink: React.FC<NavLinkProps> = ({
  className,
  external = false,
  icon: IconComponent,
  label,
  render = true,
  subtitle,
  title,
  url,
  withArrow = false
}) => {
  if (!render) {
    return null;
  }

  if (external) {
    return (
      <Link href={url} arrowDirection='none' isExternal target='_blank' rel='noreferrer'>
        {title}
      </Link>
    );
  }

  if (withArrow) {
    return (
      <Link href={url} arrowDirection='end'>
        {title}
      </Link>
    );
  }

  if (subtitle || IconComponent || label) {
    return (
      <Link href={url} arrowDirection='none' className={styles.link}>
        <Text as='span' className={styles.title} size='200' weight='medium'>
          {IconComponent ? <IconComponent size={16} className={styles.icon} /> : null}

          {title}

          {label ? <sup className={styles.label}>{label}</sup> : null}
        </Text>

        {subtitle ? (
          <Text as='span' size='200' variant='muted' className={styles.subtitle}>
            {subtitle}
          </Text>
        ) : null}
      </Link>
    );
  }

  if (className) {
    return (
      <a href={url} className={className}>
        {title}
      </a>
    );
  }

  return (
    <Link href={url} arrowDirection='none'>
      {title}
    </Link>
  );
};

NavLink.displayName = 'gp.NavLink';

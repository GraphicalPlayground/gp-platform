// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './social-links.module.css';
import { SocialIcon, type SocialIconName } from './social-icons';
import Link from 'next/link';

/**
 * @brief Represents a social media link with an icon and accessible label.
 */
export type SocialLink = {
  srLabel: string;
  url: string;
  iconName: SocialIconName;
};

/**
 * @brief Props for the SocialLink component, which renders a list of social media links.
 */
export interface SocialLinksProps extends React.HTMLAttributes<HTMLUListElement> {
  links: SocialLink[];
}

/**
 * @brief A React component that renders a list of social media links with icons.
 */
export const SocialLinks: React.FC<SocialLinksProps> = ({ links, className, ...rest }) => {
  return (
    <ul className={clsx(styles['social-links--list'], className)} {...rest}>
      {links.map((link, index) => (
        <li key={index}>
          <Link href={link.url} className={styles['social-links--icon-link']} aria-label={link.srLabel}>
            <SocialIcon name={link.iconName} className={styles['social-links--icon']} />
            <span className='visually-hidden'>{link.srLabel}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

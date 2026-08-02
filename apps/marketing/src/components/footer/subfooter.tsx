// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './subfooter.module.css';
import Link from 'next/link';

import { SocialLinks, type SocialLink } from '@gp/ui/components';

/**
 * @brief Props for the Subfooter component.
 */
export interface SubFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  socialLinks: SocialLink[];
  cookieConsentEnabled: boolean;
  copyrightLabel: string;
  copyrightYear: number;
  legalLinks: { label: string; href: string }[];
}

/**
 * @brief The Subfooter component renders the subfooter section of the website, including social media links, legal links, and copyright information.
 */
export const SubFooter: React.FC<SubFooterProps> = ({
  socialLinks,
  cookieConsentEnabled,
  copyrightLabel,
  copyrightYear,
  legalLinks,
  className,
  ...rest
}) => {
  return (
    <div className={clsx(styles.bar, className)} {...rest}>
      <div className={styles.container}>
        <nav aria-label='Legal and Resource Links' className={styles.legal}>
          <ul className={styles['legal-list']}>
            <li className={styles.copyright}>
              <time dateTime={String(copyrightYear)}>{copyrightLabel}</time>
            </li>

            {legalLinks.map((link) => (
              <li key={`${link.href}-${link.label}`}>
                <Link href={link.href} className={styles['legal-link']}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles['social-and-locale']}>
          <nav aria-label="Graphical Playground's Social Media Links">
            <SocialLinks links={socialLinks} />
          </nav>

          {/* <LocaleSelector locale={locale} overlayLabel={localeOverlayLabel} /> */}
        </div>
      </div>
    </div>
  );
};

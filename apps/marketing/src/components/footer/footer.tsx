// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './footer.module.css';

import { LinkColumn } from '@gp/ui/components';

export interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'dark';
}

// TODO:
//   - Move away the data
//   - Add a newslater subscription form
//   - Add a SubFooter element with social, copyright, locale, and legal links...

export const Footer: React.FC<FooterProps> = ({ className, variant = 'dark', ...rest }) => {
  return (
    <footer className={clsx(styles.footer, variant, className)} {...rest}>
      <div className={styles['footer-container']}>
        <div className={styles['footer-top-row']}>
          <div className={styles['footer-columns']}>
            <LinkColumn
              title='Products'
              links={[
                { label: 'Pricing', href: '/pricing' },
                { label: 'GP Engine', href: '/products/engine' },
                { label: 'GP Cloud', href: '/products/cloud' },
                { label: 'GP Studio', href: '/products/studio' }
              ]}
            />
            <LinkColumn
              title='Developers'
              links={[
                { label: 'Documentation', href: 'https://docs.graphical-playground.com' },
                { label: 'Github Organization', href: 'https://github.com/GraphicalPlayground' },
                { label: 'GP SDK', href: '/developers/sdk' },
                { label: 'GP API', href: '/developers/api' },
                { label: 'GP CLI', href: '/developers/cli' }
              ]}
            />
            <LinkColumn
              title='Resources'
              links={[
                { label: 'Help Center', href: '/help' },
                { label: 'Community', href: '/community' },
                { label: 'Forum', href: '/forum' },
                { label: 'Inspiration', href: '/inspiration' },
                { label: 'Changelog', href: '/changelog' },
                { label: 'Blog', href: '/blog' },
                { label: 'Status', href: '/status' },
                { label: 'Site Map', href: '/sitemap' },
                { label: 'Brand Guidelines', href: '/brand-guidelines' }
              ]}
            />
            <LinkColumn
              title='Company'
              links={[
                { label: 'About Us', href: '/about' },
                { label: 'Careers', href: '/careers' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Sponsors', href: '/sponsors' },
                { label: 'Donate', href: '/donate' },
                { label: 'Press & Media', href: '/press' },
                { label: 'Accessibility Statement', href: '/accessibility' },
                { label: 'Legal', href: '/legal' }
              ]}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

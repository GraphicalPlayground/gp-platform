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
              heading='Products'
              items={[
                { text: 'Pricing', href: '/pricing' },
                { text: 'GP Engine', href: '/products/engine' },
                { text: 'GP Cloud', href: '/products/cloud' },
                { text: 'GP Studio', href: '/products/studio' }
              ]}
            />
            <LinkColumn
              heading='Developers'
              items={[
                { text: 'Documentation', href: 'https://docs.graphical-playground.com' },
                { text: 'Github Organization', href: 'https://github.com/GraphicalPlayground' },
                { text: 'GP SDK', href: '/developers/sdk' },
                { text: 'GP API', href: '/developers/api' },
                { text: 'GP CLI', href: '/developers/cli' }
              ]}
            />
            <LinkColumn
              heading='Resources'
              items={[
                { text: 'Help Center', href: '/help' },
                { text: 'Community', href: '/community' },
                { text: 'Forum', href: '/forum' },
                { text: 'Inspiration', href: '/inspiration' },
                { text: 'Changelog', href: '/changelog' },
                { text: 'Blog', href: '/blog' },
                { text: 'Status', href: '/status' },
                { text: 'Site Map', href: '/sitemap' },
                { text: 'Brand Guidelines', href: '/brand-guidelines' }
              ]}
            />
            <LinkColumn
              heading='Company'
              items={[
                { text: 'About Us', href: '/about' },
                { text: 'Careers', href: '/careers' },
                { text: 'Contact Us', href: '/contact' },
                { text: 'Sponsors', href: '/sponsors' },
                { text: 'Donate', href: '/donate' },
                { text: 'Press & Media', href: '/press' },
                { text: 'Accessibility Statement', href: '/accessibility' },
                { text: 'Legal', href: '/legal' }
              ]}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

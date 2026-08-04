// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './footer.module.css';

import { LinkColumn, StaffToggleBar, Newsletter } from '@gp/ui/components';
import { SubFooter } from './subfooter';

import { footerSections, socialLinks, legalLinks } from '@/data/footer';

export interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'dark';
}

// TODO:
//   - Add a newslater subscription form

export const Footer: React.FC<FooterProps> = ({ className, variant = 'dark', ...rest }) => {
  const currentYear = new Date().getFullYear();
  const copyrightLabel = `\u00a9 ${currentYear} Graphical Playground, Inc.`;

  return (
    <footer className={clsx(styles.footer, variant, className)} {...rest}>
      <h2 className='visually-hidden'>Site-wide Links</h2>

      <div className={styles.container}>
        <div className={styles['top-row']}>
          <Newsletter
            className={styles.newsletter}
            ctaHref='/curriculum'
            ctaLabel='Explore'
            description='Join students and enthusiasts building custom render pipelines in the browser. Master system-level graphics through interactive canvas experiments.'
            heading='Master Real-Time Graphics Programming'
            logoAriaLabel='Go to Graphical Playground homepage'
            logoHref='/'
          />

          <div className={styles.columns}>
            {footerSections.map((section, index) => (
              <LinkColumn key={index} id={section.id} links={section.links} title={section.title} />
            ))}
          </div>
        </div>
      </div>

      <SubFooter
        cookieConsentEnabled
        copyrightLabel={copyrightLabel}
        copyrightYear={currentYear}
        legalLinks={legalLinks}
        socialLinks={socialLinks}
      />

      <StaffToggleBar
        isAdminModeOn
        isUiOptedOut
        adminTogglePath='/'
        showAdminToggle={false}
        showUiOptOut={false}
        uiOptOutTogglePath='/'
      />
    </footer>
  );
};

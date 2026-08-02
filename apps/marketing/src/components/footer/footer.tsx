// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './footer.module.css';

import { LinkColumn, StaffToggleBar } from '@gp/ui/components';

import { footerSections } from './footer.data';

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
      <h2 className='visually-hidden'>Site-wide Links</h2>

      <div className={styles['footer-container']}>
        <div className={styles['footer-top-row']}>
          {/* <Newsletter {...newsletter()} className={styles.newsletter} /> */}

          <div className={styles['footer-columns']}>
            {footerSections.map((section, index) => (
              <LinkColumn key={index} id={section.id} title={section.title} links={section.links} />
            ))}
          </div>
        </div>
      </div>

      {/* <SubFooter
        subFooter={subFooter}
        legalNavLabel={LEGAL_NAV_LABEL()}
        socialNavLabel={SOCIAL_NAV_LABEL()}
        localeOverlayLabel={SELECT_LANGUAGE_LABEL()}
        socialLinks={socialLinks()}
        locale={localeConfig}
        cookieConsentEnabled={cookieConsentEnabled}
      /> */}

      <StaffToggleBar
        showAdminToggle={false}
        isAdminModeOn={true}
        adminTogglePath={'/'}
        showUiOptOut={false}
        isUiOptedOut={true}
        uiOptOutTogglePath={'/'}
      />
    </footer>
  );
};

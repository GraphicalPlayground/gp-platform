// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { ComponentProps } from 'react';

import { FooterRoot } from './root';
import { FooterBrand } from './brand';
import { FooterDescription } from './description';
import { FooterSocial, FooterSocialIcon } from './social';
import { FooterNavGrid, FooterColumn } from './nav-grid';
import { FooterLink, FooterLegalLinks } from './link';
import { FooterDivider } from './divider';
import { FooterLogo } from './logo';
import { FooterBottomBar } from './bottom-bar';
import { FooterCopyright } from './copyright';
import { FooterBackToTop } from './back-to-top';
import { FooterCallToAction } from './call-to-action';

export const Footer = Object.assign(FooterRoot, {
  Root: FooterRoot,
  Brand: FooterBrand,
  Logo: FooterLogo,
  Description: FooterDescription,
  Social: FooterSocial,
  SocialIcon: FooterSocialIcon,
  NavGrid: FooterNavGrid,
  Column: FooterColumn,
  Link: FooterLink,
  LegalLinks: FooterLegalLinks,
  Divider: FooterDivider,
  BottomBar: FooterBottomBar,
  Copyright: FooterCopyright,
  BackToTop: FooterBackToTop,
  CallToAction: FooterCallToAction
});

export type Footer = {
  Props: ComponentProps<typeof FooterRoot>;
  Root: ComponentProps<typeof FooterRoot>;
  Brand: ComponentProps<typeof FooterBrand>;
  Description: ComponentProps<typeof FooterDescription>;
  Social: ComponentProps<typeof FooterSocial>;
  SocialIcon: ComponentProps<typeof FooterSocialIcon>;
  NavGrid: ComponentProps<typeof FooterNavGrid>;
  Column: ComponentProps<typeof FooterColumn>;
  Link: ComponentProps<typeof FooterLink>;
  LegalLinks: ComponentProps<typeof FooterLegalLinks>;
  Divider: ComponentProps<typeof FooterDivider>;
  Logo: ComponentProps<typeof FooterLogo>;
  BottomBar: ComponentProps<typeof FooterBottomBar>;
  Copyright: ComponentProps<typeof FooterCopyright>;
  BackToTop: ComponentProps<typeof FooterBackToTop>;
  CallToAction: ComponentProps<typeof FooterCallToAction>;
};

export {
  FooterRoot,
  FooterBrand,
  FooterLogo,
  FooterDescription,
  FooterSocial,
  FooterSocialIcon,
  FooterNavGrid,
  FooterColumn,
  FooterLink,
  FooterLegalLinks,
  FooterDivider,
  FooterBottomBar,
  FooterCopyright,
  FooterBackToTop,
  FooterCallToAction
};

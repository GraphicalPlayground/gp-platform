// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

/**
 * @brief Represents a link in the footer.
 */
export interface FooterLink {
  label: string;
  href: string;
}

/**
 * @brief Represents a section of links in the footer.
 */
export interface FooterLinkSection {
  id: string;
  title: string;
  context: string;
  links: FooterLink[];
}

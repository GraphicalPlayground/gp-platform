// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { Box, SubNav } from '@gp/ui/components';
import type { ButtonVariant, SubNavProps, SubNavSubMenuVariants } from '@gp/ui/components';
import styles from './marketing-sub-nav.module.css';

export type SubNavMatchMode = 'exact' | 'prefix';
export type SubNavMenuVariant = (typeof SubNavSubMenuVariants)[number];

export interface SubNavLink {
  label: string;
  href: string;
  external?: boolean;
  match?: SubNavMatchMode;
  links?: never;
}

export interface SubNavLinkGroup {
  label: string;
  href?: string;
  external?: boolean;
  match?: SubNavMatchMode;
  links: SubNavLink[];
  variant?: SubNavMenuVariant;
}

export type SubNavItem = SubNavLink | SubNavLinkGroup;

export interface SubNavAction {
  label: string;
  href: string;
  external?: boolean;
  variant?: ButtonVariant;
}

export interface MarketingSubNavProps extends Pick<SubNavProps, 'className' | 'fullWidth' | 'id' | 'menuLabels'> {
  heading?: SubNavLink;
  subHeading?: SubNavLink;
  links?: SubNavItem[];
  action?: SubNavAction;
}

const isLinkGroup = (item: SubNavItem): item is SubNavLinkGroup => 'links' in item;

const normalizePath = (path: string): string => path.replace(/\/+$/, '') || '/';

const isExternalHref = (href: string): boolean => /^https?:\/\//i.test(href);

const getExternalLinkProps = (href: string, external?: boolean) =>
  external || isExternalHref(href) ? ({ rel: 'noopener noreferrer', target: '_blank' } as const) : {};

/**
 * @brief Determines whether a sub-navigation link matches the active pathname.
 */
export const isSubNavPathActive = (pathname: string, href?: string, match: SubNavMatchMode = 'exact'): boolean => {
  if (!pathname || !href || href.startsWith('#') || isExternalHref(href)) {
    return false;
  }

  const targetPath = href.split(/[?#]/)[0] ?? '';

  if (!targetPath) {
    return false;
  }

  const current = normalizePath(pathname);
  const target = normalizePath(targetPath);

  if (match === 'prefix' && target !== '/') {
    return current === target || current.startsWith(`${target}/`);
  }

  return current === target;
};

/**
 * @brief Marketing wrapper around `SubNav` with automatic active-route matching and layout spacing.
 */
export function MarketingSubNav({
  action,
  className,
  fullWidth,
  heading,
  id,
  links = [],
  menuLabels,
  subHeading
}: MarketingSubNavProps) {
  const pathname = usePathname() ?? '';
  const hasAnchorMenu = links.some((item) => isLinkGroup(item) && item.variant === 'anchor');
  const isSubHeadingActive = isSubNavPathActive(pathname, subHeading?.href, subHeading?.match);

  return (
    <>
      <SubNav className={clsx(styles.aligned, className)} fullWidth={fullWidth} id={id} menuLabels={menuLabels}>
        {heading ? (
          <SubNav.Heading href={heading.href} {...getExternalLinkProps(heading.href, heading.external)}>
            {heading.label}
          </SubNav.Heading>
        ) : null}

        {subHeading ? (
          <SubNav.SubHeading
            aria-current={isSubHeadingActive ? 'page' : undefined}
            href={subHeading.href}
            {...getExternalLinkProps(subHeading.href, subHeading.external)}
          >
            {subHeading.label}
          </SubNav.SubHeading>
        ) : null}

        {links.map((item, index) => {
          if (isLinkGroup(item)) {
            const hasHref = Boolean(item.href);
            const href = item.href ?? '#';
            const isGroupSelfActive = isSubNavPathActive(pathname, item.href, item.match);
            const hasActiveChild = item.links.some((link) => isSubNavPathActive(pathname, link.href, link.match));
            const ariaCurrent = isGroupSelfActive ? 'page' : hasActiveChild ? 'true' : undefined;

            return (
              <SubNav.Link
                key={`${item.label}-${index}`}
                aria-current={ariaCurrent}
                href={href}
                {...getExternalLinkProps(href, item.external)}
                onClick={hasHref ? undefined : (event) => event.preventDefault()}
              >
                {item.label}

                <SubNav.SubMenu variant={item.variant ?? 'dropdown'}>
                  {item.links.map((link, linkIndex) => (
                    <SubNav.Link
                      key={`${link.href}-${link.label}-${linkIndex}`}
                      aria-current={isSubNavPathActive(pathname, link.href, link.match) ? 'page' : undefined}
                      href={link.href}
                      {...getExternalLinkProps(link.href, link.external)}
                    >
                      {link.label}
                    </SubNav.Link>
                  ))}
                </SubNav.SubMenu>
              </SubNav.Link>
            );
          }

          return (
            <SubNav.Link
              key={`${item.href}-${item.label}-${index}`}
              aria-current={isSubNavPathActive(pathname, item.href, item.match) ? 'page' : undefined}
              href={item.href}
              {...getExternalLinkProps(item.href, item.external)}
            >
              {item.label}
            </SubNav.Link>
          );
        })}

        {action ? (
          <SubNav.Action
            href={action.href}
            variant={action.variant}
            {...getExternalLinkProps(action.href, action.external)}
          >
            {action.label}
          </SubNav.Action>
        ) : null}
      </SubNav>

      {!hasAnchorMenu ? (
        <Box
          className={clsx(styles.spacer, Boolean(subHeading) && !isSubHeadingActive && styles.twoRows)}
          data-testid='marketing-sub-nav-spacer'
        />
      ) : null}
    </>
  );
}

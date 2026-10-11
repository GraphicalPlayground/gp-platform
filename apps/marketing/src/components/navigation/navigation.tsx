// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { NavDropdown, NavLink } from '@gp/ui/components';
import styles from './navigation.module.css';
import type { NavDropdownType, NavLinkProps } from '@gp/ui/components';

/**
 * @brief Props for the Navigation component, which includes an array of navigation items that can be either dropdowns or links.
 */
export interface NavigationProps {
  data: Array<NavDropdownType | NavLinkProps>;
}

/**
 * @brief Marketing navigation component that renders a list of navigation items, which can be either dropdowns or links.
 */
export const Navigation: React.FC<NavigationProps> = ({ data }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleOpenChange = useCallback((id: string, nextOpen: boolean) => {
    setOpenId((current) => (nextOpen ? id : current === id ? null : current));
  }, []);

  useEffect(() => {
    if (openId === null) return;

    function handleDocumentEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      event.stopPropagation();
      setOpenId(null);
    }

    document.addEventListener('keydown', handleDocumentEscape, { capture: true });

    return () => document.removeEventListener('keydown', handleDocumentEscape, { capture: true });
  }, [openId]);

  return (
    <nav aria-label='Global' className={styles.nav}>
      <ul className={styles.list}>
        {data.map((item, index) => {
          const id = `marketing-nav-item-${index}`;

          return (
            <li key={item.title}>
              {'groups' in item ? (
                <NavDropdown
                  {...item}
                  isOpen={openId === id}
                  onOpenChange={(nextOpen) => handleOpenChange(id, nextOpen)}
                />
              ) : (
                <NavLink {...item} className={styles.navLink} />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

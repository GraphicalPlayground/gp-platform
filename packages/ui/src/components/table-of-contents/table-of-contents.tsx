// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useState, useDeferredValue, useMemo, useEffect, useCallback } from 'react';
import styles from './table-of-contents.module.css';

// import { Box } from '../box';
import { Heading } from '../heading';
import { Stack } from '../stack';
import type { HeadingProps } from '../heading';

import { ChevronDownIcon, ChevronUpIcon } from '@primer/octicons-react';
import { TableOfContentsListItems } from './table-of-contents-list-items';

import type { HeadingItem } from './table-of-contents-list-items';

const AsideHeading: React.FC<HeadingProps> = ({ as = 'h2', ...props }) => (
  <Heading
    as={as}
    size='subhead-medium'
    font='monospace'
    className={styles['asideHeading']}
    weight='medium'
    {...props}
  />
);

/**
 * @brief TableOfContents component props interface.
 * @see TableOfContents
 */
export interface TableOfContentsProps {
  active?: string;
  items: HeadingItem[];
}

/**
 * @brief TableOfContents component.
 * @details
 */
export const TableOfContents: React.FC<TableOfContentsProps> = ({ active, items }) => {
  const [narrowMenuOpen, setNarrowMenuOpen] = useState(false);
  const [narrowScrolledPastHeading, setNarrowScrolledPastHeading] = useState(false);

  const deferredNarrowMenuOpen = useDeferredValue(narrowMenuOpen);
  const tableOfContentsVisible = useMemo(() => items.length > 1, [items]);

  useEffect(() => {
    // This allows the menu to close when the escape key is pressed for accessibility
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setNarrowMenuOpen(false);
      }
    };

    if (narrowMenuOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => window.removeEventListener('keydown', handleEscape);
  }, [narrowMenuOpen]);

  useEffect(() => {
    // This adjusts the scrolling threshold to show when the table of contents is visible when scrolling
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (scrollY === 0) {
        setNarrowScrolledPastHeading(false);
        ticking = false;

        return;
      }

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;

        return;
      }
      setNarrowScrolledPastHeading(scrollY > lastScrollY ? false : true);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkPress = useCallback(() => {
    setNarrowMenuOpen(!narrowMenuOpen);
  }, [setNarrowMenuOpen, narrowMenuOpen]);

  const handleNarrowMenu = () => {
    setNarrowMenuOpen(!narrowMenuOpen);
  };

  return (
    <aside className={`${styles.aside} ${narrowScrolledPastHeading ? styles['aside--visible'] : ''}`}>
      <nav aria-labelledby='table-of-contents-heading'>
        <Stack
          direction='vertical'
          gap={64}
          padding='none'
          className={`${styles.asideContent} ${narrowMenuOpen ? styles['asideContent--open'] : ''} ${
            narrowScrolledPastHeading ? styles['asideContent--visible'] : ''
          }`}
        >
          <Stack
            data-testid='table-of-contents-stack'
            direction='vertical'
            padding='none'
            gap={24}
            style={{ display: !tableOfContentsVisible ? 'none' : undefined }}
          >
            <Stack direction='horizontal' padding='none' justifyContent='space-between' alignItems='center'>
              <AsideHeading id='table-of-contents-heading'>Table of contents</AsideHeading>
              <button
                className={styles.tableOfContentsMenuToggle}
                onClick={handleNarrowMenu}
                aria-expanded={narrowMenuOpen}
              >
                <span className='sr-only'>
                  {deferredNarrowMenuOpen ? 'Close table of contents' : 'Open table of contents'}
                </span>
                {narrowMenuOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </button>
            </Stack>
            <div
              data-testid='table-of-contents-nav'
              className={`${styles.tableOfContentsNav} ${narrowMenuOpen ? styles['tableOfContentsNav--visible'] : ''}`}
            >
              <ol className={styles.tableOfContentsList}>
                <TableOfContentsListItems active={active} handleOnClick={handleLinkPress} items={items} />
              </ol>
            </div>
          </Stack>

          {/* {featuredCta ? (
            <Box
              paddingBlockStart={tableOfContentsVisible ? 8 : undefined}
              borderBlockStartWidth={tableOfContentsVisible ? 'thin' : undefined}
              borderStyle={tableOfContentsVisible ? 'solid' : undefined}
              borderColor={tableOfContentsVisible ? 'muted' : undefined}
              className={styles.tableOfContentsFeaturesBox}
            >
              <FeaturedContent cta={featuredCta} />
            </Box>
          ) : null} */}
        </Stack>
      </nav>
    </aside>
  );
};

/** Set the display name for the TableOfContents component. */
TableOfContents.displayName = 'gp.TableOfContents';

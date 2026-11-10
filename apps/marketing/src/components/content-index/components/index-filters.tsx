// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import styles from './index-filters.module.css';

import { Box, Button, Heading, InlineLink, Stack } from '@gp/ui/components';
import { FilterIcon, XIcon } from '@primer/octicons-react';
import type { FilterGroup } from '../content-index.utils';

export interface IndexFiltersProps {
  groups: FilterGroup[];
  /**
   * @brief Called with the selected values of every group when the user applies the filters.
   */
  onApply: (selected: Record<string, string[]>) => void;
  onClear: () => void;
}

const selectionFromGroups = (groups: FilterGroup[]): Record<string, string[]> =>
  Object.fromEntries(
    groups.map((group) => [
      group.value,
      group.options.filter((option) => option.isChecked).map((option) => option.value)
    ])
  );

const countSelected = (selection: Record<string, string[]>) =>
  Object.values(selection).reduce((total, values) => total + values.length, 0);

/**
 * @brief Checkbox filters sidebar of a content index page, collapsible into a toggle menu on narrow viewports.
 */
export const IndexFilters: React.FC<IndexFiltersProps> = ({ groups, onApply, onClear }) => {
  const [prevGroups, setPrevGroups] = useState(groups);
  const [selection, setSelection] = useState<Record<string, string[]>>(() => selectionFromGroups(groups));
  const [narrowMenuOpen, setNarrowMenuOpen] = useState(false);

  // Sync local checkbox state whenever server-provided groups update after navigation.
  if (prevGroups !== groups) {
    setPrevGroups(groups);
    setSelection(selectionFromGroups(groups));
  }

  const serverSelection = selectionFromGroups(groups);
  const initialCount = countSelected(serverSelection);
  const filtersCount = countSelected(selection);
  const canClear = filtersCount > 0 || initialCount > 0;

  const formDirty = groups.some((group) => {
    const initial = serverSelection[group.value] ?? [];
    const current = selection[group.value] ?? [];

    return current.length !== initial.length || current.some((value) => !initial.includes(value));
  });

  const toggleOption = (groupValue: string, optionValue: string, checked: boolean) => {
    setSelection((prev) => {
      const current = prev[groupValue] ?? [];
      const next = checked ? [...current, optionValue] : current.filter((value) => value !== optionValue);

      return { ...prev, [groupValue]: next };
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formDirty) return;
    setNarrowMenuOpen(false);
    onApply(selection);
  };

  const onClearClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!canClear) return;
    setSelection({});
    setNarrowMenuOpen(false);
    if (initialCount > 0) onClear();
  };

  useEffect(() => {
    if (!narrowMenuOpen) return;

    // Close menu on "Escape" key for accessibility
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setNarrowMenuOpen(false);
    };

    window.addEventListener('keydown', handleEscape);

    return () => window.removeEventListener('keydown', handleEscape);
  }, [narrowMenuOpen]);

  if (groups.length === 0) return null;

  return (
    <aside aria-labelledby='filters-heading' className={styles.aside}>
      <Stack
        className={clsx(styles.asideContent, narrowMenuOpen && styles['asideContent--open'])}
        direction='vertical'
        gap='none'
        padding='none'
      >
        <Stack
          alignItems='center'
          className={clsx(styles.asideHeadingContainer, narrowMenuOpen && styles['asideHeadingContainer--open'])}
          direction='horizontal'
          justifyContent='space-between'
          padding='none'
        >
          <Heading
            as='h2'
            className={styles.asideHeading}
            font='monospace'
            id='filters-heading'
            size='subhead-medium'
            weight='medium'
          >
            Filters {filtersCount > 0 ? `(${filtersCount})` : ''}
          </Heading>
          <button
            aria-controls='filters-form'
            aria-expanded={narrowMenuOpen}
            className={styles.filtersMenuToggle}
            type='button'
            onClick={() => setNarrowMenuOpen((open) => !open)}
          >
            <span className='sr-only'>{narrowMenuOpen ? 'Close' : 'Open'} filters</span>
            {narrowMenuOpen ? <XIcon size={24} /> : <FilterIcon size={24} />}
          </button>
        </Stack>

        <form noValidate id='filters-form' onSubmit={onSubmit}>
          <Stack
            className={clsx(!narrowMenuOpen && styles.filtersStackCollapsed)}
            direction='vertical'
            gap={40}
            padding='none'
          >
            {groups.map((group) => (
              <Box key={group.value} borderBlockStartWidth='thin' borderColor='subtle' borderStyle='solid'>
                <fieldset className={styles.fieldset}>
                  <Box paddingBlockEnd={24} paddingBlockStart={12}>
                    <legend>
                      <Heading
                        as='h3'
                        className={styles.groupHeading}
                        font='monospace'
                        size='subhead-medium'
                        stretch='expanded'
                        weight='normal'
                      >
                        {group.label}
                      </Heading>
                    </legend>
                  </Box>
                  <Stack direction='vertical' gap={12} padding='none'>
                    {group.options.map((option) => (
                      <label key={`${group.value}-${option.value}`} className={styles.filterLabel}>
                        <input
                          checked={selection[group.value]?.includes(option.value) ?? false}
                          className={styles.checkbox}
                          name={group.value}
                          type='checkbox'
                          value={option.value}
                          onChange={(event) => toggleOption(group.value, option.value, event.target.checked)}
                        />
                        {option.label}
                      </label>
                    ))}
                  </Stack>
                </fieldset>
              </Box>
            ))}

            <Stack alignItems='center' direction='horizontal' justifyContent='space-between' padding='none'>
              <InlineLink
                aria-disabled={!canClear}
                className={clsx(styles.clearAllLink, !canClear && styles['clearAllLink--disabled'])}
                href='#'
                role='button'
                tabIndex={canClear ? undefined : -1}
                onClick={onClearClick}
              >
                Clear all
              </InlineLink>
              <Button disabled={!formDirty} size='small' type='submit' variant='primary'>
                Apply
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </aside>
  );
};

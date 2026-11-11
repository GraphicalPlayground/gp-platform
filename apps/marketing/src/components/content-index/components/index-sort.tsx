// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useId } from 'react';
import styles from './index-sort.module.css';

import { ActionMenu, Stack, Text } from '@gp/ui/components';
import type { SortOption } from '../content-index.utils';

export interface IndexSortProps {
  sortOptions: SortOption[];
  currentSort: string;
  onSortChange: (value: string) => void;
}

/**
 * @brief "Sort by" dropdown displayed above the content index results.
 */
export const IndexSort: React.FC<IndexSortProps> = ({ currentSort, onSortChange, sortOptions }) => {
  const labelId = useId();
  const hintId = useId();
  const currentLabel = sortOptions.find((option) => option.value === currentSort)?.label ?? 'Sort';

  return (
    <Stack
      alignItems='center'
      className={styles.indexSortWrapper}
      direction='horizontal'
      gap={12}
      justifyContent='flex-end'
      padding='none'
    >
      <Text id={labelId} variant='muted'>
        Sort by:
      </Text>
      {/* Visually hidden hint for screen readers */}
      <Text className='sr-only' id={hintId}>
        Selecting a sort option will update the results.
      </Text>
      <ActionMenu selectionVariant='single' size='small' onSelect={onSortChange}>
        <ActionMenu.Button aria-labelledby={`${labelId} ${hintId}`}>{currentLabel}</ActionMenu.Button>
        <ActionMenu.Overlay aria-label='Sort options'>
          {sortOptions.map((option) => (
            <ActionMenu.Item key={option.value} selected={option.value === currentSort} value={option.value}>
              {option.label}
            </ActionMenu.Item>
          ))}
        </ActionMenu.Overlay>
      </ActionMenu>
    </Stack>
  );
};

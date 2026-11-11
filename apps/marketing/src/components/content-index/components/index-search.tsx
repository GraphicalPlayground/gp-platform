// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import styles from './index-search.module.css';

import { TextInput } from '@gp/ui/components';
import { SearchIcon, XIcon } from '@primer/octicons-react';

export interface IndexSearchProps {
  currentQuery: string;
  placeholder?: string;
  label?: string;
  /**
   * @brief Called when the search query changes (debounced while typing or immediately on submit/clear).
   */
  onSearch: (query: string, options?: { replace?: boolean }) => void;
}

const SEARCH_DEBOUNCE_MS = 250;

/**
 * @brief Search bar displayed above the content index results to look up articles by keyword.
 */
export const IndexSearch: React.FC<IndexSearchProps> = ({
  currentQuery,
  label = 'Search articles',
  onSearch,
  placeholder = 'Search...'
}) => {
  const inputId = useId();
  const [prevQuery, setPrevQuery] = useState(currentQuery);
  const [inputValue, setInputValue] = useState(currentQuery);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync local input value when URL search params update externally (e.g. browser Back/Forward).
  if (prevQuery !== currentQuery) {
    setPrevQuery(currentQuery);
    setInputValue(currentQuery);
  }

  const cancelPendingSearch = () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
  };

  useEffect(() => cancelPendingSearch, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;

    setInputValue(nextValue);
    cancelPendingSearch();

    debounceTimerRef.current = setTimeout(() => {
      const trimmed = nextValue.trim();

      if (trimmed !== currentQuery) {
        onSearch(trimmed, { replace: true });
      }
    }, SEARCH_DEBOUNCE_MS);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    cancelPendingSearch();

    const trimmed = inputValue.trim();

    if (trimmed !== currentQuery) {
      onSearch(trimmed);
    }
  };

  const handleClear = () => {
    cancelPendingSearch();
    setInputValue('');

    if (currentQuery !== '') {
      onSearch('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape' && inputValue.length > 0) {
      event.preventDefault();
      handleClear();
    }
  };

  return (
    <form className={styles.searchForm} role='search' onSubmit={handleSubmit}>
      <label className='sr-only' htmlFor={inputId}>
        {label}
      </label>
      <div className={styles.inputWrap}>
        <TextInput
          fullWidth
          aria-label={label}
          className={inputValue.length > 0 ? styles.inputWithClear : styles.input}
          id={inputId}
          leadingVisual={<SearchIcon />}
          name='q'
          placeholder={placeholder}
          size='small'
          type='search'
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {inputValue.length > 0 ? (
          <button aria-label='Clear search' className={styles.clearButton} type='button' onClick={handleClear}>
            <XIcon size={16} />
          </button>
        ) : null}
      </div>
    </form>
  );
};

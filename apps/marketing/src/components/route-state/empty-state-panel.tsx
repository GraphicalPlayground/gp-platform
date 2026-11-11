// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import { Box, Button, Heading, Icon, Stack, Text } from '@gp/ui/components';
import { SearchIcon } from '@primer/octicons-react';
import styles from './route-state.module.css';

export interface EmptyStatePanelProps {
  heading: string;
  message: string;
  resetLabel?: string;
  onReset?: () => void;
}

/**
 * @brief Structured empty-results card for content and legal listing pages built with `@gp/ui` components.
 */
export const EmptyStatePanel: React.FC<EmptyStatePanelProps> = ({
  heading,
  message,
  onReset,
  resetLabel = 'Clear filters and search'
}) => {
  return (
    <Box className={styles.emptyStateCard} role='status'>
      <Stack alignItems='flex-start' direction='vertical' gap={16} padding='none'>
        <Icon hasBackground color='gray' icon={SearchIcon} size='medium' />
        <Stack direction='vertical' gap={8} padding='none'>
          <Heading as='h3' size='6'>
            {heading}
          </Heading>
          <Text as='p' size='200' variant='muted'>
            {message}
          </Text>
        </Stack>
        {onReset ? (
          <Button size='small' type='button' variant='secondary' onClick={onReset}>
            {resetLabel}
          </Button>
        ) : null}
      </Stack>
    </Box>
  );
};

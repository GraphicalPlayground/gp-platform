// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import styles from './people.module.css';

import { ProfileCard } from './profile-card';
import type { Author } from '@gp/content';
import { Grid, Stack, Text } from '@gp/ui/components';

export interface PeopleProps {
  label: string;
  people: Exclude<Author, string[]>[];
}

/**
 * @brief A component that displays a list of people with their profile cards.
 * @param label - The label for the list of people.
 * @param people - An array of authors to display.
 * @returns A React component that renders a list of profile cards for the given authors.
 */
export const People: React.FC<PeopleProps> = ({ label, people }) => (
  <Stack gap={24} padding='none'>
    <Text>{label}</Text>
    <Grid className={styles.peopleGrid}>
      {people.map((author, index) => (
        <Grid.Column key={index} span={{ small: 12, medium: 6 }}>
          <ProfileCard author={author} />
        </Grid.Column>
      ))}
    </Grid>
  </Stack>
);

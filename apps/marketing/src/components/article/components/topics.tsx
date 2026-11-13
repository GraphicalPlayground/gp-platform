// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';

import { Stack, Label, Text } from '@gp/ui/components';
import '@gp/ui/string';

/**
 * @brief Props for the Topics component.
 */
export interface TopicsProps {
  topics: string[];
  baseUrl?: string;
  filterName?: string;
}

/**
 * @brief Renders a list of topics as labels, optionally wrapped in links.
 */
export const Topics: React.FC<TopicsProps> = ({ baseUrl, filterName, topics }) => {
  return (
    <Stack direction='horizontal' flexWrap='wrap' padding='none'>
      <Text>'Tags'</Text>
      {topics?.map((topic) => (
        <React.Fragment key={topic}>
          {baseUrl && filterName ? (
            <a href={`${baseUrl}?${filterName}=${topic.toKebabCase()}`}>
              <Label>{topic}</Label>
            </a>
          ) : (
            <Label>{topic}</Label>
          )}
        </React.Fragment>
      ))}
    </Stack>
  );
};

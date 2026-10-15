// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import styles from './published-date.module.css';

import { Text } from '@gp/ui/components';

export type PublishedDateProps = {
  publishedDate: Date;
  updatedDate?: Date;
};

/**
 * @brief Published Date component, which displays the published date and optionally the updated date of an article.
 */
export const PublishedDate: React.FC<PublishedDateProps> = ({ publishedDate, updatedDate }) => {
  const formattedPublishedDate = publishedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedUpdatedDate = updatedDate?.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Text as='p' className={styles.date}>
      <time dateTime={publishedDate.toISOString()}>{formattedPublishedDate}</time>
      {updatedDate !== undefined && formattedPublishedDate !== formattedUpdatedDate && (
        <>
          {` • updated `}
          <time dateTime={updatedDate.toISOString()}>{formattedUpdatedDate}</time>
        </>
      )}
    </Text>
  );
};

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { clsx } from 'clsx';
import styles from './index-card.module.css';

import { Card } from '@gp/ui/components';
import type { ContentIndexItem } from '../content-index.utils';

export interface IndexCardProps {
  item: ContentIndexItem;
  className?: string;
}

/**
 * @brief Card linking to a single article from a content index page.
 */
export const IndexCard: React.FC<IndexCardProps> = ({ className, item }) => {
  const formattedDate = item.datePublished.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Card fullWidth hasBorder className={clsx(styles.indexCard, className)} ctaText='Read more' href={item.href}>
      {item.coverImage ? <Card.Image alt={item.coverImageAlt ?? ''} src={item.coverImage} /> : null}
      <Card.Label variant='accent-text'>{`${formattedDate} · ${item.readingTimeMinutes} min read`}</Card.Label>
      <Card.Heading>{item.title}</Card.Heading>
      <Card.Description>{item.description}</Card.Description>
    </Card>
  );
};

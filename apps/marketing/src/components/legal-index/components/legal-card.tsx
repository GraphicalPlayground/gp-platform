// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { Card, Token } from '@gp/ui/components';
import { formatUtcDate } from '../legal-index.utils';
import type { LegalIndexItem } from '../legal-index.utils';
import { LEGAL_CATEGORY_VISUALS } from './legal-category';
import styles from './legal-card.module.css';

export interface LegalCardProps {
  item: LegalIndexItem;
}

/**
 * @brief Card linking to a single legal policy or compliance document from the legal overview page.
 */
export const LegalCard: React.FC<LegalCardProps> = ({ item }) => {
  const visual = LEGAL_CATEGORY_VISUALS[item.category];
  const datePrefix = item.updateDate ? 'Updated' : 'Effective';
  const formattedDate = formatUtcDate(item.updateDate ?? item.effectiveDate);

  return (
    <Card fullWidth hasBorder className={styles.legalCard} ctaText='Read document' href={item.href} variant='default'>
      <Card.Icon hasBackground className={styles.legalCardIcon} color={visual.color} icon={visual.icon} />
      <Card.Label className={styles.legalCardLabel} variant='accent-text'>
        {`${datePrefix} ${formattedDate} · v${item.version}`}
      </Card.Label>
      <Card.Heading>{item.title}</Card.Heading>
      <Card.Description>{item.summary}</Card.Description>
      <Card.Tokens position='block-end'>
        <Token variant='default'>{visual.label}</Token>
        {item.requiresExplicitConsent ? <Token variant='outline'>Explicit consent</Token> : null}
      </Card.Tokens>
    </Card>
  );
};

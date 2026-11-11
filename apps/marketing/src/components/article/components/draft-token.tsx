// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { Token } from '@gp/ui/components';

export interface DraftTokenProps {
  label?: string;
}

const DRAFT_TOKEN_STYLE = {
  '--gp-token-fg-color-outline': 'var(--gp-color-text-muted)',
  'opacity': 0.72
} as React.CSSProperties;

/**
 * @brief Muted outline token indicating an unpublished/draft article in development mode.
 */
export const DraftToken: React.FC<DraftTokenProps> = ({ label }) => {
  if (!label) return null;

  return (
    <Token style={DRAFT_TOKEN_STYLE} variant='outline'>
      {label}
    </Token>
  );
};

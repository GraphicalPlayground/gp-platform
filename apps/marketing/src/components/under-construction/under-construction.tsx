// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { UnderConstructionView } from './under-construction-view';
import type { UnderConstructionViewProps } from './under-construction-view';

export interface UnderConstructionProps extends UnderConstructionViewProps {
  /**
   * @brief When true (default), renders the construction wall and hides `children`.
   * Flip to `false` (or remove the wrapper) when the page is ready to publish.
   */
  enabled?: boolean;

  /**
   * @brief Work-in-progress page content hidden behind the construction wall while `enabled` is true.
   */
  children?: React.ReactNode;
}

/**
 * @brief Gates an unfinished page behind a structured under-construction view while keeping WIP markup isolated.
 */
export function UnderConstruction({ children, enabled = true, ...props }: UnderConstructionProps) {
  if (!enabled) {
    return <>{children}</>;
  }

  return <UnderConstructionView {...props} />;
}

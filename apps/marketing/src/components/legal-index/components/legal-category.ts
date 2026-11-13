// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { LegalCategory } from '@gp/content';
import type { CardIconColors } from '@gp/ui/components';
import type { Icon } from '@primer/octicons-react';
import { LawIcon, OrganizationIcon, ShieldCheckIcon } from '@primer/octicons-react';
import { LEGAL_CATEGORY_LABELS } from '../legal-index.utils';

export interface LegalCategoryVisual {
  color: (typeof CardIconColors)[number];
  icon: Icon;
  label: string;
}

export const LEGAL_CATEGORY_VISUALS: Record<LegalCategory, LegalCategoryVisual> = {
  consumer: {
    color: 'green',
    icon: ShieldCheckIcon,
    label: LEGAL_CATEGORY_LABELS.consumer
  },
  business: {
    color: 'blue',
    icon: OrganizationIcon,
    label: LEGAL_CATEGORY_LABELS.business
  },
  licensing: {
    color: 'purple',
    icon: LawIcon,
    label: LEGAL_CATEGORY_LABELS.licensing
  }
};

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './mobile-header-title.module.css';

import { ProjectIcon, SearchIcon, ShieldIcon } from '@primer/octicons-react';
import { Link, Stack, Text } from '@gp/ui/components';
import type { Icon } from '@primer/octicons-react';

export type MarketingHeaderTitle = {
  kind: 'text' | 'link' | 'icon-text' | 'icon-only';
  text: string;
  accessibilityLabel?: string;
  icon?: 'project' | 'shield' | Icon;
  href?: string;
};

type MobileHeaderTitleProps = {
  isMenuOpen: boolean;
  title: MarketingHeaderTitle;
};

function renderTitleContent(title: MarketingHeaderTitle) {
  switch (title.kind) {
    case 'text':
      return (
        <Text className={styles.text} weight='semibold'>
          {title.text}
        </Text>
      );
    case 'link':
      return (
        <Link arrowDirection='none' className={styles.content} href={title.href!}>
          <Text className={styles.text} weight='semibold'>
            {title.text}
          </Text>
        </Link>
      );
    case 'icon-text': {
      const Icon = title.icon === 'project' ? ProjectIcon : ShieldIcon;

      return (
        <Stack alignItems='center' className={styles.content} direction='horizontal' gap={4}>
          <Icon aria-hidden='true' className={styles.icon} />
          <Text className={styles.text} weight='semibold'>
            {title.text}
          </Text>
        </Stack>
      );
    }
    case 'icon-only':
      return (
        <span aria-label={title.accessibilityLabel} className={styles.content} role='img'>
          <SearchIcon aria-hidden='true' className={styles.icon} />
        </span>
      );
  }
}

export const MobileHeaderTitle: React.FC<MobileHeaderTitleProps> = ({ isMenuOpen, title }) => {
  return (
    <Stack
      alignItems='center'
      className={clsx(styles.title, isMenuOpen && styles.menuOpen)}
      direction='horizontal'
      justifyContent='center'
    >
      {renderTitleContent(title)}
    </Stack>
  );
};

MobileHeaderTitle.displayName = 'gp.MobileHeaderTitle';

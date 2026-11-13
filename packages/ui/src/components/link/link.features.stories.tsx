// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Link } from './link';
import type { LinkProps } from './link';
import { Stack } from '../stack';
import baseMeta from './link.stories';

const meta: Meta<LinkProps> = { ...baseMeta, title: 'Components/Link/Features' };

export default meta;

type Story = StoryObj<LinkProps>;

export const Sizes: Story = {
  render: () => (
    <Stack direction='vertical' alignItems='flex-start' padding='none'>
      <Link href='#' size='small'>
        Small size
      </Link>
      <Link href='#' size='medium'>
        Medium size
      </Link>
      <Link href='#' size='large'>
        Large size
      </Link>
    </Stack>
  )
};

export const ArrowStart: Story = {
  args: {
    children: 'Back to schedule',
    arrowDirection: 'start'
  }
};

export const NoArrow: Story = {
  args: {
    arrowDirection: 'none'
  }
};

export const Accent: Story = {
  args: {
    variant: 'accent',
    children: 'Accent variant'
  }
};

export const ExternalLink: Story = {
  args: {
    isExternal: true,
    children: 'External link'
  }
};

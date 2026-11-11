// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Meta, StoryObj } from '@storybook/react';

import { Link, linkArrowDirections, linkSizes, linkVariants } from './link';
import type { LinkProps } from './link';

const meta: Meta<LinkProps> = {
  title: 'Components/Link',
  component: Link,
  args: {
    children: 'Learn more',
    size: 'medium',
    arrowDirection: 'end',
    variant: 'default'
  },
  argTypes: {
    children: {
      control: 'text'
    },
    arrowDirection: {
      options: linkArrowDirections,
      control: { type: 'inline-radio' }
    },
    isExternal: {
      control: { type: 'boolean' }
    },
    size: {
      options: linkSizes,
      control: { type: 'inline-radio' }
    },
    variant: {
      options: linkVariants,
      control: { type: 'inline-radio' }
    }
  }
};

export default meta;

type Story = StoryObj<LinkProps>;

export const Default: Story = {};

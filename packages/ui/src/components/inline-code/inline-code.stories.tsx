// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Meta, StoryObj } from '@storybook/react';
import { InlineCode } from '.';

const meta = {
  title: 'Components/InlineCode',
  component: InlineCode
} satisfies Meta<typeof InlineCode>;

export default meta;
type Story = StoryObj<typeof InlineCode>;

export const Default: Story = {
  args: {
    children: 'npm install @gp/ui'
  }
};

export const Playground: Story = {
  args: {
    children: 'npm install @gp/ui'
  }
};

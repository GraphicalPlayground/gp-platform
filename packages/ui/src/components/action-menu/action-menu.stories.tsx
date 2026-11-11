// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ActionMenu } from './action-menu';

const meta = {
  title: 'Components/ActionMenu',
  component: ActionMenu
} satisfies Meta<typeof ActionMenu>;

export default meta;
type Story = StoryObj<typeof ActionMenu>;

const DefaultStory = (args: React.ComponentProps<typeof ActionMenu>) => {
  return (
    <ActionMenu {...args} onSelect={(newValue) => alert(newValue)}>
      <ActionMenu.Button>Open Menu</ActionMenu.Button>
      <ActionMenu.Overlay aria-label={'Actions'}>
        <ActionMenu.Item value='Copy link pressed' selected>
          Copy Link
        </ActionMenu.Item>
        <ActionMenu.Item value='Quote reply pressed'>Quote Reply</ActionMenu.Item>
        <ActionMenu.Item value='Edit comment pressed'>Edit Comment</ActionMenu.Item>
      </ActionMenu.Overlay>
    </ActionMenu>
  );
};

export const Default: Story = {
  render: DefaultStory
};

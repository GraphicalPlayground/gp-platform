// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Label, labelColors, labelSizes, defaultLabelColor, defaultLabelSize } from '.';

const meta = {
  title: 'Components/Label',
  component: Label,
  args: {
    color: defaultLabelColor,
    size: defaultLabelSize,
    children: 'Label'
  },
  argTypes: {
    color: {
      description: 'Color of Label',
      control: {
        type: 'inline-radio',
        options: [...labelColors]
      }
    },
    size: {
      description: 'Size of Label',
      control: {
        type: 'inline-radio',
        options: [...labelSizes]
      }
    },
    children: {
      name: 'children',
      description: 'Label label`.',
      type: { name: 'string', required: true },
      control: {
        type: 'text'
      }
    }
  }
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: () => <Label>Default</Label>
};

export const Playground: Story = {
  render: (args) => <Label {...args} />
};

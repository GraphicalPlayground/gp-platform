// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './spinner';
import styles from './spinner.stories.module.css';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: { layout: 'centered' },
  args: {
    size: 'medium',
    accessibleLabel: 'Loading'
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large']
    },
    accessibleLabel: { control: 'text' },
    className: { control: false }
  }
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Spinner className={process.env.NODE_ENV === 'test' ? styles.spinner__pauseAnimations : undefined} />
};

export const Playground: Story = {
  render: (args) => (
    <Spinner
      {...args}
      className={clsx(args.className, process.env.NODE_ENV === 'test' && styles.spinner__pauseAnimations)}
    />
  )
};

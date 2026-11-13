// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Meta, StoryObj } from '@storybook/react';

import baseMeta from './river-accordion.stories';
import type { MetaProps } from './river-accordion.stories';

const meta: Meta<MetaProps> = { ...baseMeta, title: 'Components/RiverAccordion/Features' };

export default meta;

type Story = StoryObj<MetaProps>;

export const AlignStart: Story = {
  args: {
    align: 'start'
  }
};

export const AlignEnd: Story = {
  args: {
    align: 'end'
  }
};

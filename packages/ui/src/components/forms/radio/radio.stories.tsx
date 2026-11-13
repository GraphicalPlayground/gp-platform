// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Radio } from './radio';
import { Stack } from '../../stack';

export default {
  title: 'Components/Forms/Radio',
  component: Radio,
  args: {
    checked: false,
    value: 'radio'
  },
  argTypes: {
    disabled: {
      description: 'disabled field',
      control: { type: 'boolean' },
      table: {
        category: 'Input'
      }
    }
  }
} as Meta<typeof Radio>;

export const Default: StoryFn<typeof Radio> = () => (
  <>
    <Stack direction={{ narrow: 'vertical', regular: 'horizontal' }} gap='condensed' padding='condensed'>
      <Radio aria-label='Standalone one' name='radio-group' value='radio one' />
      <Radio aria-label='Standalone two' name='radio-group' value='radio two' />
    </Stack>
  </>
);

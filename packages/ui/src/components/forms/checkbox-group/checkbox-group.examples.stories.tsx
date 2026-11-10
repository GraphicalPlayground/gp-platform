// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { CheckboxGroup } from './checkbox-group';
import { Checkbox } from '../checkbox';
import { FormControl } from '../form-control';
import { Stack } from '../../stack';
import baseMeta from './checkbox-group.stories';
import type { MetaProps } from './checkbox-group.stories';

const meta: Meta<MetaProps> = { ...baseMeta, title: 'Components/Forms/CheckboxGroup/Examples' };

export default meta;

type Story = StoryObj<MetaProps>;

export const Inline: Story = {
  args: {
    labelChildren: 'Inline example',
    labelVisuallyHidden: false,
    captionChildren: 'Checkboxes can be displayed inline too',
    validationChildren: ''
  },
  render: ({ labelChildren, labelVisuallyHidden, captionChildren, validationChildren, validationVariant }) => {
    return (
      <CheckboxGroup>
        <CheckboxGroup.Label visuallyHidden={labelVisuallyHidden}>{labelChildren}</CheckboxGroup.Label>
        {captionChildren ? <CheckboxGroup.Caption>{captionChildren}</CheckboxGroup.Caption> : null}

        <Stack direction='horizontal' gap='normal' padding='none' flexWrap='wrap'>
          <FormControl>
            <FormControl.Label>Choice one</FormControl.Label>
            <Checkbox value='one' defaultChecked />
          </FormControl>
          <FormControl>
            <FormControl.Label>Choice two</FormControl.Label>
            <Checkbox value='two' defaultChecked />
          </FormControl>
          <FormControl>
            <FormControl.Label>Choice three</FormControl.Label>
            <Checkbox value='three' />
          </FormControl>
        </Stack>

        {validationChildren ? (
          <CheckboxGroup.Validation variant={validationVariant}>{validationChildren}</CheckboxGroup.Validation>
        ) : null}
      </CheckboxGroup>
    );
  }
};

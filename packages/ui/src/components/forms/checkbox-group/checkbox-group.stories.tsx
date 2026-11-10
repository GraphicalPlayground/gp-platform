// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { CheckboxGroup } from './checkbox-group';
import type { CheckboxGroupProps } from './checkbox-group';
import { FormControl } from '../form-control';
import type { FormValidationStatus } from '../form-types';
import { Checkbox } from '../checkbox';

type CheckboxGroupStoryProps = {
  labelChildren: string;
  labelVisuallyHidden: boolean;
  captionChildren: string;
  validationChildren: string;
  validationVariant: FormValidationStatus;
};

export type MetaProps = CheckboxGroupProps & CheckboxGroupStoryProps;

const meta: Meta<MetaProps> = {
  title: 'Components/Forms/CheckboxGroup',
  component: CheckboxGroup,
  args: {
    labelChildren: 'Choices',
    labelVisuallyHidden: false,
    captionChildren: 'Select all that apply',
    validationChildren: 'Great job!',
    validationVariant: 'success'
  },
  argTypes: {
    labelChildren: {
      name: 'Text',
      control: 'text',
      table: {
        category: 'Label'
      }
    },
    labelVisuallyHidden: {
      name: 'Visually hidden',
      control: 'boolean',
      table: {
        category: 'Label'
      }
    },
    captionChildren: {
      name: 'Text',
      control: 'text',
      table: {
        category: 'Caption'
      }
    },
    validationChildren: {
      name: 'Text',
      control: 'text',
      table: {
        category: 'Validation'
      }
    },
    validationVariant: {
      name: 'Variant',
      options: ['error', 'success'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Validation'
      }
    }
  }
};

export default meta;

type Story = StoryObj<MetaProps>;

export const Playground: Story = {
  render: ({ labelChildren, labelVisuallyHidden, captionChildren, validationChildren, validationVariant }) => {
    return (
      <CheckboxGroup>
        <CheckboxGroup.Label visuallyHidden={labelVisuallyHidden}>{labelChildren}</CheckboxGroup.Label>
        {captionChildren ? <CheckboxGroup.Caption>{captionChildren}</CheckboxGroup.Caption> : null}

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

        {validationChildren ? (
          <CheckboxGroup.Validation variant={validationVariant}>{validationChildren}</CheckboxGroup.Validation>
        ) : null}
      </CheckboxGroup>
    );
  }
};

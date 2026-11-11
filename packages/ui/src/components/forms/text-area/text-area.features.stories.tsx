// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Textarea } from './text-area';
import { Stack } from '../../stack';
import { FormControl } from '../form-control';
import styles from './text-area.stories.module.css';

export default {
  title: 'Components/Forms/Textarea/Features',
  component: Textarea
} as Meta<typeof Textarea>;

export const Validation: StoryFn<typeof Textarea> = () => (
  <Stack direction='vertical'>
    <Textarea aria-label='Standalone text input' validationStatus='success' fullWidth />
    <Textarea aria-label='Standalone text input' validationStatus='error' fullWidth />
  </Stack>
);

export const WithFormControl: StoryFn<typeof Textarea> = () => (
  <FormControl>
    <FormControl.Label>Description</FormControl.Label>
    <Textarea className={styles.textareaStoryFixedWidth} />
  </FormControl>
);
WithFormControl.storyName = 'w/ labels';

export const Inactive: StoryFn<typeof Textarea> = () => <Textarea aria-label='Standalone text input' disabled />;

export const FullWidth: StoryFn<typeof Textarea> = () => <Textarea aria-label='Standalone text input' fullWidth />;

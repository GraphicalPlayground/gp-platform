// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { StoryFn, Meta } from '@storybook/react';

import { RiverStoryScroll } from './river-story-scroll';
import { Text } from '../../text';
import { Link } from '../../link';
import { River } from '../river';
import { Box } from '../../box';
import { Container } from '../../helper';

import placeholder1 from '../../../fixtures/images/placeholder-1.png';
import placeholder2 from '../../../fixtures/images/placeholder-2.png';
import placeholder3 from '../../../fixtures/images/placeholder-3.png';

export default {
  title: 'Components/RiverStoryScroll',
  component: RiverStoryScroll
} as Meta<typeof RiverStoryScroll>;

const Template: StoryFn<typeof RiverStoryScroll> = (args) => (
  <Container>
    <Box style={{ padding: '15dvh 0 200dvh' }}>
      <RiverStoryScroll {...args}>
        <River>
          <River.Visual>
            <img
              src={placeholder1.src}
              alt='placeholder, blank area with an orange background color and a white number 1 in the center'
            />
          </River.Visual>
          <River.Content>
            <Text size='300'>
              <b>This first sentence is highlighted</b> and here is where the body copy starts. Remember to keep this
              nice and succinct.
            </Text>
            <Link href='#'>Call to action</Link>
          </River.Content>
        </River>
        <River>
          <River.Visual>
            <img
              src={placeholder2.src}
              alt='placeholder, blank area with a purple background color and a white number 2 in the center'
            />
          </River.Visual>
          <River.Content>
            <Text size='300'>
              <b>This first sentence is highlighted</b> and here is where the body copy starts. Remember to keep this
              nice and succinct.
            </Text>
            <Link href='#'>Call to action</Link>
          </River.Content>
        </River>
        <River>
          <River.Visual>
            <img
              src={placeholder3.src}
              alt='placeholder, blank area with a turquoise background color and a white number 3 in the center'
            />
          </River.Visual>
          <River.Content>
            <Text size='300'>
              <b>This first sentence is highlighted</b> and here is where the body copy starts. Remember to keep this
              nice and succinct.
            </Text>
            <Link href='#'>Call to action</Link>
          </River.Content>
        </River>
      </RiverStoryScroll>
    </Box>
  </Container>
);

export const Default = Template.bind({});

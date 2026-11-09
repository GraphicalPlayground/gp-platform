// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Tabs, Text } from '../';
import type { TabsProps } from '../';

export type MetaProps = TabsProps;

const meta: Meta<MetaProps> = {
  title: 'Components/Tabs',
  component: Tabs as Meta<TabsProps>['component'],
  args: {
    'align': 'center',
    'variant': 'default',
    'aria-label': 'Tabs'
  },
  argTypes: {
    align: {
      options: ['start', 'center'],
      control: { type: 'inline-radio' }
    },
    variant: {
      options: ['default', 'accent', 'underline'],
      control: { type: 'select' }
    },
    onChange: {
      action: 'tab changed'
    }
  },
  render: (args) => {
    return (
      <Tabs {...args}>
        <Tabs.Item>Tab one</Tabs.Item>
        <Tabs.Item>Tab two</Tabs.Item>
        <Tabs.Item>Tab three</Tabs.Item>
        <Tabs.Item>Tab four</Tabs.Item>
        <Tabs.Item>Tab five</Tabs.Item>
        <Tabs.Item>Tab six</Tabs.Item>

        <Tabs.Panel>
          <Text>Panel one</Text>
        </Tabs.Panel>
        <Tabs.Panel>
          <Text>Panel two</Text>
        </Tabs.Panel>
        <Tabs.Panel>
          <Text>Panel three</Text>
        </Tabs.Panel>
        <Tabs.Panel>
          <Text>Panel four</Text>
        </Tabs.Panel>
        <Tabs.Panel>
          <Text>Panel five</Text>
        </Tabs.Panel>
        <Tabs.Panel>
          <Text>Panel six</Text>
        </Tabs.Panel>
      </Tabs>
    );
  }
};

export default meta;

type Story = StoryObj<MetaProps>;

export const Default: Story = {};

export const Playground: Story = {};

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tiles } from './tiles';
import { Section } from '../section';
import { Stack } from '../stack';
import { tileItems } from './tiles.fixtures';

const meta = {
  title: 'Components/Tiles/Features',
  component: Tiles
} satisfies Meta<typeof Tiles>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultVariant: Story = {
  render: () => (
    <Section>
      <Tiles>
        {tileItems.slice(0, 6).map((item) => (
          <Tiles.Item key={item.name} name={item.name} href={item.href}>
            {item.icon}
          </Tiles.Item>
        ))}
      </Tiles>
    </Section>
  )
};

export const GridlinesVariant: Story = {
  render: () => (
    <Section>
      <Tiles variant='gridlines'>
        {tileItems.slice(0, 6).map((item) => (
          <Tiles.Item key={item.name} name={item.name} href={item.href}>
            {item.icon}
          </Tiles.Item>
        ))}
      </Tiles>
    </Section>
  )
};

export const GridlinesUnderfilledRows: Story = {
  render: () => (
    <Stack gap='spacious' padding='none'>
      <Section>
        <Tiles variant='gridlines'>
          {tileItems.slice(0, 5).map((item, index) => (
            <Tiles.Item key={`${item.name}-${index}`} name={item.name} href={item.href}>
              {item.icon}
            </Tiles.Item>
          ))}
        </Tiles>
      </Section>
      <Section>
        <Tiles variant='gridlines' layout='compact'>
          {tileItems.slice(0, 7).map((item, index) => (
            <Tiles.Item key={`${item.name}-${index}`} name={item.name} href={item.href}>
              {item.icon}
            </Tiles.Item>
          ))}
        </Tiles>
      </Section>
    </Stack>
  )
};

export const CompactLayout: Story = {
  render: () => (
    <Section>
      <Tiles variant='gridlines' layout='compact'>
        {tileItems.map((item, index) => (
          <Tiles.Item key={`${item.name}-${index}`} name={item.name} href={item.href}>
            {item.icon}
          </Tiles.Item>
        ))}
      </Tiles>
    </Section>
  )
};

export const StaticItems: Story = {
  render: () => (
    <Section>
      <Tiles variant='gridlines'>
        {tileItems.slice(0, 6).map((item) => (
          <Tiles.Item key={item.name} name={item.name}>
            {item.icon}
          </Tiles.Item>
        ))}
      </Tiles>
    </Section>
  )
};

export const MaximumItems: Story = {
  render: () => {
    const maximumTileItems = tileItems.concat(tileItems.slice(0, 1));

    return (
      <Section>
        <Tiles variant='gridlines'>
          {maximumTileItems.map((item, index) => (
            <Tiles.Item key={`${item.name}-${index}`} name={item.name} href={item.href}>
              {item.icon}
            </Tiles.Item>
          ))}
        </Tiles>
      </Section>
    );
  }
};

export const BalancedRowsTablet: Story = {
  name: 'Balanced rows (tablet)',
  globals: {
    viewport: { value: 'ipad10p' }
  },
  render: () => (
    <Stack gap='spacious' padding='none'>
      <Section>
        <Tiles variant='gridlines'>
          {tileItems.slice(0, 6).map((item) => (
            <Tiles.Item key={item.name} name={item.name} href={item.href}>
              {item.icon}
            </Tiles.Item>
          ))}
        </Tiles>
      </Section>
      <Section>
        <Tiles variant='gridlines' layout='compact'>
          {tileItems.map((item, index) => (
            <Tiles.Item key={`${item.name}-${index}`} name={item.name} href={item.href}>
              {item.icon}
            </Tiles.Item>
          ))}
        </Tiles>
      </Section>
    </Stack>
  )
};

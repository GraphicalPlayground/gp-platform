// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Meta } from '@storybook/react';

import { UnorderedList } from './unordered-list';
import { XIcon } from '@primer/octicons-react';

export default {
  title: 'Components/UnorderedList/Features',
  component: UnorderedList
} as Meta<typeof UnorderedList>;

export const CheckList = () => (
  <UnorderedList variant='checked'>
    <UnorderedList.Item>Automatic security and version updates</UnorderedList.Item>
    <UnorderedList.Item>GitHub Security Advisories</UnorderedList.Item>
    <UnorderedList.Item>Code and secret scanning</UnorderedList.Item>
    <UnorderedList.Item>Dependency review</UnorderedList.Item>
    <UnorderedList.Item>Automated authentication and identity management</UnorderedList.Item>
  </UnorderedList>
);

export const XList = () => (
  <UnorderedList variant='x'>
    <UnorderedList.Item>Automatic security and version updates</UnorderedList.Item>
    <UnorderedList.Item>GitHub Security Advisories</UnorderedList.Item>
    <UnorderedList.Item>Code and secret scanning</UnorderedList.Item>
    <UnorderedList.Item>Dependency review</UnorderedList.Item>
    <UnorderedList.Item>Automated authentication and identity management</UnorderedList.Item>
  </UnorderedList>
);

export const customColor = () => (
  <UnorderedList variant='checked'>
    <UnorderedList.Item leadingVisualFill='green'>Automatic security and version updates</UnorderedList.Item>
    <UnorderedList.Item leadingVisualFill='orange'>GitHub Security Advisories</UnorderedList.Item>
    <UnorderedList.Item leadingVisualFill='red'>Code and secret scanning</UnorderedList.Item>
    <UnorderedList.Item leadingVisualFill='blue'>Dependency review</UnorderedList.Item>
    <UnorderedList.Item leadingVisualFill='purple'>Automated authentication and identity management</UnorderedList.Item>
  </UnorderedList>
);

export const customIcon = () => (
  <UnorderedList variant='checked'>
    <UnorderedList.Item leadingVisualFill='var(--gp-color-success-fg)'>
      Automatic security and version updates
    </UnorderedList.Item>
    <UnorderedList.Item leadingVisualFill='var(--gp-color-success-fg)'>GitHub Security Advisories</UnorderedList.Item>
    <UnorderedList.Item leadingVisualFill='var(--gp-color-success-fg)'>Code and secret scanning</UnorderedList.Item>
    <UnorderedList.Item
      leadingVisual={XIcon}
      leadingVisualFill='var(--gp-color-text-muted)'
      leadingVisualAriaLabel='Not included icon'
    >
      Dependency review
    </UnorderedList.Item>
    <UnorderedList.Item
      leadingVisual={XIcon}
      leadingVisualFill='var(--gp-color-text-muted)'
      leadingVisualAriaLabel='Not included icon'
    >
      Automated authentication and identity management
    </UnorderedList.Item>
  </UnorderedList>
);

export const textVariant = () => (
  <UnorderedList>
    <UnorderedList.Item>Default</UnorderedList.Item>
    <UnorderedList.Item variant='muted'>Muted</UnorderedList.Item>
  </UnorderedList>
);

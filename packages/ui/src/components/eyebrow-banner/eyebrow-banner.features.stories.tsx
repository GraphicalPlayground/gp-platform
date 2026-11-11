// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Meta } from '@storybook/react';
import { EyebrowBanner, EyebrowBannerIconColors, EyebrowBannerLabelColors } from '.';
import { Stack } from '../stack';
import { MarkGithubIcon, SparkleFillIcon } from '@primer/octicons-react';
import backgroundImageDark from '../../fixtures/images/background-stars.png';
import backgroundImageLight from '../../fixtures/images/eyebrow-banner-light-bg.png';
import eyebrowBannerImage from '../../fixtures/images/eyebrow.png';
import { Box } from '../box';

export default {
  title: 'Components/EyebrowBanner/Features',
  component: EyebrowBanner,
  parameters: {
    layout: 'fullscreen'
  }
} as Meta<typeof EyebrowBanner>;

export const Variations = () => (
  <Stack>
    <EyebrowBanner href='/'>
      <EyebrowBanner.Heading>GitHub Universe: Dive in to AI, security, and DevEx</EyebrowBanner.Heading>
      <EyebrowBanner.SubHeading>Get your tickets now to join us on Nov. 8-9.</EyebrowBanner.SubHeading>
    </EyebrowBanner>
    <EyebrowBanner href='/'>
      <EyebrowBanner.Visual>
        <img width='44' height='44' alt='' aria-hidden='true' src={eyebrowBannerImage.src} />
      </EyebrowBanner.Visual>
      <EyebrowBanner.Heading>GitHub Universe: Dive in to AI, security, and DevEx</EyebrowBanner.Heading>
      <EyebrowBanner.SubHeading>Get your tickets now to join us on Nov. 8-9.</EyebrowBanner.SubHeading>
    </EyebrowBanner>
    <EyebrowBanner href='/'>
      <EyebrowBanner.Visual>
        <MarkGithubIcon size={44} fill='var(--brand-color-text-default)' />
      </EyebrowBanner.Visual>
      <EyebrowBanner.Heading>GitHub Universe: Dive in to AI, security, and DevEx</EyebrowBanner.Heading>
      <EyebrowBanner.SubHeading>Get your tickets now to join us on Nov. 8-9.</EyebrowBanner.SubHeading>
    </EyebrowBanner>
    <EyebrowBanner href='/'>
      <EyebrowBanner.Label>NEW</EyebrowBanner.Label>
      <EyebrowBanner.Heading>GitHub Copilot now available for Business</EyebrowBanner.Heading>
    </EyebrowBanner>
    <EyebrowBanner href='/'>
      <EyebrowBanner.Label>NEW</EyebrowBanner.Label>
      <EyebrowBanner.Heading>GitHub Copilot now available for Business</EyebrowBanner.Heading>
      <EyebrowBanner.SubHeading>Harnessed for productivity. Designed for collaboration. </EyebrowBanner.SubHeading>
    </EyebrowBanner>
    <EyebrowBanner href='/'>
      <EyebrowBanner.Label>UPDATE</EyebrowBanner.Label>
      <EyebrowBanner.Heading>Now supports multiple languages</EyebrowBanner.Heading>
    </EyebrowBanner>
  </Stack>
);

export const OnCustomBackgroundDark = () => <Variations />;

OnCustomBackgroundDark.decorators = [
  (Story: any) => (
    <div
      className='p-3'
      style={{ backgroundImage: `url(${backgroundImageDark})`, backgroundSize: 'cover', height: '100vh' }}
    >
      <Story />
    </div>
  )
];
OnCustomBackgroundDark.parameters = {
  layout: 'fullscreen'
};

export const OnCustomBackgroundLight = () => <Variations />;

OnCustomBackgroundLight.decorators = [
  (Story: any) => (
    <div
      className='p-3'
      style={{ backgroundImage: `url(${backgroundImageLight})`, backgroundSize: 'cover', height: '100vh' }}
    >
      <Story />
    </div>
  )
];
OnCustomBackgroundLight.parameters = {
  layout: 'fullscreen'
};

export const Labels = () => (
  <Stack>
    {EyebrowBannerLabelColors.map((color) => (
      <EyebrowBanner href='/' key={color}>
        <EyebrowBanner.Label color={color}>{color}</EyebrowBanner.Label>
        <EyebrowBanner.Heading>GitHub Universe: Dive in to AI, security, and DevEx</EyebrowBanner.Heading>
      </EyebrowBanner>
    ))}
  </Stack>
);

export const LabelsDark = () => <Labels />;

LabelsDark.decorators = [
  (Story: any) => (
    <Box backgroundColor='default'>
      <Story />
    </Box>
  )
];

export const Icons = () => (
  <Stack direction='horizontal'>
    <Stack>
      {EyebrowBannerIconColors.map((color) => (
        <EyebrowBanner href='/' key={color}>
          <EyebrowBanner.Visual icon={<SparkleFillIcon />} color={color}></EyebrowBanner.Visual>
          <EyebrowBanner.Heading>color: {color}</EyebrowBanner.Heading>
          <EyebrowBanner.SubHeading>hasBackground: false</EyebrowBanner.SubHeading>
        </EyebrowBanner>
      ))}
    </Stack>
    <Stack>
      {EyebrowBannerIconColors.map((color) => (
        <EyebrowBanner href='/' key={color}>
          <EyebrowBanner.Visual icon={<SparkleFillIcon />} color={color} hasBackground></EyebrowBanner.Visual>
          <EyebrowBanner.Heading>color: {color}</EyebrowBanner.Heading>
          <EyebrowBanner.SubHeading>hasBackground: true</EyebrowBanner.SubHeading>
        </EyebrowBanner>
      ))}
    </Stack>
  </Stack>
);

export const IconsDark = () => <Icons />;

IconsDark.decorators = [
  (Story: any) => (
    <Box backgroundColor='default'>
      <Story />
    </Box>
  )
];

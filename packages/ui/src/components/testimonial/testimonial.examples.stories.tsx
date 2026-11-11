// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { clsx } from 'clsx';
import { Trans, useTranslation } from 'react-i18next';

import type { TestimonialProps } from './testimonial';
import { Testimonial } from './testimonial';
import { Box, /* FrostedGlassVFX, */ Grid, Image, Stack } from '../';
import hubotAvatar from '../../fixtures/images/avatar-hubot.png';
import startShapeLight from '../../fixtures/images/testimonial-bg-1.png';
import endShapeLight from '../../fixtures/images/testimonial-bg-2.png';
import startShapeDark from '../../fixtures/images/testimonial-bg-1-dark.png';
import endShapeDark from '../../fixtures/images/testimonial-bg-2-dark.png';

import styles from './testimonial.stories.module.css';

type MetaProps = TestimonialProps;

const meta = {
  component: Testimonial as Meta<MetaProps>['component'],
  title: 'Components/Testimonial/Examples'
} satisfies Meta<MetaProps>;

export default meta;

type Story = StoryObj<MetaProps>;

export const WithFrostedGlass: Story = {
  parameters: {
    layout: 'full'
  },
  decorators: [
    function WithFrostedGlassDecorator(Story, context) {
      const { t } = useTranslation('Testimonial');

      return (
        <Box
          backgroundColor={context.globals['colorMode'] === 'light' ? 'subtle' : 'default'}
          paddingBlockStart={128}
          paddingBlockEnd={128}
          className={styles.innerContainer}
        >
          <Image
            src={context.globals['colorMode'] === 'light' ? startShapeLight.src : startShapeDark.src}
            alt={t('startingShape')}
            className={clsx(styles.exampleShape)}
            width={612}
          />
          <Image
            src={context.globals['colorMode'] === 'light' ? endShapeLight.src : endShapeDark.src}
            alt={t('endingShape')}
            className={styles.exampleShape}
            width={612}
          />
          <Grid>
            <Grid.Column>
              <Story />
            </Grid.Column>
          </Grid>
        </Box>
      );
    }
  ],
  render: function WithFrostedGlassExample() {
    const { t } = useTranslation('Testimonial');

    return (
      // <FrostedGlassVFX>
      <Testimonial size='large' variant='default' quoteMarkColor='purple'>
        <Testimonial.Quote>{t('automationQuote')}</Testimonial.Quote>
        <Testimonial.Name position={t('position')}>Hubot</Testimonial.Name>
        <Testimonial.Avatar src={hubotAvatar} alt={t('avatarAlt', { name: 'Hubot' })} />
      </Testimonial>
      // </FrostedGlassVFX>
    );
  }
};

export const WithFrostedGlassDark: Story = {
  parameters: {
    layout: 'full'
  },
  decorators: [
    function WithFrostedGlassDarkDecorator(Story) {
      const { t } = useTranslation('Testimonial');

      return (
        <Box backgroundColor='default' paddingBlockStart={128} paddingBlockEnd={128} className={styles.innerContainer}>
          <Image src={startShapeDark.src} alt={t('startingShape')} className={clsx(styles.exampleShape)} width={612} />
          <Image src={endShapeDark.src} alt={t('endingShape')} className={styles.exampleShape} width={612} />
          <Grid>
            <Grid.Column>
              <Story />
            </Grid.Column>
          </Grid>
        </Box>
      );
    }
  ],
  render: function WithFrostedGlassDarkExample() {
    const { t } = useTranslation('Testimonial');

    return (
      // <FrostedGlassVFX>
      <Testimonial size='large' variant='default'>
        <Testimonial.Quote>{t('automationQuote')}</Testimonial.Quote>
        <Testimonial.Name position={t('position')}>Hubot</Testimonial.Name>
        <Testimonial.Avatar src={hubotAvatar} alt={t('avatarAlt', { name: 'Hubot' })} />
      </Testimonial>
      // </FrostedGlassVFX>
    );
  }
};

export const Duo: Story = {
  globals: {
    viewport: { value: 'ipad12p' }
  },
  render: function DuoExample(args) {
    const { t } = useTranslation('Testimonial');

    return (
      <Stack
        direction={{
          narrow: 'vertical',
          regular: 'horizontal'
        }}
        gap='spacious'
        alignItems='flex-start'
        padding={{
          narrow: 'condensed',
          regular: 'normal',
          wide: 'spacious'
        }}
      >
        <Testimonial {...args}>
          <Testimonial.Quote>{t('lunchQuote')}</Testimonial.Quote>
          <Testimonial.Name position={t('position')}>Hubot</Testimonial.Name>
          <Testimonial.Avatar src={hubotAvatar} alt={t('avatarAlt', { name: 'Hubot' })} />
        </Testimonial>
        <Testimonial {...args}>
          <Testimonial.Quote>{t('picturesQuote')}</Testimonial.Quote>
          <Testimonial.Name position={t('position')}>Hubot</Testimonial.Name>
          <Testimonial.Avatar src={hubotAvatar} alt={t('avatarAlt', { name: 'Hubot' })} />
        </Testimonial>
      </Stack>
    );
  }
};

export const Trio: Story = {
  render: function TrioExample(args) {
    const { t } = useTranslation('Testimonial');

    return (
      <Stack
        direction={{
          narrow: 'vertical',
          regular: 'horizontal'
        }}
        gap='spacious'
        alignItems='flex-start'
        padding={{
          narrow: 'condensed',
          regular: 'normal',
          wide: 'spacious'
        }}
      >
        <Testimonial {...args}>
          <Testimonial.Quote>{t('automationQuote')}</Testimonial.Quote>
          <Testimonial.Name position={t('position')}>Hubot</Testimonial.Name>
          <Testimonial.Avatar src={hubotAvatar} alt={t('avatarAlt', { name: 'Hubot' })} />
        </Testimonial>
        <Testimonial {...args}>
          <Testimonial.Quote>{t('lunchQuote')}</Testimonial.Quote>
          <Testimonial.Name position={t('position')}>Hubot</Testimonial.Name>
          <Testimonial.Avatar src={hubotAvatar} alt={t('avatarAlt', { name: 'Hubot' })} />
        </Testimonial>
        <Testimonial {...args}>
          <Testimonial.Quote>{t('picturesQuote')}</Testimonial.Quote>
          <Testimonial.Name position={t('position')}>Hubot</Testimonial.Name>
          <Testimonial.Avatar src={hubotAvatar} alt={t('avatarAlt', { name: 'Hubot' })} />
        </Testimonial>
      </Stack>
    );
  }
};

export const ExpressiveWithBackground: Story = {
  parameters: {
    layout: 'fullscreen'
  },
  render: function ExpressiveWithBackgroundExample() {
    const { t } = useTranslation('Testimonial');

    return (
      <Box paddingBlockStart={64} paddingBlockEnd={64} paddingInlineStart={48} paddingInlineEnd={48}>
        <Testimonial variant='expressive' size='large'>
          <Testimonial.Quote>
            <Trans t={t} i18nKey='picturesHighlighted' components={{ highlight: <em /> }} />
          </Testimonial.Quote>
          <Testimonial.Link href='#'>{t('readStory')}</Testimonial.Link>
          <Testimonial.Avatar src={hubotAvatar} alt={t('avatarAlt', { name: 'Hubot' })} />
          <Testimonial.Name position={t('position')}>Hubot</Testimonial.Name>
        </Testimonial>
      </Box>
    );
  }
};

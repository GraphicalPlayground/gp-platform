// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { LogoSuite } from './logo-suite';
import type { LogoSuiteHeadingProps, LogoSuiteLogoBarProps, LogoSuiteProps } from './logo-suite';
import { logos } from './logo-suite.fixtures';

type StoryProps = Required<
  Pick<LogoSuiteProps, 'align' | 'hasDivider' | 'variant'> &
    Pick<LogoSuiteHeadingProps, 'visuallyHidden'> &
    Pick<LogoSuiteLogoBarProps, 'marquee' | 'marqueeSpeed'>
> & {
  logobarVariant: LogoSuiteLogoBarProps['variant'];
  logoCount: number;
  heading: string;
  description: string;
};

const meta = {
  title: 'Components/LogoSuite',
  component: LogoSuite,
  args: {
    align: 'center',
    variant: undefined,
    hasDivider: true,
    visuallyHidden: false,
    logobarVariant: undefined,
    marquee: false,
    marqueeSpeed: 'normal',
    logoCount: 5,
    heading: 'Heading',
    description: 'Body text maximus ligula felis, non egestas dolor rutrum vel.'
  },
  argTypes: {
    hasDivider: {
      control: {
        type: 'boolean'
      },
      table: {
        category: 'LogoSuite'
      }
    },
    logoCount: {
      control: {
        type: 'number',
        min: 3,
        max: 12
      },
      table: {
        category: 'LogoSuite'
      }
    },
    align: {
      control: 'radio',
      options: ['start', 'center', 'justify'],
      table: {
        category: 'LogoSuite'
      }
    },
    variant: {
      control: 'radio',
      options: [undefined, 'default', 'gridline-expressive'],
      table: {
        category: 'LogoSuite'
      }
    },
    visuallyHidden: {
      control: {
        type: 'boolean'
      },
      table: {
        category: 'LogoSuite.Heading'
      }
    },
    heading: {
      control: {
        type: 'text'
      },
      table: {
        category: 'LogoSuite.Heading'
      }
    },
    description: {
      control: {
        type: 'text'
      },
      table: {
        category: 'LogoSuite.Description'
      }
    },

    marquee: {
      control: {
        type: 'boolean'
      },
      table: {
        category: 'LogoSuite.Logobar'
      }
    },
    logobarVariant: {
      control: 'radio',
      options: [undefined, 'muted', 'emphasis'],
      table: {
        category: 'LogoSuite.Logobar'
      }
    },

    marqueeSpeed: {
      control: 'radio',
      options: ['slow', 'normal', 'idle'],
      table: {
        category: 'LogoSuite.Logobar'
      }
    }
  }
} satisfies Meta<StoryProps>;

export default meta;
type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  render: ({
    align,
    description,
    hasDivider,
    heading,
    logoCount,
    logobarVariant,
    marquee,
    marqueeSpeed,
    variant,
    visuallyHidden
  }) => (
    <LogoSuite align={align} variant={variant} hasDivider={hasDivider}>
      <LogoSuite.Heading visuallyHidden={visuallyHidden}>{heading}</LogoSuite.Heading>
      <LogoSuite.Description>{description}</LogoSuite.Description>
      <LogoSuite.Logobar variant={logobarVariant} marquee={marquee} marqueeSpeed={marqueeSpeed}>
        {logos.slice(0, logoCount)}
      </LogoSuite.Logobar>
    </LogoSuite>
  )
};

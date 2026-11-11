// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React, { useCallback, useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { SubNav } from './sub-nav';
import type { SubNavProps } from './sub-nav';
import { Box } from '../box';
import { Hero } from '../hero';
import { Grid } from '../grid';
import { Heading } from '../heading';
import { Text } from '../text';
import { RedlineBackground } from '../helper';
import { Stack } from '../stack';
import { expect, userEvent, within } from 'storybook/test';
import { Button } from '../button';
import { useTranslation } from 'react-i18next';
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';

const meta = {
  title: 'Components/SubNav/Features',
  component: SubNav,
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof SubNav>;

export default meta;
type Story = StoryObj<SubNavProps>;

const DropdownTemplate = (args: SubNavProps) => {
  return (
    <main>
      <Box paddingBlockStart={64} backgroundColor='subtle' style={{ position: 'relative', zIndex: 32 }}></Box>
      <SubNav {...args}>
        <SubNav.Heading href='#'>Features</SubNav.Heading>
        <SubNav.Link href='#'>Actions</SubNav.Link>
        <SubNav.Link href='#'>Packages</SubNav.Link>
        <SubNav.Link href='#'>Security</SubNav.Link>
        <SubNav.Link href='#'>Codespaces</SubNav.Link>
        <SubNav.Link href='#' aria-current='page'>
          Copilot
          <SubNav.SubMenu>
            <SubNav.Link href='#'>Copilot feature page one</SubNav.Link>
            <SubNav.Link href='#'>Copilot feature page two</SubNav.Link>
            <SubNav.Link href='#'>Copilot feature page three</SubNav.Link>
            <SubNav.Link href='#'>Copilot feature page four</SubNav.Link>
          </SubNav.SubMenu>
        </SubNav.Link>
        <SubNav.Link href='#'>Code review</SubNav.Link>
        <SubNav.Link href='#'>Search</SubNav.Link>
        <SubNav.Link href='#'>Issues</SubNav.Link>
        <SubNav.Link href='#'>Discussions</SubNav.Link>
      </SubNav>
      <Grid>
        <Grid.Column>
          <Hero align='center'>
            <Hero.Label>Copilot Enterprise</Hero.Label>
            <Hero.Heading>The world&apos;s most widely adopted AI tool.</Hero.Heading>
            <Hero.PrimaryAction href='#'>Get started with Copilot</Hero.PrimaryAction>
          </Hero>
        </Grid.Column>
      </Grid>
    </main>
  );
};

export const DropdownVariant: Story = {
  render: DropdownTemplate
};

export const NarrowDropdownVariant: Story = {
  render: (args) => <DropdownTemplate {...args} />,
  globals: {
    viewport: { value: 'iphonex' }
  }
};

export const NarrowDropdownVariantMenuOpen: Story = {
  render: (args) => <DropdownTemplate {...args} />,
  globals: {
    viewport: { value: 'iphonex' }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('SubNav-root-button'));
    const overlayMenu = canvas.getByTestId('SubNav-root-overlay');
    const firstLink = within(overlayMenu).getAllByRole('link')[0];

    expect(firstLink).toHaveFocus();
  }
};

export const WithShadow: Story = {
  render: (args) => <DropdownTemplate {...args} hasShadow />
};

const SubHeadingTemplate = (args: SubNavProps) => (
  <SubNav {...args}>
    <SubNav.Heading href='#'>AI</SubNav.Heading>
    <SubNav.SubHeading href='#'>GitHub Copilot</SubNav.SubHeading>
    <SubNav.Link href='#'>For business</SubNav.Link>
    <SubNav.Link href='#' aria-current='page'>
      Extensions
    </SubNav.Link>
    <SubNav.Link href='#'>Tutorials</SubNav.Link>
    <SubNav.Link href='#'>
      What&apos;s new
      <SubNav.SubMenu>
        <SubNav.Link href='#'>Sub-feature page one</SubNav.Link>
        <SubNav.Link href='#'>Sub-feature page two</SubNav.Link>
        <SubNav.Link href='#'>Sub-feature page three</SubNav.Link>
        <SubNav.Link href='#'>Sub-feature page four</SubNav.Link>
      </SubNav.SubMenu>
    </SubNav.Link>
    <SubNav.Link href='#'>Plans & pricing</SubNav.Link>
    <SubNav.Action href='#'>Call to action</SubNav.Action>
  </SubNav>
);

export const SubHeading: Story = {
  render: SubHeadingTemplate
};

export const SubHeadingNarrow: Story = {
  render: SubHeadingTemplate,
  globals: {
    viewport: { value: 'iphonex' }
  }
};

export const SubHeadingNarrowOpen: Story = {
  render: SubHeadingTemplate,
  globals: {
    viewport: { value: 'iphonex' }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('SubNav-root-button'));
  }
};

const ActiveSubHeadingTemplate = (args: SubNavProps) => (
  <SubNav {...args}>
    <SubNav.Heading href='#'>AI</SubNav.Heading>
    <SubNav.SubHeading href='#' aria-current='page'>
      Copilot
    </SubNav.SubHeading>
    <SubNav.Link href='#'>For business</SubNav.Link>
    <SubNav.Link href='#'>Extensions</SubNav.Link>
    <SubNav.Link href='#'>Tutorials</SubNav.Link>
    <SubNav.Link href='#'>
      What&apos;s new
      <SubNav.SubMenu>
        <SubNav.Link href='#'>Sub-feature page one</SubNav.Link>
        <SubNav.Link href='#'>Sub-feature page two</SubNav.Link>
        <SubNav.Link href='#'>Sub-feature page three</SubNav.Link>
        <SubNav.Link href='#'>Sub-feature page four</SubNav.Link>
      </SubNav.SubMenu>
    </SubNav.Link>
    <SubNav.Link href='#'>Plans & pricing</SubNav.Link>
    <SubNav.Action href='#'>Call to action</SubNav.Action>
  </SubNav>
);

export const ActiveSubHeading: Story = {
  render: ActiveSubHeadingTemplate
};

export const ActiveSubHeadingNarrow: Story = {
  render: ActiveSubHeadingTemplate,
  globals: {
    viewport: { value: 'iphonex' }
  }
};

export const ActiveSubHeadingNarrowOpen: Story = {
  render: ActiveSubHeadingTemplate,
  globals: {
    viewport: { value: 'iphonex' }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('SubNav-root-button'));
  }
};

export const CurrentPageNarrow: Story = {
  render: (args) => (
    <SubNav {...args}>
      <SubNav.Heading href='#'>GitHub Security</SubNav.Heading>
      <SubNav.Link href='#' aria-current='page'>
        Advanced Security
      </SubNav.Link>
      <SubNav.Link href='#'>Secret Protection</SubNav.Link>
      <SubNav.Link href='#'>Code Security</SubNav.Link>
      <SubNav.Link href='#'>Supply Chain Security</SubNav.Link>
      <SubNav.Link href='#'>Plans & pricing</SubNav.Link>
    </SubNav>
  ),
  globals: {
    viewport: { value: 'iphone5' }
  }
};

const FullWidthTemplate = (args: SubNavProps) => (
  <SubNav {...args} fullWidth>
    <SubNav.Heading href='#'>Features</SubNav.Heading>
    <SubNav.Link href='#'>Actions</SubNav.Link>
    <SubNav.Link href='#'>Packages</SubNav.Link>
    <SubNav.Link href='#'>Security</SubNav.Link>
    <SubNav.Link href='#'>Codespaces</SubNav.Link>
    <SubNav.Link href='#' aria-current='page'>
      Copilot
      <SubNav.SubMenu>
        <SubNav.Link href='#'>Copilot feature page one</SubNav.Link>
        <SubNav.Link href='#'>Copilot feature page two</SubNav.Link>
        <SubNav.Link href='#'>Copilot feature page three</SubNav.Link>
        <SubNav.Link href='#'>Copilot feature page four</SubNav.Link>
      </SubNav.SubMenu>
    </SubNav.Link>
    <SubNav.Link href='#'>Code review</SubNav.Link>
    <SubNav.Link href='#'>Search</SubNav.Link>
    <SubNav.Action href='#'>Call to action</SubNav.Action>
  </SubNav>
);

export const FullWidth: Story = {
  render: FullWidthTemplate
};

export const FullWidthNarrow: Story = {
  render: FullWidthTemplate,
  globals: {
    viewport: { value: 'iphonex' }
  }
};

const LongerHeadingTemplate = (args: SubNavProps) => (
  <SubNav {...args} fullWidth>
    <SubNav.Heading href='#'>A longer heading</SubNav.Heading>
    <SubNav.Link href='#'>Actions</SubNav.Link>
    <SubNav.Link href='#'>Packages</SubNav.Link>
    <SubNav.Link href='#'>Security</SubNav.Link>
    <SubNav.Link href='#'>Codespaces</SubNav.Link>
    <SubNav.Link href='#' aria-current='page'>
      Copilot
      <SubNav.SubMenu>
        <SubNav.Link href='#'>Copilot feature page one</SubNav.Link>
        <SubNav.Link href='#'>Copilot feature page two</SubNav.Link>
        <SubNav.Link href='#'>Copilot feature page three</SubNav.Link>
        <SubNav.Link href='#'>Copilot feature page four</SubNav.Link>
      </SubNav.SubMenu>
    </SubNav.Link>
    <SubNav.Link href='#'>Code review</SubNav.Link>
    <SubNav.Link href='#'>Search</SubNav.Link>
    <SubNav.Action href='#'>Call to action</SubNav.Action>
  </SubNav>
);

export const LongerHeading: Story = {
  render: LongerHeadingTemplate
};

export const OverflowMenu: Story = {
  name: 'Overflow Menu',
  args: {
    fullWidth: false
  },
  parameters: {
    viewport: {
      options: MINIMAL_VIEWPORTS
    }
  },
  globals: {
    viewport: { value: 'desktop' }
  },
  render: function RenderOverflowMenu(args) {
    const { t: translate } = useTranslation('SubNav');

    return (
      <SubNav
        {...args}
        menuLabels={{
          menuLabel: translate('menu_label'),
          closeLabel: translate('close_label'),
          activeLabel: translate('active_label'),
          closeActiveLabel: translate('close_active_label'),
          overflowMenuLabel: translate('overflow_menu_label'),
          ...args.menuLabels
        }}
      >
        <SubNav.Heading href='#'>{translate('ai')}</SubNav.Heading>
        <SubNav.SubHeading href='#'>GitHub Copilot</SubNav.SubHeading>
        <SubNav.Link href='#'>{translate('desktop_app')}</SubNav.Link>
        <SubNav.Link href='#' aria-current='page'>
          {translate('copilot_in_vs_code')}
        </SubNav.Link>
        <SubNav.Link href='#'>{translate('agents_on_github')}</SubNav.Link>
        <SubNav.Link href='#'>{translate('copilot_cli')}</SubNav.Link>
        <SubNav.Link href='#'>{translate('copilot_code_review')}</SubNav.Link>
        <SubNav.Link href='#'>{translate('for_business')}</SubNav.Link>
        <SubNav.Link href='#'>{translate('tutorials')}</SubNav.Link>
        <SubNav.Link href='#'>{translate('plans_pricing')}</SubNav.Link>
      </SubNav>
    );
  }
};

export const OverflowMenuOpen: Story = {
  name: 'Overflow Menu Open',
  args: {
    fullWidth: false
  },
  parameters: {
    viewport: {
      options: MINIMAL_VIEWPORTS
    }
  },
  globals: {
    viewport: { value: 'desktop' }
  },
  render: function RenderOverflowMenuOpen(args) {
    const { t: translate } = useTranslation('SubNav');

    return (
      <SubNav
        {...args}
        menuLabels={{
          menuLabel: translate('menu_label'),
          closeLabel: translate('close_label'),
          activeLabel: translate('active_label'),
          closeActiveLabel: translate('close_active_label'),
          overflowMenuLabel: translate('overflow_menu_label'),
          ...args.menuLabels
        }}
      >
        <SubNav.Heading href='#'>{translate('ai')}</SubNav.Heading>
        <SubNav.SubHeading href='#'>GitHub Copilot</SubNav.SubHeading>
        <SubNav.Link href='#'>{translate('desktop_app')}</SubNav.Link>
        <SubNav.Link href='#' aria-current='page'>
          {translate('copilot_in_vs_code')}
        </SubNav.Link>
        <SubNav.Link href='#'>{translate('agents_on_github')}</SubNav.Link>
        <SubNav.Link href='#'>{translate('copilot_cli')}</SubNav.Link>
        <SubNav.Link href='#'>{translate('copilot_code_review')}</SubNav.Link>
        <SubNav.Link href='#'>{translate('for_business')}</SubNav.Link>
        <SubNav.Link href='#'>{translate('tutorials')}</SubNav.Link>
        <SubNav.Link href='#'>{translate('plans_pricing')}</SubNav.Link>
      </SubNav>
    );
  }
};

export const OverflowMenuLocalized: Story = {
  name: 'Overflow Menu (Localized)',
  args: {
    fullWidth: false
  },
  parameters: {
    viewport: {
      options: MINIMAL_VIEWPORTS
    }
  },
  globals: {
    viewport: { value: 'desktop' },
    locale: 'ja'
  },
  render: function RenderOverflowMenuLocalized(args) {
    const { t: translate } = useTranslation('SubNav');

    return (
      <SubNav
        {...args}
        menuLabels={{
          menuLabel: translate('menu_label'),
          closeLabel: translate('close_label'),
          activeLabel: translate('active_label'),
          closeActiveLabel: translate('close_active_label'),
          overflowMenuLabel: translate('overflow_menu_label'),
          ...args.menuLabels
        }}
      >
        <SubNav.Heading href='#'>{translate('ai')}</SubNav.Heading>
        <SubNav.SubHeading href='#'>GitHub Copilot</SubNav.SubHeading>
        <SubNav.Link href='#'>{translate('desktop_app')}</SubNav.Link>
        <SubNav.Link href='#' aria-current='page'>
          {translate('copilot_in_vs_code')}
        </SubNav.Link>
        <SubNav.Link href='#'>{translate('agents_on_github')}</SubNav.Link>
        <SubNav.Link href='#'>{translate('copilot_cli')}</SubNav.Link>
        <SubNav.Link href='#'>{translate('copilot_code_review')}</SubNav.Link>
        <SubNav.Link href='#'>{translate('for_business')}</SubNav.Link>
        <SubNav.Link href='#'>{translate('tutorials')}</SubNav.Link>
        <SubNav.Link href='#'>{translate('plans_pricing')}</SubNav.Link>
      </SubNav>
    );
  }
};

const AnchorNavVariantData = {
  ['Scale']: 'scale',
  ['AI']: 'ai',
  ['Security']: 'security',
  ['Reliability']: 'reliability'
};

const AnchorNavVariantTemplate = (args: SubNavProps) => (
  <main>
    <Box paddingBlockStart={64} backgroundColor='subtle' style={{ position: 'relative', zIndex: 32 }}></Box>
    <SubNav {...args}>
      <SubNav.Heading href='https://github.com/enterprise/'>Enterprise</SubNav.Heading>
      <SubNav.Link href='#' aria-current='page'>
        Overview
        <SubNav.SubMenu variant='anchor'>
          {Object.entries(AnchorNavVariantData).map(([label, href]) => (
            <SubNav.Link key={label} href={`#${href}`}>
              {label}
            </SubNav.Link>
          ))}
        </SubNav.SubMenu>
      </SubNav.Link>
      <SubNav.Link href='https://github.com/enterprise/advanced-security'>Advanced Security</SubNav.Link>
      <SubNav.Link href='https://github.com/features/copilot#enterprise'>Copilot Enterprise</SubNav.Link>
      <SubNav.Link href='https://github.com/premium-support'>Premium Support</SubNav.Link>
    </SubNav>
    <Box style={{ paddingBlockEnd: '100dvh' }}>
      {Object.entries(AnchorNavVariantData).map(([key, value]) => (
        <RedlineBackground key={key} style={{ scrollPaddingTop: 64 }}>
          <Stack key={value} id={value} direction='vertical' style={{ justifyContent: 'center', height: 1000 }}>
            <Heading>{key}</Heading>
            <Text as='p'>SubNav is a component that allows users to navigate to different sections of a page.</Text>
            <Button>Learn more</Button>
          </Stack>
        </RedlineBackground>
      ))}
    </Box>
  </main>
);

export const AnchorNavVariant: Story = {
  render: AnchorNavVariantTemplate
};

export const NarrowAnchorNavVariant: Story = {
  render: AnchorNavVariantTemplate,
  globals: {
    viewport: { value: 'iphone5' }
  }
};

export const NarrowAnchorNavVariantMenuOpen: Story = {
  render: AnchorNavVariantTemplate,
  globals: {
    viewport: { value: 'iphone5' }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('SubNav-root-button'));
    const overlayMenu = canvas.getByTestId('SubNav-root-overlay');
    const firstLink = within(overlayMenu).getAllByRole('link')[0];

    expect(firstLink).toHaveFocus();
  }
};

export const AnchorNavDefaultLinkVariant: Story = {
  render: (args) => (
    <SubNav {...args}>
      <SubNav.Heading href='#'>Heading</SubNav.Heading>
      <SubNav.Link href='#' variant='default'>
        Link
      </SubNav.Link>
      <SubNav.Link href='#' variant='default'>
        Link
      </SubNav.Link>
      <SubNav.Link href='#' variant='default'>
        Link
      </SubNav.Link>
      <SubNav.Link href='#' variant='default'>
        Link
      </SubNav.Link>
      <SubNav.Link href='#' variant='default'>
        Link
      </SubNav.Link>
      <SubNav.Link href='#' variant='default'>
        Link
      </SubNav.Link>
      <SubNav.Action href='#'>Primary CTA</SubNav.Action>
    </SubNav>
  )
};

export const ForwardedRefs = () => {
  const subNavRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number | null>(null);

  useEffect(() => {
    if (subNavRef.current) {
      setHeight(subNavRef.current.offsetHeight);
    }
  }, [subNavRef]);

  return (
    <>
      <SubNav ref={subNavRef}>
        <SubNav.Heading href='#'>Heading</SubNav.Heading>
        <SubNav.Link href='#'>Link </SubNav.Link>
        <SubNav.Link href='#'>Link</SubNav.Link>
        <SubNav.Link href='#'>Link</SubNav.Link>
        <SubNav.Link href='#'>Link</SubNav.Link>
        <SubNav.Link href='#'>Link</SubNav.Link>
        <SubNav.Link href='#'>Link</SubNav.Link>
        <SubNav.Action href='#'>Primary CTA</SubNav.Action>
      </SubNav>
      <Box paddingBlockStart={64}>
        <Text as='p' align='center'>
          SubNav rendered height: {height}px
        </Text>
      </Box>
    </>
  );
};

export const KeyboardNavigation: Story = {
  render: DropdownTemplate,
  globals: {
    viewport: { value: 'iphonex' }
  }
};

export const AnchorNavVariantKeyboardNavigation: Story = {
  render: AnchorNavVariantTemplate,
  play: async ({ canvasElement }) => {
    const { getByRole, getAllByRole } = within(canvasElement);

    await userEvent.tab();
    expect(getByRole('link', { name: 'Enterprise' })).toHaveFocus();

    await userEvent.tab();
    expect(getByRole('link', { name: 'Overview' })).toHaveFocus();

    await userEvent.tab();
    expect(getByRole('link', { name: 'Advanced Security' })).toHaveFocus();

    await userEvent.tab();
    expect(getByRole('link', { name: 'Copilot Enterprise' })).toHaveFocus();

    await userEvent.tab();
    expect(getByRole('link', { name: 'Premium Support' })).toHaveFocus();

    await userEvent.tab();
    expect(getByRole('link', { name: 'Scale' })).toHaveFocus();

    await userEvent.tab();
    expect(getByRole('link', { name: 'AI' })).toHaveFocus();

    await userEvent.tab();
    expect(getByRole('link', { name: 'Security' })).toHaveFocus();

    await userEvent.tab();
    expect(getByRole('link', { name: 'Reliability' })).toHaveFocus();

    await userEvent.tab();
    expect(getAllByRole('button', { name: 'Learn more' })[0]).toHaveFocus();

    await userEvent.tab({ shift: true });
    expect(getByRole('link', { name: 'Reliability' })).toHaveFocus();

    await userEvent.tab({ shift: true });
    expect(getByRole('link', { name: 'Security' })).toHaveFocus();

    await userEvent.tab({ shift: true });
    expect(getByRole('link', { name: 'AI' })).toHaveFocus();

    await userEvent.tab({ shift: true });
    expect(getByRole('link', { name: 'Scale' })).toHaveFocus();

    await userEvent.tab({ shift: true });
    expect(getByRole('link', { name: 'Premium Support' })).toHaveFocus();
  }
};

const NoActiveLinksTemplate = (args: SubNavProps) => (
  <main>
    <Box paddingBlockStart={64} backgroundColor='subtle' style={{ position: 'relative', zIndex: 32 }}></Box>
    <SubNav {...args}>
      <SubNav.Heading href='#'>Features</SubNav.Heading>
      <SubNav.Link href='#'>Actions</SubNav.Link>
      <SubNav.Link href='#'>Packages</SubNav.Link>
      <SubNav.Link href='#'>Security</SubNav.Link>
      <SubNav.Link href='#'>Codespaces</SubNav.Link>
      <SubNav.Link href='#'>Copilot</SubNav.Link>
      <SubNav.Link href='#'>Code review</SubNav.Link>
      <SubNav.Link href='#'>Search</SubNav.Link>
      <SubNav.Link href='#'>Issues</SubNav.Link>
      <SubNav.Link href='#'>Discussions</SubNav.Link>
      <SubNav.Action href='#'>Get started</SubNav.Action>
    </SubNav>
    <Grid>
      <Grid.Column>
        <Hero align='center'>
          <Hero.Label>GitHub Features</Hero.Label>
          <Hero.Heading>Choose the tools that work best for your team.</Hero.Heading>
          <Hero.Description>
            This story demonstrates the SubNav component when no links have aria-current=&quot;page&quot; set, which
            should result in no separator being visible according to the test expectations.
          </Hero.Description>
          <Hero.PrimaryAction href='#'>Explore features</Hero.PrimaryAction>
        </Hero>
      </Grid.Column>
    </Grid>
  </main>
);

export const NoActiveLinks: Story = {
  name: 'With no aria-current set',
  render: NoActiveLinksTemplate
};

export const NoActiveLinksNarrow: Story = {
  name: 'With no aria-current set (narrow)',
  render: NoActiveLinksTemplate,
  globals: {
    viewport: { value: 'iphonex' }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('SubNav-root-button'));
  }
};

const DelayedActiveTemplate = (args: SubNavProps) => {
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, label: string) => {
    e.preventDefault();
    setActiveLink(null);
    setTimeout(() => {
      setActiveLink(label);
    }, 500);
  }, []);

  useEffect(() => {
    // set an initial active link after a delay
    const delay = setTimeout(() => {
      setActiveLink('Actions');
    }, 1000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <main>
      <Box paddingBlockStart={64} backgroundColor='subtle' style={{ position: 'relative', zIndex: 32 }}></Box>
      <SubNav {...args}>
        <SubNav.Heading href='#'>Features</SubNav.Heading>
        {['Actions', 'Packages', 'Security', 'Codespaces', 'Copilot', 'Code review', 'Search'].map((label) => (
          <SubNav.Link
            key={label}
            href='#'
            aria-current={activeLink === label ? 'page' : undefined}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleClick(e, label)}
          >
            {label}
          </SubNav.Link>
        ))}
      </SubNav>
      <Grid>
        <Grid.Column>
          <Hero align='center'>
            <Hero.Label>GitHub Features</Hero.Label>
            <Hero.Heading>Choose the tools that work best for your team.</Hero.Heading>
            <Hero.Description>
              This story shows active link handling. Specifically, how it doesn&apos;t cause layout shift when
              navigating between sub nav links.
            </Hero.Description>
          </Hero>
        </Grid.Column>
      </Grid>
    </main>
  );
};

export const DelayedActiveLink: Story = {
  name: 'Delayed active link (layout shift test)',
  render: DelayedActiveTemplate
};

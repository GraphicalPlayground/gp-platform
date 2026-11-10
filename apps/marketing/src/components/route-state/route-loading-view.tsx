// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { Organization } from '@gp/constants';
import {
  Box,
  BrandIcon,
  EyebrowText,
  Grid,
  Heading,
  Label,
  Section,
  Spinner,
  Stack,
  Text,
  Token
} from '@gp/ui/components';
import clsx from 'clsx';
import styles from './route-state.module.css';

const SKELETON_CARDS = [0, 1, 2] as const;

/**
 * @brief Route-level loading fallback mirroring the marketing two-band layout with `@gp/ui` primitives.
 */
export const RouteLoadingView: React.FC = () => {
  return (
    <Box aria-busy='true' aria-live='polite' role='status'>
      <Section
        fullWidth
        backgroundColor='subtle'
        className={styles.headerSection}
        paddingBlockEnd={{ narrow: 'normal', regular: 'normal' }}
        paddingBlockStart={{ narrow: 'condensed', regular: 'normal' }}
      >
        <Grid className={styles.headerGrid}>
          <Grid.Column className={styles.introColumn} span={{ xsmall: 12, large: 7 }}>
            <Stack
              alignItems='center'
              className={styles.statusRow}
              direction='horizontal'
              flexWrap='wrap'
              gap={12}
              padding='none'
            >
              <Label className={styles.statusLabelGreen} color='green' size='medium'>
                Fetching route
              </Label>
              <Spinner accessibleLabel='Loading page content' size='small' />
              <EyebrowText variant='muted'>{Organization.displayName}</EyebrowText>
            </Stack>

            <Stack direction='vertical' gap={16} padding='none'>
              <Heading as='h1' size='2'>
                Loading the next page
              </Heading>
              <Text as='p' className={styles.loadingDescription} size='300' variant='muted'>
                Hold on while the requested content finishes loading.
              </Text>
            </Stack>

            <Stack aria-hidden='true' className={styles.skeletonGroup} direction='vertical' gap={12} padding='none'>
              <Box className={clsx(styles.skeletonBar, styles.skeletonBarWide)} />
              <Box className={clsx(styles.skeletonBar, styles.skeletonBarMedium)} />
              <Stack
                className={styles.skeletonButtonRow}
                direction='horizontal'
                flexWrap='wrap'
                gap={16}
                padding='none'
              >
                <Box className={clsx(styles.skeletonBar, styles.skeletonButton)} />
                <Box className={clsx(styles.skeletonBar, styles.skeletonButton)} />
              </Stack>
            </Stack>
          </Grid.Column>

          <Grid.Column className={styles.panelColumn} span={{ xsmall: 12, large: 5 }}>
            <Box className={styles.panelCard} padding='none'>
              <Box className={styles.panelHeader}>
                <Stack
                  alignItems='center'
                  direction='horizontal'
                  flexWrap='wrap'
                  gap={12}
                  justifyContent='space-between'
                  padding='none'
                >
                  <Stack
                    alignItems='center'
                    className={styles.panelTitleIcon}
                    direction='horizontal'
                    gap={8}
                    padding='none'
                  >
                    <BrandIcon aria-hidden='true' fill='currentColor' height={18} variant='icon' />
                    <EyebrowText variant='default'>Preparing content</EyebrowText>
                  </Stack>
                  <Spinner accessibleLabel={null} size='small' />
                </Stack>
              </Box>

              <Box aria-hidden='true' className={styles.panelBody}>
                <Stack direction='vertical' gap={20} padding='none'>
                  <Box className={clsx(styles.skeletonBar, styles.skeletonBarWide)} />
                  <Box className={clsx(styles.skeletonBar, styles.skeletonBarMedium)} />
                  <Box className={clsx(styles.skeletonBar, styles.skeletonBarShort)} />
                </Stack>
              </Box>

              <Box className={styles.panelFooter}>
                <Stack
                  alignItems='center'
                  direction='horizontal'
                  flexWrap='wrap'
                  gap={12}
                  justifyContent='space-between'
                  padding='none'
                >
                  <Text as='span' font='monospace' size='100' variant='muted'>
                    Loading · {Organization.shortName}
                  </Text>
                  <Token variant='outline'>WAIT</Token>
                </Stack>
              </Box>
            </Box>
          </Grid.Column>
        </Grid>
      </Section>

      <Section
        fullWidth
        aria-hidden='true'
        backgroundColor='default'
        paddingBlockEnd={{ narrow: 'normal', regular: 'spacious' }}
        paddingBlockStart={{ narrow: 'normal', regular: 'normal' }}
      >
        <Grid className={styles.destinationsGrid}>
          {SKELETON_CARDS.map((cardIndex) => (
            <Grid.Column key={cardIndex} span={{ xsmall: 12, large: 4 }}>
              <Box className={styles.skeletonCard}>
                <Stack direction='vertical' gap={16} padding='none'>
                  <Box className={clsx(styles.skeletonBar, styles.skeletonIcon)} />
                  <Box className={clsx(styles.skeletonBar, styles.skeletonBarShort)} />
                  <Box className={clsx(styles.skeletonBar, styles.skeletonBarMedium)} />
                  <Box className={clsx(styles.skeletonBar, styles.skeletonBarWide)} />
                </Stack>
              </Box>
            </Grid.Column>
          ))}
        </Grid>
      </Section>
    </Box>
  );
};

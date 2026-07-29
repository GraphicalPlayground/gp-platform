// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Metadata } from 'next';
import { Text, Link, Grid, Stack, Heading } from '@gp/ui/components';
import { SeoMetadata } from '@gp/seo/metadata';
import { Urls } from '@gp/seo/utils';

/**
 * @brief Metadata for the marketing home page.
 */
export const metadata: Metadata = SeoMetadata.for('marketing', { baseUrl: Urls.BaseUrl }).page({
  path: '/',
  title: 'Learn Graphics Programming by Building It',
  description:
    'An interactive, browser-based platform where students deconstruct and rebuild graphics-engine systems from the ground up, from raw Vulkan commands to full render pipelines.'
});

/**
 * @brief Principal home page of the marketing application.
 * @returns A JSX page displaying the home page content.
 */
export default function HomePage() {
  return (
    <div className='h-screen w-full flex flex-row justify-between px-10'>
      <div className='w-full h-screen flex flex-col gap-4 p-4 justify-center items-center'>
        <Stack gap='condensed' style={{ width: '100%' }}>
          <Heading size='display'>Display: 96px</Heading>
          <Heading size='1'>1: 72px</Heading>
          <Heading size='2'>2: 64px</Heading>
          <Heading size='3'>3: 48px</Heading>
          <Heading size='4'>4: 40px</Heading>
          <Heading size='5'>5: 32px</Heading>
          <Heading size='6'>6: 24px</Heading>
          <Heading size='subhead-large'>subhead-large: 20px</Heading>
          <Heading size='subhead-medium'>subhead-medium: 16px</Heading>
        </Stack>
        <Stack gap='condensed' style={{ width: '100%' }}>
          <Heading as='h6'>This is my super sweet heading as a h6</Heading>

          <Heading as='h2' size='4'>
            This h2 will appear visually identical to a h4
          </Heading>
        </Stack>
        <Stack gap='condensed' style={{ width: '100%' }}>
          <Heading as='h3' weight='heavy'>
            heavy
          </Heading>
          <Heading as='h3' weight='extrabold'>
            extrabold
          </Heading>
          <Heading as='h3' weight='bold'>
            bold
          </Heading>
          <Heading as='h3' weight='semibold'>
            semibold
          </Heading>
          <Heading as='h3' weight='medium'>
            medium
          </Heading>
          <Heading as='h3' weight='normal'>
            normal
          </Heading>
          <Heading as='h3' weight='light'>
            light
          </Heading>

          <br />
          <br />
          <Heading
            as='h4'
            weight={{
              narrow: 'heavy',
              regular: 'semibold',
              wide: 'light'
            }}
          >
            Responsive
          </Heading>
        </Stack>
        <Stack gap='condensed' style={{ width: '100%' }}>
          <Heading as='h3' stretch='condensed'>
            condensed
          </Heading>
          <Heading as='h3' stretch='normal'>
            normal
          </Heading>
          <Heading as='h3' stretch='expanded'>
            expanded
          </Heading>

          <br />
          <br />
          <Heading
            as='h4'
            stretch={{
              narrow: 'condensed',
              regular: 'normal',
              wide: 'expanded'
            }}
          >
            Responsive
          </Heading>
        </Stack>
      </div>
      <div className='w-full h-screen flex flex-col gap-4 p-4 justify-center items-center'>
        <Grid enableOverlay>
          <Grid.Column span={1}></Grid.Column>
          <Grid.Column span={11}></Grid.Column>
          <Grid.Column span={2}></Grid.Column>
          <Grid.Column span={10}></Grid.Column>
          <Grid.Column span={3}></Grid.Column>
          <Grid.Column span={9}></Grid.Column>
          <Grid.Column span={4}></Grid.Column>
          <Grid.Column span={8}></Grid.Column>
          <Grid.Column span={5}></Grid.Column>
          <Grid.Column span={7}></Grid.Column>
          <Grid.Column span={6}></Grid.Column>
          <Grid.Column span={6}></Grid.Column>
          <Grid.Column span={7}></Grid.Column>
          <Grid.Column span={5}></Grid.Column>
          <Grid.Column span={8}></Grid.Column>
          <Grid.Column span={4}></Grid.Column>
          <Grid.Column span={9}></Grid.Column>
          <Grid.Column span={3}></Grid.Column>
          <Grid.Column span={10}></Grid.Column>
          <Grid.Column span={2}></Grid.Column>
        </Grid>

        <Stack>
          <Text size='200' weight='heavy'>
            Learn Graphics Programming by Building It
          </Text>
          <Text size='100' weight='normal'>
            An interactive, browser-based platform where students deconstruct and rebuild graphics-engine systems from
            the ground up, from raw Vulkan commands to full render pipelines.
          </Text>
        </Stack>
      </div>
      <div className='w-full h-screen flex flex-col gap-4 p-4 justify-center items-center'>
        <div>
          <h2>Aligned Text</h2>
          <div className='flex w-100 flex-col border'>
            <Text align='start'>Start aligned text</Text>
            <Text align='center'>Center aligned text</Text>
            <Text align='end'>End aligned text</Text>
          </div>
        </div>
        <div>
          <h2>Text Sizes</h2>
          <div className='flex w-100 flex-col border'>
            <Text size='1000'>Size 1000</Text>
            <Text size='900'>Size 900</Text>
            <Text size='800'>Size 800</Text>
            <Text size='700'>Size 700</Text>
            <Text size='600'>Size 600</Text>
            <Text size='500'>Size 500</Text>
            <Text size='400'>Size 400</Text>
            <Text size='300'>Size 300</Text>
            <Text size='200'>Size 200</Text>
            <Text size='100'>Size 100</Text>
          </div>
        </div>
        <div>
          <h2>Font Family</h2>
          <div className='flex w-100 flex-col border'>
            <Text font='mona-sans'>Mona Sans</Text>
            <Text font='hubot-sans'>Hubot Sans</Text>
            <Text font='monospace'>Monospace</Text>
          </div>
        </div>
        <div>
          <h2>Text Weight</h2>
          <div className='flex w-100 flex-col border'>
            <Text weight='heavy'>Heavy</Text>
            <Text weight='extrabold'>Extrabold</Text>
            <Text weight='bold'>Bold</Text>
            <Text weight='semibold'>Semibold</Text>
            <Text weight='medium'>Medium</Text>
            <Text weight='normal'>Normal</Text>
            <Text weight='light'>Light</Text>
            <Text weight='extralight'>Extralight</Text>
          </div>
        </div>
        <div className='flex flex-row gap-4'>
          <div>
            <div>
              <Link href='/legal' size='large'>
                Go to legal page
              </Link>
            </div>
            <div>
              <Link href='/legal' size='medium'>
                Go to legal page
              </Link>
            </div>
            <div>
              <Link href='/legal' size='small'>
                Go to legal page
              </Link>
            </div>
          </div>
          <div>
            <div>
              <Link href='/legal' arrowDirection='end'>
                Go to legal page
              </Link>
            </div>
            <div>
              <Link href='/legal' arrowDirection='none'>
                Go to legal page
              </Link>
            </div>
            <div>
              <Link href='/legal' arrowDirection='start'>
                Go to legal page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

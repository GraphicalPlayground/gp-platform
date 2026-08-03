// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Metadata } from 'next';
import { Text, Link, Grid, Stack, Heading, Prose, Pillar } from '@gp/ui/components';
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
    <div className='w-full flex-col gap-10'>
      <div className='w-full flex flex-row justify-between px-10'>
        <div className='w-full flex flex-col gap-4 p-4'>
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
            <Grid.Column span={1} />
            <Grid.Column span={11} />
            <Grid.Column span={2} />
            <Grid.Column span={10} />
            <Grid.Column span={3} />
            <Grid.Column span={9} />
            <Grid.Column span={4} />
            <Grid.Column span={8} />
            <Grid.Column span={5} />
            <Grid.Column span={7} />
            <Grid.Column span={6} />
            <Grid.Column span={6} />
            <Grid.Column span={7} />
            <Grid.Column span={5} />
            <Grid.Column span={8} />
            <Grid.Column span={4} />
            <Grid.Column span={9} />
            <Grid.Column span={3} />
            <Grid.Column span={10} />
            <Grid.Column span={2} />
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
                <Link arrowDirection='end' href='/legal'>
                  Go to legal page
                </Link>
              </div>
              <div>
                <Link arrowDirection='none' href='/legal'>
                  Go to legal page
                </Link>
              </div>
              <div>
                <Link arrowDirection='start' href='/legal'>
                  Go to legal page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full flex-row'>
        <div>
          <Pillar>
            <Pillar.Heading>Code search & code view</Pillar.Heading>
            <Pillar.Description>
              Enables you to rapidly search, navigate, and understand code, right from Graphical-Playground.com.
            </Pillar.Description>
            <Pillar.Link href='/about'>Learn more</Pillar.Link>
          </Pillar>
        </div>
        <div className='w-full max-w-3xl mx-auto'>
          <Prose
            html={`
    <h2>Heading level 2</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lectus ipsum, consectetur convallis diam pretium quis. Proin ut felis ut eros tristique tincidunt.</p>
    <figure>
      <blockquote>
        <p>Nulla ac odio eu magna hendrerit porta. Donec nec eros quis tortor tincidunt vulputate. Aenean id pharetra diam, sit amet auctor leo. Aliquam erat volutpat.</p>
        <figcaption>Lisa Vanderschuit, Engineering Program Manager, Shopify</figcaption>
      </blockquote>
    </figure>
    <p>Integer pellentesque pretium nulla viverra molestie. Praesent quis pretium sapien. Sed convallis eget lectus et pulvinar:</p>
    <ul>
      <li>
        Vivamus eu risus nec lectus consequat rutrum at vel lacus.
      </li>
      <li>Donec at dolor ut metus imperdiet congue vel porta nunc.
      </li>
      <li>Quisque eu tortor suscipit, congue quam in, bibendum tellus.</li>
    </ul>
    <h3>Heading level 3</h3>
    <p>Pellentesque non ornare ligula. Suspendisse nibh purus, pretium id tortor sit amet, tincidunt gravida augue. Ut malesuada, nisl vel dignissim mollis</p>
    <img
      src="/images/placeholder.png"
      alt="placeholder, blank area with a gray background color"
      />
    <h4>Heading level  4</h4>
    <p>
      Secure code as you write it. Automatically review every change to your codebase and identify vulnerabilities
      before they reach production. <a href="/#">Learn more here.</a>
    </p>
    <h5>Heading level 5</h5>
    <ol>
      <li>
        Vivamus eu risus nec lectus consequat rutrum at vel lacus.
      </li>
      <li>Donec at dolor ut metus imperdiet congue vel porta nunc.
      </li>
      <li>Quisque eu tortor suscipit, congue quam in, bibendum tellus.</li>
    </ol>
    <p><code>for-each-ref</code> is extremely useful for listing references, finding which references point at a given object (with <code>--points-at</code>), which references have been merged into a given branch (with <code>--merged</code>), or which references contain a given commit (with <code>--contains</code>).</p>
    <h6>Heading level 6</h6>
    <p>Pellentesque non ornare ligula. Suspendisse nibh purus, pretium id tortor sit amet, tincidunt gravida augue.</p>
    <table>
      <caption>Developer growth by total developers in 2023, % increase from 2022.</caption>
      <thead>
        <tr>
          <th scope="col">Country</th>
          <th scope="col">Number of developers</th>
          <th scope="col">YoY growth</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Singapore</td>
          <td>>1M developers</td>
          <td>39%</td>
        </tr>
        <tr>
          <td>India</td>
          <td>>13.2M developers</td>
          <td>36%</td>
        </tr>
        <tr>
          <td>Hong Kong SAR</td>
          <td>>1.6M developers</td>
          <td>35%</td>
        </tr>
        <tr>
          <td>Vietnam</td>
          <td>>1.5M developers</td>
          <td>34%</td>
        </tr>
        <tr>
          <td>Indonesia</td>
          <td>>2.9M developers</td>
          <td>31%</td>
        </tr>
        <tr>
          <td>Japan</td>
          <td>>2.8M developers</td>
          <td>31%</td>
        </tr>
        <tr>
          <td>Philippines</td>
          <td>>1.3M developers</td>
          <td>31%</td>
        </tr>
        <tr>
          <td>Thailand</td>
          <td>>857K developers</td>
          <td>25%</td>
        </tr>
        <tr>
          <td>South Korea</td>
          <td>>1.9M developers</td>
          <td>22%</td>
        </tr>
        <tr>
          <td>Australia</td>
          <td>>1.4M developers</td>
          <td>21%</td>
        </tr>
      </tbody>
    </table>
    <p>Nunc velit odio, posuere eu felis eget, consectetur fermentum nisi. Aenean tempor odio id ornare ultrices. Quisque blandit condimentum tellus, semper efficitur sapien dapibus nec. </p>
    `}
          />
        </div>
      </div>
    </div>
  );
}

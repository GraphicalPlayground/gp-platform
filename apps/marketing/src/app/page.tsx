// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import type { Metadata } from 'next';
import { Text, Link } from '@gp/ui/components';
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
    <div className='w-full h-100vh flex flex-col gap-4 p-4 justify-center items-center'>
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
  );
}

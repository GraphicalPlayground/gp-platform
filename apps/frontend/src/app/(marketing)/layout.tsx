// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@gp/react';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header>
        <a className='shrink-0'>
          <img src='/logo-dark.svg' className='shrink-0 max-[400px]:block h-[26px]' alt='Logo' />
        </a>
        <div className='flex h-8 items-center gap-4'>
          <Button>Getting Started</Button>
        </div>
      </Header>

      <main>{children}</main>

      <Footer callToAction='Start learning today'>
        <div className='flex flex-col xl:flex-row gap-13.5 xl:gap-[10%]'>
          <Footer.Brand>
            <Footer.Logo src='/logo-light.svg' />
            <div className='flex md:max-xl:flex-row md:max-xl:items-start md:max-xl:gap-11 md:flex-col gap-18'>
              <Footer.Description className='mt-6.5'>
                Graphical Playground is the definitive real-time graphics platform for students and programming
                enthusiasts. Featuring interactive canvas experiments, streamlined browser-based workflows, and deep
                system-level access, it empowers users to explore, build, and scale custom render pipelines with maximum
                efficiency.
              </Footer.Description>
              <Footer.Social className='hidden sm:flex'>
                <Footer.SocialIcon href='#' icon='youtube' />
                <Footer.SocialIcon href='#' icon='twitter' />
                <Footer.SocialIcon href='#' icon='instagram' />
                <Footer.SocialIcon href='#' icon='facebook' />
                <Footer.SocialIcon href='#' icon='tiktok' />
              </Footer.Social>
            </div>
          </Footer.Brand>

          <Footer.NavGrid>
            <Footer.Column title='PRODUCT'>
              <Footer.Link href='#'>GPlayd Engine</Footer.Link>
              <Footer.Link href='#'>GPlayd Cloud</Footer.Link>
              <Footer.Link href='#'>GPlayd Studio</Footer.Link>
              <Footer.Link href='#'>GPlayd Docs</Footer.Link>
            </Footer.Column>

            <Footer.Column title='RESOURCES'>
              <Footer.Link href='https://github.com/GraphicalPlayground'>Github</Footer.Link>
              <Footer.Link href='#'>Community</Footer.Link>
              <Footer.Link href='#'>Forum</Footer.Link>
              <Footer.Link href='https://docs.graphical-playground.com'>Documentation</Footer.Link>
              <Footer.Link href='#'>Inspiration</Footer.Link>
              <Footer.Link href='#'>Blog</Footer.Link>
              <Footer.Link href='/help'>Help Center</Footer.Link>
              <Footer.Link href='/pricing'>Pricing</Footer.Link>
              <Footer.Link href='/brand-guidelines'>Brand Guidelines</Footer.Link>
            </Footer.Column>

            <Footer.Column title='DEVELOPERS'>
              <Footer.Link href='#'>GPlayd SDK</Footer.Link>
              <Footer.Link href='#'>GPlayd API</Footer.Link>
              <Footer.Link href='#'>GPlayd CLI</Footer.Link>
            </Footer.Column>

            <Footer.Column title='COMPANY'>
              <Footer.Link href='/about'>About GPlayd</Footer.Link>
              <Footer.Link href='/contact'>Contact Us</Footer.Link>
              <Footer.Link href='/press'>Press & Media</Footer.Link>
              <Footer.Link href='/accessibility'>Accessibility Statement</Footer.Link>
              <Footer.Link href='#'>Site Map</Footer.Link>
              <Footer.Link href='/careers'>Careers</Footer.Link>
            </Footer.Column>
          </Footer.NavGrid>
        </div>

        <Footer.Divider />
        <Footer.BottomBar>
          <Footer.LegalLinks>
            <Footer.Link href='/terms'>Terms of Use</Footer.Link>
            <Footer.Link href='/privacy'>Privacy Policy</Footer.Link>
          </Footer.LegalLinks>

          <Footer.Social className='sm:hidden flex'>
            <Footer.SocialIcon href='#' icon='youtube' />
            <Footer.SocialIcon href='#' icon='twitter' />
            <Footer.SocialIcon href='#' icon='instagram' />
            <Footer.SocialIcon href='#' icon='facebook' />
            <Footer.SocialIcon href='#' icon='tiktok' />
          </Footer.Social>

          <div className='flex flex-row items-center gap-4'>
            <Footer.Copyright>Graphical Playground © 2025-2028</Footer.Copyright>
            <Footer.BackToTop />
          </div>
        </Footer.BottomBar>
      </Footer>
    </div>
  );
}

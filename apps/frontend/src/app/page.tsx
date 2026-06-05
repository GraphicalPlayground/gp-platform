// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HighLighted } from '@/components/highlighted';
import { Button } from '@gp/react';

export default function Home() {
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

      <main className='min-h-full'>
        <div className='relative top-0 flex min-h-100 md:min-h-150 w-full flex-col items-center bg-white px-4 md:px-6 pt-24 md:pt-32 lg:pt-48 pb-16'>
          <div className='absolute inset-0 z-0 bg-[radial-gradient(#00000020_1px,transparent_1px)] bg-size-[20px_20px] mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_80%,transparent_100%)] pointer-events-none'></div>

          <div className='relative z-10 flex flex-col items-center w-full'>
            <p className='text-center text-lg font-medium leading-[normal] max-md:text-sm inline-block bg-size-[200%_100%] bg-linear-to-r from-blue-500 via-blue-200 to-blue-500 bg-clip-text text-transparent animate-shimmer'>
              Graphical Playground is now live
            </p>
            <h1 className='mx-auto mt-6 max-w-5xl text-center text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-normal leading-tight lg:leading-none tracking-[-0.02em] text-black'>
              Experiment with Graphics
              <br className='hidden md:block' /> {'  '}
              <HighLighted color='#EAD8FE' animate>
                Zero Boilerplate
              </HighLighted>
            </h1>
          </div>
        </div>
      </main>

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
              <Footer.Social>
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
              <Footer.Link href='#'>Github</Footer.Link>
              <Footer.Link href='#'>Community</Footer.Link>
              <Footer.Link href='#'>Forum</Footer.Link>
              <Footer.Link href='#'>Documentation</Footer.Link>
              <Footer.Link href='#'>Inspiration</Footer.Link>
              <Footer.Link href='#'>Blog</Footer.Link>
              <Footer.Link href='#'>Help Center</Footer.Link>
              <Footer.Link href='#'>Pricing</Footer.Link>
              <Footer.Link href='#'>Brand Guidelines</Footer.Link>
            </Footer.Column>

            <Footer.Column title='DEVELOPERS'>
              <Footer.Link href='#'>GPlayd SDK</Footer.Link>
              <Footer.Link href='#'>GPlayd API</Footer.Link>
              <Footer.Link href='#'>GPlayd CLI</Footer.Link>
            </Footer.Column>

            <Footer.Column title='COMPANY'>
              <Footer.Link href='#'>About GPlayd</Footer.Link>
              <Footer.Link href='#'>Contact Us</Footer.Link>
              <Footer.Link href='#'>Press & Media</Footer.Link>
              <Footer.Link href='#'>Accessibility Statement</Footer.Link>
              <Footer.Link href='#'>Site Map</Footer.Link>
              <Footer.Link href='#'>Careers</Footer.Link>
            </Footer.Column>
          </Footer.NavGrid>
        </div>

        <Footer.Divider />
        <Footer.BottomBar>
          <Footer.LegalLinks>
            <Footer.Link href='#'>Terms of Use</Footer.Link>
            <Footer.Link href='#'>Privacy Policy</Footer.Link>
          </Footer.LegalLinks>

          <div className='flex flex-row items-center gap-4'>
            <Footer.Copyright>Graphical Playground © 2025-2028</Footer.Copyright>
            <Footer.BackToTop />
          </div>
        </Footer.BottomBar>
      </Footer>
    </div>
  );
}

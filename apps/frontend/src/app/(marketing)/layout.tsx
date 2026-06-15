// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import { UserButton, Show, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { __HAS_WAITLIST__, __SIGN_IN_URL__, __WAITLIST_URL__ } from '@/utils/env';
import { useRouter } from 'next/navigation';

export default function MarketingLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <div>
      <Header>
        <Header.Logo srcFull='/images/logo-long-text-black.svg' srcShort='/images/logo-short-text-black.svg' />

        <Header.Navigation>
          <Header.Navigation.Dropdown label='Product'></Header.Navigation.Dropdown>
          <Header.Navigation.Dropdown label='Resources'></Header.Navigation.Dropdown>
          <Header.Navigation.Dropdown label='Enterprise'></Header.Navigation.Dropdown>
          <Header.Navigation.Item href='/pricing'>Pricing</Header.Navigation.Item>
        </Header.Navigation>

        <Header.Actions>
          <ClerkLoading>
            <div className='h-8 w-24 mx-4 bg-gray-200 animate-pulse rounded lg:flex hidden' />
          </ClerkLoading>

          <ClerkLoaded>
            <Show when='signed-out'>
              {__HAS_WAITLIST__ ? (
                <Header.Link href={__WAITLIST_URL__} className='hidden lg:flex mt-1'>
                  Join Waitlist
                </Header.Link>
              ) : (
                <Header.Link href={__SIGN_IN_URL__} className='hidden lg:flex mt-1'>
                  Log In
                </Header.Link>
              )}
            </Show>
            <Show when='signed-in'>
              <div className='mx-4 justify-center items-center hidden lg:flex'>
                <UserButton appearance={{ elements: { avatarBox: 'w-8! h-8!' } }} />
              </div>
            </Show>
          </ClerkLoaded>
          <Header.Button
            className='bg-accent lg:bg-black'
            onClick={(e) => {
              e.preventDefault();
              router.push(__HAS_WAITLIST__ ? __WAITLIST_URL__ : __SIGN_IN_URL__);
            }}
          >
            Start Creating
          </Header.Button>
          <Header.Button className='lg:hidden p-0 w-12.5 flex items-center justify-center'>
            <svg xmlns='http://www.w3.org/2000/svg' width='50' height='46' fill='none' className='w-full h-full'>
              <path fill='#000' d='M0 0h50v46H0z'></path>
              <path
                stroke='#fff'
                strokeLinecap='square'
                d='M15.435 16.49h19.13M15.435 23.362h19.13M15.435 30.229h19.13'
              ></path>
            </svg>
          </Header.Button>
        </Header.Actions>
      </Header>

      <main className='min-h-[50vh]'>{children}</main>

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
              <Footer.Link href='/pricing'>Pricing</Footer.Link>
              <Footer.Link href='#'>GPlayd Engine</Footer.Link>
              <Footer.Link href='#'>GPlayd Cloud</Footer.Link>
              <Footer.Link href='#'>GPlayd Studio</Footer.Link>
            </Footer.Column>

            <Footer.Column title='DEVELOPERS'>
              <Footer.Link href='https://docs.graphical-playground.com'>Documentation</Footer.Link>
              <Footer.Link href='https://github.com/GraphicalPlayground'>Github Organization</Footer.Link>
              <Footer.Link href='#'>GPlayd SDK</Footer.Link>
              <Footer.Link href='#'>GPlayd API</Footer.Link>
              <Footer.Link href='#'>GPlayd CLI</Footer.Link>
            </Footer.Column>

            <Footer.Column title='RESOURCES'>
              <Footer.Link href='/help'>Help Center</Footer.Link>
              <Footer.Link href='#'>Community</Footer.Link>
              <Footer.Link href='#'>Forum</Footer.Link>
              <Footer.Link href='#'>Inspiration</Footer.Link>
              <Footer.Link href='/changelog'>Changelog</Footer.Link>
              <Footer.Link href='https://docs.graphical-playground.com/blog'>Blog</Footer.Link>
              <Footer.Link href='https://status.graphical-playground.com'>Status</Footer.Link>
              <Footer.Link href='#'>Site Map</Footer.Link>
              <Footer.Link href='/brand-guidelines'>Brand Guidelines</Footer.Link>
            </Footer.Column>

            <Footer.Column title='COMPANY'>
              <Footer.Link href='/about'>About Us</Footer.Link>
              <Footer.Link href='/careers'>Careers</Footer.Link>
              <Footer.Link href='/contact'>Contact Us</Footer.Link>
              <Footer.Link href='/sponsors'>Sponsors</Footer.Link>
              <Footer.Link href='/press'>Press & Media</Footer.Link>
              <Footer.Link href='/accessibility'>Accessibility Statement</Footer.Link>
              <Footer.Link href='/legal'>Legal</Footer.Link>
            </Footer.Column>
          </Footer.NavGrid>
        </div>

        <Footer.Divider />
        <Footer.BottomBar>
          <Footer.LegalLinks>
            <Footer.Link href='/legal/tos'>Terms of Service</Footer.Link>
            <Footer.Link href='/legal/privacy'>Privacy Policy</Footer.Link>
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

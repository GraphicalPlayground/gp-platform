// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import { FooterCallToAction } from '@/components/footer';
import { BackgroundDots } from '@/components/backgrounds/dots';

export const CallToActionSection = () => {
  return (
    <section className='w-full h-screen bg-linear-to-t from-(--gp-primary)/25 to-transparent'>
      <BackgroundDots className='relative w-full h-full' dotColor='rgba(0,0,0,.15)' dotSize={10}>
        <div className='flex flex-col justify-end w-full h-full'>
          <div className='sticky bottom-0 w-full z-10'>
            <FooterCallToAction title='Start learning today' />
          </div>
          <div className='absolute flex flex-col h-full justify-center text-[max(0.5px,0.0625*var(--scaling-factor))] ml-[3.5vw]'>
            <p>Unleash your imagination.</p>
            <p
              className='bg-size-[200%_100%] bg-linear-to-r from-black via-(--gp-pink) to-black bg-clip-text text-transparent'
              style={{ animation: '7.5s linear infinite shimmer' }}
            >
              Master your craft.
            </p>
          </div>
        </div>
      </BackgroundDots>
    </section>
  );
};

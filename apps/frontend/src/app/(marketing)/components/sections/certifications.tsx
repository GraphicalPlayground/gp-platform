// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import { useRef } from 'react';
import { Link } from '@/components/link';
import { BackgroundDots } from '@/components/backgrounds/dots';
import { Marquee } from '@/components/marquee';
import { motion, useScroll, useTransform } from 'framer-motion';

export const CertificationsSection = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  });

  const boxScale = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1]);
  const boxOpacity = useTransform(scrollYProgress, [0.2, 0.5, 1], [0, 1, 1]);

  return (
    <section ref={targetRef} className='relative h-[300vh] bg-[#E4EAEA]'>
      <div className='sticky top-(--header-height) flex flex-col justify-between h-[calc(100vh-var(--header-height))] overflow-hidden md:px-[3vw] md:pt-[2vh]'>
        <BackgroundDots
          backgroundColor='rgba(35,70,76,1)'
          className='flex flex-col xl:flex-row items-center flex-1 md:rounded-[26px] overflow-hidden mx-auto w-full'
        >
          <div className='grid grid-cols-1 xl:grid-cols-[1fr_1.2fr] grow relative py-10 xl:py-8 gap-10 xl:gap-0 w-full'>
            <div className='relative px-6 xl:px-0 xl:ml-[3vw] flex flex-col justify-center gap-y-6 xl:gap-y-[max(0.5px,0.0208333*var(--scaling-factor))]'>
              <div>
                <p className='text-xs sm:text-sm xl:text-xl mb-4 xl:mb-10 uppercase text-white opacity-80'>
                  CERTIFICATIONS
                </p>
                <h2 className='text-3xl sm:text-5xl xl:text-8xl font-light text-white'>
                  Build the skills studios are looking for
                </h2>
              </div>
              <div className='w-full xl:w-[90%]'>
                <p className='text-sm sm:text-base xl:text-xl text-white leading-relaxed xl:leading-10 mb-8 xl:mb-13 opacity-90'>
                  Get certified through rigorous, project-based learning. We focus on the practical graphics engineering
                  skills required in today's industry, helping you prepare for technical roles in gaming and visual
                  effects.
                </p>
                <Link
                  href='/enterprise'
                  className='inline-flex w-fit text-sm xl:text-base text-black bg-white px-8 py-4 xl:px-6 xl:py-3 rounded-full no-underline hover:bg-white/90 transition-colors duration-200'
                >
                  <span className='mt-1'>View Certifications</span>
                </Link>
              </div>
            </div>

            <div className='flex items-center justify-center xl:justify-end px-6 xl:px-0 xl:mr-10 2xl:mr-20 h-full min-h-62.5 xl:min-h-0'>
              <motion.div
                style={{ scale: boxScale, opacity: boxOpacity }}
                className='relative w-full max-w-360 max-h-100 xl:max-h-none rounded-[24px] xl:rounded-[34px] overflow-hidden border border-white/30 bg-white/10 backdrop-blur-2xl aspect-video'
              >
                <div className='absolute inset-0 bg-linear-to-br from-white/20 via-white/5 to-transparent' />
              </motion.div>
            </div>
          </div>
        </BackgroundDots>

        <Marquee
          fadeColor='#E4EAEA'
          className='h-24 md:h-28 xl:h-36'
          brandIcons={[...Array.from({ length: 10 }, (_) => '/images/brands/brand-epitech.svg')]}
        />
      </div>
    </section>
  );
};

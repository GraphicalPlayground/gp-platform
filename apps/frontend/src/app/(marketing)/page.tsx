// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import { useRef } from 'react';
import { HighLighted } from '@/components/highlighted';
import { Link } from '@/components/link';
import { BackgroundDots } from '@/components/backgrounds/dots';
import { Marquee } from '@/components/marquee';
import { motion, useScroll, useTransform } from 'framer-motion';

export function StickyScrollSection() {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  });

  const boxScale = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1]);
  const boxOpacity = useTransform(scrollYProgress, [0.2, 0.5, 1], [0, 1, 1]);

  return (
    <section ref={targetRef} className='relative h-[300vh] bg-[#E4EAEA]'>
      <div className='sticky top-(--header-height) flex flex-col justify-between h-screen overflow-hidden md:px-[3vw] md:py-[2vw]'>
        <BackgroundDots
          backgroundColor='rgba(35,70,76,1)'
          className='flex flex-col lg:flex-row items-center flex-1 md:rounded-[26px] overflow-hidden'
        >
          <div className='grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] grow relative py-10 lg:py-8 gap-10 lg:gap-0 w-full'>
            <div className='relative px-6 lg:px-0 lg:ml-[3vw] flex flex-col justify-center gap-y-6 lg:gap-y-[max(0.5px,0.0208333*var(--scaling-factor))]'>
              <div>
                <p className='text-xs sm:text-sm lg:text-xl mb-4 lg:mb-10 uppercase text-white opacity-80'>
                  CERTIFICATIONS
                </p>
                <h2 className='text-3xl sm:text-5xl lg:text-8xl font-light text-white'>
                  Build the skills studios are looking for
                </h2>
              </div>
              <div className='w-full lg:w-[90%]'>
                <p className='text-sm sm:text-base lg:text-xl text-white leading-relaxed lg:leading-10 mb-8 lg:mb-13 opacity-90'>
                  Get certified through rigorous, project-based learning. We focus on the practical graphics engineering
                  skills required in today's industry, helping you prepare for technical roles in gaming and visual
                  effects.
                </p>
                <Link
                  href='/enterprise'
                  className='inline-flex w-fit text-sm lg:text-base text-black bg-white px-8 py-4 lg:px-6 lg:py-3 rounded-full no-underline hover:bg-white/90 transition-colors duration-200'
                >
                  <span className='mt-1'>View Certifications</span>
                </Link>
              </div>
            </div>

            <div className='flex items-center justify-center lg:justify-end px-6 lg:px-0 lg:mr-20 h-full min-h-62.5 lg:min-h-0'>
              <motion.div
                style={{ scale: boxScale, opacity: boxOpacity }}
                className='relative w-full h-full max-h-100 lg:max-h-none rounded-[24px] lg:rounded-[34px] overflow-hidden border border-white/30 bg-white/10 backdrop-blur-2xl aspect-video'
              >
                <div className='absolute inset-0 bg-linear-to-br from-white/20 via-white/5 to-transparent' />
              </motion.div>
            </div>
          </div>
        </BackgroundDots>

        <Marquee
          fadeColor='#E4EAEA'
          brandIcons={[...Array.from({ length: 10 }, (_) => '/images/brands/brand-epitech.svg')]}
        />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <div className='relative top-0 flex min-h-100 md:min-h-150 w-full flex-col items-center bg-white px-4 md:px-6 pt-24 md:pt-32 lg:pt-48 pb-16'>
        <div className='absolute inset-0 z-0 bg-[radial-gradient(#00000020_1px,transparent_1px)] bg-size-[20px_20px] mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_80%,transparent_100%)] pointer-events-none'></div>

        <div className='relative z-0 flex flex-col items-center w-full'>
          <p className='text-center text-lg font-medium leading-[normal] max-md:text-sm inline-block bg-size-[200%_100%] bg-linear-to-r from-blue-500 via-blue-200 to-blue-500 bg-clip-text text-transparent animate-shimmer'>
            Graphical Playground is still in early development.
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
      <div className='flex flex-col md:flex-row'>
        <div className='gap-8 flex flex-col flex-1'>
          <div className='w-full h-px bg-black'></div>
          <div className='flex flex-col flex-1 justify-around px-8 gap-12 md:gap-25'>
            <div className='flex flex-col justify-start items-start gap-2'>
              <h3 className='uppercase text-[2rem]'>Discover</h3>
              <p className='max-w-60.5 text-base leading-6'>
                Break down production rendering systems into first principles. Master the mathematical foundations and
                core concepts of modern graphics engineering from scratch.
              </p>
            </div>
            <div className='flex items-end justify-between'>
              <span className='text-base uppercase text-black'>(1)</span>
              <div className='relative w-full max-w-75 flex justify-center items-center'>
                <div className='absolute w-full h-full bg-linear-to-t from-white to-transparent'></div>
                <img src='/images/shapes/shapes-1.png' alt='Shape 1' className='w-full h-full' draggable={false} />
              </div>
            </div>
          </div>
          <div className='w-full h-px bg-black'></div>
        </div>
        <div className='bg-black self-stretch w-px hidden md:block'></div>
        <div className='gap-8 flex flex-col flex-1'>
          <div className='w-full h-px bg-black'></div>
          <div className='flex flex-col flex-1 justify-around px-8 gap-12 md:gap-25'>
            <div className='flex flex-col justify-start items-start gap-2'>
              <h3 className='uppercase text-[2rem]'>Iterate</h3>
              <p className='max-w-60.5 text-base leading-6'>
                Write, compile, and run C++ and shader code directly in your browser. Leverage remote GPU nodes to test
                your engine with zero local setup.
              </p>
            </div>
            <div className='flex items-end justify-between'>
              <span className='text-base uppercase text-black'>(2)</span>
              <div className='relative w-full max-w-75 flex justify-center items-center'>
                <div className='absolute w-full h-full bg-linear-to-t from-white to-transparent'></div>
                <img src='/images/shapes/shapes-2.png' alt='Shape 2' className='w-full h-full' draggable={false} />
              </div>
            </div>
          </div>
          <div className='w-full h-px bg-black'></div>
        </div>
        <div className='bg-black self-stretch w-px hidden md:block'></div>
        <div className='gap-8 flex flex-col flex-1'>
          <div className='w-full h-px bg-black'></div>
          <div className='flex flex-col flex-1 justify-around px-8 gap-12 md:gap-25'>
            <div className='flex flex-col justify-start items-start gap-2'>
              <h3 className='uppercase text-[2rem]'>Certify</h3>
              <p className='max-w-65 text-base leading-6'>
                Validate your real-world competency through rigorous project-based assessments. Complete each curriculum
                tier to earn industry-recognized graphics engineering certificates.
              </p>
            </div>
            <div className='flex items-end justify-between'>
              <span className='text-base uppercase text-black'>(3)</span>
              <div className='relative w-full max-w-75 flex justify-center items-center'>
                <div className='absolute w-full h-full bg-linear-to-t from-white to-transparent'></div>
                <img src='/images/shapes/shapes-3.png' alt='Shape 3' className='w-full h-full' draggable={false} />
              </div>
            </div>
          </div>
          <div className='w-full h-px bg-black'></div>
        </div>
      </div>
      <StickyScrollSection />
    </>
  );
}

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import { HighLighted } from '@/components/highlighted';
import { Link } from '@/components/link';
import { Marquee } from '@/components/marquee';

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
          <div className='flex flex-col flex-1 justify-around px-8 gap-25'>
            <div className='flex flex-col justify-start items-start gap-2'>
              <h3 className='uppercase text-[2rem]'>Discover</h3>
              <p className='max-w-60.5 text-base leading-6'>
                Break down production rendering systems into first principles. Master the mathematical foundations and
                core concepts of modern graphics engineering from scratch.
              </p>
            </div>
            <div className='flex items-end justify-between'>
              <span className='text-base uppercase text-black'>(1)</span>
              <div className='relative w-75 flex justify-center items-center'>
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
          <div className='flex flex-col flex-1 justify-around px-8 gap-25'>
            <div className='flex flex-col justify-start items-start gap-2'>
              <h3 className='uppercase text-[2rem]'>Iterate</h3>
              <p className='max-w-60.5 text-base leading-6'>
                Write, compile, and run C++ and shader code directly in your browser. Leverage remote GPU nodes to test
                your engine with zero local setup.
              </p>
            </div>
            <div className='flex items-end justify-between'>
              <span className='text-base uppercase text-black'>(2)</span>
              <div className='relative w-75 flex justify-center items-center'>
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
          <div className='flex flex-col flex-1 justify-around px-8 gap-25'>
            <div className='flex flex-col justify-start items-start gap-2'>
              <h3 className='uppercase text-[2rem]'>Certify</h3>
              <p className='max-w-65 text-base leading-6'>
                Validate your real-world competency through rigorous project-based assessments. Complete each curriculum
                tier to earn industry-recognized graphics engineering certificates.
              </p>
            </div>
            <div className='flex items-end justify-between'>
              <span className='text-base uppercase text-black'>(3)</span>
              <div className='relative w-75 flex justify-center items-center'>
                <div className='absolute w-full h-full bg-linear-to-t from-white to-transparent'></div>
                <img src='/images/shapes/shapes-3.png' alt='Shape 3' className='w-full h-full' draggable={false} />
              </div>
            </div>
          </div>
          <div className='w-full h-px bg-black'></div>
        </div>
      </div>

      <div className='bg-white w-full xl:py-26 md:py-18 py-12'>
        <div className='flex flex-col justify-start items-center xl:gap-8 md:gap-6 gap-4'>
          <h2 className='text-base uppercase leading-6'>Trusted by</h2>
          <Marquee brandIcons={[...Array.from({ length: 10 }, (_) => '/images/brands/brand-epitech.svg')]} />
        </div>
      </div>
    </>
  );
}

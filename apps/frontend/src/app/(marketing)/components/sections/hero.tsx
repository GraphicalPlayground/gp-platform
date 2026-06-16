// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { HighLighted } from '@/components/highlighted';

export const HeroSection = () => {
  return (
    <section className='relative top-0 flex min-h-100 md:min-h-150 w-full flex-col items-center bg-white px-4 md:px-6 pt-24 md:pt-32 lg:pt-48 pb-16'>
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
    </section>
  );
};

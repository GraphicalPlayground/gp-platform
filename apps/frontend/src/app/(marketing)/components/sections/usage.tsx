// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

export const UsageSection = () => {
  return (
    <section className='flex flex-col md:flex-row'>
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
    </section>
  );
};

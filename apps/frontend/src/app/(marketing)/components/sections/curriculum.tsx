// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import { useRef, useEffect, useState } from 'react';
import { Button } from '@gp/react';
import { Link } from '@/components/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { __HAS_WAITLIST__, __SIGN_IN_URL__, __WAITLIST_URL__ } from '@/utils/env';
import { useRouter } from 'next/navigation';

const CAROUSEL_ITEMS = [
  { id: 1, title: 'Foundations', color: 'bg-red-500', image: '/images/storyset/Formula-amico.svg' },
  { id: 2, title: 'Computer Graphics Fundamentals', color: 'bg-blue-500', image: '/images/storyset/Create-amico.svg' },
  { id: 3, title: 'Shader Programming', color: 'bg-pink-500', image: '/images/storyset/Collab-amico.svg' },
  {
    id: 4,
    title: 'Real-Time Rendering Pipelines',
    color: 'bg-purple-500',
    image: '/images/storyset/metaverso-amico.svg'
  },
  { id: 5, title: 'Engine Architecture', color: 'bg-cyan-500', image: '/images/storyset/Launching-amico.svg' },
  { id: 6, title: 'Advanced Rendering', color: 'bg-emerald-500', image: '/images/storyset/Innovation-amico.svg' },
  { id: 7, title: 'GPU Optimization', color: 'bg-teal-500', image: '/images/storyset/Learning-amico.svg' },
  { id: 8, title: 'Specialized Tracks', color: 'bg-yellow-500', image: '/images/storyset/Select player-amico.svg' }
];

export const CurriculumSection = ({ items = CAROUSEL_ITEMS }) => {
  const targetRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  });

  const carouselScroll = useTransform(scrollYProgress, [0.1, 0.9], ['calc(0% + 0vw)', 'calc(-100% + 100vw)']);

  return (
    <section ref={targetRef} className={`${isDesktop ? 'h-[400vh]' : 'h-auto'} relative`}>
      <div
        className={`${isDesktop ? 'sticky top-(--header-height,0px) h-[calc(100vh-var(--header-height,0))]' : 'h-auto flex-col'} overflow-hidden flex flex-col w-full`}
      >
        <div className='bg-[#FAFAFA] shrink-0 py-8 px-6 md:py-12 md:px-[4vw] lg:py-[4vw] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12'>
          <div className='w-full'>
            <h2 className='text-4xl md:text-5xl lg:text-[72px] font-light leading-tight md:leading-none'>
              Comprehensive curriculum, from beginner to advanced
            </h2>
          </div>

          <div className='w-full flex flex-col gap-6 lg:pl-12'>
            <p className='text-base lg:text-lg leading-[1.6] text-gray-700'>
              Master computer graphics concepts step-by-step. Start with the basics of 2D rendering and linear algebra,
              then progress to advanced 3D techniques, shaders, and GPU programming.
            </p>
            <div className='flex flex-col h-full items-start sm:flex-row sm:items-center gap-4 mt-auto'>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  if (__HAS_WAITLIST__) {
                    router.push(__WAITLIST_URL__);
                  } else {
                    router.push(__SIGN_IN_URL__);
                  }
                }}
                className='rounded-full text-base px-8 py-6 w-full sm:w-auto'
                variant='secondary'
              >
                Start Learning
              </Button>
              <Link
                href='/curriculum'
                className='text-base px-8 py-6 w-full sm:w-auto flex items-center justify-center sm:justify-start'
              >
                Explore Curriculum
                <Link.Icon />
              </Link>
            </div>
          </div>
        </div>

        <div
          className={`bg-[#E4EAEA] grow flex h-full items-center w-full py-8 lg:py-0 ${isDesktop ? 'overflow-hidden' : 'overflow-x-auto no-scrollbar'}`}
        >
          <motion.div
            className='flex flex-row gap-4 md:gap-6 lg:gap-[2vw] px-6 md:px-[4vw] w-max'
            style={{ x: isDesktop ? carouselScroll : 0 }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className={`aspect-video w-[80vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] shrink-0 rounded-(--corner-radius,24px) ${item.color} flex items-center justify-center`}
              >
                <div className='w-full h-full flex justify-between flex-row px-[4vw] py-[2vw] items-center relative'>
                  <h3 className='text-white text-xl md:text-2xl w-[70%]'>{item.title}</h3>
                  <img src={item.image} alt={item.title} className='w-full h-full object-cover' />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import { useRef, useState, useEffect } from 'react';
import { Link } from '@/components/link';
import { BackgroundDots } from '@/components/backgrounds/dots';
import { Marquee } from '@/components/marquee';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useUser } from '@clerk/nextjs';

export const CertificationsSection = () => {
  const targetRef = useRef(null);
  const { isLoaded, isSignedIn, user } = useUser();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  });

  const boxScale = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1]);
  const boxOpacity = useTransform(scrollYProgress, [0.2, 0.5, 1], [0, 1, 1]);
  const boxRotateY = useTransform(scrollYProgress, [0.2, 0.5, 1], [15, 0, -5]);
  const boxRotateX = useTransform(scrollYProgress, [0.2, 0.5, 1], [-10, 0, 5]);
  const boxY = useTransform(scrollYProgress, [0.2, 0.5, 1], [100, 0, -30]);
  const boxBlur = useTransform(scrollYProgress, [0.2, 0.5], [10, 0]);

  const authorizedSignatureAuthors = [
    'Mallory Scotton',
    'Hugo Cathelain',
    'Nathan Fievet',
    'Raphaël Ostier',
    'Ossan Msoili'
  ];
  const [randomAuthor, setRandomAuthor] = useState('');
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const author = authorizedSignatureAuthors[Math.floor(Math.random() * authorizedSignatureAuthors.length)];
    setRandomAuthor(author!);

    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    setFormattedDate(today.toLocaleDateString('en-US', options));
  }, []);

  const certificateName = isLoaded && isSignedIn && user.fullName ? user.fullName : 'Jane Doe';

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

            <div
              className='flex items-center justify-center xl:justify-end px-6 xl:px-0 xl:mr-10 2xl:mr-20 h-full min-h-62.5 xl:min-h-0'
              style={{ perspective: '1000px' }}
            >
              <motion.div
                style={{
                  scale: boxScale,
                  opacity: boxOpacity,
                  rotateY: boxRotateY,
                  rotateX: boxRotateX,
                  y: boxY,
                  filter: boxBlur
                }}
                className='relative w-full max-w-360 max-h-100 xl:max-h-none rounded-[24px] xl:rounded-[34px] overflow-hidden border border-white/30 bg-white/10 backdrop-blur-2xl aspect-video'
              >
                <style>{`
                  @keyframes shimmer-overlay {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                  }
                  .shimmer-overlay {
                    animation: shimmer-overlay 3s infinite;
                  }
                `}</style>
                <div className='absolute inset-0 bg-linear-to-br from-white/20 via-white/5 to-transparent' />
                <div className='shimmer-overlay absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent pointer-events-none' />
                <motion.div
                  className='relative z-10 h-full flex flex-col justify-between px-6 py-6 2xl:py-10 md:px-10 lg:px-16 select-none'
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, margin: '-10% 0px' }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.15,
                        delayChildren: 0.3
                      }
                    }
                  }}
                >
                  <motion.div className='flex justify-between items-start'>
                    <img
                      src='/images/logo-long-text-white.svg'
                      alt='Company Logo'
                      className='h-4 md:h-6 xl:h-5 2xl:h-8 opacity-90'
                    />
                    <span className='text-white/60 text-[10px] md:text-sm tracking-widest uppercase font-medium'>
                      Verified Certificate
                    </span>
                  </motion.div>

                  <motion.div className='text-center mt-auto mb-auto space-y-2 md:space-y-4'>
                    <p className='text-white/70 text-[10px] md:text-sm uppercase tracking-[0.2em]'>
                      Proudly Presented To
                    </p>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl 2xl:text-6xl font-serif text-white tracking-wide border-b border-white/20 inline-block px-6 pb-2 md:pb-4'>
                      {certificateName}
                    </h1>
                    <p className='text-white/60 text-xs md:text-base max-w-md mx-auto pt-2'>
                      For demonstrating exceptional mastery and successfully completing the required curriculum.
                    </p>
                  </motion.div>

                  <motion.div className='flex justify-between items-end border-t border-white/10 pt-4 md:pt-8'>
                    <div className='text-left'>
                      <p className='text-white/90 text-xs md:text-base font-medium'>{formattedDate}</p>
                      <p className='text-white/50 text-[9px] md:text-xs tracking-wider uppercase mt-1'>Date of Issue</p>
                    </div>

                    <div className='flex items-center justify-center'>
                      <img
                        src='/images/logo-icon-white.svg'
                        alt='Seal'
                        className='h-10 md:h-16 w-10 md:w-16 opacity-30 drop-shadow-lg'
                      />
                    </div>

                    <div className='text-right'>
                      <p className='text-white/90 font-serif italic text-sm md:text-2xl'>{randomAuthor}</p>
                      <p className='text-white/50 text-[9px] md:text-xs tracking-wider uppercase mt-1'>
                        Authorized Signature
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
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

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useEffect, useState } from 'react';
import { Link } from '@/components/link';
import { BackgroundDots } from '@/components/backgrounds/dots';

export default function NotFound() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to the center of the viewport
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Configuration for the layers
  const LAYERS_COUNT = 6;

  return (
    <BackgroundDots dotSize={12} dotColor='rgba(0,0,0,0.05)' className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-neutral-50 text-black'>
      <div className='absolute top-24 md:top-32 z-50 text-center px-4 flex flex-col items-center'>
        <h1 className='text-5xl md:text-6xl lg:text-7xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-neutral-900 to-neutral-500 pb-2'>
          Looks like you got caught
          <br />
          in an infinite loop.
        </h1>
        <p className='mt-6 text-lg font-light md:text-xl text-neutral-500 max-w-lg font-medium'>
          The page you&apos;re looking for has been moved to another dimension, or simply doesn&apos;t exist.
        </p>
      </div>

      <div className='relative flex items-center justify-center w-full h-full'>
        {Array.from({ length: LAYERS_COUNT }).map((_, index) => {
          const offsetMultiplier = (index + 1) * 0.01;

          const translateX = mousePos.x * offsetMultiplier;
          const translateY = mousePos.y * offsetMultiplier;

          const opacity = 1 - index * 0.15;

          const transitionDuration = 100 + index * 100;

          const blur = index * 1.5;

          return (
            <div
              key={index}
              className='absolute inset-0 flex items-center justify-center ease-out'
              style={{
                transform: `translate(${translateX}px, ${translateY}px)`,
                opacity: opacity,
                zIndex: LAYERS_COUNT - index,
                transition: `transform ${transitionDuration}ms ease-out`,
                filter: `blur(${blur}px)`
              }}
            >
              <svg
                width='488'
                height='309'
                viewBox='0 0 488 309'
                className='w-sm h-sm md:w-md md:h-md lg:w-lg lg:h-lg xl:w-xl xl:h-xl 2xl:w-2xl 2xl:h-2xl drop-shadow-2xl'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M217 234.5V301C217 305.418 220.582 309 225 309H250C254.418 309 258 305.418 258 301V209C258 192.431 271.431 179 288 179H464C468.418 179 472 175.418 472 171V146C472 141.582 468.418 138 464 138H315.5C309.149 138 304 132.851 304 126.5C304 123.84 304.903 121.391 306.419 119.443L381.301 45.8569C384.452 42.7601 384.496 37.6949 381.4 34.5436L363.176 15.9991C360.079 12.8478 355.014 12.8036 351.863 15.9004L274.633 91.7936C273.088 92.5656 271.345 93 269.5 93C263.149 93 258 87.8513 258 81.5V14C258 9.58172 254.418 6 250 6H225C220.582 6 217 9.58172 217 14V108C217 124.569 203.569 138 187 138H8C3.58172 138 0 141.582 0 146V171C0 175.418 3.58171 179 7.99998 179H158.5C164.851 179 170 184.149 170 190.5C170 192.059 169.69 193.545 169.128 194.9C168.825 195.633 168.326 196.261 167.761 196.817L94.3393 268.968C91.188 272.065 91.1438 277.13 94.2406 280.281L112.464 298.826C115.561 301.977 120.626 302.021 123.778 298.924L196.147 227.807L198.972 225.031C200.826 223.75 203.075 223 205.5 223C211.851 223 217 228.149 217 234.5Z'
                  fill='var(--gp-pink)'
                />
              </svg>
            </div>
          );
        })}
      </div>

      <div className='absolute bottom-24 z-50'>
        <Link
          href='/'
          className='group relative inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-8 py-4 text-sm font-medium text-white transition-all hover:bg-neutral-800 shadow-xl shadow-neutral-900/20 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 focus:ring-offset-neutral-50'
        >
          Return to Home
        </Link>
      </div>
    </BackgroundDots>
  );
}

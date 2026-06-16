// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from './link';

export interface UnderConstructionProps {
  message?: string;
}

export const UnderConstruction: React.FC<UnderConstructionProps> = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className='relative max-w-4xl w-full flex flex-col justify-center items-center py-10 px-16 bg-white border shadow-lg rounded-3xl overflow-hidden'
    >
      <motion.div
        className='under-construction-bg absolute inset-0 w-full max-h-full'
        animate={{ backgroundPosition: ['0px 0px', '24px 24px'] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
      />

      <div className='relative z-10 flex flex-col items-center gap-3'>
        <span className='text-center text-xl text-[#F36B16] tracking-wide'>
          {message || 'This page is under construction.'}
        </span>
        <span className='text-center text-gray-600 text-sm'>
          We are working hard to bring you this content. Please check back later or explore other sections of our
          website.
        </span>
        <Link
          href='/'
          className='mt-4 px-6 py-2 bg-[#F36B16] text-white rounded-lg hover:bg-[#e55a0f] transition-colors duration-300'
        >
          Go to Homepage
        </Link>
      </div>
    </motion.div>
  );
};

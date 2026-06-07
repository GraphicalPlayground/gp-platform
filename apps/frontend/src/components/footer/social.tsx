// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { cn } from '@/utils/cn';
import { Link } from '@gp/react';
import type { LinkProps } from '@gp/react';

export interface FooterSocialProps extends React.HTMLAttributes<HTMLUListElement> {}

export const FooterSocial: React.FC<FooterSocialProps> = ({ className, children, ...rest }) => {
  return (
    <ul className={cn('flex items-center flex-row flex-wrap gap-2 p-0 m-0', className)} {...rest}>
      {children}
    </ul>
  );
};

export interface FooterSocialIconProps extends LinkProps {
  href: string;
  icon: 'facebook' | 'twitter' | 'tiktok' | 'instagram' | 'youtube';
}

export const FooterSocialIcon: React.FC<FooterSocialIconProps> = ({ className, href, icon, ...rest }) => {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          'w-6 h-6 flex outline-none justify-center items-center text-white hover:text-white/75',
          className
        )}
        {...rest}
      >
        {icon === 'youtube' && (
          <svg xmlns='http://www.w3.org/2000/svg' xmlSpace='preserve' viewBox='0 0 192 192'>
            <path
              fill='currentColor'
              d='M180.3 53.4c-2-7.6-8-13.6-15.6-15.7C151 34 96 34 96 34s-55 0-68.8 3.7c-7.6 2-13.5 8-15.6 15.7C8 67.2 8 96 8 96s0 28.8 3.7 42.6c2 7.6 8 13.6 15.6 15.7C41 158 96 158 96 158s55 0 68.8-3.7c7.6-2 13.5-8 15.6-15.7C184 124.8 184 96 184 96s0-28.8-3.7-42.6M78 122.2V69.8L124 96z'
            ></path>
          </svg>
        )}

        {icon === 'twitter' && (
          <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none'>
            <path
              fill='currentColor'
              d='m.036 0 5.782 7.73L0 14.017h1.31l5.093-5.503 4.116 5.503h4.456L8.868 5.851 14.284 0h-1.31L8.283 5.068 4.493 0zm1.926.965H4.01l9.04 12.087h-2.047z'
            ></path>
          </svg>
        )}

        {icon === 'instagram' && (
          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'>
            <path
              fill='currentColor'
              fillRule='evenodd'
              d='M11.998 4.005c2.172 0 2.444.01 3.297.048.851.039 1.432.174 1.941.372a3.9 3.9 0 0 1 1.417.922c.444.445.718.891.922 1.417.198.509.333 1.09.372 1.941.039.853.048 1.126.048 3.298s-.01 2.444-.048 3.297c-.039.851-.174 1.433-.372 1.941a3.9 3.9 0 0 1-.922 1.417c-.445.444-.891.718-1.417.922-.509.198-1.09.333-1.941.372-.853.039-1.126.048-3.297.048-2.173 0-2.445-.01-3.298-.048-.851-.039-1.432-.174-1.941-.372a3.9 3.9 0 0 1-1.417-.922 3.9 3.9 0 0 1-.922-1.417c-.198-.508-.333-1.09-.372-1.941C4.01 14.447 4 14.174 4 12.003s.01-2.445.048-3.298c.039-.851.174-1.432.372-1.941a3.9 3.9 0 0 1 .922-1.417 3.9 3.9 0 0 1 1.417-.922c.509-.198 1.09-.333 1.941-.372.853-.039 1.125-.048 3.298-.048m0 1.441c-2.136 0-2.389.008-3.232.047-.78.035-1.203.166-1.485.275-.374.145-.64.318-.92.598s-.453.547-.598.92c-.11.282-.24.705-.275 1.485-.039.843-.047 1.096-.047 3.232 0 2.135.008 2.388.047 3.231.035.78.165 1.203.275 1.485.145.373.318.64.598.92s.546.453.92.598c.282.11.705.24 1.485.275.843.039 1.096.047 3.232.047 2.135 0 2.388-.008 3.231-.047.78-.035 1.203-.165 1.485-.275.373-.145.64-.318.92-.598s.453-.546.598-.92c.11-.282.24-.705.275-1.485.039-.843.047-1.096.047-3.231 0-2.136-.008-2.389-.047-3.232-.035-.78-.166-1.203-.275-1.485a2.5 2.5 0 0 0-.598-.92 2.5 2.5 0 0 0-.92-.598c-.282-.11-.705-.24-1.485-.275-.843-.039-1.096-.047-3.231-.047m0 9.222a2.666 2.666 0 1 0 0-5.331 2.666 2.666 0 0 0 0 5.331m0-6.772a4.107 4.107 0 1 1 0 8.213 4.107 4.107 0 0 1 0-8.213M16 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2'
              clipRule='evenodd'
            ></path>
          </svg>
        )}

        {icon === 'facebook' && (
          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'>
            <path
              fill='currentColor'
              fillRule='evenodd'
              d='M12 3a9 9 0 0 1 1.406 17.89v-6.288h2.097l.4-2.602h-2.497v-1.688c0-.712.349-1.406 1.467-1.406h1.135V6.691s-1.03-.175-2.015-.175c-2.056 0-3.4 1.246-3.4 3.501V12H8.31v2.602h2.285v6.289A9 9 0 0 1 12 3'
              clipRule='evenodd'
            ></path>
          </svg>
        )}

        {icon === 'tiktok' && (
          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'>
            <path
              fill='currentColor'
              d='M19 8a4 4 0 0 1-4-4h-2v10a3 3 0 1 1-1.5-2.599V9.23A5 5 0 1 0 15 14V8.473A5.98 5.98 0 0 0 19 10z'
            ></path>
          </svg>
        )}
      </Link>
    </li>
  );
};

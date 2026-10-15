// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useState } from 'react';
import styles from './social-share.module.css';

import { Text, Box, Stack, LinkedInIcon, XIcon } from '@gp/ui/components';
import { LinkIcon } from '@primer/octicons-react';
import Link from 'next/link';

/**
 * @brief Component to display a message when the link is copied to the clipboard.
 */
const CopyClip: React.FC = () => (
  <Box borderWidth='thin' padding='condensed'>
    <Text className={styles.copyText} size='100' variant='muted'>
      Link copied to clipboard
    </Text>
  </Box>
);

/**
 * @brief Props for the SocialShare component.
 */
export interface SocialShareProps {
  url: string;
}

/**
 * @brief SocialShare component for sharing articles on social media platforms.
 */
export const SocialShare: React.FC<SocialShareProps> = ({ url }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };

  return (
    <Stack direction='horizontal' justifyContent='space-between' padding='none'>
      <Text>Share</Text>
      <div className='flex items-center'>
        <div className='relative'>
          <button className={`ml-3 cursor-pointer ${styles.copyLink} ${styles.socialLink}`} onClick={copyToClipboard}>
            <LinkIcon size={16} />
            <Text as='span' className='sr-only'>
              Copy link to share
            </Text>
          </button>

          <div aria-live='polite' className='absolute bottom-0'>
            {copied === true && <CopyClip />}
          </div>
        </div>

        {/* <Link
          className={`${styles.socialLink} flex items-center ml-3`}
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          rel='noopener noreferrer'
        >
          <Text as='span' className='sr-only'>
            Share on Facebook
          </Text>
          <Facebook />
        </Link> */}
        <Link
          className={`${styles.socialLink} flex items-center ml-3`}
          href={`https://x.com/intent/tweet?url=${url}`}
          rel='noopener noreferrer'
        >
          <Text as='span' className='sr-only'>
            Share on X
          </Text>
          <XIcon />
        </Link>
        <Link
          className={`${styles.socialLink} flex items-center ml-3`}
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
          rel='noopener noreferrer'
        >
          <Text as='span' className='sr-only'>
            Share on LinkedIn
          </Text>
          <LinkedInIcon />
        </Link>
      </div>
    </Stack>
  );
};

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@gp/react';
import { Link } from './link';
import { motion, AnimatePresence } from 'framer-motion';

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('gp_cookie_consent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = { necessary: true, analytics: true, marketing: true };
    localStorage.setItem('gp_cookie_consent', JSON.stringify(consent));

    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: consent }));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const consent = { necessary: true, analytics: false, marketing: false };
    localStorage.setItem('gp_cookie_consent', JSON.stringify(consent));

    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: consent }));
    setIsVisible(false);
  };

  const handleAdvanced = () => {
    console.log('Trigger Advanced Settings Modal');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
          className='fixed bottom-0 left-0 right-0 flex items-center justify-between bg-white px-22.5 pt-6 pb-7.5 shadow-[-8px_-7px_20px_0_rgba(0,0,0,0.1)] max-[1110px]:justify-start max-[1110px]:px-7.5 max-[834px]:flex-col max-[834px]:items-end max-[834px]:pr-14 max-[750px]:px-4.5 max-[750px]:pt-4.5 max-[750px]:pb-6 max-[750px]:rounded-t-xl z-999'
        >
          <div className='max-[1110px]:w-full w-2/3'>
            <p className='text-sm leading-5'>
              We use cookies to ensure the proper functioning and security of our websites, and to offer you the best
              possible browsing experience. By clicking Accept, you consent to the use of these cookies for advertising
              and analytical purposes. You can change your cookie settings at any time. For more information, please
              read our{' '}
              <Link href='/legal/cookie' className='text-inherit underline'>
                Cookie Policy
              </Link>
              .
            </p>
          </div>
          <div className='flex gap-2 items-center h-full ml-10'>
            <Button onClick={handleAdvanced} variant='ghost' className='underline underline-offset-4 rounded-full'>
              Advanced <Link.Icon />
            </Button>
            <Button onClick={handleRejectAll} variant='outline' className='rounded-full'>
              Reject all
            </Button>
            <Button onClick={handleAcceptAll} variant='outline' className='rounded-full'>
              Accept
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import { useState, useEffect } from 'react';
import { Button, Modal, Switch } from '@gp/react';
import { Link } from './link';
import { motion, AnimatePresence } from 'framer-motion';

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [advancedCookiesEnabled, setAdvancedCookiesEnabled] = useState(false);

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

  const handleSaveAdvanced = () => {
    const consent = { necessary: true, analytics: advancedCookiesEnabled, marketing: advancedCookiesEnabled };
    localStorage.setItem('gp_cookie_consent', JSON.stringify(consent));

    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: consent }));
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
          className='fixed bottom-0 left-0 right-0 flex items-center justify-between bg-white px-22.5 pt-6 pb-7.5 shadow-[-8px_-7px_20px_0_rgba(0,0,0,0.1)] max-[1110px]:justify-start max-[1110px]:px-7.5 max-[834px]:flex-col max-[834px]:items-end max-[834px]:pr-14 max-[750px]:px-4.5 max-[750px]:pt-4.5 max-[750px]:pb-6 max-[750px]:rounded-t-xl z-888'
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
            <Modal>
              <Button onClick={handleAdvanced} variant='ghost' className='underline underline-offset-4 rounded-full'>
                Advanced <Link.Icon />
              </Button>
              <Modal.Backdrop className='z-999'>
                <Modal.Container placement='center'>
                  <Modal.Dialog className='sm:max-w-3xl'>
                    <Modal.CloseTrigger />
                    <Modal.Header>
                      <Modal.Heading className='text-2xl sm:text-3xl font-normal mb-2'>
                        Advanced Privacy Settings
                      </Modal.Heading>
                    </Modal.Header>
                    <Modal.Body className='px-1 sm:px-3 relative flex flex-col gap-6 text-black'>
                      <div className='flex flex-col sm:flex-row justify-between items-start gap-4'>
                        <div className='flex flex-col gap-2 w-full sm:max-w-[80%]'>
                          <h3 className='text-lg sm:text-xl font-normal'>Essential Cookies</h3>
                          <p className='text-sm text-gray-600'>
                            These cookies enable core functionality such as security, network management, and to provide
                            you with access to features such as your profile and purchases, member-only resources, and
                            other areas of the website. You may disable these by changing your browser settings, but
                            this may affect how the website functions.
                          </p>
                        </div>
                        <Switch aria-label='Essential cookies' isSelected={true} isDisabled>
                          <Switch.Content>
                            <Switch.Control>
                              <Switch.Thumb />
                            </Switch.Control>
                          </Switch.Content>
                        </Switch>
                      </div>
                      <hr className='border-gray-200' />
                      <div className='flex flex-col sm:flex-row justify-between items-start gap-4'>
                        <div className='flex flex-col gap-2 w-full sm:max-w-[80%]'>
                          <h3 className='text-lg sm:text-xl font-normal'>
                            Enable Performance, Marketing & Other Cookies
                          </h3>
                          <p className='text-sm text-gray-600'>
                            We recommend enabling these cookies to give you a more personalised experience. Our site
                            uses tools, such as cookies, to understand how you use services and to improve both your
                            experience and our advertising relevance. You can change your Cookie Settings at any time
                            via our{' '}
                            <Link href='/legal/cookie' className='underline'>
                              Cookie Policy
                            </Link>
                            .
                          </p>
                        </div>
                        <Switch
                          aria-label='Enable performance, marketing & other cookies'
                          isSelected={advancedCookiesEnabled}
                          onChange={setAdvancedCookiesEnabled}
                        >
                          <Switch.Content>
                            <Switch.Control>
                              <Switch.Thumb />
                            </Switch.Control>
                          </Switch.Content>
                        </Switch>
                      </div>
                    </Modal.Body>
                    <Modal.Footer className='flex flex-col sm:flex-row justify-end'>
                      <Button
                        variant='primary'
                        className='rounded-full w-full sm:w-auto px-8'
                        onClick={handleSaveAdvanced}
                      >
                        Save Preferences
                      </Button>
                    </Modal.Footer>
                  </Modal.Dialog>
                </Modal.Container>
              </Modal.Backdrop>
            </Modal>
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

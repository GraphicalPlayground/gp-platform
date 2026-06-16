import { env } from '~env';

export const __IS_PRE_RELEASE__ = true;
export const __DEV__ = env.NEXT_PUBLIC_APP_ENV === 'development';
export const __PREVIEW__ = env.NEXT_PUBLIC_APP_ENV === 'preview';
export const __PROD__ = env.NEXT_PUBLIC_APP_ENV === 'production';

const getBaseURL = (): URL => {
  // default - dev
  let host = 'localhost:3000';

  // preview
  if (__PREVIEW__) host = 'staging.graphical-playground.com';

  // production
  if (__PROD__) host = 'graphical-playground.com';

  // protocol
  const protocol = host.startsWith('localhost') ? 'http' : 'https';

  return new URL(`${protocol}://${host}`);
};

export const __BASE_URL__ = getBaseURL();
export const __CDN_URL__ = env.NEXT_PUBLIC_CDN_URL;

export const __SIGN_IN_URL__ = env.NEXT_PUBLIC_CLERK_SIGN_IN_URL;
export const __SIGN_UP_URL__ = env.NEXT_PUBLIC_CLERK_SIGN_UP_URL;
export const __WAITLIST_URL__ = env.NEXT_PUBLIC_CLERK_WAITLIST_URL;

export const __HAS_WAITLIST__ = env.NEXT_PUBLIC_WAITLIST_MODE === 'true';

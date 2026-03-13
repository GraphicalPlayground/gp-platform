export { metadata } from './metadata';

import { SiteLayout } from '@/layouts/site-layout';

import './globals.css';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className='graphical' data-theme='graphical' lang='en-US'>
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}

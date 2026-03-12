export { metadata } from './metadata';
import { Navbar } from '@/components/navbar';

import './globals.css';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className='graphical' data-theme='graphical' lang='en-US'>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

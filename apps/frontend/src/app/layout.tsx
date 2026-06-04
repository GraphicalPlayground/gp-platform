import './globals.css';

export { metadata } from './metadata';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='h-full antialiased'>
      <body className='min-h-full flex flex-col'>{children}</body>
    </html>
  );
}

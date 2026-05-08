import Link from 'next/link';
import { Button, Container, Typography } from '@gp/ui';

export default function Home() {
  return (
    <main className='flex-1'>
      {/* Hero Section */}
      <section className='relative overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-40'>
        <Container className='relative z-10'>
          <div className='mx-auto max-w-3xl text-center'>
            <Typography variant='h1' className='mb-6 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl'>
              Master Graphical Engineering by <span className='text-indigo-600'>Doing</span>
            </Typography>
            <Typography variant='p' className='mb-10 text-xl text-slate-600 dark:text-slate-400 sm:text-2xl'>
              An interactive playground to learn, experiment, and visualize complex graphical concepts. Built for
              students and creators.
            </Typography>
            <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
              <Link href='/register'>
                <Button size='xl' className='w-full sm:w-auto'>
                  Get Started for Free
                </Button>
              </Link>
              <Link href='/playground'>
                <Button variant='outline' size='xl' className='w-full sm:w-auto'>
                  Explore Playground
                </Button>
              </Link>
            </div>
          </div>
        </Container>

        {/* Decorative background elements */}
        <div className='absolute top-0 -z-10 h-full w-full opacity-30 dark:opacity-20'>
          <div className='absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-400 blur-[120px] dark:bg-indigo-900'></div>
          <div className='absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-400 blur-[120px] dark:bg-purple-900'></div>
        </div>
      </section>

      {/* Features Section */}
      <section className='bg-slate-50 py-24 dark:bg-zinc-950'>
        <Container>
          <div className='grid gap-12 md:grid-cols-3'>
            <div className='space-y-4'>
              <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600 text-white'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='m8 3 4 8 5-5 5 15H2L8 3z' />
                </svg>
              </div>
              <Typography variant='h3'>Interactive Playgrounds</Typography>
              <Typography variant='p' className='text-slate-600 dark:text-slate-400'>
                Real-time visualization of shaders, geometry, and rendering pipelines.
              </Typography>
            </div>
            <div className='space-y-4'>
              <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600 text-white'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z' />
                  <path d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z' />
                  <path d='M8 6h10' />
                  <path d='M8 10h10' />
                  <path d='M8 14h10' />
                </svg>
              </div>
              <Typography variant='h3'>Structured Learning</Typography>
              <Typography variant='p' className='text-slate-600 dark:text-slate-400'>
                Progressive courses from basics to advanced graphical engineering.
              </Typography>
            </div>
            <div className='space-y-4'>
              <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600 text-white'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <polyline points='16 18 22 12 16 6' />
                  <polyline points='8 6 2 12 8 18' />
                </svg>
              </div>
              <Typography variant='h3'>Code-First Approach</Typography>
              <Typography variant='p' className='text-slate-600 dark:text-slate-400'>
                Directly manipulate parameters and see instant results in the browser.
              </Typography>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

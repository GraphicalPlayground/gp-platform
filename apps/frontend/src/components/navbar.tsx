'use client';

import Link from 'next/link';
import { Button } from '@gp/ui';
import { useAuth } from '@/providers/auth-provider';

export function Navbar() {
  const { user, logout, isLoading } = useAuth();

  return (
    <nav className='sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-black/80'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center gap-8'>
          <Link href='/' className='flex items-center gap-2'>
            <span className='text-xl font-bold tracking-tight text-slate-900 dark:text-white'>
              Graphical<span className='text-indigo-600'>Playground</span>
            </span>
          </Link>
          <div className='hidden md:flex md:items-center md:gap-6'>
            <Link href='/courses' className='text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400'>
              Courses
            </Link>
            <Link href='/playground' className='text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400'>
              Playground
            </Link>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          {!isLoading && (
            <>
              {user ? (
                <div className='flex items-center gap-4'>
                  <span className='text-sm font-medium text-slate-700 dark:text-slate-300'>
                    {user.pseudo}
                  </span>
                  {user.role === 'admin' && (
                    <a href={process.env.NEXT_PUBLIC_ADMIN_URL ?? 'http://localhost:3000'} target='_blank' rel='noreferrer'>
                      <Button variant='outline' size='sm'>
                        Admin
                      </Button>
                    </a>
                  )}
                  <Button variant='ghost' size='sm' onClick={logout}>
                    Log out
                  </Button>
                </div>
              ) : (
                <>
                  <Link href='/login'>
                    <Button variant='ghost' size='sm'>
                      Log in
                    </Button>
                  </Link>
                  <Link href='/register'>
                    <Button variant='primary' size='sm'>
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

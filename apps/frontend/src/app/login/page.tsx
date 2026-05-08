'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@gp/ui';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1';

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ identifier, password })
      });

      const data = await response.json();

      if (response.ok && data.data) {
        const { user, accessToken } = data.data;
        Cookies.set('auth', JSON.stringify(user), { expires: 30, path: '/' });
        Cookies.set('token', accessToken, { expires: 30, path: '/' });
        router.push('/');
        router.refresh();
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1 text-center'>
          <CardTitle className='text-2xl'>Welcome back</CardTitle>
          <CardDescription>Enter your email and password to log in to your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className='grid gap-4'>
            <Input
              label='Email or Pseudo'
              placeholder='m@example.com or your_pseudo'
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
            <Input
              label='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className='text-sm text-red-600'>{error}</p>}
          </CardContent>
          <CardFooter className='flex flex-col gap-4'>
            <Button className='w-full' type='submit' disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log in'}
            </Button>
            <div className='text-center text-sm'>
              Don&apos;t have an account?{' '}
              <Link href='/register' className='text-indigo-600 hover:underline dark:text-indigo-400'>
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

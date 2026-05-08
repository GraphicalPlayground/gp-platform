'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@gp/ui';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, pseudo, password })
      });

      const data = await response.json();

      if (response.ok && data.data) {
        const { user, accessToken } = data.data;
        Cookies.set('auth', JSON.stringify(user), { expires: 30, path: '/' });
        Cookies.set('token', accessToken, { expires: 30, path: '/' });
        router.push('/');
        router.refresh();
      } else {
        setError(data.message || 'Failed to register');
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
          <CardTitle className='text-2xl'>Create an account</CardTitle>
          <CardDescription>Enter your information below to create your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className='grid gap-4'>
            <Input
              label='Pseudo'
              placeholder='Your nickname'
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              required
            />
            <Input
              label='Email'
              type='email'
              placeholder='m@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              hint='At least 8 characters'
            />
            {error && <p className='text-sm text-red-600'>{error}</p>}
          </CardContent>
          <CardFooter className='flex flex-col gap-4'>
            <Button className='w-full' type='submit' disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
            <div className='text-center text-sm'>
              Already have an account?{' '}
              <Link href='/login' className='text-indigo-600 hover:underline dark:text-indigo-400'>
                Log in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

import { SignUpForm } from '@/components/refine-ui/form/sign-up-form';
import { authProviderServer } from '@providers/auth-provider/auth-provider.server';
import { redirect } from 'next/navigation';

export default async function Register() {
  const data = await getData();

  if (data.authenticated) {
    redirect(data?.redirectTo || '/');
  }

  return <SignUpForm />;
}

async function getData() {
  const { authenticated, redirectTo, error } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo,
    error
  };
}

import { ForgotPasswordForm } from '@/components/refine-ui/form/forgot-password-form';
import { authProviderServer } from '@providers/auth-provider/auth-provider.server';
import { redirect } from 'next/navigation';

export default async function ForgotPassword() {
  const data = await getData();

  if (data.authenticated) {
    redirect(data?.redirectTo || '/');
  }

  return <ForgotPasswordForm />;
}

async function getData() {
  const { authenticated, redirectTo, error } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo,
    error
  };
}

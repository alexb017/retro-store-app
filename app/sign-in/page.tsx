import SignIn from '@/app/sign-in/sign-in';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in page',
};

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
      <SignIn />
    </div>
  );
}

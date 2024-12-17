import SignUp from '@/app/sign-up/sign-up';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Sign up for an account',
};

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
      <SignUp />
    </div>
  );
}

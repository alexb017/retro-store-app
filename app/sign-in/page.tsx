'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '../AuthContext';
import GoogleIcon from '@/components/icons/google';
import UserIcon from '@/components/icons/user';
import { useRouter } from 'next/navigation';
import Footer from '@/components/footer';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SignIn() {
  const { user, googleSignIn } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6 p-5">
        {!user ? (
          <div>
            <div className="flex flex-col gap-6 items-start">
              <div className="flex flex-col gap-1">
                <h1 className="text-4xl font-medium">Welcome to Store!</h1>
                <p>Sign in with your social account.</p>
              </div>

              <button
                onClick={async () => {
                  const res = await googleSignIn();

                  if (res) {
                    router.push('/');
                  }
                }}
                className="flex items-center gap-2 text-base font-medium text-gray-500 px-4 py-2 border-2 rounded border-gray-200 hover:border-gray-300 transition-colors"
              >
                <GoogleIcon classname="w-5 h-5" />
                Sign in with Google
              </button>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  try {
                    const res = await signInWithEmailAndPassword(
                      auth,
                      email,
                      password
                    );

                    if (res) {
                      router.push('/');
                    }
                  } catch (error: any) {
                    throw new Error(error);
                  }
                }}
                className="w-full flex flex-col gap-4"
              >
                <label
                  htmlFor="email"
                  className="flex flex-col gap-1 text-sm font-medium"
                >
                  Email address
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    className="border border-gray-200 rounded-lg px-2 py-2"
                  />
                </label>
                <label
                  htmlFor="password"
                  className="flex flex-col gap-1 text-sm font-medium"
                >
                  Password
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    className="border border-gray-200 rounded-lg px-2 py-2"
                  />
                </label>
                <input
                  type="submit"
                  value="Sign in"
                  className="bg-blue-500 text-white rounded-lg py-2 cursor-pointer hover:bg-blue-600 transition-colors"
                />
              </form>

              <p className="text-sm font-medium text-gray-500">
                No account?{' '}
                <Link href="/sign-up" className="underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        ) : null}
      </div>
      <Footer />
    </>
  );
}

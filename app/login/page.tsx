'use client';

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '../AuthContext';
import GoogleIcon from '@/components/icons/google';
import UserIcon from '@/components/icons/user';
import { useRouter } from 'next/navigation';
import Footer from '@/components/footer';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const { user, googleSignIn } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div className="flex flex-col items-center p-4">
        {!user ? (
          <>
            <div className="flex flex-col items-center gap-8 w-full max-w-xs">
              <h1 className="text-3xl font-medium">Log in to Store!</h1>

              <button
                onClick={async () => {
                  try {
                    const res = await googleSignIn();

                    if (res) {
                      router.push('/');
                    }
                  } catch (error: any) {
                    if (error.code === 'auth/popup-closed-by-user') {
                      return;
                    }
                    throw new Error(error);
                  }
                }}
                className="flex items-center gap-2 w-full text-sm font-medium text-gray-500 p-4 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <GoogleIcon classname="w-5 h-5" />
                Sign in with Google
              </button>

              <form
                onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
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
                    className="w-full text-base bg-gray-100 rounded-md px-2 py-3"
                    autoComplete="email"
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
                    className="text-base bg-gray-100 rounded-md px-2 py-3"
                    autoComplete="current-password"
                  />
                </label>
                <input
                  type="submit"
                  value="Sign in"
                  className="bg-blue-500 text-white rounded-md py-3 cursor-pointer hover:bg-blue-600 transition-colors"
                />
              </form>

              <p className="text-sm font-medium text-gray-500">
                No account?{' '}
                <Link href="/sign-up" className="underline">
                  Sign up
                </Link>
              </p>
            </div>
          </>
        ) : null}
      </div>
      <Footer />
    </>
  );
}

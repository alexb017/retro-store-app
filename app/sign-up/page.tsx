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
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUp() {
  const { user, googleSignIn } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div className="flex flex-col items-center p-4">
        {!user ? (
          <>
            <div className="flex flex-col gap-8 items-center w-full max-w-xs">
              <h1 className="text-3xl font-medium">Sign up to Store!</h1>

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
                className="flex items-center justify-center gap-2 w-full text-sm font-medium text-neutral-500 p-4 rounded-md bg-neutral-200 dark:text-white dark:bg-neutral-700"
              >
                <GoogleIcon classname="w-5 h-5" />
                Sign up with Google
              </button>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  try {
                    const res = await createUserWithEmailAndPassword(
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
                    className="text-base bg-neutral-100 rounded-md px-2 py-3 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-neutral-800 dark:focus:ring-blue-800"
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
                    className="text-base bg-neutral-100 rounded-md px-2 py-3 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-neutral-800 dark:focus:ring-blue-800"
                    autoComplete="current-password"
                  />
                  <p className="text-neutral-500">
                    Password should be 6 or more characters.
                  </p>
                </label>
                <input
                  type="submit"
                  value="Create account"
                  className="bg-blue-500 text-white rounded-md py-3 cursor-pointer hover:bg-blue-600 transition-colors"
                />
              </form>

              <p className="text-sm font-medium text-neutral-500">
                Already have an account?{' '}
                <Link href="/login" className="underline">
                  Log in
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

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
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');

  return (
    <>
      <div className="flex flex-col items-center p-4 pt-8">
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
                className="flex items-center justify-center gap-2 w-full text-sm font-medium text-black p-4 rounded-md bg-neutral-100 dark:text-white dark:bg-neutral-800"
              >
                <GoogleIcon classname="w-5 h-5" />
                Sign up with Google
              </button>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  setEmailError('');
                  setPasswordError('');

                  // Validate email format
                  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                  if (email && !regex.test(email)) {
                    setEmailError('Invalid email format!');
                    return;
                  }

                  // Validate password length
                  if (password.length < 6) {
                    setPasswordError('Password must be at least 6 characters.');
                    return;
                  }

                  try {
                    const res = await createUserWithEmailAndPassword(
                      auth,
                      email,
                      password
                    );

                    if (res) {
                      router.push('/');
                    }

                    setEmailError('');
                    setPasswordError('');
                  } catch (error: any) {
                    if (error.code === 'auth/invalid-email') {
                      setEmailError('Invalid email address.');
                    } else if (error.code === 'auth/missing-email') {
                      setEmailError('Missing email address.');
                    } else if (error.code === 'auth/email-already-in-use') {
                      setEmailError('Email address already exist.');
                    } else if (error.code === 'auth/missing-password') {
                      setPasswordError('Missing password.');
                    } else {
                      setError(error.message);
                    }
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
                    type="text"
                    name="email"
                    id="email"
                    className={`text-base bg-white border rounded-md px-2 py-3 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-neutral-900 dark:focus:ring-blue-800 ${
                      emailError
                        ? 'border-red-500'
                        : 'border-neutral-200 dark:border-neutral-700'
                    }`}
                    autoComplete="email"
                  />
                  {emailError && (
                    <span className="text-red-500 text-xs">{emailError}</span>
                  )}
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
                    className={`text-base bg-white border rounded-md px-2 py-3 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-neutral-900 dark:focus:ring-blue-800 ${
                      passwordError
                        ? 'border-red-500'
                        : 'border-neutral-200 dark:border-neutral-700'
                    }`}
                    autoComplete="current-password"
                  />
                  {passwordError && (
                    <span className="text-red-500 text-xs">
                      {passwordError}
                    </span>
                  )}
                </label>
                <input
                  type="submit"
                  value="Create account"
                  className="bg-blue-500 text-white rounded-md py-3 cursor-pointer hover:bg-blue-600 transition-colors"
                />
                {error && (
                  <span className="text-red-500 text-xs text-center">
                    {error}
                  </span>
                )}
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
    </>
  );
}

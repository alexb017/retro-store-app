'use client';

import { useState, Fragment, useContext } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { AuthContext } from '@/app/AuthContext';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import CloseIcon from './icons/close';
import { useRouter } from 'next/navigation';
import GoogleIcon from './icons/google';
import SignInIcon from './icons/sign-in';
import UserIcon from './icons/user';

export default function SignIn() {
  const { googleSignIn } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? 'text-white' : 'text-white/90'}
                group inline-flex items-center rounded-full bg-gray-100 p-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
            >
              <UserIcon
                classname={`${open ? 'text-gray-500' : 'text-gray-500/70'}
                  h-5 w-5 transition duration-150 ease-in-out group-hover:text-gray-500/80`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-0 z-10 mt-3 w-screen max-w-xs px-4 sm:px-0">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                  <div className="bg-white p-4">
                    <h1 className="text-2xl font-bold">Welcome to Store!</h1>
                    <p>
                      Sign in with your social account, or with email and
                      password.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4">
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
                  </div>
                  <div className="relative flex flex-col gap-4 bg-white p-4">
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
                          className="text-base bg-gray-100 rounded-md px-2 py-3"
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
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

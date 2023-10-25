'use client';

import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '../AuthContext';
import GoogleIcon from '@/components/icons/google';
import UserIcon from '@/components/icons/user';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { user, googleSignIn, googleSignOut } = useContext(AuthContext);
  const router = useRouter();

  return (
    <div className="p-5">
      {!user ? (
        <>
          <button
            onClick={async () => {
              const res = await googleSignIn();

              if (res) {
                router.push('/');
              }
            }}
            className="flex items-center gap-2 text-base font-semibold text-gray-500 border rounded-lg border-gray-300 hover:border-gray-400 px-6 py-1 transition-colors"
          >
            <GoogleIcon classname="w-5 h-5" />
            Sign in with Google
          </button>
          {/* <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-black mt-2 bg-gray-100 border rounded-lg border-gray-200 hover:border-gray-300 px-3.5 py-1 transition-colors">
            <UserIcon classname="w-4 h-4" />
            Sign in Anonymously
          </button> */}
        </>
      ) : null}
    </div>
  );
}

/*
<>
          {user && (
            <Image
              className="rounded-full"
              src={user?.photoURL}
              alt={user?.displayName}
              width={44}
              height={44}
            />
          )}
          <h1 className="text-gray-500 text-xl">
            Welcome, {user?.displayName}!
          </h1>
          <p>{user?.uid}</p>
          <button
            onClick={async () => await googleSignOut()}
            className="text-sm border rounded-lg border-gray-300 hover:border-gray-400 px-3.5 py-1 transition-colors"
          >
            Sign out
          </button>
        </>

*/

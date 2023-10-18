'use client';

import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '../AuthContext';
import GoogleIcon from '@/components/icons/google';
import UserIcon from '@/components/icons/user';

export default function Login() {
  const { user, googleSignIn, googleSignOut } = useContext(AuthContext);
  return (
    <div className="p-5">
      {!user ? (
        <>
          <button
            onClick={async () => await googleSignIn()}
            className="flex items-center gap-2 text-sm border rounded-lg border-neutral-300 hover:border-neutral-400 px-3.5 py-1 transition-colors"
          >
            <GoogleIcon classname="w-4 h-4" />
            Sign in with Google
          </button>
          <button className="flex items-center gap-2 text-sm text-neutral-500 mt-2 bg-neutral-200 border rounded-lg border-neutral-300 hover:border-neutral-400 px-3.5 py-1 transition-colors">
            <UserIcon classname="w-4 h-4" />
            Sign in Anonymously
          </button>
        </>
      ) : (
        <>
          <h1 className="text-neutral-500 text-xl">
            Welcome, {user?.displayName}!
          </h1>
          <p>{user?.uid}</p>
          <button
            onClick={async () => await googleSignOut()}
            className="text-sm border rounded-lg border-neutral-300 hover:border-neutral-400 px-3.5 py-1 transition-colors"
          >
            Sign out
          </button>
        </>
      )}
    </div>
  );
}

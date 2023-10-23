'use client';

import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '@/app/AuthContext';
import GoogleIcon from '@/components/icons/google';

export default function ProfileName({ params }: { params: { name: string } }) {
  const { user, googleSignIn, googleSignOut } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="p-5">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <Image
              className="rounded-full"
              src={user?.photoURL}
              alt={user?.displayName}
              width={44}
              height={44}
            />
            <h1 className="text-4xl font-semibold mt-2">
              Hello, {user?.displayName}
            </h1>
            <p className="text-neutral-500">{user?.email}</p>
          </div>
          <div className="flex gap-20">
            <div className="flex flex-col">
              <h3 className="text-neutral-500">Nr. of products</h3>
              <h1 className="text-2xl font-semibold">23</h1>
            </div>
            <div className="flex flex-col">
              <h3 className="text-neutral-500">Total spend</h3>
              <h1 className="text-2xl font-semibold">$1200 USD</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

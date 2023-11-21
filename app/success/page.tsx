'use client';

import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import Link from 'next/link';

export default function Success() {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-5">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl">Thank you, {user?.displayName}! 🎉</h1>
        <Link
          href="/"
          className="text-base text-white font-medium px-6 py-2 bg-blue-500 rounded-full mt-4"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}

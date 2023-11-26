'use client';

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import Link from 'next/link';
import { getUserCart } from '@/lib/actions';

export default function Success() {
  const { user } = useContext(AuthContext);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const order = await getUserCart(user?.uid);
  //       console.log(order);
  //     } catch (error) {
  //       console.log(error);
  //       throw new Error('error');
  //     }
  //   })();
  // }, [user]);

  return (
    <div className="p-5">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl">
          Thank you, <span className="font-medium">{user?.displayName}</span>
        </h1>
        <h1 className="text-4xl">for your order! 🎉</h1>
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

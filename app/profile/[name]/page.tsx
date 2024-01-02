'use client';

import { useContext } from 'react';
import Image from 'next/image';
import { AuthContext } from '@/app/AuthContext';
import useOrderData from '@/lib/use-order-data';
import Link from 'next/link';
import UserIcon from '@/components/icons/user';

export default function ProfilePage({ params }: { params: { name: string } }) {
  const { user } = useContext(AuthContext);
  const [order] = useOrderData(user?.uid);
  const usernameFromEmail = user?.email.split('@')[0];

  return (
    <div className="w-full md:max-w-3xl mx-auto">
      <div className="p-4">
        <div className="flex flex-col items-start gap-6 px-4 sm:px-0">
          <div className="block">
            {user?.photoURL ? (
              <Image
                className="rounded-full"
                src={user?.photoURL}
                alt={user?.displayName}
                width={64}
                height={64}
              />
            ) : (
              <div className="flex items-center justify-center w-16 h-16 bg-neutral-200 rounded-full dark:bg-neutral-500">
                <UserIcon classname="w-8 h-8" />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-semibold">
              Hi, {user?.displayName ? user?.displayName : params.name}! 👋
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Personal details and order history.
            </p>
          </div>
        </div>
        <div className="mt-6 border-t border-neutral-100 dark:border-neutral-700">
          <div className="divide-y divide-neutral-100 dark:divide-neutral-700">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-sm font-medium">Full name</div>
              <div className="mt-1 text-sm text-neutral-500 sm:col-span-2 sm:mt-0 dark:text-neutral-400">
                {user?.displayName}
              </div>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-sm font-medium">Email address</div>
              <div className="mt-1 text-sm text-neutral-500 sm:col-span-2 sm:mt-0 dark:text-neutral-400">
                {user?.email}
              </div>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-sm font-medium">Email verified</div>
              <div className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                {user?.emailVerified ? (
                  <p className="text-green-500">Verified</p>
                ) : (
                  <p className="text-red-500">Not verified</p>
                )}
              </div>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-sm font-medium">Order history</div>
              <div className="mt-2 text-sm sm:col-span-2 sm:mt-0">
                <Link
                  href={`/orders/${params.name}`}
                  className="text-blue-500 border-b border-neutral-500 dark:text-blue-400 dark:hover:border-neutral-400"
                >
                  See Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
              <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full">
                <UserIcon classname="w-8 h-8" />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-semibold">
              Hi, {user?.displayName ? user?.displayName : params.name}! 👋
            </h1>
            <p className="text-sm text-gray-500">
              Personal details and order history.
            </p>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <div className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-sm font-medium">Full name</div>
              <div className="mt-1 text-sm text-gray-500 sm:col-span-2 sm:mt-0">
                {user?.displayName}
              </div>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-sm font-medium">Email address</div>
              <div className="mt-1 text-sm text-gray-500 sm:col-span-2 sm:mt-0">
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
                  className="text-blue-500 border-b border-gray-500 hover:text-black"
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

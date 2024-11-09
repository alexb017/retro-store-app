'use client';

import { useContext, use } from 'react';
import Image from 'next/image';
import { AuthContext } from '@/app/AuthContext';
import Link from 'next/link';
import UserIcon from '@/components/icons/user';
import { Separator } from '@/components/ui/separator';
import { User } from 'firebase/auth';

export default function ProfilePage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { user } = useContext(AuthContext) as { user: User | null };

  const param = use(params);

  return (
    <div className="w-full md:max-w-3xl mx-auto">
      <div className="p-4">
        <div className="flex flex-col items-start gap-6 px-4 sm:px-0">
          <div className="block">
            {user?.photoURL ? (
              <Image
                className="rounded-full"
                src={user?.photoURL}
                alt={user?.displayName ? user?.displayName : param.name}
                width={64}
                height={64}
              />
            ) : (
              <div className="flex items-center justify-center w-16 h-16 bg-zinc-200 rounded-full dark:bg-zinc-500">
                <UserIcon classname="w-8 h-8" />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Hi, {user?.displayName ? user?.displayName : param.name}! 👋
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              Personal details and order history.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex flex-col">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-sm font-medium">Full name</div>
              <div className="mt-1 text-sm text-zinc-500 sm:col-span-2 sm:mt-0 dark:text-zinc-400">
                {user?.displayName}
              </div>
            </div>
            <Separator className="my-4" />
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-sm font-medium">Email address</div>
              <div className="mt-1 text-sm text-zinc-500 sm:col-span-2 sm:mt-0 dark:text-zinc-400">
                {user?.email}
              </div>
            </div>
            <Separator className="my-4" />
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-sm font-medium">Email verified</div>
              <div className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                {user?.emailVerified ? (
                  <p className="text-green-500">Verified</p>
                ) : (
                  <p className="text-red-500">Not verified</p>
                )}
              </div>
            </div>
            <Separator className="my-4" />
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <div className="text-sm font-medium">Order history</div>
              <div className="mt-2 text-sm sm:col-span-2 sm:mt-0">
                <Link
                  href={`/orders/${param.name}`}
                  className="text-blue-500 border-b border-zinc-500 dark:text-blue-400 dark:hover:border-zinc-400"
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

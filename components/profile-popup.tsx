'use client';

import { Fragment, useContext } from 'react';
import { Transition, Menu } from '@headlessui/react';
import { AuthContext } from '@/app/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import UserIcon from './icons/user';
import SignOutIcon from './icons/sign-out';

export default function ProfilePopup() {
  const { user, userSignOut } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();
  const usernameFromEmail = user?.email.split('@')[0];

  return (
    <>
      <Menu as="div" className="relative flex">
        <>
          {user?.photoURL ? (
            <Menu.Button>
              <Image
                className="rounded-full"
                src={user?.photoURL}
                alt={usernameFromEmail}
                width={36}
                height={36}
              />
            </Menu.Button>
          ) : (
            <Menu.Button className="flex items-center justify-center w-9 h-9 bg-gray-200 rounded-full">
              <UserIcon classname="w-5 h-5" />
            </Menu.Button>
          )}
        </>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-9 w-screen max-w-[280px] px-4 sm:px-0">
            <div className="overflow-hidden bg-white px-4 rounded-md shadow-2xl ring-1 ring-black/5">
              <div className="py-4 pt-9">
                <Menu.Item>
                  <Link
                    href={`/profile/${usernameFromEmail}`}
                    className="flex flex-col items-center gap-2"
                  >
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
                    <h1 className="text-2xl font-semibold">
                      Hi,{' '}
                      {user?.displayName
                        ? user?.displayName
                        : usernameFromEmail}
                      !
                    </h1>
                  </Link>
                </Menu.Item>
              </div>
              <div className="py-4">
                <Menu.Item>
                  <Link
                    href={`/profile/${usernameFromEmail}`}
                    className="flex items-center text-sm font-medium text-black hover:text-black/80 transition-colors"
                  >
                    Your Store Account
                  </Link>
                </Menu.Item>
              </div>
              <div className="py-4 border-t border-gray-200">
                <Menu.Item>
                  <button
                    onClick={async () => {
                      try {
                        await userSignOut();
                      } catch (error: any) {
                        throw new Error(error);
                      }

                      if (pathname !== '/') {
                        router.push('/');
                      }
                    }}
                    className="flex items-center gap-2 text-sm font-medium text-black hover:text-black/80 transition-colors"
                  >
                    <SignOutIcon classname="w-5 h-5" />
                    Sign out of your account
                  </button>
                </Menu.Item>
              </div>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}

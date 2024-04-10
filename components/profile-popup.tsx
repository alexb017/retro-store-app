'use client';

import { Fragment, useContext } from 'react';
import { Transition, Menu } from '@headlessui/react';
import { AuthContext } from '@/app/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import UserIcon from './icons/user';
import SignOutIcon from './icons/sign-out';
import ShoppingBagIcon from './icons/shopping-bag';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import CartIcon from './icons/cart';
import HeartIcon from './icons/heart';

export default function ProfilePopup() {
  const { user, userSignOut } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();
  const usernameFromEmail = user?.email.split('@')[0];

  return (
    <DropdownMenu modal={false}>
      {user?.photoURL ? (
        <>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              className="w-8 h-8 p-0 rounded-full bg-transparent hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <Image
                className="rounded-full"
                src={user?.photoURL}
                alt={usernameFromEmail}
                width={32}
                height={32}
              />
            </Button>
          </DropdownMenuTrigger>
        </>
      ) : (
        <>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              className="w-8 h-8 p-0 rounded-full text-black bg-zinc-200 hover:bg-zinc-200 dark:text-zinc-400 dark:bg-zinc-800 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <UserIcon classname="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
        </>
      )}
      <DropdownMenuContent className="w-56 rounded-xl" align="end">
        <DropdownMenuLabel>
          Hi, {user?.displayName ? user?.displayName : usernameFromEmail}!
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer rounded-md"
            onClick={() => router.push(`/profile/${usernameFromEmail}`)}
          >
            <UserIcon classname="w-5 h-5 mr-2" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer rounded-md"
            onClick={() => router.push(`/favorites`)}
          >
            <HeartIcon classname="w-5 h-5 mr-2" />
            <span>Favorites</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer rounded-md"
            onClick={() => router.push(`/orders/${usernameFromEmail}`)}
          >
            <ShoppingBagIcon classname="w-5 h-5 mr-2" />
            <span>Orders</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer rounded-md"
            onClick={() => router.push(`/cart`)}
          >
            <CartIcon classname="w-5 h-5 mr-2" />
            <span>Cart</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer rounded-md"
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
          >
            <SignOutIcon classname="w-5 h-5 mr-2" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

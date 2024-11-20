'use client';

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { ShoppingCart, Heart, UserRound, LogOut } from 'lucide-react';
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
import useUserData from '@/lib/use-user-data';

export default function ProfilePopup({
  uid,
  userSignOut,
}: {
  uid?: string;
  userSignOut: () => void;
}) {
  const [userProfile] = useUserData(uid ?? '');
  const router = useRouter();
  const pathname = usePathname();
  const usernameFromEmail = userProfile?.email?.split('@')[0];

  return (
    <DropdownMenu modal={false}>
      {userProfile?.photoURL ? (
        <>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              className="w-8 h-8 p-0 rounded-full bg-transparent hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <Image
                className="rounded-full"
                src={userProfile?.photoURL}
                alt={userProfile?.displayName || 'User profile picture'}
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
              <UserRound className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
        </>
      )}
      <DropdownMenuContent className="w-56 rounded-xl" align="end">
        <DropdownMenuLabel>Hi, {userProfile?.displayName}!</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer rounded-md"
            onClick={() => router.push(`/profile`)}
          >
            <UserRound className="w-4 h-4 mr-2" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer rounded-md"
            onClick={() => router.push(`/favorites`)}
          >
            <Heart className="w-4 h-4 mr-2" />
            <span>Favorites</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer rounded-md"
            onClick={() => router.push(`/cart`)}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            <span>Cart</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer rounded-md"
            onClick={() => {
              try {
                userSignOut();
              } catch (error: any) {
                throw new Error(error);
              }

              if (pathname !== '/') {
                router.push('/');
              }
            }}
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

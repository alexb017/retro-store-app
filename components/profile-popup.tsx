'use client';

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import {
  ShoppingBagIcon,
  HeartIcon,
  UserIcon,
  ArrowRightStartOnRectangleIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
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
import { ModeToggle } from './dark-theme';
import Link from 'next/link';

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
      ) : null}
      <DropdownMenuContent className="w-56 rounded-xl shadow-2xl" align="end">
        <DropdownMenuLabel>Hi, {userProfile?.displayName}!</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="rounded-xl"
            onClick={() => router.push(`/profile`)}
          >
            <UserIcon className="w-5 h-5 mr-2" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="rounded-xl"
            onClick={() => router.push(`/favorites`)}
          >
            <HeartIcon className="w-5 h-5 mr-2" />
            <span>Favorites</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="rounded-xl"
            onClick={() => router.push(`/cart`)}
          >
            <ShoppingBagIcon className="w-5 h-5 mr-2" />
            <span>Cart</span>
          </DropdownMenuItem>
          <ModeToggle />
          <DropdownMenuItem asChild className="rounded-xl">
            <Link
              href="https://github.com/alexb017/retro-store-app"
              target="_blank"
            >
              <CodeBracketIcon className="w-5 h-5 mr-2" />
              <span>Source code</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="rounded-xl"
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
            <ArrowRightStartOnRectangleIcon className="w-5 h-5 mr-2" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

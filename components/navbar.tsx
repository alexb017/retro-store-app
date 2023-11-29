'use client';

import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '../app/AuthContext';
import CartIcon from './icons/cart';
import LogoIcon from './icons/logo';
import useCartData from '@/lib/use-cart-data';
import { useRouter, usePathname } from 'next/navigation';
import MenuIcon from './icons/menu';
import MobileMenu from './mobile-menu';
import SignIn from './sign-in';

export default function Navbar() {
  const { user, googleSignOut } = useContext(AuthContext);
  const [cart] = useCartData(user?.uid);
  const router = useRouter();
  const pathname = usePathname();
  const username: string = user?.displayName;
  const usernameURL = username?.toLowerCase().replace(/\s+/g, '-');

  const quantity = cart?.reduce(
    (total, current: any) => total + current.quantity,
    0
  );

  return (
    <nav className="fixed w-full top-0 left-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-6xl flex items-center justify-between p-5 text-sm">
        <div className="flex items-center md:hidden">
          <MobileMenu />
          <Link
            href="/"
            className="flex items-center text-xl font-bold uppercase leading-none ml-5"
          >
            store
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-5">
          <Link
            href="/"
            className="flex items-center text-xl font-bold uppercase leading-none"
          >
            store
          </Link>
          <Link
            href="/search"
            className="flex text-base font-medium hover:text-neutral-500 transition-colors"
          >
            All
          </Link>
          <Link
            href="/search/phones"
            className="flex text-base font-medium hover:text-neutral-500 transition-colors"
          >
            Phones
          </Link>
          <Link
            href="/search/hats"
            className="flex text-base font-medium hover:text-neutral-500 transition-colors"
          >
            Hats
          </Link>
        </div>

        <div className="flex items-center">
          {user ? (
            <>
              <div className="flex items-center gap-5">
                <Link
                  href="/cart"
                  className="relative flex hover:text-gray-500 transition-colors"
                >
                  <CartIcon classname="h-6" />
                  {cart.length > 0 && (
                    <div className="absolute top-0 right-0 -mr-2 -mt-2 flex items-center justify-center h-4 w-4 rounded-full text-[11px] font-medium text-white bg-blue-500">
                      {quantity}
                    </div>
                  )}
                </Link>
                <Link href={`/profile/${usernameURL}`}>
                  <Image
                    className="rounded-full shadow-lg"
                    src={user?.photoURL}
                    alt={usernameURL}
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
            </>
          ) : (
            <SignIn />
          )}
        </div>
      </div>
    </nav>
  );
}

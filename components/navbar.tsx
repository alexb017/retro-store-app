'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../app/AuthContext';
import CartIcon from './icons/cart';
import useCartData from '@/lib/use-cart-data';
import MobileMenu from './mobile-menu';
import ProfilePopup from './profile-popup';
import ArrowRightIcon from './icons/arrow-right';
import Search from './search';
import HeartIcon from './icons/heart';
import useFavoriteData from '@/lib/use-favorite-data';
import DarkTheme from './dark-theme';
import { Button } from './ui/button';

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const [cart] = useCartData(user?.uid);
  const [favorite] = useFavoriteData(user?.uid);

  const quantity = cart?.reduce(
    (total, current: any) => total + current.quantity,
    0
  );

  const countFavorite = favorite?.length;

  const links = [
    { name: 'All', href: '/search' },
    { name: 'Phones', href: '/search/phones' },
    { name: 'Watches', href: '/search/watches' },
    { name: 'T-Shirts', href: '/search/t-shirts' },
  ];

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-white/80 backdrop-blur-lg dark:bg-zinc-950/80">
      <div className="mx-auto max-w-6xl flex items-center justify-between p-4 text-sm">
        <div className="flex items-center lg:hidden">
          <MobileMenu />
          <Link
            href="/"
            className="flex items-center text-xl font-bold uppercase leading-none tracking-tighter ml-4 lg:ml-0"
          >
            store
          </Link>
        </div>
        <div className="hidden lg:flex items-center gap-5">
          <Link
            href="/"
            className="flex items-center text-xl font-bold uppercase leading-none tracking-tighter"
          >
            store
          </Link>
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex text-sm hover:text-blue-500 transition-color ease-in-out duration-200"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:block max-w-sm w-full">
          <Search />
        </div>
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="flex items-center gap-1 text-sm font-medium hover:opacity-80 transition-opacity"
                >
                  Login
                </Link>
                <Button
                  asChild
                  className="bg-blue-500 hover:bg-blue-600 dark:text-white"
                >
                  <Link href="/sign-up">Sign up</Link>
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-5">
                <Link
                  href="/favorites"
                  className="relative flex text-zinc-500 hover:opacity-80 transition-opacity dark:text-zinc-400"
                >
                  <HeartIcon classname="h-6" />
                  {favorite?.length > 0 && (
                    <div className="absolute top-0 right-0 -mr-1 -mt-1 flex items-center justify-center h-4 w-4 rounded-full text-[11px] font-medium text-white bg-blue-500">
                      {countFavorite}
                    </div>
                  )}
                </Link>
                <Link
                  href="/cart"
                  className="relative flex text-zinc-500 hover:opacity-80 transition-opacity dark:text-zinc-400"
                >
                  <CartIcon classname="h-6" />
                  {cart?.length > 0 && (
                    <div className="absolute top-0 right-0 -mr-1 -mt-1 flex items-center justify-center h-4 w-4 rounded-full text-[11px] font-medium text-white bg-blue-500">
                      {quantity}
                    </div>
                  )}
                </Link>
                <ProfilePopup />
              </div>
            </>
          )}
          <div className="hidden lg:block">
            <DarkTheme />
          </div>
        </div>
      </div>
    </nav>
  );
}

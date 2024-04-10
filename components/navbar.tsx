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
import { ModeToggle } from './dark-theme';
import { Button } from './ui/button';
import { Github, LogIn } from 'lucide-react';
import GithubIcon from './icons/github';

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
              className="flex text-sm hover:text-blue-500 dark:text-zinc-400 dark:hover:text-white transition-color ease-in-out duration-200"
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
              <div className="flex items-center">
                {/* <Link
                  href="/login"
                  className="flex items-center gap-1 text-sm font-medium hover:opacity-80 transition-opacity"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link> */}
                <Button
                  asChild
                  variant="default"
                  className="flex items-center gap-2 rounded-full bg-blue-500 hover:bg-blue-600 dark:text-white"
                >
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <Link
                  href="/favorites"
                  className="relative flex text-zinc-500 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-white transition-color ease-in-out duration-200"
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
                  className="relative flex text-zinc-500 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-white transition-color ease-in-out duration-200"
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
          <ModeToggle />
          <Button
            asChild
            size="icon"
            className="flex bg-transparent text-black w-5 h-5 hover:text-blue-500 hover:bg-transparent dark:text-zinc-400 dark:hover:text-white transition-color ease-in-out duration-200"
          >
            <Link
              href="https://github.com/alexb017/retro-store-app"
              target="_blank"
            >
              <GithubIcon classname="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

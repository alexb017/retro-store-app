'use client';

import { useContext, Suspense } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/app/AuthContext';
import useCartData from '@/lib/use-cart-data';
import MobileMenu from './mobile-menu';
import ProfilePopup from './profile-popup';
import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import useFavoriteData from '@/lib/use-favorite-data';
import { User } from 'firebase/auth';
import SearchNavbar from './search';
import LogoIcon from './icons/logo';
import MenuPopup from './menu-popup';

export default function Navbar() {
  const { user, userSignOut } = useContext(AuthContext) as {
    user: User | null;
    userSignOut: () => void;
  };
  const [cart] = useCartData(user?.uid ?? '');
  const [favorites] = useFavoriteData(user?.uid ?? '');

  const quantity = cart?.reduce(
    (total, current: any) => total + current.quantity,
    0
  );

  const countFavorite = favorites?.length;

  const links = [
    { name: 'All products', href: '/products' },
    { name: 'About us', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed w-full top-0 left-0 z-50 h-16 bg-white/60 backdrop-blur-xl dark:bg-neutral-950/60">
      <div className="mx-auto max-w-7xl flex items-center justify-between h-full px-4 text-sm">
        <div className="flex items-center lg:hidden">
          <Suspense fallback={null}>
            <MobileMenu />
          </Suspense>
          <Link
            href="/"
            className="flex items-center text-2xl font-bold leading-none tracking-tighter ml-4 lg:ml-0"
          >
            <LogoIcon classname="w-8 h-8 -rotate-45" />
            store
          </Link>
        </div>
        <div className="hidden lg:flex items-center gap-5">
          <Link
            href="/"
            className="flex items-center text-2xl font-bold leading-none tracking-tighter"
          >
            <LogoIcon classname="w-8 h-8 -rotate-45" />
            store
          </Link>
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex text-sm uppercase font-semibold text-black hover:underline dark:text-neutral-400 dark:hover:text-white transition-colors duration-200 ease-in"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:block max-w-sm w-full">
          <Suspense fallback={null}>
            <SearchNavbar />
          </Suspense>
        </div>
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <MenuPopup />
            </>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <Link
                  href="/favorites"
                  className="relative flex text-black dark:text-neutral-400 dark:hover:text-white transition-colors ease-in duration-200"
                >
                  <HeartIcon className="w-5 h-5" />
                  {favorites?.length > 0 && (
                    <div className="absolute top-0 right-0 -mr-1 -mt-1 flex items-center justify-center h-4 w-4 rounded-full text-[10px] font-medium text-white bg-red-500">
                      {countFavorite}
                    </div>
                  )}
                </Link>
                <Link
                  href="/cart"
                  className="relative flex items-center gap-1 font-semibold uppercase text-black dark:text-neutral-400 dark:hover:text-white transition-colors ease-in duration-200"
                >
                  <ShoppingBagIcon className="w-5 h-5" />
                  {/* {cart?.length > 0 && (
                    <div className="absolute top-0 right-0 -mr-1 -mt-1 flex items-center justify-center h-4 w-4 rounded-full text-[10px] font-medium text-white bg-black dark:text-black dark:bg-neutral-100">
                      {quantity}
                    </div>
                  )} */}
                  Cart ({quantity})
                </Link>
                <ProfilePopup uid={user?.uid} userSignOut={userSignOut} />
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../app/AuthContext';
import CartIcon from './icons/cart';
import useCartData from '@/lib/use-cart-data';
import MobileMenu from './mobile-menu';
import ProfilePopup from './profile-popup';
import ArrowRightIcon from './icons/arrow-right';

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const [cart] = useCartData(user?.uid);

  const quantity = cart?.reduce(
    (total, current: any) => total + current.quantity,
    0
  );

  return (
    <nav className="fixed w-full top-0 left-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-6xl flex items-center justify-between p-4 text-sm">
        <div className="flex items-center md:hidden">
          <MobileMenu />
          <Link
            href="/"
            className="flex items-center text-xl font-bold uppercase leading-none ml-4 md:ml-0"
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
            className="flex text-sm font-medium text-black hover:text-black/80 transition-colors"
          >
            All
          </Link>
          <Link
            href="/search/phones"
            className="flex text-sm font-medium text-black hover:text-black/80 transition-colors"
          >
            Phones
          </Link>
          <Link
            href="/search/hats"
            className="flex text-sm font-medium text-black hover:text-black/80 transition-colors"
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
                  {cart?.length > 0 && (
                    <div className="absolute top-0 right-0 -mr-2 -mt-2 flex items-center justify-center h-4 w-4 rounded-full text-[11px] font-medium text-white bg-blue-500">
                      {quantity}
                    </div>
                  )}
                </Link>
                <ProfilePopup />
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="flex items-center gap-1 text-sm font-medium hover:text-black/80 transition-colors"
              >
                Login
                <ArrowRightIcon classname="h-4" />
              </Link>
              <Link
                href="/sign-up"
                className="px-3 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-500/80 transition-all"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

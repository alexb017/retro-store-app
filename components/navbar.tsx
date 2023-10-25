'use client';

import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '../app/AuthContext';
import CartIcon from './icons/cart';
import PackageIcon from './icons/package';
import useCartData from '@/lib/useCartData';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, googleSignOut } = useContext(AuthContext);
  const [cart] = useCartData(user?.uid);
  const router = useRouter();
  const username: string = user?.displayName;
  const usernameURL = username?.toLowerCase().replace(/\s+/g, '-');

  //console.log(cart);

  const quantity = cart?.reduce(
    (total, current: any) => total + current.quantity,
    0
  );

  return (
    <nav className="fixed w-full top-0 left-0 z-10 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl flex items-center justify-between p-5 text-sm">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <PackageIcon classname="w-8 h-8" />
            RetroStore
          </Link>
          <Link href="/search" className="flex">
            All products
          </Link>
          <Link href="/search/phones" className="flex">
            Phones
          </Link>
          <Link href="/search/hats" className="flex">
            Hats
          </Link>
        </div>
        <div className="flex items-center">
          {user ? (
            <>
              <div className="flex items-center gap-4">
                <Link
                  href="/cart"
                  className="relative flex text-gray-500 hover:scale-105 transition-transform"
                >
                  <CartIcon classname="w-6 h-6" />
                  {quantity > 0 && (
                    <div className="absolute top-0 right-0 -mr-2 -mt-2 flex items-center justify-center h-4 w-4 rounded-full text-[11px] font-medium text-white bg-blue-500">
                      {quantity}
                    </div>
                  )}
                </Link>
                <Link href={`/profile/${usernameURL}`}>
                  <Image
                    className="rounded-full"
                    src={user?.photoURL}
                    alt={usernameURL}
                    width={24}
                    height={24}
                  />
                </Link>
                <button
                  onClick={async () => {
                    await googleSignOut();
                    router.refresh();
                  }}
                  className="text-sm border rounded-lg border-gray-300 hover:border-gray-400 px-3.5 py-1 transition-colors"
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <Link
              href="/login"
              className="border rounded-lg border-gray-300 hover:border-gray-400 px-3.5 py-1 transition-colors"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
/**
 * <h1>Client {user?.displayName}</h1>
      {user && (
        <Image
          className="rounded-full"
          src={user?.photoURL}
          alt={user?.displayName}
          width={44}
          height={44}
        />
      )}
      {!user ? (
        <button onClick={async () => await googleSignIn()}>Signin</button>
      ) : (
        <button onClick={async () => await googleSignOut()}>Signout</button>
      )}
 */

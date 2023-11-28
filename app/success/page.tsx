'use client';

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import Link from 'next/link';
import {
  getUserCart,
  addItemsOrder,
  updateItemCart,
  updateItemsOrder,
  getUserOrder,
} from '@/lib/actions';
import useCartData from '@/lib/use-cart-data';
import useOrderData from '@/lib/use-order-data';

export default function Success() {
  const { user } = useContext(AuthContext);
  const [cart] = useCartData(user?.uid);
  const [order] = useOrderData(user?.uid);
  const username: string = user?.displayName;
  const usernameURL = username?.toLowerCase().replace(/\s+/g, '-');
  const randomOrderNr = Math.floor(Math.random() * 100000) + 1;

  useEffect(() => {
    (async () => {
      try {
        if (user && cart.length >= 1 && !order) {
          await addItemsOrder(user?.uid, {
            order: [{ item: [...cart], order_nr: randomOrderNr }],
          });

          await updateItemCart(user?.uid, []);
        }

        if (user && cart.length >= 1 && order) {
          await updateItemsOrder(user?.uid, {
            item: [...cart],
            order_nr: randomOrderNr,
          });

          await updateItemCart(user?.uid, []);
        }
      } catch (error) {
        throw new Error('error');
      }
    })();
  }, [user, cart]);

  return (
    <div className="p-5">
      <div className="flex flex-col items-center gap-4">
        {user && (
          <>
            <div className="flex flex-col items-center">
              <h3 className="text-2xl">🎉🎉🎉</h3>
              <h1 className="text-4xl mt-2">
                Thank you,{' '}
                <span className="font-bold">{user?.displayName}</span>
              </h1>
              <h1 className="text-4xl">for your order!</h1>
            </div>
            <Link
              href="/"
              className="text-base text-white font-medium px-6 py-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
            >
              Continue shopping
            </Link>
            <Link href={`/profile/${usernameURL}`} className="underline">
              View order on your profile
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

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
import { Button } from '@/components/ui/button';
import { User } from 'firebase/auth';

export default function Success() {
  const { user } = useContext(AuthContext) as { user: User | null };
  const [cart] = useCartData(user?.uid ?? '');
  const [order] = useOrderData(user?.uid ?? '');
  const usernameFromEmail = user?.email ? user?.email.split('@')[0] : '';
  const randomOrderNr = Math.floor(Math.random() * 100000) + 1;

  useEffect(() => {
    (async () => {
      try {
        if (user && cart.length > 0 && !order) {
          await addItemsOrder(user?.uid, {
            order: [{ item: [...cart], order_nr: randomOrderNr }],
          });
        }

        if (user && cart.length > 0 && order) {
          await updateItemsOrder(user?.uid, {
            item: [...cart],
            order_nr: randomOrderNr,
          });
        }

        if (user && cart.length > 0) {
          await updateItemCart(user?.uid, []);
        }
      } catch (error) {
        throw new Error('error');
      }
    })();
  }, [user, cart]);

  return (
    <div className="p-4">
      <div className="flex flex-col items-center gap-4">
        {user && (
          <>
            <div className="flex flex-col items-center">
              <h4 className="text-xl">🎉🎉🎉</h4>
              <h1 className="text-3xl tracking-tight mt-2">
                Thank you,{' '}
                <span className="font-semibold">
                  {user?.displayName ? user?.displayName : usernameFromEmail}
                </span>
              </h1>
              <h1 className="text-3xl">for your order!</h1>
            </div>
            <Button
              asChild
              className="text-white bg-blue-500 rounded-full mt-2 hover:bg-blue-600 transition-colors shadow-md"
            >
              <Link href="/">Continue shopping</Link>
            </Button>
            <Link
              href={`/orders/${usernameFromEmail}`}
              className="text-sm underline"
            >
              View orders
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

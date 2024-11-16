'use client';

import { useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import Link from 'next/link';
import useOrderData from '@/lib/use-order-data';
import { Button } from '@/components/ui/button';
import { User } from 'firebase/auth';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Success() {
  const { user } = useContext(AuthContext) as { user: User | null };
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order] = useOrderData(user?.uid ?? '');

  const findOder = order?.find((order) => order.order_id === orderId);

  return (
    <>
      {user && findOder ? (
        <>
          <div className="p-4">
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center">
                <h4 className="text-sm text-zinc-500">
                  Order nr: {findOder?.order_id}
                </h4>
                <h1 className="text-4xl tracking-tight mt-2">
                  Thank you, {''}
                  <span className="font-semibold">{findOder?.name}</span>
                </h1>
                <h1 className="text-4xl">for your order!</h1>
              </div>
              <Button
                asChild
                className="text-white bg-zinc-900 rounded-full mt-2 hover:bg-zinc-700 transition-colors shadow-md"
              >
                <Link href="/">Continue shopping</Link>
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

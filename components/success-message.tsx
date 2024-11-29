'use client';

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/app/AuthContext';
import { User } from 'firebase/auth';
import { getOrders } from '@/lib/actions';
import { type OrderItems } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormattedPrice } from '@/lib/utils';

export default function SuccessMessage() {
  const { user } = useContext(AuthContext) as { user: User | null };
  const router = useRouter();
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<OrderItems | null>(null);
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const orders = (await getOrders(user.uid)) as OrderItems[];
        const findOrder = orders.find(
          (order) => order.order_id === orderId
        ) as OrderItems;
        setOrder(findOrder);
      } else {
        setOrder(null);
      }
    };

    fetchOrders();
  }, [user, orderId]);

  if (!order) {
    return null;
  }

  const totalPrice = order.items.reduce(
    (total, current) => total + current?.price * current?.quantity,
    0
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-4xl font-semibold tracking-tight text-center">
        Thank you for your order! 🎉
      </h1>
      <h4 className="text-xl text-center tracking-tight">
        Your order has been placed successfully.
      </h4>
      <h4 className="text-xl text-center tracking-tight">
        Total amount:{' '}
        <span className="text-green-500 font-semibold">
          {FormattedPrice(totalPrice)}
        </span>
      </h4>
      <h4 className="text-xl text-neutral-500 dark:text-neutral-400 text-center tracking-tight">
        Order ID: {order.order_id}
      </h4>
      <Button asChild variant="default" className="px-5 rounded-full">
        <Link href={`/profile/order/${orderId}`}>View your order</Link>
      </Button>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">or</p>
      <Button asChild variant="outline" className="px-5 rounded-full">
        <Link href={`/products`}>Continue shopping</Link>
      </Button>
    </div>
  );
}

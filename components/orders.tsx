'use client';

import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@/app/AuthContext';
import { User } from 'firebase/auth';
import { getOrders } from '@/lib/actions';
import { type OrderItems, type CartItem } from '@/lib/types';
import Image from 'next/image';
import { FormattedPrice } from '@/lib/utils';
import { Button } from './ui/button';
import Link from 'next/link';

export default function Orders() {
  const { user } = useContext(AuthContext) as { user: User | null };
  const [orders, setOrders] = useState<OrderItems[] | null>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const orders = (await getOrders(user.uid)) as OrderItems[];
        setOrders(orders);
      } else {
        setOrders(null);
      }
    };

    fetchOrders();
  }, [user]);

  if (!orders) {
    return null;
  }

  const totalOrders = orders.length;

  return (
    <div className="flex flex-col gap-4">
      {orders?.length === 0 ? (
        <div className="flex flex-col items-start gap-2">
          <h4 className="text-xl font-semibold tracking-tight">
            Your orders is empty.
          </h4>
          <Button asChild variant="outline" className="text-xs rounded-full">
            <Link href="/products">Continue shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <h4 className="text-xl font-semibold tracking-tight">
            Orders ({totalOrders})
          </h4>
          <ul>
            {orders?.map((order: OrderItems, index: number) => {
              // Calculate total price
              const totalPrice = order.items.reduce(
                (total, current) => total + current.price * current.quantity,
                0
              );
              return (
                <li
                  key={index}
                  className={`w-full flex justify-between ${
                    index === 0
                      ? 'pb-4'
                      : 'border-t border-neutral-200 py-4 dark:border-neutral-800'
                  }`}
                >
                  <div className="flex flex-col items-start gap-2">
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Order ID {order.order_id}
                    </p>
                    <div className="flex gap-2">
                      {order.items.map((item: CartItem, index: number) => {
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-center w-12 h-12 aspect-square"
                          >
                            <Image
                              src={item.image}
                              alt={`${item.name} product`}
                              width={48}
                              height={48}
                              className="rounded-md"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Total amount
                    </p>
                    <p className="text-base">{FormattedPrice(totalPrice)}</p>
                    <Button
                      asChild
                      variant="link"
                      className="mt-auto text-xs h-4 p-0 text-blue-600 dark:text-blue-400"
                    >
                      <Link
                        href={`/profile/order/${order.order_id.toString()}`}
                      >
                        View order details
                      </Link>
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

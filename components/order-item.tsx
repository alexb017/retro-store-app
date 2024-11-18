'use client';

import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@/app/AuthContext';
import Image from 'next/image';
import { FormattedPrice } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { User } from 'firebase/auth';
import { type OrderItems, type CartItem } from '@/lib/types';
import { getOrders } from '@/lib/actions';

export default function OrderItem({ id }: { id: string }) {
  const { user } = useContext(AuthContext) as { user: User | null };
  const [order, setOrder] = useState<OrderItems | null>(null);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        const orders = (await getOrders(user?.uid ?? '')) as OrderItems[];
        const order = orders.find(
          (item: OrderItems) => item?.order_id === id
        ) as OrderItems;

        // console.log('order', order);
        setOrder(order);
      };

      fetchOrders();
    }
  }, [user, id]);

  if (!order) {
    return null;
  }

  const totalPrice = order?.items.reduce(
    (total, current) => total + current?.price * current?.quantity,
    0
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between px-4">
        <h1 className="text-base">
          <span className="text-neutral-500 dark:text-neutral-400">
            Order ID
          </span>{' '}
          <span className="font-semibold">{order?.order_id}</span> 📦
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Status:{' '}
          <span className="text-green-500 uppercase font-semibold">
            {order?.status}
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-4 bg-white p-4 rounded-xl dark:bg-neutral-900">
        {order?.items.map((item: CartItem) => {
          const color =
            item?.color.charAt(0).toUpperCase() + item?.color.slice(1);
          const size = item?.size ? `${item?.size.toUpperCase()}` : '';
          const space = item?.space ? `${item?.space}GB` : '';

          return (
            <div
              key={item?.id_cart}
              className="flex flex-row items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center aspect-square">
                  <Image
                    src={item?.image}
                    alt={item?.name}
                    width={64}
                    height={64}
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-xl font-semibold tracking-tight">
                    {item?.name}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {color ? `Color: ${color}` : ''}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {size ? `Size: ${size}` : ''}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {space ? `Space: ${space}` : ''}
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-8">
                <div className="flex flex-col text-right">
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Price
                  </p>
                  <h4 className="text-xl font-semibold tracking-tight">
                    {FormattedPrice(item?.price)}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Quantity {item?.quantity}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row justify-between px-4">
        <div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Order date
          </p>
          <p className="text-sm">
            <span>
              {new Date(order?.created_at * 1000).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>{' '}
            at{' '}
            <span>
              {new Date(order?.created_at * 1000).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Total amount
          </p>
          <h3 className="text-3xl font-semibold tracking-tight">
            {FormattedPrice(totalPrice ?? 0)}
          </h3>
        </div>
      </div>
    </div>
  );
}

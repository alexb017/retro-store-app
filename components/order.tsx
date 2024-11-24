'use client';

import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@/app/AuthContext';
import { User } from 'firebase/auth';
import { getOrders } from '@/lib/actions';
import { type CartItem, type OrderItems } from '@/lib/types';
import Image from 'next/image';
import { FormattedPrice } from '@/lib/utils';

export default function Order({ orderId }: { orderId: string }) {
  const { user } = useContext(AuthContext) as { user: User | null };
  const [order, setOrder] = useState<OrderItems | null>(null);

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

  const date = new Date(order.created_at * 1000);
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.toLocaleDateString('en-US', { day: '2-digit' });
  const year = date.toLocaleDateString('en-US', { year: 'numeric' });
  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });

  const dateStr = `${weekday}, ${day} ${month} ${year} at ${time}`;

  const totalPrice = order.items.reduce(
    (total, current) => total + current.price * current.quantity,
    0
  );

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h4 className="text-xl font-semibold tracking-tight">
          Order ID {order.order_id}
        </h4>
      </div>
      <ul>
        {order.items.map((item: CartItem, index) => {
          const color =
            item?.color.charAt(0).toUpperCase() + item?.color.slice(1);
          const size = item?.size ? ` / ${item?.size.toUpperCase()}` : '';
          const space = item?.space ? ` / ${item?.space}GB` : '';
          return (
            <li
              key={index}
              className={`w-full flex items-center justify-between ${
                index === 0
                  ? 'pb-4'
                  : 'border-t border-neutral-200 py-4 dark:border-neutral-800'
              }`}
            >
              <div className="flex gap-4">
                <div className="flex items-center justify-center w-12 h-12 aspect-square">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={48}
                    height={48}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-base">{item.name}</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {color}
                    {size}
                    {space}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-base">{FormattedPrice(item.price)}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Qty {item.quantity}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-between pt-4 border-t-2 border-dashed border-neutral-200 dark:border-neutral-800">
        <div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {dateStr}
          </p>
          <p className="text-xs">
            Status:{' '}
            <span className="text-green-500 font-semibold uppercase">
              {order.status}
            </span>
          </p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Total amount
          </p>
          <h4 className="text-xl">{FormattedPrice(totalPrice)}</h4>
        </div>
      </div>
    </div>
  );
}

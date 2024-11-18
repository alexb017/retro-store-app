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
        setOrder(order);
      };

      fetchOrders();
    }
  }, [user, id]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-base font-semibold text-center">
        <span className="text-zinc-500">ID</span> {order?.order_id}
      </h1>
      <div className="flex flex-col gap-4">
        {order?.items.map((item: CartItem) => {
          const color =
            item?.color.charAt(0).toUpperCase() + item?.color.slice(1);
          const size = item?.size ? ` / ${item?.size.toUpperCase()}` : '';
          const space = item?.space ? ` / ${item?.space}GB` : '';

          return (
            <div
              key={item?.id_cart}
              className="flex flex-row items-center justify-between"
            >
              <div className="flex flex-row gap-4 items-center">
                <div className="w-16 h-16 bg-zinc-50 rounded-xl">
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
                  <p className="text-xs">
                    {color}
                    {size}
                    {space}
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-20">
                <p className="text-xs">Quantity {item?.quantity}</p>
                <div className="flex flex-col text-right">
                  <p className="text-xs">Price</p>
                  <p className="font-semibold">{FormattedPrice(item?.price)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Separator />
      <div className="flex flex-row justify-between">
        <div>
          <p className="text-xs text-zinc-500">Order date</p>
          <p className="text-sm">
            {new Date(order?.created_at ?? 0 * 1000).toLocaleDateString(
              'en-US',
              {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }
            )}
            <br></br>
            {new Date(order?.created_at ?? 0 * 1000).toLocaleTimeString(
              'en-US',
              {
                hour: '2-digit',
                minute: '2-digit',
              }
            )}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs">Total amount</p>
          <h3 className="text-3xl font-semibold tracking-tight">
            {FormattedPrice(order?.amount_total ?? 0)}
          </h3>
          <p className="text-xs">
            Status:{' '}
            <span className="text-green-500 uppercase font-semibold">
              {order?.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@/app/AuthContext';
import { User } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { type OrderItems, type CartItem } from '@/lib/types';
import Image from 'next/image';
import { FormattedPrice } from '@/lib/utils';
import { getOrders } from '@/lib/actions';

export default function Orders() {
  const { user } = useContext(AuthContext) as { user: User | null };
  const [orders, setOrders] = useState<OrderItems[]>([]);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        const orders = (await getOrders(user?.uid ?? '')) as OrderItems[];
        // console.log('orders', orders);
        setOrders(orders);
      };

      fetchOrders();
    }
  }, [user]);

  const o = [];

  return (
    <>
      {orders.length === 0 ? (
        <div className="flex items-center justify-center flex-col h-full">
          <h4 className="text-xl font-semibold tracking-tight">
            Your orders is empty.
          </h4>
          <Button
            asChild
            className="text-white bg-blue-500 rounded-full mt-2 hover:bg-blue-600 transition-colors shadow-md"
          >
            <Link href="/">Continue shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          <h4 className="text-xl font-semibold tracking-tight">
            Order history {''}
            <span className="font-light">
              (
              {orders.length === 1
                ? `${orders.length} item`
                : `${orders.length} items`}
              )
            </span>
          </h4>
          <div className="flex flex-col gap-2 w-full">
            {orders?.map((item: OrderItems) => {
              return (
                <div
                  key={item?.order_id}
                  className="flex flex-col gap-1 bg-zinc-50 p-4 rounded-3xl"
                >
                  <div className="flex flex-row justify-between">
                    <p className="text-xs text-zinc-500">
                      {new Date(item?.created_at * 1000).toLocaleDateString(
                        'en-US',
                        { year: 'numeric', month: 'long', day: 'numeric' }
                      )}
                      <br></br>
                      {new Date(item?.created_at * 1000).toLocaleTimeString(
                        'en-US',
                        { hour: '2-digit', minute: '2-digit' }
                      )}
                    </p>
                    <p className="text-xs text-zinc-500">
                      Order ID: {item?.order_id}
                    </p>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row">
                      {item?.items?.map((item: CartItem, index: number) => {
                        return (
                          <div
                            key={item?.id_cart}
                            className={`flex flex-row ${
                              index !== 0 ? '-ml-2' : ''
                            }`}
                          >
                            <div className="flex items-center justify-center w-16 h-16 p-1 border-2 border-zinc-50 bg-zinc-200 rounded-3xl">
                              <Image
                                src={item?.image}
                                alt={item?.handle}
                                width={64}
                                height={64}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex flex-col text-right">
                      <p className="text-xs">Total amount</p>
                      <h3 className="text-2xl font-semibold tracking-tight">
                        {FormattedPrice(item?.amount_total)}
                      </h3>
                      <Link
                        href={`/profile/order/${item?.order_id}`}
                        className="text-xs text-blue-500 underline"
                      >
                        View order details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

'use client';

import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@/app/AuthContext';
import { User } from 'firebase/auth';
import Link from 'next/link';
import { type OrderItems, type CartItem } from '@/lib/types';
import Image from 'next/image';
import { FormattedPrice } from '@/lib/utils';
import { getOrders } from '@/lib/actions';
import { Archive } from 'lucide-react';

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

  return (
    <>
      {orders.length === 0 ? (
        <div className="flex items-center justify-center flex-col h-full">
          <Archive
            size={64}
            className="text-neutral-300 dark:text-neutral-700"
          />
          <h4 className="text-xl font-semibold tracking-tight">
            Your orders is empty.
          </h4>
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
          <div className="flex flex-col gap-4 w-full">
            {orders?.map((item: OrderItems) => {
              const totalPrice = item?.items.reduce(
                (total, current) => total + current?.price * current?.quantity,
                0
              );
              return (
                <div
                  key={item?.order_id}
                  className="flex flex-col gap-1 bg-white p-4 rounded-3xl dark:bg-neutral-900"
                >
                  <div className="flex flex-row justify-between">
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      <span>
                        {new Date(item?.created_at * 1000).toLocaleDateString(
                          'en-US',
                          { year: 'numeric', month: 'short', day: 'numeric' }
                        )}
                      </span>{' '}
                      at{' '}
                      <span>
                        {new Date(item?.created_at * 1000).toLocaleTimeString(
                          'en-US',
                          { hour: '2-digit', minute: '2-digit' }
                        )}
                      </span>
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
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
                            <div className="flex items-center justify-center w-16 h-16 p-1 border-2 border-white bg-neutral-100 rounded-3xl dark:border-neutral-900 dark:bg-neutral-800">
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
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Total amount
                      </p>
                      <h4 className="text-xl font-semibold tracking-tight">
                        {FormattedPrice(totalPrice)}
                      </h4>
                      <Link
                        href={`/profile/order/${item?.order_id}`}
                        className="text-xs text-blue-500 border-b border-neutral-500 hover:bg-neutral-100 dark:text-blue-400 dark:hover:bg-neutral-800 transition-all duration-200 ease-in"
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

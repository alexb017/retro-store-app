'use client';

import { useContext, use } from 'react';
import { AuthContext } from '../../AuthContext';
import useOrderData from '@/lib/use-order-data';
import Image from 'next/image';
import Link from 'next/link';
import { FormattedPrice } from '@/lib/utils';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { User } from 'firebase/auth';

export default function OrdersPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { user } = useContext(AuthContext) as { user: User | null };
  const [order] = useOrderData(user?.uid ?? '');

  const countOrders = order?.length || 0;

  const paramsName = use(params);

  return (
    <>
      <div className="w-full md:max-w-3xl mx-auto">
        <div className="p-4">
          <h1 className="text-3xl font-semibold tracking-tight mb-10 text-center">
            Order history{' '}
            <span className="font-normal">
              (
              {countOrders === 1
                ? `${countOrders} item`
                : `${countOrders} items`}
              )
            </span>
          </h1>
          {!order || order?.length === 0 ? (
            <div className="flex items-center flex-col">
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
              <ul role="list" className="">
                {order?.map((item: any, index) => {
                  const totalPrice = item?.item?.reduce(
                    (total: any, current: any) =>
                      total +
                      Number.parseInt(current?.price, 10) * current?.quantity,
                    0
                  );

                  return (
                    <div key={index}>
                      <li className="flex flex-col">
                        <div className="flex flex-row justify-between">
                          <h1 className="text-sm font-medium">
                            Order #{item?.order_nr}
                          </h1>
                          <h3 className="text-sm">
                            Amount
                            {/* Total price: {FormattedPrice(totalPrice?.toString())} */}
                          </h3>
                        </div>
                        <div className="flex flex-col gap-1 my-4">
                          {item?.item?.map((item: any, index: any) => {
                            const price = FormattedPrice(item?.price);
                            const color =
                              item?.color.charAt(0).toUpperCase() +
                              item?.color.slice(1);
                            const size = item?.size
                              ? ` / ${item?.size.toUpperCase()}`
                              : '';
                            const space = item?.space
                              ? ` / ${item?.space}GB`
                              : '';

                            return (
                              <div
                                key={index}
                                className="w-full p-2 pr-4 rounded-xl bg-zinc-50 dark:bg-zinc-900"
                              >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 w-full">
                                  <div className="flex flex-row items-center gap-2 w-full">
                                    <div className="flex items-center justify-center aspect-square">
                                      <Image
                                        src={item?.image}
                                        alt={item?.name}
                                        width={64}
                                        height={64}
                                      />
                                    </div>
                                    <div className="flex flex-row items-center justify-between w-full">
                                      <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                                        <h4 className="text-xl font-semibold tracking-tight">
                                          {item?.name}
                                        </h4>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                          {`${color}${size}${space}`}
                                        </p>
                                      </div>
                                      <div className="flex flex-col">
                                        <p className="">{price}</p>
                                        <p className="text-sm text-zinc-500 self-end dark:text-zinc-400">
                                          Qty: {item?.quantity}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="self-end">
                          <p className="font-medium">
                            Total: {FormattedPrice(totalPrice?.toString())}
                          </p>
                        </div>
                      </li>
                      <Separator className="my-4" />
                    </div>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

'use client';

import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import useOrderData from '@/lib/use-order-data';
import Image from 'next/image';
import Link from 'next/link';
import FormattedPrice from '@/components/formatted-price';
import Footer from '@/components/footer';

export default function OrdersPage({ params }: { params: { name: string } }) {
  const { user } = useContext(AuthContext);
  const [order] = useOrderData(user?.uid);
  const usernameFromEmail = user?.email.split('@')[0];

  const countOrders = order?.length || 0;

  return (
    <>
      <div className="w-full md:max-w-3xl mx-auto">
        <div className="p-4">
          <h1 className="text-xl font-semibold mb-10 text-center">
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
              <h3 className="text-xl">Your orders is empty.</h3>
              <Link
                href="/"
                className="inline-flex text-sm text-white font-medium px-6 py-2 bg-blue-500 rounded-full mt-2 hover:bg-blue-600 transition-colors"
              >
                Continue shopping
              </Link>
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
                    <li
                      key={index}
                      className="flex flex-col border-b mb-4 py-2"
                    >
                      <div className="flex flex-row justify-between">
                        <h1 className="text-sm font-medium">
                          Order #{item?.order_nr}
                        </h1>
                        <h3 className="text-sm">
                          Amount
                          {/* Total price: {FormattedPrice(totalPrice?.toString())} */}
                        </h3>
                      </div>
                      <div className="flex flex-col divide-y divide-gray-100">
                        {item?.item?.map((item: any, index: any) => {
                          const price = FormattedPrice(item?.price);
                          const color = item?.color;

                          return (
                            <div key={index} className="w-full py-2">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 w-full">
                                <div className="flex flex-row items-center gap-2 w-full">
                                  <div className="flex items-center justify-center aspect-square rounded-md bg-gray-50">
                                    <Image
                                      src={item?.image}
                                      alt={item?.name}
                                      width={64}
                                      height={64}
                                    />
                                  </div>
                                  <div className="flex flex-row items-center justify-between w-full">
                                    <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                                      <h1 className="text-sm font-medium">
                                        {item?.name}
                                      </h1>
                                      <p className="text-sm text-gray-500">
                                        {item?.color && (
                                          <>
                                            {' '}
                                            {color.charAt(0).toUpperCase() +
                                              color.slice(1)}{' '}
                                          </>
                                        )}{' '}
                                        {item?.space && (
                                          <> / {item?.space} GB </>
                                        )}
                                        {item?.size && (
                                          <span className="uppercase">
                                            {' '}
                                            / {item?.size}{' '}
                                          </span>
                                        )}
                                      </p>
                                    </div>
                                    <div className="flex flex-col">
                                      <p className="text-sm">{price}</p>
                                      <p className="text-sm text-gray-500 self-end">
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
                        <h3 className="text-sm font-medium">
                          Total: {FormattedPrice(totalPrice?.toString())}
                        </h3>
                      </div>
                    </li>
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

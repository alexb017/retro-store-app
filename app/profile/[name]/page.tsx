'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '@/app/AuthContext';
import { getUserCart } from '@/lib/actions';
import useOrderData from '@/lib/use-order-data';
import FormattedPrice from '@/components/formatted-price';

export default function ProfileName({ params }: { params: { name: string } }) {
  const { user } = useContext(AuthContext);
  const [order] = useOrderData(user?.uid);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // const totalPrice = order?.reduce(
  //   (total, current: any) =>
  //     total + Number.parseInt(current?.price, 10) * current?.quantity,
  //   0
  // );

  return (
    <div className="p-5">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <Image
              className="rounded-full"
              src={user?.photoURL}
              alt={user?.displayName}
              width={64}
              height={64}
            />
            <h1 className="text-4xl font-bold mt-2">
              Hello, {user?.displayName}
            </h1>
            <p className="text-lg text-gray-500">{user?.email}</p>
          </div>
          <div className="flex gap-20">
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-gray-500 font-bold">Total orders</h3>
              <h1 className="text-2xl font-medium">{order?.length}</h1>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-gray-500 font-bold">Total spended</h3>
              <h1 className="text-2xl font-medium">
                {FormattedPrice(totalPrice?.toString())}
              </h1>
            </div>
          </div>
        </div>
        {!order || order?.length === 0 ? (
          <>
            <h3 className="text-2xl">You do not have any orders.</h3>
          </>
        ) : (
          <div className="flex flex-col">
            <h3 className="text-2xl mb-4 font-bold">Order history</h3>
            <ul className="flex flex-col gap-1">
              {order?.map((item: any, index) => {
                const totalPrice = item?.item?.reduce(
                  (total: any, current: any) =>
                    total +
                    Number.parseInt(current?.price, 10) * current?.quantity,
                  0
                );

                return (
                  <li key={index} className="rounded-3xl bg-gray-50 px-5">
                    <div className="flex items-center justify-between py-5">
                      <div className="text-xl font-bold text-gray-500">
                        Order nr: #{item?.order_nr}
                      </div>
                      <div className="text-xl font-bold text-gray-500">
                        Total price: {FormattedPrice(totalPrice?.toString())}
                      </div>
                    </div>
                    {item?.item?.map((item: any, index: any) => {
                      const price = FormattedPrice(item?.price);

                      return (
                        <div
                          key={index}
                          className="w-full py-5 flex flex-row items-center justify-between border-t border-gray-200"
                        >
                          <div className="flex flex-row gap-5">
                            <div className="flex items-center justify-center p-1 rounded-2xl aspect-square bg-gray-200">
                              <Image
                                src={item?.image}
                                alt={item?.name}
                                width={64}
                                height={64}
                              />
                            </div>
                            <div className="flex flex-col items-start justify-center">
                              <div>
                                <h1 className="text-xl font-bold">
                                  {item?.name}
                                </h1>
                                <p className="text-sm text-gray-500">
                                  {item?.color && <> {item?.color} </>}{' '}
                                  {item?.space && <> / {item?.space} GB </>}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <p className="font-medium">Price: {price}</p>
                            <p className="text-sm">
                              Quantity: {item?.quantity}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

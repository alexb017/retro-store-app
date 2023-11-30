'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '@/app/AuthContext';
import { getUserCart } from '@/lib/actions';
import useOrderData from '@/lib/use-order-data';
import FormattedPrice from '@/components/formatted-price';
import { useRouter, usePathname } from 'next/navigation';
import SignOutIcon from '@/components/icons/sign-out';

export default function ProfileName({ params }: { params: { name: string } }) {
  const { user, googleSignOut } = useContext(AuthContext);
  const [order] = useOrderData(user?.uid);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="p-5">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex flex-col w-full md:w-1/3">
          <div className="flex flex-col items-start gap-4">
            <Image
              className="rounded-full"
              src={user?.photoURL}
              alt={user?.displayName}
              width={64}
              height={64}
            />
            <div>
              <h1 className="text-4xl font-bold">
                Hello, {user?.displayName}!
              </h1>
              <p className="text-lg text-gray-500">{user?.email}</p>
            </div>
            <button
              onClick={async () => {
                try {
                  await googleSignOut();
                } catch (error: any) {
                  throw new Error(error);
                }

                if (pathname !== '/') {
                  router.push('/');
                }
              }}
              className="flex items-center gap-2 rounded-full bg-blue-50 hover:bg-blue-100 px-6 py-2 transition-colors"
            >
              <SignOutIcon classname="h-5" />
              Sign out
            </button>
          </div>
        </div>
        {!order || order?.length === 0 ? (
          <div className="flex items-center w-full md:w-2/3 justify-end">
            <h3 className="text-2xl">You do not have any orders.</h3>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full md:w-2/3">
            <h3 className="text-2xl font-bold">Order history</h3>
            <ul className="flex flex-col gap-4">
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
                    className="rounded-3xl bg-white px-5 shadow border border-gray-200"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between py-5">
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
                          className="w-full py-5 flex flex-col md:flex-row md:items-center justify-between gap-2 border-t border-gray-200"
                        >
                          <div className="flex flex-row gap-5">
                            <div className="flex items-center justify-center p-1 rounded-2xl aspect-square bg-gray-100">
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

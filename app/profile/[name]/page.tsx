'use client';

import { useContext } from 'react';
import Image from 'next/image';
import { AuthContext } from '@/app/AuthContext';
import useOrderData from '@/lib/use-order-data';
import FormattedPrice from '@/components/formatted-price';
import UserIcon from '@/components/icons/user';

export default function ProfilePage({ params }: { params: { name: string } }) {
  const { user } = useContext(AuthContext);
  const [order] = useOrderData(user?.uid);
  const usernameFromEmail = user?.email.split('@')[0];

  return (
    <div className="p-4">
      <div className="flex flex-col items-start gap-2 px-4 sm:px-0">
        <div className="block">
          {user?.photoURL ? (
            <Image
              className="rounded-full"
              src={user?.photoURL}
              alt={user?.displayName}
              width={64}
              height={64}
            />
          ) : (
            <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full">
              <UserIcon classname="w-8 h-8" />
            </div>
          )}
        </div>
        <div>
          <h1 className="text-4xl font-semibold">
            Hi, {user?.displayName ? user?.displayName : params.name}! 👋
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Personal details and order history.
          </p>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <div className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <div className="text-sm font-medium">Full name</div>
            <div className="mt-1 text-sm text-gray-500 sm:col-span-2 sm:mt-0">
              {user?.displayName}
            </div>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <div className="text-sm font-medium">Email address</div>
            <div className="mt-1 text-sm text-gray-500 sm:col-span-2 sm:mt-0">
              {user?.email}
            </div>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <div className="text-sm font-medium">Email verified</div>
            <div className="mt-1 text-sm sm:col-span-2 sm:mt-0">
              {user?.emailVerified ? (
                <p className="text-green-500">Verified</p>
              ) : (
                <p className="text-red-500">Not verified</p>
              )}
            </div>
          </div>
          {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <div className="text-sm font-medium">Order history</div>
            <div className="mt-2 text-sm sm:col-span-2 sm:mt-0">
              {!order || order?.length === 0 ? (
                <div className="flex items-center w-full md:w-2/3 justify-end">
                  <h3 className="text-sm font-medium text-gray-500">
                    You do not have any orders.
                  </h3>
                </div>
              ) : (
                <div className="flex flex-col gap-4 w-full">
                  <ul
                    role="list"
                    className="divide-y divide-gray-200 rounded-md border border-gray-200"
                  >
                    {order?.map((item: any, index) => {
                      const totalPrice = item?.item?.reduce(
                        (total: any, current: any) =>
                          total +
                          Number.parseInt(current?.price, 10) *
                            current?.quantity,
                        0
                      );

                      return (
                        <li key={index} className="flex flex-col p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <h1 className="text-sm font-medium">
                              Order nr: #{item?.order_nr}
                            </h1>
                            <h3 className="text-sm font-medium">
                              Total price:{' '}
                              {FormattedPrice(totalPrice?.toString())}
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
                                          <p className="font-sm">{price}</p>
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
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

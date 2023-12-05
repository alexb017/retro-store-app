'use client';

import { useContext } from 'react';
import Image from 'next/image';
import { AuthContext } from '@/app/AuthContext';
import useOrderData from '@/lib/use-order-data';
import FormattedPrice from '@/components/formatted-price';
import UserIcon from '@/components/icons/user';

export default function ProfileName({ params }: { params: { name: string } }) {
  const { user, userSignOut } = useContext(AuthContext);
  const [order] = useOrderData(user?.uid);
  const usernameFromEmail = user?.email.split('@')[0];

  return (
    <div className="p-5">
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
            Hi, {user?.displayName ? user?.displayName : usernameFromEmail}! 👋
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Personal details and order history.
          </p>
        </div>
        {/* <button
          onClick={async () => {
            try {
              await userSignOut();
            } catch (error: any) {
              throw new Error(error);
            }

            if (pathname !== '/') {
              router.push('/');
            }
          }}
          className="flex items-center gap-2 text-sm font-medium px-3 py-2 border-2 rounded-md border-gray-200 hover:bg-gray-200 transition-colors"
        >
          
          Sign out
        </button> */}
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
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <div className="text-sm font-medium">Orders</div>
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
                    className="divide-y divide-gray-100 rounded-md border border-gray-200"
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
                        <li
                          key={index}
                          className="flex flex-col gap-2 rounded-md bg-white p-4"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <h1 className="text-sm font-medium text-blue-900">
                              Order nr: #{item?.order_nr}
                            </h1>
                            <h3 className="text-sm font-medium">
                              Total price:{' '}
                              {FormattedPrice(totalPrice?.toString())}
                            </h3>
                          </div>
                          {item?.item?.map((item: any, index: any) => {
                            const price = FormattedPrice(item?.price);

                            return (
                              <div
                                key={index}
                                className="w-full flex flex-col md:flex-row md:items-center justify-between gap-2"
                              >
                                <div className="flex flex-row gap-4">
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
                                      <h1 className="text-xl font-semibold">
                                        {item?.name}
                                      </h1>
                                      <p className="text-sm text-gray-500">
                                        {item?.color && <> {item?.color} </>}{' '}
                                        {item?.space && (
                                          <> / {item?.space} GB </>
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col">
                                  <p className="font-sm text-gray-500">
                                    Price: {price}
                                  </p>
                                  <p className="text-sm text-gray-500">
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
        </div>
      </div>
    </div>
  );
}

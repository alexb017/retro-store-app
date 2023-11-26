'use client';

import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '@/app/AuthContext';
import { getUserCart } from '@/lib/actions';
import useCartData from '@/lib/useCartData';
import FormattedPrice from '@/components/formatted-price';

export default function ProfileName({ params }: { params: { name: string } }) {
  const { user } = useContext(AuthContext);
  const [cart] = useCartData(user?.uid);

  //console.log(user);

  const totalItems = cart?.reduce(
    (total, current: any) => total + current?.quantity,
    0
  );

  const totalPrice = cart?.reduce(
    (total, current: any) =>
      total + Number.parseInt(current?.price, 10) * current?.quantity,
    0
  );

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
            <div className="flex flex-col items-center">
              <h3 className="text-gray-500 font-bold">Nr. of items</h3>
              <h1 className="text-2xl font-medium">{totalItems}</h1>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-gray-500 font-bold">Total spended</h3>
              <h1 className="text-2xl font-medium">
                {FormattedPrice(totalPrice.toString())}
              </h1>
            </div>
          </div>
        </div>
        {cart?.length === 0 ? (
          <>
            <h3 className="text-2xl">You do not have any orders.</h3>
          </>
        ) : (
          <div className="flex flex-col">
            <h3 className="text-2xl">Your orders.</h3>
            <ul className="flex flex-col">
              {cart?.map((item: any, index) => {
                const price = FormattedPrice(item?.price);

                return (
                  <li
                    key={index}
                    className="w-full flex flex-row items-center justify-between py-5 border-b border-gray-300"
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
                          <h1 className="text-xl font-bold">{item?.name}</h1>
                          <p className="text-sm text-gray-500">
                            {item?.color && <> {item?.color} </>}{' '}
                            {item?.space && <> / {item?.space} GB </>}
                          </p>
                          <p className="text-sm">Quantity: {item?.quantity}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-medium">Price: {price}</p>
                      <p className="text-sm">
                        Status:{' '}
                        <span className="text-green-500">{item?.status}</span>
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="self-end text-xl mt-4">
              Total price:{' '}
              <span className="font-bold">
                {FormattedPrice(totalPrice.toString())}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

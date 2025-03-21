'use client';

import { Card, CardHeader, CardDescription, CardContent } from './ui/card';
import { AuthContext } from '@/app/AuthContext';
import { User } from 'firebase/auth';
import { useContext } from 'react';
import useCartData from '@/lib/use-cart-data';

export default function CartTestDemo() {
  const { user } = useContext(AuthContext) as { user: User | null };
  const [cart] = useCartData(user?.uid ?? '');

  return (
    <>
      {cart?.length !== 0 ? (
        <div className="flex justify-end mt-8 w-full">
          <Card className="w-full md:max-w-xs rounded-3xl bg-neutral-50 dark:bg-neutral-900">
            <CardHeader>
              <CardDescription className="text-black dark:text-white">
                For test demo, you can use the following credit card details:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Card number:{' '}
                <span className="text-black dark:text-white">
                  4242 4242 4242 4242
                </span>
              </CardDescription>
              <CardDescription>
                Month:{' '}
                <span className="text-black dark:text-white">
                  Any valid month
                </span>
              </CardDescription>
              <CardDescription>
                Year:{' '}
                <span className="text-black dark:text-white">
                  Current year or above
                </span>
              </CardDescription>
              <CardDescription>
                CVC:{' '}
                <span className="text-black dark:text-white">Any 3 digits</span>
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </>
  );
}

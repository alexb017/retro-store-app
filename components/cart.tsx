'use client';

import Link from 'next/link';
import Image from 'next/image';
import EditItemQuantity from '@/components/edit-item-cart';
import DeleteItemCart from '@/components/delete-item-cart';
import useCartData from '@/lib/use-cart-data';
import { FormattedPrice } from '@/lib/utils';
import { useContext } from 'react';
import { AuthContext } from '@/app/AuthContext';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CartItem } from '@/lib/types';
import { User } from 'firebase/auth';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Cart() {
  const { user } = useContext(AuthContext) as { user: User | null };
  const [cart] = useCartData(user?.uid ?? '');

  // Calculate total quantity
  const quantity = cart?.reduce(
    (total, current: CartItem) => total + current.quantity,
    0
  );

  // Calculate total price
  const totalPrice = cart?.reduce(
    (total, current: CartItem) => total + current?.price * current?.quantity,
    0
  );

  async function handleCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const userId = user?.uid;
    const items = cart.map((item: CartItem) => {
      return { price: item?.price_id, quantity: item?.quantity };
    });

    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, items }),
      });

      const { sessionId } = await response.json();

      // Redirect to Checkout
      const stripe = await stripePromise;

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
          throw new Error('Error during checkout process');
        }
      }
    } catch (error) {
      throw new Error('Error during checkout process');
    }
  }

  return (
    <div className="p-5">
      {cart?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-104px)]">
          <div className="flex flex-col items-center gap-4">
            <ShoppingBagIcon className="h-16 w-16 text-neutral-200 dark:text-neutral-700" />
            <div className="flex flex-col items-center gap-2">
              <h4 className="text-xl font-semibold tracking-tight">
                Your cart is empty.
              </h4>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/products">Continue shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-semibold tracking-tight text-center">
              Cart{' '}
              <span className="font-normal">
                (
                {quantity === 1
                  ? `${quantity || 0} item`
                  : `${quantity || 0} items`}
                )
              </span>
            </h2>
            <ul className="flex flex-col">
              {cart?.map((item: CartItem, index) => {
                const price = FormattedPrice(item?.price);
                const color =
                  item?.color.charAt(0).toUpperCase() + item?.color.slice(1);
                const size = item?.size ? ` / ${item?.size.toUpperCase()}` : '';
                const space = item?.space ? ` / ${item?.space}GB` : '';

                return (
                  <div key={index}>
                    <li className="w-full flex flex-row justify-between">
                      <div className="flex gap-4">
                        <div className="flex items-center justify-center aspect-square">
                          <Image
                            src={item?.image}
                            alt={item?.name}
                            width={128}
                            height={128}
                            objectFit="cover"
                          />
                        </div>
                        <div className="flex flex-col items-start gap-2 pt-4">
                          <h3 className="text-2xl font-semibold tracking-tight">
                            {`${item?.name} - ${color}${size}${space}`}
                          </h3>
                          <div className="flex items-center h-11 gap-2 p-1 border border-neutral-200 rounded-full dark:border-neutral-800">
                            <EditItemQuantity
                              item={item}
                              type="minus"
                              uid={user?.uid ?? ''}
                            />
                            <p className="text-sm font-semibold">
                              Qty {item?.quantity}
                            </p>
                            <EditItemQuantity
                              item={item}
                              type="plus"
                              uid={user?.uid ?? ''}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 pt-4">
                        <div className="flex flex-col items-end">
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            Price
                          </p>
                          <h3 className="text-2xl font-semibold tracking-tight">
                            {price}
                          </h3>
                        </div>
                        <DeleteItemCart
                          uid={user?.uid ?? ''}
                          id={item?.id_cart}
                        />
                      </div>
                    </li>
                    <Separator className="my-4" />
                  </div>
                );
              })}
            </ul>
            <div className="flex flex-col w-full pl-[calc(128px+16px)]">
              <div className="flex items-center justify-between">
                <p className="text-sm">Subtotal</p>
                <p className="text-sm">{FormattedPrice(totalPrice)}</p>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between">
                <p className="text-sm">Shipping</p>
                <p className="text-sm">Free</p>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between">
                <p className="text-sm">Tax</p>
                <p className="text-sm">Calculated at checkout</p>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between mb-5">
                <p className="test-sm">Estimated total</p>
                <h2 className="text-3xl font-semibold tracking-tight">
                  {FormattedPrice(totalPrice)}
                </h2>
              </div>
              <div className="self-end">
                <form onSubmit={handleCheckout}>
                  <Button
                    type="submit"
                    variant="default"
                    className="rounded-full w-60 h-12"
                  >
                    Proceed to Checkout
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

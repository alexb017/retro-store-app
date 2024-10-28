'use client';

import Link from 'next/link';
import Image from 'next/image';
import EditItemQuantity from '@/components/edit-item-cart';
import DeleteItemCart from '@/components/delete-item-cart';
import Footer from '@/components/footer';
import useCartData from '@/lib/use-cart-data';
import { FormattedPrice } from '@/lib/utils';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CartItems } from '@/lib/types';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Cart() {
  const { user } = useContext(AuthContext);
  const [cart] = useCartData(user?.uid);

  const quantity = cart?.reduce(
    (total, current: CartItems) => total + current.quantity,
    0
  );

  const totalPrice = cart?.reduce(
    (total, current: CartItems) =>
      total + Number.parseInt(current?.price, 10) * current?.quantity,
    0
  );

  async function handleCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const lineItems = cart.map((item: CartItems) => {
      return { price: item?.price_id, quantity: item?.quantity };
    });

    try {
      const stripe = await stripePromise;

      await stripe?.redirectToCheckout({
        lineItems: lineItems,
        mode: 'payment',
        successUrl: `https://retro-store-app-alexb017s-projects.vercel.app/success`,
        cancelUrl: `https://retro-store-app-alexb017s-projects.vercel.app/cart`,
      });
    } catch (error) {
      throw 'Error wrong api key...';
    }
  }

  return (
    <>
      <div className="w-full md:max-w-3xl mx-auto">
        <div className="p-4">
          <h1 className="text-3xl font-semibold tracking-tight mb-10 text-center">
            Cart{' '}
            <span className="font-normal">
              (
              {quantity === 1
                ? `${quantity || 0} item`
                : `${quantity || 0} items`}
              )
            </span>
          </h1>
          {/* <Link
          href="/"
          className="inline-flex items-center gap-2 pb-5 text-zinc-500 group hover:text-black transition-all ease-in-out"
        >
          <ArrowLeftIcon classname="h-5 group-hover:scale-105 transition-all ease-in-out" />
          Go back to the main page
        </Link> */}
          {!cart || cart?.length === 0 ? (
            <div className="flex flex-col items-center">
              <h4 className="text-xl font-semibold tracking-tight">
                Your cart is empty.
              </h4>
              <Button
                asChild
                className="text-white bg-blue-500 rounded-full mt-2 hover:bg-blue-600 transition-colors shadow-md"
              >
                <Link href="/">Continue shopping</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-12">
                <ul className="flex flex-col md:w-7/12">
                  {cart?.map((item: any, index) => {
                    const price = FormattedPrice(item?.price);
                    const color =
                      item?.color.charAt(0).toUpperCase() +
                      item?.color.slice(1);
                    const size = item?.size
                      ? ` / ${item?.size.toUpperCase()}`
                      : '';
                    const space = item?.space ? ` / ${item?.space}GB` : '';

                    return (
                      <div key={index}>
                        <li className="w-full flex flex-row justify-between">
                          <div className="flex flex-row gap-4">
                            <div className="flex items-center justify-center relative rounded-xl aspect-square bg-zinc-100 dark:bg-zinc-900">
                              {/* <DeleteItemCart id={user?.uid} item={item} /> */}
                              <Image
                                src={item?.image}
                                alt={item?.name}
                                width={96}
                                height={96}
                              />
                            </div>
                            <div className="flex flex-col items-start justify-between">
                              <div>
                                <h4 className="text-xl font-semibold tracking-tight">
                                  {item?.name}
                                </h4>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                  {`${color}${size}${space}`}
                                </p>
                              </div>
                              {/* <div className="flex items-center border rounded-full mt-2">
                            <EditItemQuantity item={item} type="minus" />
                            <p className="text-sm font-semibold">
                              {item?.quantity}
                            </p>
                            <EditItemQuantity item={item} type="plus" />
                          </div> */}
                              <p className="text-sm font-medium">{price}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end justify-between">
                            <div className="flex items-center border border-zinc-200 rounded-full dark:border-zinc-700">
                              <EditItemQuantity item={item} type="minus" />
                              <p className="text-sm font-semibold">
                                {item?.quantity}
                              </p>
                              <EditItemQuantity item={item} type="plus" />
                            </div>
                            {/* <p className="text-sm font-medium">{price}</p> */}
                            <DeleteItemCart id={user?.uid} item={item} />
                          </div>
                        </li>
                        <Separator className="my-4" />
                      </div>
                    );
                  })}
                </ul>
                <div className="text-base p-6 mt-6 md:mt-0 bg-zinc-100 rounded-3xl self-start w-full md:w-5/12 dark:bg-zinc-900">
                  <h4 className="text-xl font-semibold tracking-tight mb-6">
                    Order summary
                  </h4>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Subtotal</p>
                    <p className="text-sm">
                      {FormattedPrice(totalPrice?.toString())}
                    </p>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Total savings</p>
                    <p className="text-sm">$0.00 USD</p>
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
                    <p className="font-semibold">Estimated total</p>
                    <p className="font-semibold">
                      {FormattedPrice(totalPrice?.toString())}
                    </p>
                  </div>
                  <form onSubmit={handleCheckout}>
                    <Button
                      type="submit"
                      className="w-full rounded-full text-center text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                    >
                      Proceed to Checkout
                    </Button>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

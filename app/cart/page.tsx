'use client';

import Link from 'next/link';
import Image from 'next/image';
import EditItemQuantity from '@/components/edit-item-cart';
import DeleteItemCart from '@/components/delete-item-cart';
import Footer from '@/components/footer';
import useCartData from '@/lib/use-cart-data';
import FormattedPrice from '@/components/formatted-price';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51NoptQIF5Ewa0z1weAgAPPKYRio4rkIbNTYPuRPlXd3OdWsMaceCjCMNETTJSXp9yVsXpx6whtH8W4r0LGAIZ86L00YKiIUNvJ'
);

export default function Cart() {
  const { user } = useContext(AuthContext);
  const [cart] = useCartData(user?.uid);

  const quantity = cart?.reduce(
    (total, current: any) => total + current.quantity,
    0
  );

  const totalPrice = cart?.reduce(
    (total, current: any) =>
      total + Number.parseInt(current?.price, 10) * current?.quantity,
    0
  );

  async function handleCheckout(event: any) {
    event.preventDefault();

    const stripe = await stripePromise;

    const lineItems = cart.map((item: any) => {
      return { price: item?.price_id, quantity: item?.quantity };
    });

    try {
      await stripe?.redirectToCheckout({
        lineItems: lineItems,
        mode: 'payment',
        successUrl: `https://retro-store-app-alexb017.vercel.app/success`,
        cancelUrl: `https://retro-store-app-alexb017.vercel.app/cart`,
      });
    } catch (error) {
      throw 'Error wrong api key...';
    }
  }

  return (
    <>
      <div className="w-full md:max-w-3xl mx-auto">
        <div className="p-4">
          <h1 className="text-xl font-semibold mb-10 text-center">
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
          className="inline-flex items-center gap-2 pb-5 text-gray-500 group hover:text-black transition-all ease-in-out"
        >
          <ArrowLeftIcon classname="h-5 group-hover:scale-105 transition-all ease-in-out" />
          Go back to the main page
        </Link> */}
          {!cart || cart?.length === 0 ? (
            <div className="flex flex-col items-center">
              <h1 className="text-xl">Your cart is empty.</h1>
              <Link
                href="/"
                className="inline-flex text-sm text-white font-medium px-6 py-2 bg-blue-500 rounded-full mt-2 hover:bg-blue-600 transition-colors"
              >
                Continue shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-12">
                <ul className="flex flex-col md:w-7/12">
                  {cart?.map((item: any, index) => {
                    const price = FormattedPrice(item?.price);
                    const color = item?.color as string;

                    return (
                      <li
                        key={index}
                        className="w-full flex flex-row items-center justify-between py-6 border-b border-neutral-200 dark:border-neutral-700"
                      >
                        <div className="flex flex-row gap-4">
                          <div className="flex items-center justify-center relative rounded-3xl aspect-square bg-neutral-100 dark:bg-neutral-950">
                            {/* <DeleteItemCart id={user?.uid} item={item} /> */}
                            <Image
                              src={item?.image}
                              alt={item?.name}
                              width={96}
                              height={96}
                            />
                          </div>
                          <div className="flex flex-col items-start justify-center">
                            <h1 className="text-base font-semibold">
                              {item?.name}
                            </h1>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                              {item?.color && (
                                <>
                                  {' '}
                                  {color.charAt(0).toUpperCase() +
                                    color.slice(1)}{' '}
                                </>
                              )}{' '}
                              {item?.space && <> / {item?.space} GB </>}
                              {item?.size && (
                                <span className="uppercase">
                                  {' '}
                                  / {item?.size}
                                </span>
                              )}
                            </p>
                            {/* <div className="flex items-center border rounded-full mt-2">
                            <EditItemQuantity item={item} type="minus" />
                            <p className="text-sm font-semibold">
                              {item?.quantity}
                            </p>
                            <EditItemQuantity item={item} type="plus" />
                          </div> */}
                            <p className="text-sm mt-4 font-medium">{price}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center border border-neutral-200 rounded-full mb-4 dark:border-neutral-700">
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
                    );
                  })}
                </ul>
                <div className="text-base p-6 bg-neutral-100 rounded-3xl self-start w-full md:w-5/12 dark:bg-neutral-950">
                  <h1 className="text-xl font-semibold mb-6">Order summary</h1>
                  <div className="flex items-center justify-between border-b border-neutral-300 mb-3 pb-1 dark:border-neutral-700">
                    <p className="text-sm">Subtotal</p>
                    <p className="text-sm">
                      {FormattedPrice(totalPrice?.toString())}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-b border-neutral-300 mb-3 pb-1 dark:border-neutral-700">
                    <p className="text-sm">Total savings</p>
                    <p className="text-sm">$0.00 USD</p>
                  </div>
                  <div className="flex items-center justify-between border-b border-neutral-300 mb-3 pb-1 dark:border-neutral-700">
                    <p className="text-sm">Shipping</p>
                    <p className="text-sm">Free</p>
                  </div>
                  <div className="flex items-center justify-between border-b border-neutral-300 mb-3 pb-1 dark:border-neutral-700">
                    <p className="text-sm">Tax</p>
                    <p className="text-sm">Calculated at checkout</p>
                  </div>
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-sm font-semibold">Estimated total</p>
                    <p className="text-sm font-semibold">
                      {FormattedPrice(totalPrice?.toString())}
                    </p>
                  </div>
                  <form onSubmit={handleCheckout}>
                    <button
                      type="submit"
                      role="link"
                      className="w-full rounded-full p-3 text-center font-medium text-sm text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                    >
                      Proceed to Checkout
                    </button>
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

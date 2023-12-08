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
        successUrl: `http://localhost:3000/success`,
        cancelUrl: `http://localhost:3000/cart`,
      });
    } catch (error) {
      throw 'Error wrong api key...';
    }
  }

  return (
    <>
      <div className="p-4">
        <h1 className="text-4xl font-semibold mb-10 text-center">
          Shopping cart
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
            <h1 className="text-2xl">Your cart is empty.</h1>
            <Link
              href="/"
              className="inline-flex text-base text-white font-medium px-6 py-2 bg-blue-500 rounded-full mt-2 hover:bg-blue-600 transition-colors"
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
                      className="w-full flex flex-row items-center justify-between py-5 border-b border-gray-300"
                    >
                      <div className="flex flex-row gap-5">
                        <div className="flex items-center justify-center relative p-1 rounded-3xl aspect-square bg-gray-100">
                          <DeleteItemCart id={user?.uid} item={item} />
                          <Image
                            src={item?.image}
                            alt={item?.name}
                            width={120}
                            height={120}
                          />
                        </div>
                        <div className="flex flex-col items-start justify-center">
                          <h1 className="text-2xl font-semibold leading-none">
                            {item?.name}
                          </h1>
                          <p className="text-base text-gray-500">
                            {item?.color && (
                              <>
                                {' '}
                                {color.charAt(0).toUpperCase() +
                                  color.slice(1)}{' '}
                              </>
                            )}{' '}
                            {item?.space && <> / {item?.space} GB </>}
                            {item?.size && (
                              <span className="uppercase"> / {item?.size}</span>
                            )}
                          </p>
                          <p className="text-lg mt-2 font-medium">{price}</p>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        {/* <DeleteItemCart id={user?.uid} item={item} /> */}
                        <div className="flex items-center rounded-full bg-gray-100">
                          <EditItemQuantity item={item} type="minus" />
                          <p className="text-base font-semibold">
                            {item?.quantity}
                          </p>
                          <EditItemQuantity item={item} type="plus" />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="text-base p-4 bg-gray-100 rounded-3xl self-start w-full md:w-5/12">
                <h1 className="text-xl font-semibold mb-5">Your order</h1>
                <div className="flex items-center justify-between border-b border-gray-300 mb-3 pb-1">
                  <p className="text-sm">Taxes</p>
                  <p className="text-sm text-gray-500">$0.00 USD</p>
                </div>
                <div className="flex items-center justify-between border-b border-gray-300 mb-3 pb-1">
                  <p className="text-sm">Shipping</p>
                  <p className="text-sm text-gray-500">Free</p>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <p className="text-xl font-medium">Total</p>
                  <p className="text-xl font-medium">
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
      <Footer />
    </>
  );
}

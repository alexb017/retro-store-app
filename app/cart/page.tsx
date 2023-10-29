'use client';

import Link from 'next/link';
import ArrowLeftIcon from '@/components/icons/arrow-left';
import Image from 'next/image';
import EditItemQuantity from '@/components/edit-item-cart';
import DeleteItemCart from '@/components/delete-item-cart';
import Footer from '@/components/footer';
import useCartData from '@/lib/useCartData';
import FormattedPrice from '@/components/formatted-price';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { loadStripe } from '@stripe/stripe-js';

const stripeLoadedPromise = loadStripe(
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

  //console.log(cart);

  async function handleCheckout() {
    const stripe = await stripeLoadedPromise;

    const lineItems = cart.map((item: any) => {
      return { price: item?.price_id, quantity: item?.quantity };
    });

    try {
      await stripe?.redirectToCheckout({
        lineItems: lineItems,
        mode: 'payment',
        successUrl: `https://retro-store-app-alexb017.vercel.app/`,
        cancelUrl: `https://retro-store-app-alexb017.vercel.app/`,
      });
    } catch (error) {
      throw 'Error wrong api key...';
    }
  }

  return (
    <>
      <div className="p-5">
        <Link
          href="/"
          className="inline-flex items-center gap-2 pb-5 text-gray-500 group hover:text-black transition-all ease-in-out"
        >
          <ArrowLeftIcon classname="h-5 group-hover:scale-105 transition-all ease-in-out" />
          Go back to the main page
        </Link>
        {!cart || cart?.length === 0 ? (
          <>
            <h1 className="text-2xl">Your cart is empty.</h1>
          </>
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:justify-between gap-5">
              <ul className="flex flex-col md:w-7/12">
                {cart?.map((item: any, index) => {
                  const price = FormattedPrice(item?.price);

                  return (
                    <li
                      key={index}
                      className="w-full flex flex-row items-center justify-between py-5 border-b border-gray-300"
                    >
                      <div className="flex flex-row gap-5">
                        <div className="flex items-center justify-center p-1 rounded-3xl aspect-square bg-gray-100">
                          <Image
                            src={item?.image}
                            alt={item?.name}
                            width={120}
                            height={120}
                          />
                        </div>
                        <div className="flex flex-col items-start justify-center">
                          <div>
                            <h1 className="text-xl font-medium">
                              {item?.name}
                            </h1>
                            <p className="text-sm text-gray-500">
                              {item?.color && <> {item?.color} </>}{' '}
                              {item?.space && <> / {item?.space} GB </>}
                            </p>
                            <p className="text-xl font-medium mt-5">{price}</p>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <div className="flex items-center rounded-full bg-gray-100">
                          <EditItemQuantity item={item} type="minus" />
                          <p className="text-base">{item?.quantity}</p>
                          <EditItemQuantity item={item} type="plus" />
                        </div>
                        {/* <DeleteItemCart id={item.id} /> */}
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="text-sm p-5 bg-gray-100 rounded-3xl self-start md:w-5/12">
                <h1 className="text-xl font-medium mb-5">Your order</h1>
                <div className="flex items-center justify-between border-b border-gray-200 mb-5 pb-0.5">
                  <p className="text-gray-500">Taxes</p>
                  <p className="text-gray-500">$0.00 USD</p>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200 mb-5 pb-0.5">
                  <p className="text-gray-500">Shipping</p>
                  <p className="text-gray-500">Free</p>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200 mb-5 pb-0.5">
                  <p className="text-xl">Total</p>
                  <p className="text-xl">
                    {FormattedPrice(totalPrice?.toString())}
                  </p>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full rounded-full p-3 text-center font-medium text-xl text-white bg-blue-500"
                >
                  Procceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

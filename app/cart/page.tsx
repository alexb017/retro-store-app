import Link from 'next/link';
import ArrowLeftIcon from '@/components/icons/arrow-left';
import { getCart } from '@/lib/actions';
import Image from 'next/image';
import EditItemQuantity from '@/components/edit-item-cart';
import DeleteItemCart from '@/components/delete-item-cart';
import Footer from '@/components/footer';

export default async function Cart() {
  const cart: any[] = await getCart();

  const totalPrice = cart.reduce(
    (total, current) => total + Number.parseInt(current?.price, 10),
    0
  );

  console.log(cart);

  return (
    <>
      <div className="p-5">
        <Link
          href="/"
          className="inline-flex items-center gap-2 pb-5 text-neutral-500 group"
        >
          <ArrowLeftIcon classname="h-5 group-hover:scale-105 transition-all ease-in-out group-hover:text-black" />
          Go back to the main page
        </Link>
        {cart?.length === 0 ? (
          <>
            <h1 className="text-2xl">Your cart is empty.</h1>
          </>
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:justify-between md:gap-5">
              <ul className="flex flex-col md:w-4/6">
                {cart?.map((item, index) => {
                  const price = Number.parseInt(item?.price, 10);
                  let formattedPrice = null;

                  if (price < 100) {
                    formattedPrice = price.toFixed(2);
                  }

                  if (price >= 100 && price < 1000) {
                    formattedPrice = price;
                  }

                  if (price >= 1000 && price < 10000) {
                    formattedPrice = (price / 1000).toLocaleString('en-US');
                  }

                  return (
                    <li
                      key={index}
                      className="w-full flex flex-row justify-between border-b border-neutral-200 py-4"
                    >
                      <div className="flex flex-row gap-4">
                        <div className="flex items-center justify-center rounded-3xl aspect-square bg-neutral-100">
                          <Image
                            src={item?.image}
                            alt={item?.name}
                            width={120}
                            height={120}
                          />
                        </div>
                        <div className="flex flex-col items-start justify-between">
                          <div>
                            <h1 className="text-xl">{item?.name}</h1>
                            <p className="text-sm text-neutral-500">
                              {item?.color && <> {item?.color} </>}{' '}
                              {item?.space && <> / {item?.space} GB </>}
                            </p>
                          </div>
                          <div className="flex items-center border rounded-full border-neutral-200">
                            <EditItemQuantity item={item} type="minus" />
                            <p className="text-sm px-1">{item?.quantity}</p>
                            <EditItemQuantity item={item} type="plus" />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-between">
                        <p>${formattedPrice} USD</p>
                        <DeleteItemCart id={item.id} />
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="text-sm p-4 bg-neutral-100 rounded-3xl self-start md:w-4/12">
                <div className="flex items-center justify-between border-b border-neutral-200 mb-3 pb">
                  <p>Taxes</p>
                  <p>$0.00 USD</p>
                </div>
                <div className="flex items-center justify-between border-b border-neutral-200 mb-3 pb">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <div className="flex items-center justify-between border-b border-neutral-200 mb-3 pb">
                  <p>Total</p>
                  <p>${totalPrice} USD</p>
                </div>
                <button className="w-full rounded-full p-3 text-center font-medium text-sm text-white bg-blue-500">
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

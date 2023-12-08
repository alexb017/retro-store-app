import PlusIcon from './icons/plus';
import { getUserCart, setCartUser, addItemCart } from '@/lib/actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '../app/AuthContext';
import useCartData from '@/lib/use-cart-data';
import Link from 'next/link';

export default function AddToCart({ product }: { product: any }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const getColor = searchParams.get('color') || '';
  const getSpace = searchParams.get('space') || '';
  const getPrice = searchParams.get('price') || product?.price;
  const getSize = searchParams.get('size') || '';
  const imageIndex = getColor
    ? product?.imageUrls?.findIndex((img: any) => img.color === getColor)
    : 0;
  const colorId = getColor ? `-${getColor?.toLowerCase()}` : '';
  const spaceId = getSpace ? `-${getSpace?.toLowerCase()}` : '';
  const priceId = getPrice ? `-${getPrice?.toLowerCase()}` : '';
  const sizeId = getSize ? `-${getSize?.toLowerCase()}` : '';
  const id = product?.handle + `${colorId}${spaceId}${sizeId}${priceId}`;

  let defaultVariant = true;

  const data = {
    handle: id,
    name: product?.name,
    price: getPrice,
    color: getColor,
    space: getSpace,
    size: getSize,
    image: product?.imageUrls[imageIndex]?.url,
    quantity: 1,
    price_id: product?.price_id,
  };

  return (
    <>
      {!user ? (
        <button
          onClick={() => {
            console.log(data);
          }}
          className={`flex items-center justify-center gap-4 w-full p-4 rounded-full bg-blue-500 text-white font-medium hover:bg-blue-500/80 ${
            !defaultVariant
              ? 'cursor-not-allowed opacity-50'
              : 'cursor-pointer opacity-100'
          }`}
        >
          <PlusIcon classname="w-5 h-5" />
          Add item to cart
        </button>
      ) : (
        <button
          type="button"
          disabled={!defaultVariant}
          className={`flex items-center justify-center gap-4 w-full p-4 rounded-full bg-blue-500 text-white font-medium hover:bg-blue-500/80 transition-colors ${
            !defaultVariant ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
          }`}
          onClick={async () => {
            const userCart = await getUserCart(user?.uid);

            if (!userCart) {
              await setCartUser(user?.uid, { cart: [data] });
            }

            const existingProduct = userCart?.find(
              (product: any) => product?.handle === id
            );

            if (existingProduct) {
              return;
            }

            try {
              await addItemCart(user?.uid, data);
            } catch (error) {
              return 'Error adding new item to cart';
            }
          }}
        >
          <PlusIcon classname="w-5 h-5" />
          Add item to cart
        </button>
      )}
    </>
  );
}

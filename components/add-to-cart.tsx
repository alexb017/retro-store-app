import PlusIcon from './icons/plus';
import {
  getUserCart,
  setCartUser,
  addItemCart,
  updateItemCart,
} from '@/lib/actions';
import { useSearchParams } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '../app/AuthContext';
import Link from 'next/link';
import { Button } from './ui/button';
import { User } from 'firebase/auth';
import { type ProductInfoType } from '@/lib/types';

export default function AddToCart({
  product,
  disableBtn,
  classname,
}: {
  product: ProductInfoType;
  disableBtn: boolean;
  classname: string;
}) {
  console.log('cart', product);
  const { user } = useContext(AuthContext) as { user: User | null };
  const searchParams = useSearchParams();
  const searchParamColor = searchParams.get('color') || '';
  const searchParamSpace = searchParams.get('space') || '';
  const searchParamPrice = searchParams.get('price') || product?.price;
  const searchParamSize = searchParams.get('size') || '';
  const imageIndex: number =
    product?.colors?.findIndex(
      (color) => color?.toLowerCase() === searchParamColor
    ) ?? 0;
  const colorId = searchParamColor ? `-${searchParamColor?.toLowerCase()}` : '';
  const spaceId = searchParamSpace ? `-${searchParamSpace?.toLowerCase()}` : '';
  const priceId = searchParamPrice
    ? `-${searchParamPrice?.toString().toLowerCase()}`
    : '';
  const sizeId = searchParamSize ? `-${searchParamSize?.toLowerCase()}` : '';
  const id = product?.handle + `${colorId}${spaceId}${sizeId}${priceId}`;

  const data = {
    handle: id,
    name: product?.name,
    price: searchParamPrice || product?.price || '',
    color: searchParamColor || product?.colors || '',
    space: searchParamSpace || product?.storage || '',
    size: searchParamSize || product?.size || '',
    image: product?.images[imageIndex] || product?.images,
    quantity: 1,
    price_id: product?.price_id,
  };

  const classDefault =
    'flex items-center justify-center gap-2 w-full text-base p-4 h-auto rounded-full bg-blue-500 font-semibold tracking-tight text-white hover:bg-blue-600 transition-colors';
  const classFavorite =
    'flex items-center gap-2 text-sm rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 dark:text-zinc-400 dark:bg-zinc-900 dark:hover:bg-zinc-800';

  return (
    <>
      {!user ? (
        <Link
          href="/login"
          className="flex items-center justify-center gap-4 w-full p-4 rounded-full bg-blue-500 text-white font-semibold tracking-tight transition-colors hover:bg-blue-600"
        >
          Sign in & Check Out
        </Link>
      ) : (
        <Button
          disabled={disableBtn}
          className={`${
            classname === 'default' ? classDefault : classFavorite
          } ${
            disableBtn
              ? 'cursor-not-allowed opacity-50 disabled:cursor-not-allowed disabled:pointer-events-auto'
              : 'cursor-pointer'
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
              // Update item with new quantity
              const updateItem = userCart?.map((product: any) => {
                if (product?.handle === id) {
                  return { ...product, quantity: product?.quantity + 1 };
                }

                return product;
              });

              // Update db with new value
              await updateItemCart(user?.uid, updateItem);
            } else {
              await addItemCart(user?.uid, data);
            }
          }}
        >
          <PlusIcon classname="w-5 h-5" />
          Add item to cart
        </Button>
      )}
    </>
  );
}

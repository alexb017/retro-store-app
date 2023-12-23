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

export default function AddToCart({
  product,
  disableBtn,
  classname,
}: {
  product: any;
  disableBtn: any;
  classname: string;
}) {
  const { user } = useContext(AuthContext);
  const searchParams = useSearchParams();
  const searchParamColor = searchParams.get('color') || '';
  const searchParamSpace = searchParams.get('space') || '';
  const searchParamPrice = searchParams.get('price') || product?.price;
  const searchParamSize = searchParams.get('size') || '';
  const imageIndex = product?.colors?.findIndex(
    (color: any) => color?.toLowerCase() === searchParamColor
  );
  const colorId = searchParamColor ? `-${searchParamColor?.toLowerCase()}` : '';
  const spaceId = searchParamSpace ? `-${searchParamSpace?.toLowerCase()}` : '';
  const priceId = searchParamPrice ? `-${searchParamPrice?.toLowerCase()}` : '';
  const sizeId = searchParamSize ? `-${searchParamSize?.toLowerCase()}` : '';
  const id = product?.handle + `${colorId}${spaceId}${sizeId}${priceId}`;

  const data = {
    handle: id,
    name: product?.name,
    price: searchParamPrice || product?.price || '',
    color: searchParamColor || product?.color || '',
    space: searchParamSpace || product?.space || '',
    size: searchParamSize || product?.size || '',
    image: product?.images[imageIndex] || product?.image,
    quantity: 1,
    price_id: product?.price_id,
  };

  const classDefault =
    'flex items-center justify-center gap-2 w-full p-4 rounded-full bg-blue-500 text-sm text-white font-medium hover:bg-blue-500/80 transition-colors';
  const classFavorite = 'flex items-center gap-2 text-sm text-gray-500';

  return (
    <>
      {!user ? (
        <Link
          href="/login"
          className="flex items-center justify-center gap-4 w-full p-4 rounded-full bg-blue-500 text-white font-medium hover:bg-blue-500/80"
        >
          Sign in & Check Out
        </Link>
      ) : (
        <button
          type="button"
          disabled={disableBtn}
          className={`${
            classname === 'default' ? classDefault : classFavorite
          } ${disableBtn ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
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
        </button>
      )}
    </>
  );
}

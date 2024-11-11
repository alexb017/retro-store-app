import PlusIcon from './icons/plus';
import { createCart } from '@/lib/actions';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from './ui/button';
import { type ProductInfoType, type CartItem } from '@/lib/types';

export default function AddToCart({
  product,
  disableBtn,
  classname,
  uid,
}: {
  product: ProductInfoType;
  disableBtn: boolean;
  classname: string;
  uid: string;
}) {
  const searchParams = useSearchParams();
  const searchParamColor = searchParams.get('color') || '';
  const searchParamSpace = searchParams.get('space') || undefined;
  const searchParamPrice = Number(searchParams.get('price')) || product?.price;
  const searchParamSize = searchParams.get('size') || undefined;
  const colorId = searchParamColor ? `-${searchParamColor?.toLowerCase()}` : '';
  const spaceId = searchParamSpace ? `-${searchParamSpace?.toLowerCase()}` : '';
  const priceId = searchParamPrice
    ? `-${searchParamPrice?.toString().toLowerCase()}`
    : '';
  const sizeId = searchParamSize ? `-${searchParamSize?.toLowerCase()}` : '';
  const id = product?.handle + `${colorId}${spaceId}${sizeId}${priceId}`;

  // Get the index of the color to match the image
  // If the color is not found, return 0
  const imageIndex: number =
    product?.colors?.findIndex(
      (color) => color?.toLowerCase() === searchParamColor
    ) ?? 0;

  const classDefault =
    'flex items-center justify-center gap-2 w-full text-base p-4 h-auto rounded-full bg-blue-500 font-semibold tracking-tight text-white hover:bg-blue-600 transition-colors';
  const classFavorite =
    'flex items-center gap-2 text-sm rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 dark:text-zinc-400 dark:bg-zinc-900 dark:hover:bg-zinc-800';

  const cart: CartItem = {
    id: '',
    handle: id,
    name: product?.name,
    price: searchParamPrice,
    color: searchParamColor,
    space: searchParamSpace,
    size: searchParamSize,
    image: product?.images[imageIndex],
    quantity: 1,
    price_id: product?.price_id,
  };

  // Remove undefined values from the object
  const itemToAdd = Object.fromEntries(
    Object.entries(cart).filter(([_, value]) => value !== undefined)
  );

  return (
    <>
      <Button
        disabled={disableBtn}
        className={`${classname === 'default' ? classDefault : classFavorite} ${
          disableBtn
            ? 'cursor-not-allowed opacity-50 disabled:cursor-not-allowed disabled:pointer-events-auto'
            : 'cursor-pointer'
        }`}
        onClick={async () => {
          // Add item to cart
          await createCart(uid, itemToAdd);
        }}
      >
        <PlusIcon classname="w-5 h-5" />
        Add item to cart
      </Button>
    </>
  );
}

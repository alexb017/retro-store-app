import { PlusIcon } from '@heroicons/react/24/outline';
import { createCart, incrementQuantity } from '@/lib/actions';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from './ui/button';
import { type ProductInfoType, type CartItem } from '@/lib/types';
import useCartData from '@/lib/use-cart-data';

export default function AddToCart({
  item,
  disableBtn,
  classname,
  uid,
}: {
  item: ProductInfoType;
  disableBtn: boolean;
  classname: string;
  uid: string;
}) {
  const [cart] = useCartData(uid ?? '');
  const searchParams = useSearchParams();
  const searchParamColor = searchParams.get('color') || '';
  const searchParamSpace = searchParams.get('space') || undefined;
  const searchParamPrice = Number(searchParams.get('price')) || item?.price;
  const searchParamSize = searchParams.get('size') || undefined;
  const colorId = searchParamColor ? `-${searchParamColor?.toLowerCase()}` : '';
  const spaceId = searchParamSpace ? `-${searchParamSpace?.toLowerCase()}` : '';
  const priceId = searchParamPrice
    ? `-${searchParamPrice?.toString().toLowerCase()}`
    : '';
  const sizeId = searchParamSize ? `-${searchParamSize?.toLowerCase()}` : '';
  const id = item?.handle + `${colorId}${spaceId}${sizeId}${priceId}`;

  // Get the index of the color to match the image
  // If the color is not found, return 0
  const imageIndex: number =
    item?.colors?.findIndex(
      (color) => color?.toLowerCase() === searchParamColor
    ) ?? 0;

  const classDefault =
    'flex items-center justify-center gap-2 w-full text-base p-4 h-auto rounded-full bg-blue-600 font-semibold tracking-tight text-white hover:bg-blue-700';
  const classFavorite =
    'flex items-center gap-2 text-sm rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800';

  const cartItems: CartItem = {
    id_cart: '',
    handle: id,
    name: item?.name,
    price: searchParamPrice,
    color: searchParamColor,
    space: searchParamSpace,
    size: searchParamSize,
    image: item?.images[imageIndex],
    quantity: 1,
    price_id: item?.price_id,
  };

  // Remove undefined values from the object
  const itemToAdd = Object.fromEntries(
    Object.entries(cartItems).filter(([_, value]) => value !== undefined)
  );

  // Check if the item is already in the cart
  const itemAlreadyExist = cart?.find((item: CartItem) => item?.handle === id);

  return (
    <>
      <Button
        disabled={disableBtn}
        variant="default"
        className={`h-14 rounded-full ${
          disableBtn
            ? 'cursor-not-allowed bg-blue-600 opacity-50 disabled:cursor-not-allowed disabled:pointer-events-auto dark:text-white hover:bg-blue-600'
            : 'cursor-pointer bg-blue-600 hover:bg-blue-700 dark:text-white'
        }`}
        onClick={async () => {
          if (itemAlreadyExist) {
            await incrementQuantity(uid, itemAlreadyExist);
            return;
          }

          // Add item to cart
          await createCart(uid, itemToAdd);
        }}
      >
        <PlusIcon className="w-5 h-5" />
        Add item to cart
      </Button>
    </>
  );
}

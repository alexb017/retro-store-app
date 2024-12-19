import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { createFavorites } from '@/lib/actions';
import { usePathname, useSearchParams } from 'next/navigation';
import useFavoriteData from '@/lib/use-favorite-data';
import { deleteItemFavorite } from '@/lib/actions';
import { Button } from '../../../components/ui/button';
import { type ProductInfoType, type FavoriteItem } from '@/lib/types';

export default function AddToFavorite({
  product,
  disableBtn,
  uid,
}: {
  product: ProductInfoType;
  disableBtn: boolean;
  uid: string;
}) {
  const [favorites] = useFavoriteData(uid ?? '');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamColor = searchParams.get('color') || '';
  const searchParamSpace = searchParams.get('space') || undefined;
  const searchParamPrice = Number(searchParams.get('price')) || product?.price;
  const searchParamSize = searchParams.get('size') || undefined;

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

  const removeItemFavorite = favorites?.find((item) => item?.handle === id);

  const optionSearchParams = new URLSearchParams(searchParams.toString());
  const pathUrl = `${pathname}${
    optionSearchParams.toString().length ? '?' : ''
  }${optionSearchParams.toString()}`;

  const item: FavoriteItem = {
    id_favorite: '',
    handle: id,
    name: product?.name,
    price: searchParamPrice,
    color: searchParamColor,
    space: searchParamSpace,
    size: searchParamSize,
    image: product?.images[imageIndex],
    price_id: product?.price_id,
    path_url: pathUrl,
    favorite: true,
    quantity: 1,
  };

  const addToFavorite = Object.fromEntries(
    Object.entries(item).filter(([_, value]) => value !== undefined)
  );

  return (
    <>
      {!removeItemFavorite ? (
        <Button
          size="icon"
          disabled={disableBtn}
          className={`flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-100 h-10 w-10 text-neutral-500 hover:text-red-500 transition-all duration-200 ease-in dark:bg-neutral-900 dark:text-neutral-400 dark:hover:text-red-500 ${
            disableBtn
              ? 'cursor-not-allowed opacity-50 disabled:pointer-events-auto hover:text-neutral-500 dark:hover:text-neutral-400'
              : 'cursor-pointer'
          }`}
          onClick={async () => {
            // Add item to favorite
            await createFavorites(uid, addToFavorite);
          }}
        >
          <HeartIcon className="w-6 h-6" />
        </Button>
      ) : (
        <Button
          size="icon"
          className="flex items-center justify-center bg-neutral-100 hover:bg-neutral-100 h-10 w-10 rounded-full text-red-500 dark:bg-neutral-900 transition-all duration-200 ease-in"
          onClick={async () => {
            // Delete item from favorite
            await deleteItemFavorite(uid, removeItemFavorite?.id_favorite);
          }}
        >
          <HeartSolidIcon className="w-6 h-6" />
        </Button>
      )}
    </>
  );
}

import HeartIcon from './icons/heart';
import { createFavorites } from '@/lib/actions';
import { usePathname, useSearchParams } from 'next/navigation';
import useFavoriteData from '@/lib/use-favorite-data';
import DeleteItemFavorite from './delete-item-favorite';
import { Button } from './ui/button';
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
        <>
          <Button
            size="icon"
            disabled={disableBtn}
            className={`flex bg-transparent h-auto w-auto hover:bg-transparent text-zinc-500 hover:text-blue-500 transition-all dark:text-zinc-400 dark:hover:text-blue-500 ${
              disableBtn
                ? 'cursor-not-allowed opacity-50 disabled:pointer-events-auto'
                : 'cursor-pointer'
            }`}
            onClick={async () => {
              // Add item to favorite
              await createFavorites(uid, addToFavorite);
            }}
          >
            <HeartIcon classname="w-6 h-6" />
          </Button>
        </>
      ) : (
        <>
          <DeleteItemFavorite uid={uid} id={removeItemFavorite?.id_favorite} />
        </>
      )}
    </>
  );
}

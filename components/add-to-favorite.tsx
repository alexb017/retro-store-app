import { AuthContext } from '@/app/AuthContext';
import { useContext } from 'react';
import HeartIcon from './icons/heart';
import {
  addItemFavorite,
  getUserFavorite,
  setUserFavorite,
} from '@/lib/actions';
import { usePathname, useSearchParams } from 'next/navigation';
import useFavoriteData from '@/lib/use-favorite-data';
import DeleteItemFavorite from './delete-item-favorite';
import { Button } from './ui/button';

export default function AddToFavorite({
  product,
  disableBtn,
}: {
  product: any;
  disableBtn: any;
}) {
  const { user } = useContext(AuthContext);
  const [favorite] = useFavoriteData(user?.uid);
  const pathname = usePathname();
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

  const optionSearchParams = new URLSearchParams(searchParams.toString());
  const pathUrl = `${pathname}${
    optionSearchParams.toString().length ? '?' : ''
  }${optionSearchParams.toString()}`;

  const removeItem = favorite?.find((item: any) => item?.handle === id);

  const data = {
    handle: id,
    name: product?.name,
    price: searchParamPrice,
    color: searchParamColor,
    space: searchParamSpace,
    size: searchParamSize,
    image: product?.images[imageIndex],
    price_id: product?.price_id,
    pathUrl,
    favorite: true,
    images: product?.images,
  };

  return (
    <>
      {user ? (
        !removeItem ? (
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
                const userFavorite = await getUserFavorite(user?.uid);

                if (!userFavorite) {
                  await setUserFavorite(user?.uid, { favorite: [data] });
                }

                const existingProduct = userFavorite?.find(
                  (item: any) => item?.handle === id
                );

                if (existingProduct) {
                  return;
                } else {
                  await addItemFavorite(user?.uid, data);
                }
              }}
            >
              <HeartIcon classname="w-6 h-6" />
            </Button>
          </>
        ) : (
          <>
            <DeleteItemFavorite id={user?.uid} item={data} />
          </>
        )
      ) : null}
    </>
  );
}

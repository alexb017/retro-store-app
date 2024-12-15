'use client';

import useFavoriteData from '@/lib/use-favorite-data';
import { useContext } from 'react';
import { AuthContext } from '@/app/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { FormattedPrice } from '@/lib/utils';
import DeleteItemFavorite from '@/components/delete-item-favorite';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { User } from 'firebase/auth';
import { type FavoriteItem } from '@/lib/types';
import { HeartIcon, PlusIcon } from '@heroicons/react/24/outline';
import { createCart } from '@/lib/actions';
import useCartData from '@/lib/use-cart-data';
import { incrementQuantity } from '@/lib/actions';

export default function Favorite() {
  const { user } = useContext(AuthContext) as { user: User | null };
  const [favorites] = useFavoriteData(user?.uid ?? '');
  const [cart] = useCartData(user?.uid ?? '');

  const countFavorite = favorites?.length || 0;

  return (
    <div className="flex flex-col gap-8 p-5">
      {favorites?.length === 0 ? (
        <>
          <div className="flex flex-col items-center justify-center h-[calc(100vh-104px)]">
            <div className="flex flex-col items-center gap-4">
              <HeartIcon className="h-16 w-16 text-neutral-200 dark:text-neutral-700" />
              <div className="flex flex-col items-center gap-2">
                <h4 className="text-xl font-semibold tracking-tight">
                  Your favorites is empty.
                </h4>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/products">Continue shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-semibold tracking-tight text-center">
            Favorites{' '}
            <span className="font-light">
              (
              {countFavorite === 1
                ? `${countFavorite} item`
                : `${countFavorite} items`}
              )
            </span>
          </h2>
          <ul>
            {favorites?.map((fav: FavoriteItem, index: number) => {
              const color =
                fav?.color.charAt(0).toUpperCase() + fav?.color.slice(1);
              const size = fav?.size ? ` / ${fav?.size.toUpperCase()}` : '';
              const space = fav?.space ? ` / ${fav?.space}` : '';

              return (
                <li
                  key={index}
                  className={`w-full flex flex-col md:flex-row justify-between ${
                    index === 0
                      ? 'pb-4'
                      : 'border-t border-neutral-200 py-4 dark:border-neutral-800'
                  }`}
                >
                  <div className="flex flex-row gap-4">
                    <div className="flex items-center justify-center w-32 h-32 aspect-square">
                      <Image
                        src={fav?.image}
                        alt={fav?.name}
                        width={128}
                        height={128}
                      />
                    </div>
                    <div className="flex flex-col pt-4">
                      <div className="flex flex-col items-start">
                        <h3 className="text-2xl font-semibold tracking-tight">
                          {`${fav?.name} - ${color}${size}${space}`}
                        </h3>
                        <Link
                          href={fav?.path_url ?? '/'}
                          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                        >
                          Show product details
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end gap-2 pb-4 md:pb-0 md:pt-4 pl-[calc(128px+16px)]">
                    <div className="flex flex-col md:items-end">
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Price
                      </p>
                      <h3 className="text-2xl font-semibold tracking-tight">
                        {FormattedPrice(fav?.price)}
                      </h3>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        className="h-4 p-0 text-blue-600 dark:text-blue-400"
                        variant="link"
                        onClick={async () => {
                          const itemAlreadyExist = cart?.find(
                            (item) => item?.id_favorite === fav?.id_favorite
                          );

                          if (itemAlreadyExist) {
                            await incrementQuantity(
                              user?.uid ?? '',
                              itemAlreadyExist
                            );
                            return;
                          }

                          // Add item to cart
                          await createCart(user?.uid ?? '', fav);
                        }}
                      >
                        Add to Cart
                      </Button>
                      <DeleteItemFavorite
                        uid={user?.uid ?? ''}
                        id={fav?.id_favorite}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

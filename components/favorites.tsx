'use client';

import useFavoriteData from '@/lib/use-favorite-data';
import { useContext } from 'react';
import { AuthContext } from '@/app/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { FormattedPrice } from '@/lib/utils';
import DeleteItemFavorite from '@/components/delete-item-favorite';
import { Button } from '@/components/ui/button';
import { User } from 'firebase/auth';
import { type FavoriteItem } from '@/lib/types';
import PlusIcon from '@/components/icons/plus';
import { createCart } from '@/lib/actions';
import useCartData from '@/lib/use-cart-data';
import { incrementQuantity } from '@/lib/actions';
import { Heart, Plus } from 'lucide-react';

export default function Favorites() {
  const { user } = useContext(AuthContext) as { user: User | null };
  const [favorites] = useFavoriteData(user?.uid ?? '');
  const [cart] = useCartData(user?.uid ?? '');

  const f = [];

  return (
    <>
      {favorites?.length === 0 ? (
        <>
          <div className="flex flex-col items-center gap-4">
            <Heart className="w-16 h-16 text-zinc-300 dark:text-zinc-700" />
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-xl font-semibold tracking-tight">
                Your favorites is empty.
              </h3>
              <Button
                asChild
                className="text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors shadow-md"
              >
                <Link href="/">Continue shopping</Link>
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <h4 className="text-3xl font-semibold tracking-tight text-center">
            Favorites{' '}
            <span className="font-light">
              (
              {favorites?.length === 1
                ? `${favorites?.length} item`
                : `${favorites?.length} items`}
              )
            </span>
          </h4>
          <ul className="flex flex-col gap-1">
            {favorites?.map((fav: FavoriteItem, index: number) => {
              const color =
                fav?.color.charAt(0).toUpperCase() + fav?.color.slice(1);
              const size = fav?.size ? ` / ${fav?.size.toUpperCase()}` : '';
              const space = fav?.space ? ` / ${fav?.space}GB` : '';

              return (
                <li
                  key={index}
                  className="w-full flex flex-row items-center justify-between bg-white p-4 rounded-xl dark:bg-neutral-900"
                >
                  <div className="flex flex-row items-center gap-4">
                    <div className="flex items-center justify-center aspect-square">
                      <Image
                        src={fav?.image}
                        alt={fav?.name}
                        width={64}
                        height={64}
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="flex items-center gap-4">
                        <h4 className="text-xl font-semibold tracking-tight">
                          {fav?.name}
                        </h4>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          {FormattedPrice(fav?.price)}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">{`${color}${size}${space}`}</p>
                      </div>
                      <div className="flex items-center">
                        <Link
                          href={fav?.path_url ?? '/'}
                          className="text-xs text-blue-500 border-b border-neutral-500 dark:text-blue-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 ease-in"
                        >
                          See item details
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end gap-2 md:items-center">
                    <DeleteItemFavorite
                      uid={user?.uid ?? ''}
                      id={fav?.id_favorite}
                    />
                    <Button
                      className="text-xs text-white rounded-full dark:bg-neutral-800 dark:hover:bg-neutral-700"
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
                      <Plus className="w-4 h-4" />
                      Add to Cart
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

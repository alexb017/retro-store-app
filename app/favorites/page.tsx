'use client';

import Footer from '@/components/footer';
import useFavoriteData from '@/lib/use-favorite-data';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import AddToCart from '@/components/add-to-cart';
import { FormattedPrice } from '@/lib/utils';
import DeleteItemFavorite from '@/components/delete-item-favorite';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { User } from 'firebase/auth';
import { type FavoriteItem } from '@/lib/types';
import PlusIcon from '@/components/icons/plus';
import { createCart } from '@/lib/actions';
import useCartData from '@/lib/use-cart-data';
import { incrementQuantity } from '@/lib/actions';

export default function Favorite() {
  const { user } = useContext(AuthContext) as { user: User | null };
  const [favorites] = useFavoriteData(user?.uid ?? '');
  const [cart] = useCartData(user?.uid ?? '');

  const countFavorite = favorites?.length || 0;

  return (
    <>
      <div className="w-full md:max-w-3xl mx-auto">
        <div className="p-4">
          <h1 className="text-3xl font-semibold tracking-tight mb-10 text-center">
            Favorites{' '}
            <span className="font-normal">
              (
              {countFavorite === 1
                ? `${countFavorite} item`
                : `${countFavorite} items`}
              )
            </span>
          </h1>
          {!favorites || favorites?.length === 0 ? (
            <>
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold tracking-tight">
                  Your favorites is empty.
                </h3>
                <Button
                  asChild
                  className="text-white bg-blue-500 rounded-full mt-2 hover:bg-blue-600 transition-colors shadow-md"
                >
                  <Link href="/">Continue shopping</Link>
                </Button>
              </div>
            </>
          ) : (
            <>
              <ul>
                {favorites?.map((fav: FavoriteItem, index: number) => {
                  const color =
                    fav?.color.charAt(0).toUpperCase() + fav?.color.slice(1);
                  const size = fav?.size ? ` / ${fav?.size.toUpperCase()}` : '';
                  const space = fav?.space ? ` / ${fav?.space}GB` : '';

                  return (
                    <div key={index}>
                      <li className="w-full flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center gap-4">
                          <div className="flex items-center justify-center relative rounded-xl aspect-square bg-zinc-100 dark:bg-zinc-900">
                            <Image
                              src={fav?.image}
                              alt={fav?.name}
                              width={80}
                              height={80}
                            />
                          </div>
                          <div className="flex flex-col items-start">
                            <div className="flex flex-col items-start md:flex-row md:items-center md:gap-4">
                              <h4 className="text-xl font-semibold tracking-tight">
                                {fav?.name}
                              </h4>
                              <p className="text-sm text-zinc-500 dark:text-zinc-400">{`${color}${size}${space}`}</p>
                              <p className="text-sm">
                                {FormattedPrice(fav?.price)}
                              </p>
                              {/* <DeleteItemFavorite id={user?.uid} item={fav} /> */}
                            </div>
                            <Link
                              href={fav?.path_url ?? '/'}
                              className="text-sm text-blue-500 border-b border-zinc-500 hover:border-zinc-900 dark:text-blue-400 dark:hover:border-zinc-400"
                            >
                              See Item
                            </Link>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 md:flex-row md:items-center md:gap-4">
                          <DeleteItemFavorite
                            uid={user?.uid ?? ''}
                            id={fav?.id_favorite}
                          />
                          <Button
                            className="text-white bg-zinc-900 rounded-full hover:bg-blue-600 transition-colors shadow-md"
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
                            <PlusIcon classname="h-4 w-4" />
                            Add to Cart
                          </Button>
                        </div>
                      </li>
                      <Separator className="my-4" />
                    </div>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

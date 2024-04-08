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

export default function Favorite() {
  const { user } = useContext(AuthContext);
  const [favorite] = useFavoriteData(user?.uid);

  const countFavorite = favorite?.length || 0;

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
          {!favorite || favorite?.length === 0 ? (
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
                {favorite?.map((fav: any, index) => {
                  const color =
                    fav?.color.charAt(0).toUpperCase() + fav?.color.slice(1);
                  const size = fav?.size ? ` / ${fav?.size.toUpperCase()}` : '';
                  const space = fav?.space ? ` / ${fav?.space}GB` : '';

                  return (
                    <>
                      <li
                        key={index}
                        className="w-full flex flex-row items-center justify-between"
                      >
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
                              href={fav?.pathUrl}
                              className="text-sm text-blue-500 border-b border-zinc-500 hover:border-zinc-900 dark:text-blue-400 dark:hover:border-zinc-400"
                            >
                              See Item
                            </Link>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 md:flex-row md:items-center md:gap-4">
                          <DeleteItemFavorite id={user?.uid} item={fav} />
                          <AddToCart
                            product={fav}
                            disableBtn={null}
                            classname="favorite"
                          />
                        </div>
                      </li>
                      <Separator className="my-4" />
                    </>
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

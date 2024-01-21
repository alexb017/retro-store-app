'use client';

import Footer from '@/components/footer';
import useFavoriteData from '@/lib/use-favorite-data';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import AddToCart from '@/components/add-to-cart';
import FormattedPrice from '@/components/formatted-price';
import DeleteItemFavorite from '@/components/delete-item-favorite';

export default function Favorite() {
  const { user } = useContext(AuthContext);
  const [favorite] = useFavoriteData(user?.uid);

  const countFavorite = favorite?.length || 0;

  return (
    <>
      <div className="w-full md:max-w-3xl mx-auto">
        <div className="p-4">
          <h1 className="text-xl font-semibold mb-10 text-center">
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
                <h1 className="text-xl">Your favorites is empty.</h1>
                <Link
                  href="/"
                  className="inline-flex text-sm text-white font-medium px-6 py-2 bg-blue-500 rounded-full mt-2 hover:bg-blue-600 transition-colors"
                >
                  Continue shopping
                </Link>
              </div>
            </>
          ) : (
            <>
              <ul>
                {favorite?.map((fav: any, index) => {
                  return (
                    <li
                      key={index}
                      className="w-full flex flex-row items-center justify-between py-6 border-b border-neutral-200 dark:border-neutral-700"
                    >
                      <div className="flex flex-row items-center gap-4">
                        <div className="flex items-center justify-center relative rounded-xl aspect-square bg-neutral-100 dark:bg-neutral-950">
                          <Image
                            src={fav?.image}
                            alt={fav?.name}
                            width={64}
                            height={64}
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex flex-col items-start md:flex-row md:items-center md:gap-4">
                            <h1>{fav?.name}</h1>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">{`${
                              fav?.color.charAt(0).toUpperCase() +
                              fav?.color.slice(1)
                            } / ${fav?.size.toUpperCase()}${
                              fav?.space ? `${fav?.space}GB` : ''
                            }`}</p>
                            <p className="text-sm">
                              {FormattedPrice(fav?.price)}
                            </p>
                            {/* <DeleteItemFavorite id={user?.uid} item={fav} /> */}
                          </div>
                          <p className="text-sm">
                            <Link
                              href={fav?.pathUrl}
                              className="text-blue-500 border-b border-neutral-500 hover:border-neutral-900 dark:text-blue-400 dark:hover:border-neutral-400"
                            >
                              See Item
                            </Link>
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 md:flex-row md:items-center md:gap-4">
                        <AddToCart
                          product={fav}
                          disableBtn={null}
                          classname="favorite"
                        />
                        <DeleteItemFavorite id={user?.uid} item={fav} />
                      </div>
                    </li>
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

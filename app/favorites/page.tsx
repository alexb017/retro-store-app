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

  const countFavorite = favorite?.length;

  return (
    <>
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
                    className="w-full flex flex-row items-center justify-between py-6 border-b border-gray-200"
                  >
                    <div className="flex flex-row items-center gap-4">
                      <div className="flex items-center justify-center relative rounded-md aspect-square bg-gray-50">
                        <Image
                          src={fav?.image}
                          alt={fav?.name}
                          width={64}
                          height={64}
                        />
                      </div>
                      <h1>{fav?.name}</h1>
                      <p className="text-sm text-gray-500">{`${
                        fav?.color.charAt(0).toUpperCase() + fav?.color.slice(1)
                      }/${fav?.size.toUpperCase()}${
                        fav?.space ? `${fav?.space}GB` : ''
                      }`}</p>
                      <p className="text-sm">{FormattedPrice(fav?.price)}</p>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                      <Link
                        href={fav?.pathUrl}
                        className="text-sm text-blue-700 underline w-28"
                      >
                        Link Item
                      </Link>
                      <DeleteItemFavorite id={user?.uid} item={fav} />
                      <AddToCart product={fav} disableBtn={null} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

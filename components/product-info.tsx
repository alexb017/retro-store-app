'use client';

import { useContext, useState, useCallback } from 'react';
import AddToCart from './add-to-cart';
import FormattedPrice from './formatted-price';
import { AuthContext } from '@/app/AuthContext';
import Link from 'next/link';
import {
  usePathname,
  useRouter,
  useSearchParams,
  ReadonlyURLSearchParams,
} from 'next/navigation';
import AddToFavorite from './add-to-favorite';

export default function ProductInfo({ product }: { product: any }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamColor = searchParams.get('color') || '';
  const searchParamSpace = searchParams.get('space') || '';
  const searchParamPrice = searchParams.get('price') || '';
  const searchParamSize = searchParams.get('size') || '';

  let formattedPrice = FormattedPrice(product?.price);

  function createUrl(
    pathname: string,
    params: URLSearchParams | ReadonlyURLSearchParams
  ) {
    const paramsString = params.toString();
    const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

    return `${pathname}${queryString}`;
  }

  let disableBtn = true;

  if (searchParamColor !== '' && searchParamSpace !== '') {
    disableBtn = false;
  }

  if (searchParamColor !== '' && searchParamSize !== '') {
    disableBtn = false;
  }

  if (searchParamColor !== '' && !product?.storage && !product?.size) {
    disableBtn = false;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-semibold">{product?.name}</h1>
          <AddToFavorite product={product} disableBtn={disableBtn} />
        </div>
        <p className="text-gray-500 text-2xl font-medium">{formattedPrice}</p>
      </div>
      {product?.colors?.length > 0 || product?.storage?.length > 0 ? (
        <div className="h-[1px] w-full block bg-gray-200"></div>
      ) : null}
      {product?.colors?.length > 0 && (
        <div>
          <h3 className="text-base mb-2">Choose your color</h3>
          <div className="flex items-center gap-2">
            {product?.colors?.map((color: string) => {
              const isActive = color.toLowerCase() === searchParamColor;
              const classname =
                'text-sm font-medium border-2 rounded-full py-1 px-4 hover:border-blue-500 transition-all';

              const optionSearchParams = new URLSearchParams(
                searchParams.toString()
              );

              optionSearchParams.set('color', color.toLowerCase());

              const optionUrl = createUrl(pathname, optionSearchParams);

              return (
                <button
                  onClick={() => {
                    router.replace(optionUrl, { scroll: false });
                  }}
                  key={color}
                  type="button"
                  className={
                    isActive
                      ? `${classname} border-blue-500 bg-blue-50`
                      : `${classname} border-gray-200`
                  }
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {product?.storage?.length > 0 && (
        <div>
          <h3 className="text-base mb-2">Choose your storage space</h3>
          <div className="flex items-center flex-wrap gap-2">
            {product?.storage?.map((storage: any, index: number) => {
              const isActive = storage?.space === searchParamSpace;
              const classname =
                'flex items-center justify-center text-sm border-2 rounded-2xl aspect-square w-24 h-24 hover:border-blue-500 transition-all';

              let formattedPrice = FormattedPrice(storage?.price);

              const optionSearchParams = new URLSearchParams(
                searchParams.toString()
              );

              optionSearchParams.set('space', storage?.space);
              optionSearchParams.set('price', storage?.price);

              const optionUrl = createUrl(pathname, optionSearchParams);

              return (
                <button
                  onClick={() => {
                    router.replace(optionUrl, { scroll: false });
                  }}
                  key={index}
                  type="button"
                  className={
                    isActive
                      ? `${classname} border-blue-500 bg-blue-50`
                      : `${classname} border-gray-200`
                  }
                >
                  <div className="flex flex-col items-center">
                    <h3 className="font-medium">{storage?.space} GB</h3>
                    <p className="text-xs text-gray-500">{formattedPrice}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
      {product?.size?.length > 0 && (
        <div>
          <h3 className="text-base mb-2">Choose your size</h3>
          <div className="flex items-center flex-wrap gap-2">
            {product?.size?.map((size: string) => {
              const isActive = size === searchParamSize;
              const classname =
                'text-sm font-medium uppercase border-2 rounded-full py-1 px-4 hover:border-blue-500 transition-all';

              const optionSearchParams = new URLSearchParams(
                searchParams.toString()
              );

              optionSearchParams.set('size', size);

              const optionUrl = createUrl(pathname, optionSearchParams);

              return (
                <button
                  onClick={() => {
                    router.replace(optionUrl, { scroll: false });
                  }}
                  key={size}
                  type="button"
                  className={
                    isActive
                      ? `${classname} border-blue-500 bg-blue-50`
                      : `${classname} border-gray-200`
                  }
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <AddToCart product={product} disableBtn={disableBtn} />
      <div>
        <h3 className="text-sm">Description</h3>
        <p className="text-base mt-2">{product?.description}</p>
      </div>
      {/* {!user && (
        <p className="text-sm text-gray-500">
          You must be{' '}
          <Link href="/login" className="underline">
            sign in
          </Link>{' '}
          to buy.
        </p>
      )} */}
    </div>
  );
}

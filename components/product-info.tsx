'use client';

import { useContext, useState, useCallback } from 'react';
import AddToCart from './add-to-cart';
import { FormattedPrice } from '../lib/utils';
import { AuthContext } from '@/app/AuthContext';
import Link from 'next/link';
import {
  usePathname,
  useRouter,
  useSearchParams,
  ReadonlyURLSearchParams,
} from 'next/navigation';
import AddToFavorite from './add-to-favorite';
import { createUrl } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
          <h1 className="text-4xl font-extrabold tracking-tight">
            {product?.name}
          </h1>
          <AddToFavorite product={product} disableBtn={disableBtn} />
        </div>
        <p className="text-zinc-500 text-2xl font-semibold tracking-tight dark:text-zinc-400">
          {formattedPrice}
        </p>
      </div>
      {product?.colors?.length > 0 || product?.storage?.length > 0 ? (
        <div className="h-[1px] w-full block bg-zinc-200 dark:bg-zinc-700"></div>
      ) : null}
      {product?.colors?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold tracking-tight mb-2">
            Choose your color
          </h3>
          <div className="flex items-center gap-2">
            {product?.colors?.map((color: string) => {
              const isActive = color.toLowerCase() === searchParamColor;
              const classname =
                'text-sm font-medium border-2 text-black dark:text-white rounded-full hover:border-blue-500 transition-all dark:hover:border-blue-500';

              const optionSearchParams = new URLSearchParams(
                searchParams.toString()
              );

              optionSearchParams.set('color', color.toLowerCase());

              const optionUrl = createUrl(pathname, optionSearchParams);

              return (
                <Button
                  onClick={() => {
                    router.replace(optionUrl, { scroll: false });
                  }}
                  key={color}
                  className={
                    isActive
                      ? `${classname} border-blue-500 bg-blue-50 hover:bg-blue-50 dark:bg-blue-950`
                      : `${classname} border-zinc-200 bg-transparent hover:bg-transparent dark:border-zinc-700`
                  }
                >
                  {color}
                </Button>
              );
            })}
          </div>
        </div>
      )}
      {product?.storage?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold tracking-tight mb-2">
            Choose your storage space
          </h3>
          <div className="flex items-center flex-wrap gap-2">
            {product?.storage?.map((storage: any, index: number) => {
              const isActive = storage?.space === searchParamSpace;
              const classname =
                'flex items-center justify-center text-sm border-2 text-black dark:text-white rounded-xl aspect-square w-24 h-24 hover:border-blue-500 transition-all dark:hover:border-blue-500';

              let formattedPrice = FormattedPrice(storage?.price);

              const optionSearchParams = new URLSearchParams(
                searchParams.toString()
              );

              optionSearchParams.set('space', storage?.space);
              optionSearchParams.set('price', storage?.price);

              const optionUrl = createUrl(pathname, optionSearchParams);

              return (
                <Button
                  onClick={() => {
                    router.replace(optionUrl, { scroll: false });
                  }}
                  key={index}
                  className={
                    isActive
                      ? `${classname} border-blue-500 bg-blue-50 hover:bg-blue-50 dark:bg-blue-950`
                      : `${classname} border-zinc-200 bg-transparent hover:bg-transparent dark:border-zinc-700`
                  }
                >
                  <div className="flex flex-col items-center">
                    <h3 className="font-medium">{storage?.space} GB</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {formattedPrice}
                    </p>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      )}
      {product?.size?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold tracking-tight mb-2">
            Choose your size
          </h3>
          <div className="flex items-center flex-wrap gap-2">
            {product?.size?.map((size: string) => {
              const isActive = size === searchParamSize;
              const classname =
                'text-sm font-medium uppercase border-2 text-black dark:text-white rounded-full py-1 px-4 hover:border-blue-500 transition-all dark:hover:border-blue-500';

              const optionSearchParams = new URLSearchParams(
                searchParams.toString()
              );

              optionSearchParams.set('size', size);

              const optionUrl = createUrl(pathname, optionSearchParams);

              return (
                <Button
                  onClick={() => {
                    router.replace(optionUrl, { scroll: false });
                  }}
                  key={size}
                  className={
                    isActive
                      ? `${classname} border-blue-500 bg-blue-50 hover:bg-blue-50 dark:bg-blue-950`
                      : `${classname} border-zinc-200 bg-transparent hover:bg-transparent dark:border-zinc-700`
                  }
                >
                  {size}
                </Button>
              );
            })}
          </div>
        </div>
      )}
      <AddToCart
        product={product}
        disableBtn={disableBtn}
        classname="default"
      />
      <div>
        <h3 className="text-xl font-semibold tracking-tight mb-1">
          Description
        </h3>
        <p className="text-sm">{product?.description}</p>
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

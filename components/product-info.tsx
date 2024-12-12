'use client';

import AddToCart from './add-to-cart';
import { FormattedPrice } from '../lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import AddToFavorite from './add-to-favorite';
import { createUrl } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { type ProductInfoType } from '@/lib/types';
import { useContext } from 'react';
import { AuthContext } from '@/app/AuthContext';
import { User } from 'firebase/auth';
import Link from 'next/link';
import { Separator } from './ui/separator';
import {
  ShieldCheckIcon,
  ArchiveBoxIcon,
  PhoneArrowUpRightIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

export default function ProductInfo({ product }: { product: ProductInfoType }) {
  const { user } = useContext(AuthContext) as { user: User | null };
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamColor = searchParams.get('color') || '';
  const searchParamSpace = searchParams.get('space') || '';
  const searchParamSize = searchParams.get('size') || '';

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
          {user && (
            <AddToFavorite
              product={product}
              disableBtn={disableBtn}
              uid={user?.uid}
            />
          )}
        </div>
        <h3 className="text-neutral-500 text-2xl font-semibold tracking-tight dark:text-neutral-400">
          {FormattedPrice(product?.price)}
        </h3>
      </div>
      {(product?.colors?.length ?? 0) > 0 ||
      (product?.storage?.length ?? 0) > 0 ? (
        <Separator />
      ) : null}
      {(product?.colors?.length ?? 0) > 0 && (
        <div>
          <h4 className="text-xl font-semibold tracking-tight mb-2">
            Choose your color
          </h4>
          <div className="flex items-center gap-2">
            {product?.colors?.map((color) => {
              const isActive = color.toLowerCase() === searchParamColor;

              const optionSearchParams = new URLSearchParams(
                searchParams.toString()
              );

              optionSearchParams.set('color', color.toLowerCase());

              const optionUrl = createUrl(pathname, optionSearchParams);

              return (
                <Button
                  variant="outline"
                  onClick={() => {
                    router.replace(optionUrl, { scroll: false });
                  }}
                  key={color}
                  className={`px-5 rounded-full border-2 ${
                    isActive ? `border-blue-600` : ``
                  }`}
                >
                  {color}
                </Button>
              );
            })}
          </div>
        </div>
      )}
      {(product?.storage?.length ?? 0) > 0 && (
        <div>
          <h4 className="text-xl font-semibold tracking-tight mb-2">
            Choose your storage space
          </h4>
          <div className="flex items-center flex-wrap gap-2">
            {product?.storage?.map((storage, index) => {
              const storageSpace =
                Number.parseInt(storage?.space, 10) !== 1
                  ? `${storage?.space}GB`
                  : `${storage?.space}TB`;

              const isActive = storageSpace === searchParamSpace;

              const optionSearchParams = new URLSearchParams(
                searchParams.toString()
              );

              optionSearchParams.set('space', storageSpace);
              optionSearchParams.set('price', storage?.price.toString());

              const optionUrl = createUrl(pathname, optionSearchParams);

              return (
                <Button
                  variant="outline"
                  onClick={() => {
                    router.replace(optionUrl, { scroll: false });
                  }}
                  key={index}
                  className={`px-5 rounded-2xl aspect-square w-24 h-24 border-2 ${
                    isActive ? `border-blue-600` : ``
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <h3 className="font-medium">
                      {storage?.space}{' '}
                      {Number.parseInt(storage?.space, 10) !== 1 ? 'GB' : 'TB'}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {FormattedPrice(storage?.price)}
                    </p>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      )}
      {(product?.size?.length ?? 0) > 0 && (
        <div>
          <h4 className="text-xl font-semibold tracking-tight mb-2">
            Choose your size
          </h4>
          <div className="flex items-center flex-wrap gap-2">
            {product?.size?.map((size: string) => {
              const isActive = size === searchParamSize;

              const optionSearchParams = new URLSearchParams(
                searchParams.toString()
              );

              optionSearchParams.set('size', size);

              const optionUrl = createUrl(pathname, optionSearchParams);

              return (
                <Button
                  variant="outline"
                  onClick={() => {
                    router.replace(optionUrl, { scroll: false });
                  }}
                  key={size}
                  className={`px-5 rounded-full uppercase border-2 ${
                    isActive ? `border-blue-600` : ``
                  }`}
                >
                  {size}
                </Button>
              );
            })}
          </div>
        </div>
      )}
      {!user ? (
        <Button
          asChild
          variant="default"
          className="h-14 rounded-full bg-blue-600 hover:bg-blue-700 dark:text-white"
        >
          <Link href="/sign-in">Sign in & Check Out</Link>
        </Button>
      ) : (
        <AddToCart
          item={product}
          disableBtn={disableBtn}
          classname="default"
          uid={user?.uid}
        />
      )}
      <div>
        <h4 className="text-xl font-semibold tracking-tight mb-1">
          Description
        </h4>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {product?.description}
        </p>
      </div>
      <div className="flex flex-col w-full">
        <Link href="#" className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="w-5 h-5" />
            <p>Warranty</p>
          </div>
          <ArrowRightIcon className="w-5 h-5" />
        </Link>
        <Separator />
        <Link href="#" className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <ArchiveBoxIcon className="w-5 h-5" />
            <p>Shipping & delivery</p>
          </div>
          <ArrowRightIcon className="w-5 h-5" />
        </Link>
        <Separator />
        <Link href="#" className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <PhoneArrowUpRightIcon className="w-5 h-5" />
            <p>Support</p>
          </div>
          <ArrowRightIcon className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

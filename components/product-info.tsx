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

  const hasStorage = (product?.storage?.length ?? 0) > 0;
  const hasSizes = (product?.size?.length ?? 0) > 0;
  const hasColors = (product?.colors?.length ?? 0) > 0;

  const priceLabel = hasStorage ? 'From' : '';
  const formattedPrice = FormattedPrice(product?.price);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-semibold tracking-tight">
            {product?.name}
          </h2>
          {user && (
            <AddToFavorite
              product={product}
              disableBtn={disableBtn}
              uid={user?.uid}
            />
          )}
        </div>
        <p className="text-sm">{product?.description}</p>
        <h4 className="text-2xl font-semibold tracking-tight">
          {priceLabel} {formattedPrice}
        </h4>
      </div>

      {hasColors || hasStorage ? <Separator /> : null}

      {hasColors && (
        <div>
          <p className="text-base font-semibold tracking-tight mb-2">
            Choose your color
          </p>
          <div className="flex items-center flex-wrap gap-2">
            {product?.colors?.map((color) => {
              const isActive = color.toLowerCase() === searchParamColor;

              const optionSearchParams = new URLSearchParams(
                searchParams.toString()
              );

              optionSearchParams.set('color', color.toLowerCase());

              const optionUrl = createUrl(pathname, optionSearchParams);

              return (
                <Button
                  variant="secondary"
                  onClick={() => {
                    router.replace(optionUrl, { scroll: false });
                  }}
                  key={color}
                  className={`px-6 rounded-full ${
                    isActive
                      ? `bg-black text-white hover:bg-black dark:text-black dark:bg-white dark:hover:bg-white`
                      : ``
                  }`}
                >
                  {color}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {hasStorage || hasSizes ? <Separator /> : null}

      {hasStorage && (
        <div>
          <p className="text-base font-semibold tracking-tight mb-2">
            Choose your storage space
          </p>
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
                  variant="secondary"
                  onClick={() => {
                    router.replace(optionUrl, { scroll: false });
                  }}
                  key={index}
                  className={`px-6 rounded-full ${
                    isActive
                      ? `bg-black text-white hover:bg-black dark:text-black dark:bg-white dark:hover:bg-white`
                      : ``
                  }`}
                >
                  {storageSpace}
                  <span className="text-neutral-500 dark:text-neutral-400">
                    ({FormattedPrice(storage?.price)})
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {hasSizes && (
        <div>
          <p className="text-base font-semibold tracking-tight mb-2">
            Choose your size
          </p>
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
                  variant="secondary"
                  onClick={() => {
                    router.replace(optionUrl, { scroll: false });
                  }}
                  key={size}
                  className={`px-6 rounded-full uppercase ${
                    isActive
                      ? `bg-black text-white hover:bg-black dark:text-black dark:bg-white dark:hover:bg-white`
                      : ``
                  }`}
                >
                  {size}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 p-5 bg-neutral-100 rounded-3xl dark:bg-neutral-900">
        {!user ? (
          <Button
            asChild
            variant="default"
            className="font-semibold h-14 rounded-full"
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

        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Estimated delivery time is 3-5 days. We usually ship items within 24
          hours. Return is free within 30 days of purchase.
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

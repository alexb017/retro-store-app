'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { type Banner } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FormattedPrice } from '@/lib/utils';

export default function BannerItem({ item }: { item: Banner[] }) {
  const [index, setIndex] = useState(0);
  const name = item[index]?.name;
  const description = item[index]?.description;
  const image = item[index]?.image;
  const price = item[index]?.price;
  const handle = item[index]?.handle;
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [animate]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (index < 2) {
  //       setIndex(index + 1);
  //     } else {
  //       setIndex(0);
  //     }
  //   }, 3500);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [index]);

  function nextBanner() {
    setAnimate(true);
    if (index < 2) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  function prevBanner() {
    setAnimate(true);
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(2);
    }
  }

  return (
    <>
      <div className="relative flex flex-col sm:flex-row w-full h-[680px] md:h-[512px] rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        {item[index] && (
          <div className="flex flex-col sm:flex-row w-full h-full">
            <div
              className={`flex flex-col items-start justify-between p-10 pr-0 h-full sm:w-1/3 ${
                animate ? 'animate-slide-in-text' : ''
              }`}
            >
              <div className="flex flex-col items-start gap-4">
                <h1 className="text-4xl font-semibold tracking-tighter lg:text-5xl">
                  {description}
                </h1>
                <div>
                  <p className="text-neutral-500 dark:text-neutral-400">
                    {name}
                  </p>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {FormattedPrice(price)}
                  </h3>
                </div>
                <Button
                  asChild
                  variant="default"
                  className="h-12 px-6 rounded-full bg-blue-600 hover:bg-blue-500 dark:text-white"
                >
                  <Link href={`/product/${handle}`}>Buy</Link>
                </Button>
              </div>
              <div className="flex flex-col gap-2 mt-6 sm:mt-0">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Colors available
                </p>
                <div className="flex items-center gap-4">
                  {item[index]?.colors?.map((color, index) => {
                    return (
                      <Badge
                        key={index}
                        style={{ backgroundColor: color }}
                        className={`w-4 h-4 p-0 shadow-[0_0_0_3px_rgba(255,255,255,0.8)] border border-neutral-200 dark:border-neutral-500 dark:shadow-[0_0_0_3px_rgba(66,66,66,0.8)]`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="sm:w-2/3 h-full flex items-center justify-center">
              <Image
                src={image}
                alt={name}
                width={640}
                height={640}
                quality={80}
                priority={true}
                className={animate ? 'animate-slide-in-image' : ''}
              />
            </div>
          </div>
        )}

        {item?.length > 0 ? (
          <div className="absolute right-10 bottom-10">
            <div className="flex h-9 items-center justify-between gap-2">
              <Button
                size="icon"
                className="flex items-center justify-center text-neutral-500 w-9 h-9 bg-white rounded-full hover:bg-white dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-700"
                onClick={prevBanner}
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </Button>
              {/* <div className="text-sm w-[31px] text-center font-medium">
                {index + 1} / {item?.length}
              </div> */}
              <Button
                size="icon"
                className="flex items-center justify-center text-neutral-500 w-9 h-9 bg-white rounded-full hover:bg-white dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-700"
                onClick={nextBanner}
              >
                <ChevronRightIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

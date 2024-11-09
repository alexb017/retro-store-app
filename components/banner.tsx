'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import ArrowLeftIcon from './icons/arrow-left';
import ArrowRightIcon from './icons/arrow-right';
import Link from 'next/link';
import { type Banner } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function BannerItem({ item }: { item: Banner[] }) {
  const [index, setIndex] = useState(0);
  const name = item[index]?.name;
  const description = item[index]?.description;
  const image = item[index]?.image;
  const price = item[index]?.price;
  const handle = item[index]?.handle;
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => {
      setAnimate(false);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [index]);

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
    if (index < 2) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  function prevBanner() {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(2);
    }
  }

  return (
    <>
      <div className="relative flex flex-col sm:flex-row w-full h-[600px] lg:h-[512px] rounded-3xl overflow-hidden bg-red-50 dark:bg-zinc-900">
        {item[index] && (
          <div className="flex flex-col sm:flex-row w-full h-full">
            <div
              className={`flex flex-col items-start justify-between p-12 sm:pb-6 sm:p-20 h-full sm:w-2/4 ${
                animate ? 'animate-slide-in-text' : ''
              }`}
            >
              <div className="flex flex-col items-start gap-4">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  {description}
                </h1>
                <div>
                  <p className="text-base">{name}</p>
                  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    ${(price / 100).toFixed(2)}
                  </h3>
                </div>
                <Button
                  asChild
                  className="bg-blue-500 shadow text-base hover:bg-blue-600 dark:text-white"
                >
                  <Link href={`/product/${handle}`}>Buy</Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 mt-6 sm:mt-0">
                {item[index]?.colors?.map((color, index) => {
                  return (
                    <Badge
                      key={index}
                      style={{ backgroundColor: color }}
                      className={`w-4 h-4 p-0 shadow-[0_0_0_3px_rgba(255,255,255,0.8)] border border-zinc-200 dark:border-zinc-500 dark:shadow-[0_0_0_3px_rgba(66,66,66,0.8)]`}
                    />
                  );
                })}
              </div>
            </div>
            <div className="sm:w-2/4 h-full flex items-center justify-center scale-150 sm:translate-y-16">
              <Image
                src={image}
                alt={name}
                width={800}
                height={800}
                quality={80}
                priority={true}
                className={animate ? 'animate-slide-in-image' : ''}
              />
            </div>
          </div>
        )}

        {item?.length > 0 ? (
          <div className="absolute right-[5%] bottom-[5%]">
            <div className="flex h-11 items-center justify-between gap-1 rounded-full p-1 bg-white text-zinc-700 dark:text-white dark:bg-zinc-950">
              <Button
                size="icon"
                className="flex items-center justify-center text-zinc-700 w-[36px] h-full p-0 bg-transparent rounded-full hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-800"
                onClick={prevBanner}
              >
                <ArrowLeftIcon classname="h-5" />
              </Button>
              <div className="text-sm w-[31px] text-center font-medium">
                {index + 1} / {item?.length}
              </div>
              <Button
                size="icon"
                className="flex items-center justify-center text-zinc-700 w-[36px] h-full p-0 bg-transparent rounded-full hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-800"
                onClick={nextBanner}
              >
                <ArrowRightIcon classname="h-5" />
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

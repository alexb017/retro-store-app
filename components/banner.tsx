'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import ArrowLeftIcon from './icons/arrow-left';
import ArrowRightIcon from './icons/arrow-right';
import FormattedPrice from './formatted-price';
import Link from 'next/link';

type Item = {
  name: string;
  description: string;
  image: string;
  price: string;
  handle: string;
};

export default function BannerItem({ item }: { item: Item[] }) {
  const [index, setIndex] = useState(0);
  const name = item[index]?.name;
  const description = item[index]?.description;
  const image = item[index]?.image;
  const price = item[index]?.price;
  const handle = item[index]?.handle;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (index < 2) {
        setIndex(index + 1);
      } else {
        setIndex(0);
      }
    }, 3500);

    return () => {
      clearTimeout(timer);
    };
  }, [index]);

  function nextBanner() {
    if (index < 2) {
      setIndex(index + 1);
    }
  }

  function prevBanner() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }
  return (
    <>
      <div className="relative flex flex-col sm:flex-row w-full h-[440px] md:h-96 rounded-3xl bg-neutral-100 dark:bg-neutral-950">
        {item[index] && (
          <Link
            href={`/product/${handle}`}
            className="flex flex-col sm:flex-row w-full h-full"
          >
            <div className="flex flex-col items-center justify-center h-2/6 sm:h-96 sm:w-2/4">
              <h1 className="text-2xl sm:text-4xl font-semibold text-center">
                {name}
              </h1>
              <p className="text-sm sm:text-base text-center text-neutral-500 dark:text-neutral-400">
                {description}
              </p>
              <h3 className="text-md sm:text-xl font-medium">
                {FormattedPrice(price)}
              </h3>
            </div>
            <div className="sm:w-2/4 h-4/6 sm:h-96 overflow-hidden flex items-center justify-center">
              <Image
                src={image}
                alt={name}
                width={400}
                height={400}
                quality={80}
                priority={true}
              />
            </div>
          </Link>
        )}

        {item.length > 1 ? (
          <div className="absolute bottom-[5%] flex w-full justify-center">
            <div className="mx-auto flex h-11 items-center rounded-full bg-neutral-500/10 backdrop-blur text-neutral-500">
              <button
                type="button"
                className="flex items-center justify-center h-full px-6 transition-all ease-in-out hover:scale-105 hover:text-black dark:hover:text-white"
                onClick={prevBanner}
              >
                <ArrowLeftIcon classname="h-5" />
              </button>
              <div className="mx-1 h-6 w-px bg-neutral-400 dark:bg-neutral-700"></div>
              <button
                type="button"
                className="flex items-center justify-center h-full px-6 transition-all ease-in-out hover:scale-105 hover:text-black dark:hover:text-white"
                onClick={nextBanner}
              >
                <ArrowRightIcon classname="h-5" />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

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
      <div className="relative flex flex-col sm:flex-row w-full h-96 md:h-80 rounded-3xl bg-gray-100">
        {item[index] && (
          <Link
            href={`/product/${handle}`}
            className="flex flex-col sm:flex-row w-full h-96 md:h-80"
          >
            <div className="flex flex-col items-center justify-center sm:w-2/4 p-5">
              <h1 className="text-4xl font-bold">{name}</h1>
              <p>{description}</p>
              <h3 className="text-xl">{FormattedPrice(price)}</h3>
            </div>
            <div className="sm:w-2/4 h-80 overflow-hidden flex items-center justify-center">
              <Image src={image} alt={name} width={400} height={400} />
            </div>
          </Link>
        )}

        {item.length > 1 ? (
          <div className="absolute bottom-[5%] flex w-full justify-center">
            <div className="mx-auto flex h-11 items-center rounded-full bg-gray-200/50 backdrop-blur text-gray-500">
              <button
                type="button"
                className="flex items-center justify-center h-full px-6 transition-all ease-in-out hover:scale-105 hover:text-black"
                onClick={prevBanner}
              >
                <ArrowLeftIcon classname="h-5" />
              </button>
              <div className="mx-1 h-6 w-px bg-gray-400"></div>
              <button
                type="button"
                className="flex items-center justify-center h-full px-6 transition-all ease-in-out hover:scale-105 hover:text-black"
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

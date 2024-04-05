'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Gallery({
  images,
  name,
}: {
  images: { url: string }[];
  name: string;
}) {
  const [imageIndex, setImageIndex] = useState(0);
  const imageURL = images[imageIndex]?.url as string;

  return (
    <>
      <div className="relative aspect-square h-full max-h-[500px] w-full">
        {images[imageIndex] && (
          <Image
            src={imageURL}
            alt={`${name}-${imageIndex}`}
            fill
            className="object-contain"
            sizes="(min-width: 1024px) 66vw, 100vw"
            quality={80}
            priority={true}
          />
        )}

        <div className="absolute bottom-0 w-full flex justify-center">
          {images.length > 1 ? (
            <ul className="flex items-center justify-center flex-wrap gap-2 py-1 lg:mb-0">
              {images.map((image: any, index) => {
                const isActive = index === imageIndex;
                const classname =
                  'cursor-pointer object-contain py-2 backdrop-blur border-2 rounded-2xl hover:border-blue-500 bg-opacity-30 transition-all dark:hover:border-blue-500';

                return (
                  <li key={index} className="flex w-20 h-20">
                    <Image
                      src={image.url}
                      alt={`${name}-${image?.color}`}
                      className={
                        isActive
                          ? `${classname} border-blue-500`
                          : `${classname} border-zinc-200 dark:border-zinc-700`
                      }
                      width={80}
                      height={80}
                      quality={80}
                      onClick={() => setImageIndex(index)}
                    />
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>
    </>
  );
}

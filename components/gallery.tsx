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
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        <div className="flex items-center justify-center order-1 lg:order-none">
          {images.length > 1 ? (
            <ul className="flex flex-row lg:flex-col gap-4">
              {images.map((image: any, index) => {
                const isActive = index === imageIndex;

                return (
                  <li key={index} className="flex w-14 h-14 aspect-square">
                    <Image
                      src={image.url}
                      alt={`${name}-${image?.color}`}
                      className={`object-contain rounded-full p-1 bg-neutral-100 cursor-pointer dark:bg-neutral-900 ${
                        isActive
                          ? 'outline outline-offset-1 outline-1 outline-blue-600'
                          : ''
                      }`}
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
        <div className="flex items-center justify-center w-full aspect-square rounded-3xl bg-neutral-100 dark:bg-neutral-900">
          {images[imageIndex] && (
            <Image
              src={imageURL}
              alt={`${name}-${imageIndex}`}
              width={800}
              height={800}
              quality={80}
              priority={true}
            />
          )}
        </div>
      </div>
    </>
  );
}

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
      <div className="relative aspect-square h-full max-h-[500px] w-full overflow-hidden">
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
            <ul className="flex items-center justify-center gap-2 overflow-auto py-1 lg:mb-0">
              {images.map((image: any, index) => {
                const isActive = index === imageIndex;
                const classname =
                  'cursor-pointer object-contain py-2 backdrop-blur border-2 rounded-2xl hover:border-blue-500 bg-opacity-30 transition-all';

                return (
                  <li key={index} className="flex w-20 h-20">
                    <Image
                      src={image.url}
                      alt={`${name}-${image?.color}`}
                      className={
                        isActive
                          ? `${classname} border-blue-500`
                          : `${classname} border-gray-200`
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

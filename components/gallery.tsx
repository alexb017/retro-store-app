'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Gallery({
  images,
  name,
}: {
  images: { src: string }[];
  name: string;
}) {
  const [imageIndex, setImageIndex] = useState(0);
  const imageURL = images[imageIndex].src as string;

  return (
    <>
      <div className="relative aspect-square h-full max-h-[500px] w-full overflow-hidden">
        {images[imageIndex] && (
          <Image
            src={imageURL}
            alt={name}
            fill
            className="object-contain"
            sizes="(min-width: 1024px) 66vw, 100vw"
          />
        )}

        <div className="absolute bottom-0 w-full flex justify-center">
          {images.length > 1 ? (
            <ul className="flex items-center justify-center gap-2 overflow-auto py-1 lg:mb-0">
              {images.map((image, index) => {
                const isActive = index === imageIndex;
                const classname =
                  'cursor-pointer object-contain py-2 backdrop-blur border rounded-2xl hover:border-blue-500 bg-opacity-30';

                return (
                  <li key={index} className="flex w-20 h-20">
                    <Image
                      src={image.src}
                      alt={name}
                      className={
                        isActive
                          ? `${classname} border-2 border-blue-500`
                          : `${classname} border-neutral-200`
                      }
                      width={80}
                      height={80}
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
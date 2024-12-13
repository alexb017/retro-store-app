'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function Gallery({
  images,
  name,
}: {
  images: { url: string }[];
  name: string;
}) {
  return (
    <Carousel className="h-full bg-neutral-100 rounded-3xl aspect-square dark:bg-neutral-900">
      <CarouselContent className="ml-0 h-full">
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className="p-0 flex items-center justify-center"
          >
            <Image src={image.url} alt={name} width={800} height={800} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="w-12 h-12 left-5 md:left-8 border-0 bg-neutral-200 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-800" />
      <CarouselNext className="w-12 h-12 right-5 md:right-8 border-0 bg-neutral-200 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-800" />
    </Carousel>
  );
}

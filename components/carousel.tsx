import Link from 'next/link';
import Image from 'next/image';
import { TagIcon } from '@heroicons/react/24/outline';
import { FormattedPrice } from '../lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { getProducts } from '@/lib/actions';
import { type Products } from '@/lib/types';

export default async function CarouselItems() {
  const products = (await getProducts()) as Products[];
  const firstEightElements = products?.slice(0, 8);

  return (
    <Carousel opts={{ align: 'start' }} className="w-full">
      <CarouselContent>
        {firstEightElements?.map((item: Products, index: number) => (
          <CarouselItem
            key={index}
            className="sm:basis-1/2 xl:basis-1/3 hover:scale-[1.01] transition-transform duration-200 ease-in-out"
          >
            <div className="p-1">
              <Card className="flex flex-col items-start gap-2 bg-transparent border-none shadow-none">
                <Link
                  href={`/product/${item?.handle}`}
                  className="flex flex-col gap-4"
                >
                  <CardHeader className="justify-center p-0 aspect-[6/7] overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-900">
                    <Image
                      className="scale-110"
                      src={item?.image}
                      alt={item?.name}
                      width={500}
                      height={500}
                    />
                  </CardHeader>
                  <CardContent className="flex items-start justify-between p-0">
                    <h4 className="text-xl font-semibold tracking-tight">
                      {item?.name}
                    </h4>
                    <h4 className="text-xl font-semibold tracking-tight text-neutral-500 dark:text-neutral-400">
                      {FormattedPrice(item?.price)}
                    </h4>
                  </CardContent>
                </Link>
                <CardFooter className="hidden p-0">
                  <Link href={`/product/${item?.handle}`} className="flex">
                    <Button
                      variant="link"
                      className="gap-2 p-0 h-auto text-base text-blue-600 dark:text-blue-400"
                    >
                      <TagIcon className="w-5 h-5" />
                      Buy
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="w-12 h-12 shadow -translate-x-4" />
      <CarouselNext className="w-12 h-12 shadow translate-x-4" />
    </Carousel>
  );
}

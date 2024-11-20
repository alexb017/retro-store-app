import Link from 'next/link';
import Image from 'next/image';
import { Tag } from 'lucide-react';
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
import { Products } from '@/lib/types';

export default async function CarouselItems() {
  const products = (await getProducts()) as Products[];
  const firstEightElements = products?.slice(0, 8);

  return (
    <Carousel opts={{ align: 'start' }} className="w-full">
      <CarouselContent>
        {firstEightElements?.map((item, index) => (
          <CarouselItem
            key={index}
            className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="p-1">
              <Card className="flex flex-col items-start gap-4 bg-transparent border-none shadow-none">
                <Link
                  href={`/product/${item?.handle}`}
                  className="flex flex-col gap-4 group"
                >
                  <CardHeader className="justify-center p-0 aspect-[3/4] overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
                    <Image
                      src={item?.image}
                      alt={item?.name}
                      width={400}
                      height={500}
                      className="group-hover:scale-105 transition-all ease-in-out duration-300 transform"
                    />
                  </CardHeader>
                  <CardContent className="flex flex-col items-start gap-4 p-0">
                    <div>
                      <p className="font-semibold">{item?.name}</p>
                      <p>{FormattedPrice(item?.price)}</p>
                    </div>
                  </CardContent>
                </Link>
                <CardFooter className="p-0">
                  <Link href={`/product/${item?.handle}`} className="flex">
                    <Button
                      variant="link"
                      className="gap-2 p-0 h-auto text-base text-blue-500"
                    >
                      <Tag className="w-5 h-5" />
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

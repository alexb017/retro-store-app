import Link from 'next/link';
import Image from 'next/image';
import TagIcon from './icons/tag';
import FormattedPrice from './formatted-price';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';

export default function CarouselItems({ products }: { products: any[] }) {
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
              <Card className="flex flex-col items-start gap-4 border-none shadow-none">
                <Link
                  href={`/product/${item?.handle}`}
                  className="flex flex-col gap-4 group"
                >
                  <CardHeader className="justify-center p-0 aspect-[3/4] overflow-hidden rounded-2xl bg-zinc-100">
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
                      <TagIcon classname="h-5" />
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

/**
 * <div className="w-full overflow-x-auto scrollbar cursor-pointer">
      <ul className="flex gap-6 mb-6">
        {products.map((item, index) => {
          const price = FormattedPrice(item?.price);

          return (
            <li key={index} className="flex-none max-w-[262px]">
              <Link
                href={`/product/${item?.handle}`}
                className="group relative"
              >
                <div className="w-44 sm:w-full h-52 sm:h-64 md:h-72 xl:h-80 overflow-hidden rounded-3xl bg-neutral-100 group-hover:opacity-80 transition-all dark:bg-neutral-950">
                  <Image
                    src={item?.image}
                    alt={item?.name}
                    width={320}
                    height={320}
                    quality={80}
                    className="w-full h-full object-contain object-center"
                  />
                </div>
                <div className="mt-4 flex flex-col gap-1 items-start">
                  <div className="flex items-center justify-between">
                    <h1 className="text-xl sm:text-2xl font-semibold">
                      {item?.name}
                    </h1>
                  </div>
                  <h1 className="text-sm sm:text-base font-semibold">
                    {price}
                  </h1>
                  <div className="text-sm flex items-center gap-2 py-1 px-2 pr-3 font-medium bg-green-100 rounded-full dark:bg-green-800 dark:text-white">
                    <TagIcon classname="h-5" />
                    Add to cart
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
 */

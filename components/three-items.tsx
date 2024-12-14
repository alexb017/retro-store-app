import { Card, CardContent, CardFooter } from './ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { getProducts } from '@/lib/actions';
import { Products } from '@/lib/types';
import { FormattedPrice } from '@/lib/utils';

export default async function ThreeItems() {
  const products = (await getProducts()) as Products[];
  const mainElement = products[6];
  const firstTwoElements = products.slice(1, 3);

  return (
    <div className="flex flex-col xl:flex-row gap-6 w-full">
      <div className="w-full xl:w-1/2">
        <Card className="flex flex-col md:flex-row xl:flex-col h-full justify-between bg-neutral-100 rounded-3xl border-none shadow-none dark:bg-neutral-900 overflow-hidden">
          <CardContent className="flex flex-col items-start gap-2 p-12 w-full">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {mainElement?.category[0].toUpperCase() +
                mainElement?.category.slice(1).toLowerCase()}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight">
              {mainElement?.name}
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {mainElement?.info}
            </p>
            <h4 className="text-xl font-semibold tracking-tight">
              {FormattedPrice(mainElement?.price)}
            </h4>
            <Button
              asChild
              variant="default"
              className="h-12 px-6 rounded-full mt-auto z-10 text-black bg-white hover:bg-white dark:bg-neutral-800 dark:text-white"
            >
              <Link href={`/product/${mainElement?.handle}`}>View product</Link>
            </Button>
          </CardContent>
          <CardFooter className="w-full h-full justify-center p-0">
            <div className="flex items-center justify-center h-80 xl:h-full">
              <Image
                src={mainElement?.image}
                alt={mainElement?.name}
                width={400}
                height={400}
                className="xl:scale-150 xl:-translate-y-4"
              />
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="w-full xl:w-1/2">
        <div className="flex flex-col gap-6">
          {firstTwoElements?.map((item: Products, index: number) => (
            <Card
              key={index}
              className="flex flex-col md:flex-row w-full bg-neutral-100 rounded-3xl border-none shadow-none dark:bg-neutral-900"
            >
              <CardContent className="flex flex-col items-start gap-2 p-12 w-full md:w-1/2">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {item?.category[0].toUpperCase() +
                    item?.category.slice(1).toLowerCase()}
                </p>
                <h2 className="text-3xl font-semibold tracking-tight">
                  {item?.name}
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {item?.info}
                </p>
                <h4 className="text-xl font-semibold tracking-tight">
                  {FormattedPrice(item?.price)}
                </h4>
                <Button
                  asChild
                  variant="default"
                  className="h-12 px-6 rounded-full mt-auto text-black bg-white hover:bg-white dark:bg-neutral-800 dark:text-white"
                >
                  <Link href={`/product/${item?.handle}`}>View product</Link>
                </Button>
              </CardContent>
              <CardFooter className="p-0 justify-center w-full md:w-1/2">
                <div className="flex items-center justify-center h-80">
                  <Image
                    src={item?.image}
                    alt={item?.name}
                    width={400}
                    height={400}
                  />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

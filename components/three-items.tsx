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
    <div className="flex gap-6 w-full">
      <div className="w-1/2">
        <Card className="flex flex-col justify-between h-full bg-neutral-100 rounded-3xl border-none shadow-none dark:bg-neutral-900 overflow-hidden">
          <CardContent className="flex flex-col items-start gap-2 p-12 w-full">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {mainElement?.category[0].toUpperCase() +
                mainElement?.category.slice(1).toLowerCase()}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight">
              {mainElement?.name}
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {mainElement?.info}
            </p>
            <h4 className="text-xl">{FormattedPrice(mainElement?.price)}</h4>
            <Button
              asChild
              variant="outline"
              className="h-12 px-6 rounded-full"
            >
              <Link href={`/product/${mainElement?.handle}`}>View product</Link>
            </Button>
          </CardContent>
          <CardFooter className="flex items-center justify-center w-full p-0">
            <Image
              src={mainElement?.image}
              alt={mainElement?.name}
              width={400}
              height={400}
              className="scale-150"
            />
          </CardFooter>
        </Card>
      </div>
      <div className="w-1/2">
        <div className="flex flex-col gap-6">
          {firstTwoElements?.map((item: Products, index: number) => (
            <Card
              key={index}
              className="flex w-full bg-neutral-100 rounded-3xl border-none shadow-none dark:bg-neutral-900"
            >
              <CardContent className="flex flex-col items-start gap-2 p-12 w-1/2">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {item?.category[0].toUpperCase() +
                    item?.category.slice(1).toLowerCase()}
                </p>
                <h2 className="text-3xl font-semibold tracking-tight">
                  {item?.name}
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {item?.info}
                </p>
                <h4 className="text-xl">{FormattedPrice(item?.price)}</h4>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 px-6 rounded-full"
                >
                  <Link href={`/product/${item?.handle}`}>View product</Link>
                </Button>
              </CardContent>
              <CardFooter className="flex items-center justify-center p-0 w-1/2">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  width={400}
                  height={400}
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { FormattedPrice } from '../lib/utils';
import { Products } from '@/lib/types';
import { Card, CardContent, CardHeader, CardFooter } from './ui/card';
import { Button } from './ui/button';

export default function ProductGrid({ products }: { products: Products[] }) {
  return (
    <>
      {products?.map((product, index) => {
        return (
          <Card
            key={index}
            className="flex flex-col border-none shadow-none bg-zinc-100 rounded-3xl dark:bg-zinc-900"
          >
            <CardHeader className="justify-center p-0 aspect-[1/1] overflow-hidden">
              <Image
                src={product?.image}
                alt={product?.name}
                width={320}
                height={320}
                quality={80}
                className="w-full h-full object-contain object-center"
              />
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              <h4 className="text-lg sm:text-xl font-semibold tracking-tight">
                {product?.name}
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {product?.info}
              </p>
              <p className="text-lg font-semibold">
                {FormattedPrice(product?.price)}
              </p>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button
                asChild
                className="text-base bg-blue-500 hover:bg-blue-600 dark:text-white"
              >
                <Link href={`/product/${product?.handle}`}>Buy</Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
}

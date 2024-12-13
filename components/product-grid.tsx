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
            className="flex flex-col items-start gap-2 bg-transparent border-none shadow-none hover:scale-[1.01] transition-transform duration-200 ease-in-out"
          >
            <Link
              href={`/product/${product?.handle}`}
              className="flex flex-col gap-4"
            >
              <CardHeader className="justify-center p-0 aspect-[6/7] overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-900">
                <Image
                  className="scale-110"
                  src={product?.image}
                  alt={product?.name}
                  width={500}
                  height={500}
                />
              </CardHeader>
              <CardContent className="flex items-start justify-between p-0">
                <h4 className="text-xl font-semibold tracking-tight">
                  {product?.name}
                </h4>
                <h4 className="text-xl font-semibold tracking-tight text-neutral-500 dark:text-neutral-400">
                  {FormattedPrice(product?.price)}
                </h4>
              </CardContent>
            </Link>
          </Card>
        );
      })}
    </>
  );
}

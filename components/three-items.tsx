import { Card, CardContent, CardFooter } from './ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

export default function ThreeItems({ products }: { products: any[] }) {
  return (
    <div className="flex flex-row flex-wrap justify-center lg:flex-nowrap gap-6 w-full">
      {products.map((product, index) => {
        return (
          <Link
            href={`/product/${product?.handle}`}
            key={index}
            className="sm:basis-1/2 lg:basis-1/3"
          >
            <Card className="flex flex-col justify-between border-none rounded-3xl shadow-none bg-blue-100 dark:bg-zinc-950">
              <CardContent className="flex flex-col items-center gap-4 p-12">
                <p>{product?.name}</p>
                <h2 className="text-3xl font-semibold tracking-tight text-center">
                  {product?.info}
                </h2>
                <Button
                  variant="outline"
                  className="text-base bg-transparent border-zinc-500 hover:bg-zinc-500 hover:text-white dark:border-zinc-700 dark:hover:bg-zinc-700"
                >
                  View more info
                </Button>
              </CardContent>
              <CardFooter className="p-0 aspect-[1/1] overflow-hidden">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  width={400}
                  height={500}
                  className="scale-125"
                />
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

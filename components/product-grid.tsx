import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/actions';
import FormattedPrice from './formatted-price';
import ArrowRightIcon from './icons/arrow-right';
import TagIcon from './icons/tag';

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  handle: string;
  category: string;
};

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <>
      {products?.map((product, index) => {
        const price = FormattedPrice(product?.price);
        return (
          <Link
            key={index}
            href={`/product/${product?.handle}`}
            className="group"
          >
            <div className="w-full h-52 sm:h-64 md:h-72 xl:h-80 overflow-hidden rounded-3xl bg-neutral-100 group-hover:opacity-80 transition-all dark:bg-neutral-950">
              <Image
                src={product?.image}
                alt={product?.name}
                width={320}
                height={320}
                quality={80}
                className="w-full h-full object-contain object-center"
              />
            </div>
            <div className="mt-2 flex flex-col gap-1 items-start">
              <div className="flex items-center justify-between">
                <h1 className="text-xl sm:text-2xl font-semibold">
                  {product?.name}
                </h1>
              </div>
              <h1 className="text-sm sm:text-base font-semibold">{price}</h1>
              <div className="text-sm flex items-center gap-2 py-1 px-2 pr-3 font-medium bg-green-100 rounded-full dark:bg-green-800 dark:text-white">
                <TagIcon classname="h-5" />
                Add to cart
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}

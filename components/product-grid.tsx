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
            className="group w-fit"
          >
            <div className="w-full h-80 overflow-hidden rounded-3xl bg-gray-100 group-hover:opacity-80 transition-all">
              <Image
                src={product?.image}
                alt={product?.name}
                width={320}
                height={320}
                quality={80}
                className="w-full h-full object-contain object-center"
              />
            </div>
            <div className="mt-4 flex flex-col gap-1 items-start">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">{product?.name}</h1>
              </div>
              <h1 className="text-base font-semibold">{price}</h1>
              <div className="text-sm flex items-center gap-2 py-1 px-2 pr-3 font-medium text-black bg-green-100 rounded-full">
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

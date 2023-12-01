import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/actions';
import FormattedPrice from './formatted-price';

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
      {products?.map((product) => {
        const price = FormattedPrice(product?.price);
        return (
          <Link
            key={product.handle}
            href={`/product/${product.handle}`}
            className="bg-gray-100 flex flex-col rounded-3xl group"
          >
            <div className="w-full h-60 flex items-center justify-center overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                quality={80}
                className="object-contain transition-all ease-in-out group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col items-center p-5 pt-0">
              <p className="text-2xl font-bold">{product.name}</p>
              <h1 className="text-base text-gray-500">{price}</h1>
              <div className="font-medium px-6 py-1 mt-2 border-2 rounded border-gray-500 hover:bg-gray-500 hover:text-white transition-colors">
                Buy
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}

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
                width={240}
                height={240}
                className="object-contain transition-all ease-in-out group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col items-center p-5">
              <p className="text-2xl font-bold">{product.name}</p>
              <h1 className="text-base">{price}</h1>
              <div className="font-medium px-6 py-1 mt-2 border-2 rounded-full border-neutral-500 hover:bg-neutral-500 hover:text-white transition-colors">
                Buy
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}

// export default async function ProductGrid() {
//   const products: any[] = await getProducts();

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//       {products.map((product, index) => (
//         <Item key={index} product={product} />
//       ))}
//     </div>
//   );
// }

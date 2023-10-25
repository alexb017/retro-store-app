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

function Item({ product }: { product: Product }) {
  const price = FormattedPrice(product?.price);

  return (
    <Link
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
      <div className="flex flex-col items-start p-5">
        <p className="text-sm">{product.name}</p>
        <h1 className="text-2xl font-medium">{price}</h1>
      </div>
    </Link>
  );
}

export default async function ProductGrid() {
  const products: any[] = await getProducts();
  //console.log(products);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {products.map((product, index) => (
        <Item key={index} product={product} />
      ))}
    </div>
  );
}

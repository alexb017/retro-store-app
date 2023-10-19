import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/actions';

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  handle: string;
  category: string;
};

function Item({ product }: { product: Product }) {
  const price = Number.parseInt(product?.price, 10);

  let formattedPrice = null;

  if (price < 100) {
    formattedPrice = price.toFixed(2);
  }

  if (price >= 100 && price < 1000) {
    formattedPrice = price;
  }

  if (price >= 1000 && price < 10000) {
    formattedPrice = (price / 1000).toLocaleString('en-US');
  }

  return (
    <Link
      href={`/product/${product.handle}`}
      className="bg-neutral-100 flex flex-col rounded-3xl group"
    >
      <div className="w-full h-64 flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="object-contain transition-all ease-in-out group-hover:scale-110"
        />
      </div>
      <div className="flex flex-col items-center p-5 pt-0">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        {product?.category === 'tech' ? (
          <p className="text-sm text-neutral-500">From ${formattedPrice} USD</p>
        ) : (
          <p className="text-sm text-neutral-500">${formattedPrice} USD</p>
        )}
      </div>
    </Link>
  );
}

export default async function ProductGrid() {
  const products: any[] = await getProducts();
  //console.log(products);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {products.map((product, index) => (
        <Item key={index} product={product} />
      ))}
    </div>
  );
}

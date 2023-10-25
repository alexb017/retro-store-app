import Link from 'next/link';
import Image from 'next/image';
import { getProduct, getProducts } from '@/lib/actions';
import Gallery from '@/components/gallery';
import ProductInfo from '@/components/product-info';
import ArrowLeftIcon from '@/components/icons/arrow-left';
import Footer from '@/components/footer';
import FormattedPrice from '@/components/formatted-price';

export default async function Product({
  params,
}: {
  params: { handle: string };
}) {
  const product = await getProduct(params.handle);

  return (
    <>
      <div className="mx-auto max-w-screen-2xl p-5">
        <Link
          href="/"
          className="inline-flex items-center gap-2 pb-5 text-gray-500 group hover:text-black transition-all ease-in-out"
        >
          <ArrowLeftIcon classname="h-5 group-hover:scale-105 transition-all ease-in-out" />
          Go back to the main page
        </Link>
        <div className="flex flex-col lg:flex-row lg:gap-12">
          <div className="h-full w-full rounded-2xl p-8 bg-gray-100 basis-full lg:basis-4/6">
            <Gallery
              images={product?.images?.map((image: string) => ({ src: image }))}
              name={product?.name}
            />
          </div>
          <div className="basis-full lg:basis-2/6">
            <ProductInfo product={product} />
          </div>
        </div>
        <RelatedProducts category={product.category} />
      </div>
      <Footer />
    </>
  );
}

async function RelatedProducts({ category }: { category: string }) {
  const products: any[] = await getProducts();

  const filteredProducts = products.filter(
    (product) => product?.category === category
  );

  return (
    <div className="py-8">
      {filteredProducts.length > 0 && (
        <h2 className="mb-4 text-2xl">Related Products</h2>
      )}
      <ul className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {filteredProducts.map((product) => {
          const price = FormattedPrice(product?.price);

          return (
            <li key={product.handle} className="w-full">
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
            </li>
          );
        })}
      </ul>
    </div>
  );
}

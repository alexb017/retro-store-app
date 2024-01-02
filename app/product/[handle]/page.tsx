import Link from 'next/link';
import Image from 'next/image';
import { getProduct, getProducts } from '@/lib/actions';
import Gallery from '@/components/gallery';
import ProductInfo from '@/components/product-info';
import ArrowLeftIcon from '@/components/icons/arrow-left';
import Footer from '@/components/footer';
import FormattedPrice from '@/components/formatted-price';
import ProductGrid from '@/components/product-grid';

export default async function Product({
  params,
}: {
  params: { handle: string };
}) {
  const product = await getProduct(params.handle);

  return (
    <>
      <div className="mx-auto max-w-screen-2xl p-4">
        {/* <Link
          href="/"
          className="inline-flex items-center gap-2 pb-5 text-gray-500 group hover:text-black transition-all ease-in-out"
        >
          <ArrowLeftIcon classname="h-5 group-hover:scale-105 transition-all ease-in-out" />
          Go back to the main page
        </Link> */}
        <div className="flex flex-col gap-6 sm:flex-row md:gap-8 lg:gap-12">
          <div className="h-full w-full rounded-2xl p-8 bg-neutral-100 basis-full sm:basis-3/6 lg:basis-4/6 dark:bg-neutral-950">
            <Gallery
              images={product?.images?.map((image: string) => ({
                url: image,
              }))}
              name={product?.handle}
            />
          </div>
          <div className="basis-full sm:basis-3/6 lg:basis-2/6">
            <ProductInfo product={product} />
          </div>
        </div>
        <RelatedProducts category={product?.category} />
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
        <h2 className="mb-4 text-xl md:text-2xl font-semibold">
          Related Products
        </h2>
      )}
      <ul className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:grid-cols-3">
        <ProductGrid products={filteredProducts} />
      </ul>
    </div>
  );
}

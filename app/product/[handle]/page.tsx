import Link from 'next/link';
import { getProduct } from '@/lib/actions';
import Gallery from '@/components/gallery';
import ProductInfo from '@/components/product-info';
import ArrowLeftIcon from '@/components/icons/arrow-left';
import Footer from '@/components/footer';

type Product = {
  id: string;
  handle: string;
  price: string;
};

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
          className="inline-flex items-center gap-2 pb-5 text-neutral-500 group"
        >
          <ArrowLeftIcon classname="h-5 group-hover:scale-105 transition-all ease-in-out group-hover:text-black" />
          Go back to the main page
        </Link>
        <div className="flex flex-col lg:flex-row lg:gap-12">
          <div className="h-full w-full rounded-2xl p-8 bg-neutral-50 basis-full lg:basis-4/6">
            <Gallery
              images={product?.images?.map((image: string) => ({ src: image }))}
              name={product?.name}
            />
          </div>
          <div className="basis-full lg:basis-2/6">
            <ProductInfo product={product} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

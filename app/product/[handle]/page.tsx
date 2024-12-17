import { getProduct, getProducts } from '@/lib/actions';
import Gallery from './gallery';
import ProductInfo from './product-info';
import Footer from '@/components/footer';
import ProductGrid from '@/components/product-grid';
import { type Products, type ProductInfoType } from '@/lib/types';
import { Suspense } from 'react';
import { Metadata } from 'next';
import BannerNewsletter from '@/components/banner-newsletter';
import ShippingBanner from '@/components/shipping-banner';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Product',
  description: 'Product page',
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const param = await params;

  const product = (await getProduct(param.handle)) as ProductInfoType;

  return (
    <>
      <div className="flex flex-col gap-8 mx-auto max-w-screen-2xl p-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/products">Products</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="basis-full lg:basis-4/6">
            <Gallery
              images={product?.images?.map((image: string) => ({
                url: image,
              }))}
              name={product?.handle}
            />
          </div>
          <div className="basis-full lg:basis-2/6">
            <Suspense fallback={null}>
              <ProductInfo product={product} />
            </Suspense>
          </div>
        </div>
        <ShippingBanner />
        <div className="flex flex-col gap-24 mt-16">
          <RelatedProducts category={product?.category} />
          <div className="flex flex-col gap-8">
            <BannerNewsletter />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

async function RelatedProducts({ category }: { category: string }) {
  const products = (await getProducts()) as Products[];

  // Show only 3 random products, excluding the current item
  // The sort approach is not the best, but it's good enough for this example
  // Is a common trick to shuffle an array randomly
  const filteredProducts = products
    .filter((product) => product.category !== category)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <>
      {filteredProducts.length > 0 && (
        <div className="flex flex-col gap-8">
          <h2 className="text-3xl font-semibold tracking-tighter">
            You might also like
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <ProductGrid products={filteredProducts} />
          </ul>
        </div>
      )}
    </>
  );
}

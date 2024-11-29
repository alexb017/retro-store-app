import { getProduct, getProducts } from '@/lib/actions';
import Gallery from '@/components/gallery';
import ProductInfo from '@/components/product-info';
import Footer from '@/components/footer';
import ProductGrid from '@/components/product-grid';
import { type Products, type ProductInfoType } from '@/lib/types';
import { Suspense } from 'react';
import { Metadata } from 'next';
import BannerSignup from '@/components/banner-signup';
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
      <div className="flex flex-col gap-5 mx-auto max-w-screen-2xl p-5">
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
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="flex items-center justify-center h-full w-full basis-full sm:basis-3/6 lg:basis-4/6">
            <Gallery
              images={product?.images?.map((image: string) => ({
                url: image,
              }))}
              name={product?.handle}
            />
          </div>
          <div className="basis-full sm:basis-3/6 lg:basis-2/6">
            <Suspense fallback={null}>
              <ProductInfo product={product} />
            </Suspense>
          </div>
        </div>
        <ShippingBanner />
        <div className="flex flex-col gap-24">
          <RelatedProducts category={product?.category} />
          <BannerSignup />
          <Footer />
        </div>
      </div>
    </>
  );
}

async function RelatedProducts({ category }: { category: string }) {
  const products = (await getProducts()) as Products[];

  const filteredProducts = products.filter(
    (product) => product?.category === category
  );

  return (
    <div className="flex flex-col gap-5">
      {filteredProducts.length > 0 && (
        <h2 className="text-3xl font-semibold tracking-tight">
          Related Products
        </h2>
      )}
      <ul className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        <ProductGrid products={filteredProducts} />
      </ul>
    </div>
  );
}

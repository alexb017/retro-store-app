import Collections from '@/app/products/collections';
import Filters from '@/app/products/filters';
import Footer from '@/components/footer';
import MobileCollections from '@/app/products/mobile-collections';
import MobileFilters from '@/app/products/mobile-filters';
import { Suspense } from 'react';
import { Metadata } from 'next';
import BannerNewsletter from '@/components/banner-newsletter';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Find the best products for you.',
};

export default function LayoutProducts({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto flex flex-col gap-8 p-5 max-w-screen-2xl">
        <div className="flex flex-col gap-2 mt-7">
          <h1 className="text-4xl font-semibold tracking-tighter lg:text-5xl">
            Products
          </h1>
          <h4 className="text-xl tracking-tight text-neutral-500 dark:text-neutral-400">
            We have a wide range of products to choose from.{' '}
            <span className="md:block">Find the best products for you.</span>
          </h4>
        </div>
        <div className="w-full hidden md:flex justify-between">
          <div className="w-1/2">
            <Collections />
          </div>
          <div className="w-1/2">
            <Suspense fallback={null}>
              <Filters />
            </Suspense>
          </div>
        </div>
        <div className="w-full md:hidden block">
          <Suspense fallback={null}>
            <MobileCollections />
          </Suspense>
        </div>
        <div className="w-full md:hidden block">
          <Suspense fallback={null}>
            <MobileFilters />
          </Suspense>
        </div>
        <div className="w-full">{children}</div>
        <BannerNewsletter />
        <Footer />
      </div>
    </>
  );
}

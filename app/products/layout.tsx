import Collections from '@/components/collections';
import Filters from '@/components/filters';
import Footer from '@/components/footer';
import MobileCollections from '@/components/mobile-collections';
import MobileFilters from '@/components/mobile-filters';
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
        <div className="flex flex-col items-center gap-2 py-5">
          <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl">
            Products
          </h1>
          <p className="text-center text-neutral-500 dark:text-neutral-400">
            We have a wide range of products to choose from.{' '}
            <span className="inline-block md:block">
              Find the best products for you.
            </span>
          </p>
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
          <MobileFilters />
        </div>
        <div className="w-full">{children}</div>
        <BannerNewsletter />
        <Footer />
      </div>
    </>
  );
}

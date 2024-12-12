import BannerItem from '@/components/banner';
import BannerNewsletter from '@/components/banner-newsletter';
import CarouselItems from '@/components/carousel';
import Footer from '@/components/footer';
import ThreeItems from '@/components/three-items';
import { getBanner } from '@/lib/actions';
import { Banner } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
  const productsBanner = (await getBanner()) as Banner[];

  return (
    <>
      <div className="flex flex-col gap-24 p-5">
        <div className="flex flex-col gap-4 mt-12">
          <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl">
            Welcome to our store!{' '}
            <span className="md:block">Enjoy shopping with us.</span>
          </h1>
          <div className="flex flex-col gap-4 lg:flex-row items-start lg:items-end lg:justify-between">
            <div>
              <h4 className="text-xl tracking-tight">
                The best place to find the awesome products you love.{' '}
                <span className="md:block">
                  We bring you the best deals on the latest products.
                </span>
              </h4>
            </div>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full px-6"
            >
              <Link href="/products">Browse all products</Link>
            </Button>
          </div>
        </div>
        <BannerItem item={productsBanner.map((product) => product)} />
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-center lg:text-5xl">
              Get the best deals <br></br> on the latest products.
            </h1>
            <Button
              variant="link"
              className="h-4 p-0 text-blue-600 dark:text-blue-400"
            >
              <Link href="/products">Shop now</Link>
            </Button>
          </div>
          <div className="mx-16">
            <CarouselItems />
          </div>
        </div>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl text-center font-extrabold tracking-tight lg:text-5xl">
              Best sellers.
            </h1>
            <h4 className="text-xl text-center tracking-tight">
              Check out our best sellers and find the perfect product for you.
            </h4>
          </div>
          <ThreeItems />
        </div>
        <BannerNewsletter />
        <Footer />
      </div>
    </>
  );
}

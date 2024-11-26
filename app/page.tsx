import BannerItem from '@/components/banner';
import BannerSignup from '@/components/banner-signup';
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
        {/* <div className="flex flex-col gap-4 mt-12">
          <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl xl:text-6xl">
            Welcome to our{' '}
            <span className="text-blue-600 dark:text-blue-400">
              Retro Store
            </span>
            !
          </h1>
          <p className="text-xl text-neutral-500 dark:text-neutral-400">
            The best place to find the awesome products you love.
          </p>
        </div> */}
        <BannerItem item={productsBanner.map((product) => product)} />
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-4xl font-semibold tracking-tight text-center lg:text-5xl">
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
            <h1 className="text-4xl text-center font-semibold tracking-tight lg:text-5xl">
              Best sellers.
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400">
              Check out our best sellers and find the perfect product for you.
            </p>
          </div>
          <ThreeItems />
        </div>
        <BannerSignup />
        <Footer />
      </div>
    </>
  );
}

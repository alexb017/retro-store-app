import BannerItem from '@/components/banner';
import BannerSignup from '@/components/banner-signup';
import CarouselItems from '@/components/carousel';
import Footer from '@/components/footer';
import ThreeItems from '@/components/three-items';
import { getBanner } from '@/lib/actions';
import { Banner } from '@/lib/types';

export default async function Home() {
  const productsBanner = (await getBanner()) as Banner[];

  return (
    <>
      <div className="flex flex-col gap-20 p-4">
        <BannerItem item={productsBanner.map((product) => product)} />
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl text-center">
          Shop the deals
        </h1>
        <div className="mx-16">
          <CarouselItems />
        </div>
        <ThreeItems />
        <BannerSignup />
      </div>
      <Footer />
    </>
  );
}

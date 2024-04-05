import BannerItem from '@/components/banner';
import BannerSignup from '@/components/banner-signup';
import CarouselItems from '@/components/carousel';
import Carousel from '@/components/carousel';
import Footer from '@/components/footer';
import ProductGrid from '@/components/product-grid';
import ThreeItems from '@/components/three-items';
import { getProducts, getBanner } from '@/lib/actions';

export default async function Home() {
  const productsBanner = await getBanner();
  const products: any = await getProducts();
  const firstEightElements = products?.slice(0, 8);
  const threeElements = products?.slice(5, 8);

  return (
    <>
      <div className="flex flex-col gap-20 p-4">
        <BannerItem item={productsBanner.map((product: any) => product)} />
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl text-center">
          Shop the deals
        </h1>
        <div className="mx-16">
          <CarouselItems products={firstEightElements} />
        </div>
        <ThreeItems products={threeElements} />
        <BannerSignup />
      </div>
      <Footer />
    </>
  );
}

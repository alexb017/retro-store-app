import BannerItem from '@/components/banner';
import CarouselItems from '@/components/carousel';
import Carousel from '@/components/carousel';
import Footer from '@/components/footer';
import ProductGrid from '@/components/product-grid';
import { getProducts, getBanner } from '@/lib/actions';

export default async function Home() {
  const productsBanner = await getBanner();
  const products: any = await getProducts();

  return (
    <>
      <div className="flex flex-col gap-12 p-4">
        <BannerItem item={productsBanner.map((product: any) => product)} />
        <h1 className="text-3xl font-semibold text-center tracking-tight">
          Shop the deals
        </h1>
        <div className="mx-16">
          <CarouselItems products={products} />
        </div>
      </div>
      <Footer />
    </>
  );
}

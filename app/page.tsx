import BannerItem from '@/components/banner';
import Carousel from '@/components/carousel';
import Footer from '@/components/footer';
import ProductGrid from '@/components/product-grid';
import { getProducts, getBanner } from '@/lib/actions';

export default async function Home() {
  const productsBanner = await getBanner();
  const products: any = await getProducts();

  return (
    <>
      <div className="p-4">
        <BannerItem item={productsBanner.map((product: any) => product)} />
        <h1 className="text-4xl my-12 text-center font-semibold">
          Shop the deals
        </h1>
        <Carousel products={products} />
      </div>
      <Footer />
    </>
  );
}

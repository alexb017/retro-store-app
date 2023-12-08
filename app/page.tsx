import BannerItem from '@/components/banner';
import Footer from '@/components/footer';
import ProductGrid from '@/components/product-grid';
import { getProducts, getBanner } from '@/lib/actions';

export default async function Home() {
  const productsBanner = await getBanner();
  const products: any = await getProducts();
  const firstFourElements = products.slice(0, 4);

  return (
    <>
      <div className="p-4">
        <BannerItem item={productsBanner.map((product: any) => product)} />
        <h1 className="text-4xl my-12 text-center font-semibold">
          Shop the deals
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <ProductGrid products={firstFourElements} />
        </div>
      </div>
      <Footer />
    </>
  );
}

import BannerItem from '@/components/banner';
import Footer from '@/components/footer';
import ProductGrid from '@/components/product-grid';
import { getProducts, getBanner } from '@/lib/actions';

export default async function Home() {
  const productsBanner = await getBanner();
  const products: any = await getProducts();

  return (
    <>
      <div className="p-5">
        <BannerItem item={productsBanner.map((product: any) => product)} />
        <h1 className="text-4xl my-12 text-center font-bold">
          Shop the deals.
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          <ProductGrid products={products} />
        </div>
      </div>
      <Footer />
    </>
  );
}

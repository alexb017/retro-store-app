import BannerItem from '@/components/banner';
import Footer from '@/components/footer';
import ProductGrid from '@/components/product-grid';
import { getProductsBanner } from '@/lib/actions';

export default async function Home() {
  const products = await getProductsBanner();
  return (
    <>
      <div className="p-5">
        <BannerItem item={products[0]?.map((product: any) => product)} />
        <h1 className="text-2xl my-5">Products</h1>
        <ProductGrid />
      </div>
      <Footer />
    </>
  );
}

import BannerItem from '@/components/banner';
import Footer from '@/components/footer';
import ProductGrid from '@/components/product-grid';
import { getProducts, getProductsBanner } from '@/lib/actions';

export default async function Home() {
  const productsBanner = await getProductsBanner();
  const products: any = await getProducts();

  return (
    <>
      <div className="p-5">
        <BannerItem item={productsBanner[0]?.map((product: any) => product)} />
        <h1 className="text-2xl my-5">Products</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <ProductGrid products={products} />
        </div>
      </div>
      <Footer />
    </>
  );
}

import ProductGrid from '@/components/product-grid';
import { getProducts } from '@/lib/actions';

export default async function Search() {
  const products: any = await getProducts();
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <ProductGrid products={products} />
      </div>
    </>
  );
}

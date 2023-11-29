import ProductGrid from '@/components/product-grid';
import { getProducts } from '@/lib/actions';

export default async function CategoryPage({
  params: { category },
}: {
  params: { category: string };
}) {
  const products: any[] = await getProducts();

  const filtered = products?.filter(
    (product) => product?.category === category
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <ProductGrid products={filtered} />
      </div>
    </>
  );
}

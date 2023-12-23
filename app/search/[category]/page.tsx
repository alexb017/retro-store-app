import ProductGrid from '@/components/product-grid';
import { getProducts } from '@/lib/actions';

export default async function CategoryPage({
  params: { category },
  searchParams,
}: {
  params: { category: string };
  searchParams: { q: string; sort: string };
}) {
  const products: any[] = await getProducts();

  let filtered = products?.filter((product) => product?.category === category);
  let productsFilter: any;

  if (!searchParams.q) {
    productsFilter = filtered;
  }

  if (searchParams.q) {
    productsFilter = filtered.filter((product: any) =>
      product?.name.toLowerCase().includes(searchParams.q?.toLowerCase())
    );
  }

  if (searchParams.sort === 'asc') {
    productsFilter = filtered.sort((a: any, b: any) => a.price - b.price);
  }

  if (searchParams.sort === 'des') {
    productsFilter = filtered.sort((a: any, b: any) => b.price - a.price);
  }

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:grid-cols-3">
        <ProductGrid products={productsFilter} />
      </div>
    </>
  );
}

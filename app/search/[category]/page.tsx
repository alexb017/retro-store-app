import ProductGrid from '@/components/product-grid';
import { getProducts } from '@/lib/actions';
import { type Products } from '@/lib/types';

export default async function CategoryPage({
  params: { category },
  searchParams,
}: {
  params: { category: string };
  searchParams: { q: string; sort: string };
}) {
  const products = (await getProducts()) as Products[];

  let filtered = products?.filter((product) => product?.category === category);
  let productsFilter: Products[] = [];

  if (!searchParams.q) {
    productsFilter = filtered;
  }

  if (searchParams.q) {
    productsFilter = filtered.filter((product: Products) =>
      product?.name.toLowerCase().includes(searchParams.q?.toLowerCase())
    );
  }

  if (searchParams.sort === 'asc') {
    productsFilter = filtered.sort(
      (a: Products, b: Products) =>
        Number.parseInt(a.price, 10) - Number.parseInt(b.price, 10)
    );
  }

  if (searchParams.sort === 'des') {
    productsFilter = filtered.sort(
      (a: Products, b: Products) =>
        Number.parseInt(b.price, 10) - Number.parseInt(a.price, 10)
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:grid-cols-3">
        <ProductGrid products={productsFilter} />
      </div>
    </>
  );
}

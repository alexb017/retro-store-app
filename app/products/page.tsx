import ProductGrid from '@/components/product-grid';
import { getProducts } from '@/lib/actions';
import { type Products } from '@/lib/types';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string; sort: string }>;
}) {
  const products = (await getProducts()) as Products[];

  const params = await searchParams;

  const productsFiltered = products.filter((product) =>
    params.q
      ? product.name.toLowerCase().includes(params.q.toLowerCase())
      : true
  );

  if (params.sort === 'asc') {
    productsFiltered.sort((a, b) => a.price - b.price);
  }

  if (params.sort === 'des') {
    productsFiltered.sort((a, b) => b.price - a.price);
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <ProductGrid products={productsFiltered} />
      </div>
    </>
  );
}

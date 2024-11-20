import ProductGrid from '@/components/product-grid';
import { getProducts } from '@/lib/actions';
import { type Products } from '@/lib/types';

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ q: string; sort: string }>;
}) {
  const products = (await getProducts()) as Products[];
  const paramsCategory = await params;
  const searchParamsQSort = await searchParams;

  const productsFiltered = products?.filter(
    (product) =>
      product?.category === paramsCategory?.category &&
      (searchParamsQSort.q
        ? product?.name
            .toLowerCase()
            .includes(searchParamsQSort.q?.toLowerCase())
        : true)
  );

  if (searchParamsQSort.sort === 'asc') {
    productsFiltered.sort((a, b) => a.price - b.price);
  }

  if (searchParamsQSort.sort === 'des') {
    productsFiltered.sort((a, b) => b.price - a.price);
  }

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:grid-cols-3">
        <ProductGrid products={productsFiltered} />
      </div>
    </>
  );
}

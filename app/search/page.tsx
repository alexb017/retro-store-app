import ProductGrid from '@/components/product-grid';
import { getProducts } from '@/lib/actions';

export default async function Search({
  searchParams,
}: {
  searchParams: { q: string; sort: string };
}) {
  const products = await getProducts();
  let productsFilter: any;

  if (!searchParams.q) {
    productsFilter = products;
  }

  if (searchParams.q) {
    productsFilter = products.filter((product: any) =>
      product?.name.toLowerCase().includes(searchParams.q?.toLowerCase())
    );
  }

  if (searchParams.sort === 'asc') {
    productsFilter = products.toSorted((a: any, b: any) => a.price - b.price);
  }

  if (searchParams.sort === 'des') {
    productsFilter = products.toSorted((a: any, b: any) => b.price - a.price);
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:grid-cols-2 md:grid-cols-3">
        <ProductGrid products={productsFilter} />
      </div>
    </>
  );
}

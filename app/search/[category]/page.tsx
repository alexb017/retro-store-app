export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  return <h1>{params.category}</h1>;
}

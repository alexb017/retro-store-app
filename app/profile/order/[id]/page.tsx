export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const param = await params;

  return (
    <>
      <h1>Order {param.id}</h1>
    </>
  );
}

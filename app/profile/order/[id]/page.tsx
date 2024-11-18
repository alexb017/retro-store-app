import OrderItem from '@/components/order-item';

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const param = await params;

  return (
    <>
      <OrderItem id={param.id} />
    </>
  );
}

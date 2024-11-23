import Order from '@/components/order';

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const param = await params;

  return (
    <>
      <Order orderId={param.id} />
    </>
  );
}

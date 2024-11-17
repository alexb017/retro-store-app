import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Orders',
  description: 'Orders history',
};

export default function LayoutOrders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full md:max-w-3xl mx-auto">
      <div className="p-4">{children}</div>
    </div>
  );
}

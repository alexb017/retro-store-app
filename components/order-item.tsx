import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { type OrderItems } from '@/lib/types';

export default function OrderItem({ item }: { item: OrderItems[] }) {
  return (
    <>
      {item.map((orderItem, index) => (
        <div key={index} className="p-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <h4 className="text-sm text-zinc-500">
                Order nr: {orderItem?.order_id}
              </h4>
              <h1 className="text-4xl tracking-tight mt-2">
                Thank you, {''}
                <span className="font-semibold">{orderItem?.name}</span>
              </h1>
              <h1 className="text-4xl">for your order!</h1>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

import CartTestDemo from '@/components/card-test-demo';
import Cart from '@/components/cart';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Cart page',
};

export default function CartPage() {
  return (
    <div className="w-full md:max-w-3xl mx-auto p-5">
      <Cart />
      <CartTestDemo />
    </div>
  );
}

'use client';

import { deleteProductCart } from '@/lib/actions';
import { useRouter } from 'next/navigation';

export default function DeleteItemCart({ id }: { id: string }) {
  const router = useRouter();

  async function deleteItem(id: string) {
    await deleteProductCart(id);
    //router.refresh();
  }

  return (
    <button
      onClick={() => deleteItem(id)}
      className="flex items-center text-sm border rounded-full border-neutral-200 px-4 py-2 hover:scale-105 text-neutral-500 hover:text-black transition-transform ease-in-out"
    >
      Delete Item
    </button>
  );
}

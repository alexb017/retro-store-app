'use client';

import { deleteItemCart } from '@/lib/actions';
import { useRouter } from 'next/navigation';

export default function DeleteItemCart({
  id,
  item,
}: {
  id: string;
  item: any;
}) {
  const router = useRouter();

  return (
    <button
      onClick={async () => await deleteItemCart(id, item)}
      className="flex items-center text-sm border rounded-full border-neutral-200 px-4 py-2 hover:scale-105 text-neutral-500 hover:text-black transition-transform ease-in-out"
    >
      Delete Item
    </button>
  );
}

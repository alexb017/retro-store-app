'use client';

import { deleteItemCart } from '@/lib/actions';

export default function DeleteItemCart({
  id,
  item,
}: {
  id: string;
  item: any;
}) {
  return (
    <button
      onClick={async () => await deleteItemCart(id, item)}
      className="flex items-center text-sm text-blue-500 border-b border-neutral-500 hover:text-black transition-all ease-in-out dark:text-blue-400 dark:hover:border-neutral-400"
    >
      Remove
    </button>
  );
}

'use client';

import { deleteItemCart } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import CloseIcon from './icons/close';

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
      className="flex absolute -top-2 -right-2 bg-gray-200 p-1 rounded-full shadow-lg hover:scale-105 text-gray-500 hover:text-black transition-all ease-in-out"
    >
      <CloseIcon classname="h-4" />
    </button>
  );
}

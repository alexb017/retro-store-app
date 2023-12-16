'use client';

import { deleteItemFavorite } from '@/lib/actions';
import HeartFillIcon from './icons/heart-fill';

export default function DeleteItemFavorite({
  id,
  item,
}: {
  id: string;
  item: any;
}) {
  return (
    <button
      onClick={async () => await deleteItemFavorite(id, item)}
      className="flex text-blue-500 transition-all"
    >
      <HeartFillIcon classname="w-6 h-6" />
    </button>
  );
}

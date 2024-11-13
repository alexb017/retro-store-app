'use client';

import { deleteItemFavorite } from '@/lib/actions';
import HeartFillIcon from './icons/heart-fill';

export default function DeleteItemFavorite({
  uid,
  id,
}: {
  uid: string;
  id: string;
}) {
  return (
    <button
      onClick={async () => await deleteItemFavorite(uid, id)}
      className="flex text-blue-500 transition-all"
    >
      <HeartFillIcon classname="w-6 h-6" />
    </button>
  );
}

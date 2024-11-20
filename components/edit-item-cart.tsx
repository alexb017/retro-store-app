'use client';

import { Plus, Minus } from 'lucide-react';
import { decrementQuantity, incrementQuantity } from '@/lib/actions';
import { Button } from './ui/button';
import { type CartItem } from '@/lib/types';

export default function EditItemQuantity({
  item,
  type,
  uid,
}: {
  item: CartItem;
  type: 'plus' | 'minus';
  uid: string;
}) {
  async function updateItem() {
    if (item?.quantity <= 1 && type === 'minus') {
      return;
    }

    if (type === 'plus') {
      await incrementQuantity(uid, item);
    }

    if (type === 'minus') {
      await decrementQuantity(uid, item);
    }
  }

  return (
    <Button
      size="icon"
      onClick={updateItem}
      className={`px-3 py-2 bg-transparent hover:bg-transparent text-zinc-500 hover:text-black transition-all ease-in-out dark:text-zinc-400 dark:hover:text-white ${
        item?.quantity === 1 && type === 'minus'
          ? 'cursor-not-allowed opacity-30 hover:text-zinc-500 dark:hover:text-zinc-400'
          : ''
      }`}
    >
      {type === 'plus' ? (
        <Plus className="w-5 h-5" />
      ) : (
        <Minus className="w-5 h-5" />
      )}
    </Button>
  );
}

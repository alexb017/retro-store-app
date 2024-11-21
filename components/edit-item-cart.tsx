'use client';

import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
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
    if (item?.quantity === 1 && type === 'minus') {
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
      className={`p-0 w-9 h-9 bg-transparent hover:bg-neutral-100 rounded-full text-neutral-500 hover:text-black transition-all duration-200 ease-in dark:hover:text-white dark:hover:bg-neutral-800 ${
        item?.quantity === 1 && type === 'minus'
          ? 'cursor-not-allowed opacity-30 text-black hover:bg-transparent dark:text-white dark:hover:bg-transparent'
          : ''
      }`}
    >
      {type === 'plus' ? (
        <PlusIcon className="w-5 h-5" />
      ) : (
        <MinusIcon className="w-5 h-5" />
      )}
    </Button>
  );
}

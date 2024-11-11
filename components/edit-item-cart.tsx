'use client';

import PlusIcon from './icons/plus';
import MinusIcon from './icons/minus';
import { decrementQuantity, incrementQuantity } from '@/lib/actions';
import { useContext } from 'react';
import { AuthContext } from '@/app/AuthContext';
import { Button } from './ui/button';
import { User } from 'firebase/auth';
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
        <PlusIcon classname="h-5" />
      ) : (
        <MinusIcon classname="h-5" />
      )}
    </Button>
  );
}

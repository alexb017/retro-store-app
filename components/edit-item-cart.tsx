'use client';

import { useRouter } from 'next/navigation';
import PlusIcon from './icons/plus';
import MinusIcon from './icons/minus';
import { updateProductCart } from '@/lib/actions';

export default function EditItemQuantity({
  item,
  type,
}: {
  item: any;
  type: 'plus' | 'minus';
}) {
  const router = useRouter();

  async function updateItem() {
    const quantity: any =
      type === 'plus' ? item.quantity + 1 : item.quantity - 1;

    if (item.quantity === 1 && type === 'minus') return;

    await updateProductCart(quantity, item?.id);

    router.refresh();
  }

  return (
    <button
      onClick={updateItem}
      className="px-4 py-3 hover:scale-105 text-neutral-500 hover:text-black transition-transform ease-in-out"
    >
      {type === 'plus' ? (
        <PlusIcon classname="h-4" />
      ) : (
        <MinusIcon classname="h-4" />
      )}
    </button>
  );
}

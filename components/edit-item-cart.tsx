'use client';

import { useRouter } from 'next/navigation';
import PlusIcon from './icons/plus';
import MinusIcon from './icons/minus';
import { deleteItemCart, updateItemCart } from '@/lib/actions';
import { useContext } from 'react';
import { AuthContext } from '@/app/AuthContext';
import { getUserCart } from '@/lib/actions';

export default function EditItemQuantity({
  item,
  type,
}: {
  item: any;
  type: 'plus' | 'minus';
}) {
  const { user } = useContext(AuthContext);

  const router = useRouter();
  //console.log(item);

  async function updateItem() {
    const userCart = await getUserCart(user?.uid);

    const quantity: any =
      type === 'plus' ? item?.quantity + 1 : item?.quantity - 1;

    // Check if item exists
    const existingItem = userCart?.find(
      (product: any) => product?.handle === item?.handle
    );

    if (item?.quantity <= 1 && type === 'minus') {
      //await deleteItemCart(user?.uid, existingItem);
      return;
    }

    if (existingItem) {
      // Update item with new quantity
      const updateItem = userCart?.map((product: any) => {
        if (product?.handle === item?.handle) {
          return { ...product, quantity: quantity };
        }
        return product;
      });

      // Update db with new value
      await updateItemCart(user?.uid, updateItem);
    }

    //router.refresh();
  }

  return (
    <button
      onClick={updateItem}
      className={`px-6 h-11 hover:scale-105 text-gray-500 hover:text-black transition-all ease-in-out ${
        item?.quantity === 1 && type === 'minus'
          ? 'cursor-not-allowed opacity-50 hover:text-gray-500'
          : ''
      }`}
    >
      {type === 'plus' ? (
        <PlusIcon classname="h-5" />
      ) : (
        <MinusIcon classname="h-5" />
      )}
    </button>
  );
}

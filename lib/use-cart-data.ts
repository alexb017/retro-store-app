import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, Unsubscribe } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { type CartItems } from './types';

// Custom hook to listen for updates on cart
export default function useCartData(id: string) {
  const [cart, setCart] = useState<CartItems[]>([]);

  useEffect(() => {
    let unsubsribe: Unsubscribe | undefined;

    if (id) {
      const q = doc(db, 'users-cart', id);
      unsubsribe = onSnapshot(q, (doc) => {
        const data = doc.data()?.cart;
        setCart(data);
      });
    }

    return () => {
      if (unsubsribe) {
        unsubsribe();
      }
    };
  }, [id]);

  return [cart];
}

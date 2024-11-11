import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, Unsubscribe } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { type CartItem } from './types';

// Custom hook to listen for updates on cart
export default function useCartData(uid: string) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    let unsubsribe: Unsubscribe | undefined;

    if (uid) {
      const q = collection(db, 'users', uid, 'cart');
      unsubsribe = onSnapshot(q, (querySnapshot) => {
        const data: CartItem[] = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data() as CartItem);
        });

        setCart(data);
      });
    }

    return () => {
      if (unsubsribe) {
        unsubsribe();
      }
    };
  }, [uid]);

  return [cart];
}

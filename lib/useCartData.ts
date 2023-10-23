import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Custom hook to read products from cart
export default function useCartData(id: string) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let unsubsribe: any;

    if (id) {
      const q = doc(db, 'users-cart', id);
      unsubsribe = onSnapshot(q, (doc) => {
        console.log(doc.data()?.cart);
        setCart(doc.data()?.cart as any);
      });
    }

    return () => unsubsribe;
  }, [id]);

  return [cart];
}

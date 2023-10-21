import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Custom hook to read products from cart
export default function useCartData() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const q = collection(db, 'cart');
    const unsubsribe = onSnapshot(q, (querySnapshot) => {
      const productsCart: any = [];

      querySnapshot.forEach((doc) => {
        productsCart.push({ id: doc.id, ...doc.data() });
      });

      setCart(productsCart);
    });

    return () => unsubsribe();
  }, []);

  return [cart];
}

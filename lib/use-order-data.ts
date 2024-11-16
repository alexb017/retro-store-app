import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, Unsubscribe } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { type OrderItems } from './types';

// Custom hook to listen for updates on order
export default function useOrderData(uid: string) {
  const [order, setOrder] = useState<OrderItems[] | null>(null);

  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined;

    if (uid) {
      const q = collection(db, 'users', uid, 'orders');
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data: OrderItems[] = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data() as OrderItems);
        });
        setOrder(data);
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [uid]);

  return [order];
}

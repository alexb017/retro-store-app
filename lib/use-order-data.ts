import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, Unsubscribe } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { type OrderType } from './types';

// Custom hook to listen for updates on order
export default function useOrderData(id: string) {
  const [order, setOrder] = useState<OrderType[]>([]);

  useEffect(() => {
    let unsubsribe: Unsubscribe | undefined;

    if (id) {
      const q = doc(db, 'users-orders', id);
      unsubsribe = onSnapshot(q, (doc) => {
        const data = doc.data()?.order;
        setOrder(data);
      });
    }

    return () => {
      if (unsubsribe) {
        unsubsribe();
      }
    };
  }, [id]);

  return [order];
}

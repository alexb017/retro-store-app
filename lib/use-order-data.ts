import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Custom hook to listen for updates on order
export default function useOrderData(id: string) {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    let unsubsribe: any;

    if (id) {
      const q = doc(db, 'users-orders', id);
      unsubsribe = onSnapshot(q, (doc) => {
        // console.log(doc?.data()?.cart);
        const data = doc.data()?.order as any;
        setOrder(data);
      });
    }

    return () => unsubsribe;
  }, [id]);

  return [order];
}

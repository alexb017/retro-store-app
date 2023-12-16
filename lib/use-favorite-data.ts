import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Custom hook to listen for updates on favorite
export default function useFavoriteData(id: string) {
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    let unsubsribe: any;

    if (id) {
      const q = doc(db, 'users-favorite', id);
      unsubsribe = onSnapshot(q, (doc) => {
        const data = doc.data()?.favorite as any;
        setFavorite(data);
      });
    }

    return () => unsubsribe;
  }, [id]);

  return [favorite];
}

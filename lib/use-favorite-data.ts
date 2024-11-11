import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, Unsubscribe } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Custom hook to listen for updates on favorite
export default function useFavoriteData(id: string) {
  const [favorite, setFavorite] = useState<any>([]);

  useEffect(() => {
    let unsubsribe: Unsubscribe | undefined;

    if (id) {
      const q = doc(db, 'users-favorite', id);
      unsubsribe = onSnapshot(q, (doc) => {
        const data = doc.data()?.favorite;
        setFavorite(data);
      });
    }

    return () => {
      if (unsubsribe) {
        unsubsribe();
      }
    };
  }, [id]);

  return [favorite];
}

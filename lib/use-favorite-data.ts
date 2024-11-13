import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, Unsubscribe } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { type FavoriteItem } from './types';

// Custom hook to listen for updates on favorite
export default function useFavoriteData(uid: string) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    let unsubsribe: Unsubscribe | undefined;

    if (uid) {
      const q = collection(db, 'users', uid, 'favorites');
      unsubsribe = onSnapshot(q, (querySnapshot) => {
        const data: FavoriteItem[] = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data() as FavoriteItem);
        });

        setFavorites(data);
      });
    }

    return () => {
      if (unsubsribe) {
        unsubsribe();
      }
    };
  }, [uid]);

  return [favorites];
}

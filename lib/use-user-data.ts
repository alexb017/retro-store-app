import { useState, useEffect } from 'react';
import { doc, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { db } from './firebase';
import { type UserProfile } from './types';

// Costum hook to get user data from the database
export default function useUserData(uid: string) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined;

    if (uid) {
      const userRef = doc(db, 'users', uid);
      unsubscribe = onSnapshot(userRef, (doc) => {
        setUserProfile(doc.data() as UserProfile);
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [uid]);

  return [userProfile];
}

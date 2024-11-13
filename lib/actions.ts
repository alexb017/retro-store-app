import { cache } from 'react';
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  increment,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { type ProductInfoType, type UserProfile, type CartItem } from './types';

export async function createUser(user: UserProfile, data: object) {
  const { uid, email, displayName, photoURL } = user;
  const userRef = doc(db, 'users', uid);
  const userSnapshot = await getDoc(userRef);

  console.log('user', user);

  const userId = uid;

  if (!userSnapshot.exists()) {
    try {
      await setDoc(userRef, {
        userId,
        email,
        displayName,
        photoURL,
        ...data,
      });
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  return userRef;
}

export async function checkUserExists(uid: string) {
  const userRef = doc(db, 'users', uid);
  const userSnapshot = await getDoc(userRef);

  return userSnapshot.exists();
}

export async function getProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (error) {
    throw new Error('Failed to get products');
  }
}

export async function getProduct(params: string) {
  try {
    const querySnapshot = await getDocs(collection(db, 'product-info'));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ProductInfoType[];

    return data.find((product) => product.handle === params);
  } catch (error) {
    throw new Error('Failed to get product');
  }
}

export async function getBanner() {
  try {
    const querySnapshot = await getDocs(collection(db, 'banner'));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (error) {
    throw new Error('Failed to get the banner');
  }
}

export async function createCart(uid: string, cart: any) {
  try {
    // Add a new document in subcollection 'cart'
    const docRef = await addDoc(collection(db, 'users', uid, 'cart'), cart);

    // Update the document with the ID
    await updateDoc(docRef, {
      id_cart: docRef.id,
    });
  } catch (error) {
    throw new Error('Failed to create the cart');
  }
}

export async function getCart(uid: string) {
  try {
    // Get all documents in subcollection 'cart'
    const querySnapshot = await getDocs(collection(db, 'users', uid, 'cart'));
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    return data;
  } catch (error) {
    throw new Error('Failed to get user cart');
  }
}

export async function incrementQuantity(uid: string, item: CartItem) {
  try {
    // Increment the quantity of the item
    const docRef = doc(db, 'users', uid, 'cart', item.id_cart);
    await updateDoc(docRef, {
      quantity: increment(1),
    });
  } catch (error) {
    throw new Error('Failed to add item to cart');
  }
}

export async function deleteItemCart(uid: string, id: string) {
  try {
    await deleteDoc(doc(db, 'users', uid, 'cart', id));
  } catch (error) {
    throw new Error('Failed to delete item from cart');
  }
}

export async function decrementQuantity(uid: string, item: CartItem) {
  try {
    const docRef = doc(db, 'users', uid, 'cart', item.id_cart);
    await updateDoc(docRef, {
      quantity: increment(-1),
    });
  } catch (error) {
    throw new Error('Failed to update item cart');
  }
}

export async function createFavorites(uid: string, item: object) {
  try {
    // Add a new document in subcollection 'favorites'
    const docRef = await addDoc(
      collection(db, 'users', uid, 'favorites'),
      item
    );

    // Update the document with the ID
    await updateDoc(docRef, {
      id_favorite: docRef.id,
    });
  } catch (error) {
    throw new Error('Failed to create the favorites');
  }
}

export async function deleteItemFavorite(uid: string, id: string) {
  try {
    await deleteDoc(doc(db, 'users', uid, 'favorites', id));
  } catch (error) {
    throw new Error('Failed to delete item from favorite');
  }
}

export async function addItemsOrder(id: string, items: any) {
  try {
    await setDoc(doc(db, 'users-orders', id), items);
  } catch (error) {
    throw new Error('Failded to add order');
  }
}

export async function updateItemsOrder(id: string, item: any) {
  try {
    await updateDoc(doc(db, 'users-orders', id), {
      order: arrayUnion(item),
    });
  } catch (error) {
    throw new Error('Failed to add item to order');
  }
}

export async function getUserFavorite(id: string) {
  try {
    const querySnapshot = await getDoc(doc(db, 'users-favorite', id));
    const data = querySnapshot.data()?.favorite;

    return data;
  } catch (error) {
    throw new Error('Failed to get user favorite');
  }
}

export async function setUserFavorite(id: string, data: any) {
  try {
    await setDoc(doc(db, 'users-favorite', id), data);
  } catch (error) {
    throw new Error('Failed to set favorite user');
  }
}

export async function addItemFavorite(id: string, item: any) {
  try {
    await updateDoc(doc(db, 'users-favorite', id), {
      favorite: arrayUnion(item),
    });
  } catch (error) {
    throw new Error('Failed to add item to favorite');
  }
}

export async function updateItemFavorite(id: string, item: any) {
  try {
    await updateDoc(doc(db, 'users-favorite', id), {
      favorite: item,
    });
  } catch (error) {
    throw new Error('Failed to update item favorite');
  }
}

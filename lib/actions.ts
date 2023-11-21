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
} from 'firebase/firestore';
import { db } from './firebase';

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  handle: string;
};

export async function getProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const data = querySnapshot.docs.map((doc) => ({
      id_document: doc.id,
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
    const data: any[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data.find((product) => product.handle === params);
  } catch (error) {
    throw new Error('Failed to get product');
  }
}

export async function getProductsBanner() {
  try {
    const querySnapshot = await getDocs(collection(db, 'products-banner'));
    const data = querySnapshot.docs.map((doc) => doc.data().items);

    return data;
  } catch (error) {
    throw new Error('Failed to get products for the banner');
  }
}

export async function setCartUser(id: string, data: any) {
  try {
    await setDoc(doc(db, 'users-cart', id), data);
  } catch (error) {
    throw new Error('Failed to set cart user');
  }
}

export async function getUserCart(id: string) {
  try {
    const querySnapshot = await getDoc(doc(db, 'users-cart', id));
    const data = querySnapshot.data()?.cart;

    return data;
  } catch (error) {
    throw new Error('Failed to get user cart');
  }
}

export async function addItemCart(id: string, item: any) {
  try {
    await updateDoc(doc(db, 'users-cart', id), {
      cart: arrayUnion(item),
    });
  } catch (error) {
    throw new Error('Failed to add item to cart');
  }
}

export async function deleteItemCart(id: string, item: any) {
  try {
    await updateDoc(doc(db, 'users-cart', id), {
      cart: arrayRemove(item),
    });
  } catch (error) {
    throw new Error('Failed to delete item from cart');
  }
}

export async function updateItemCart(id: string, item: any) {
  try {
    await updateDoc(doc(db, 'users-cart', id), {
      cart: item,
    });
  } catch (error) {
    throw new Error('Failed to update item cart');
  }
}

export async function addItemsOrder(id: string, items: any) {
  try {
    await setDoc(doc(db, 'users-cart', id), items);
  } catch (error) {
    throw new Error('Failded to add order');
  }
}

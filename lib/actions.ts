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
  const querySnapshot = await getDocs(collection(db, 'products'));
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function getProduct(params: string) {
  const querySnapshot = await getDocs(collection(db, 'product-info'));
  const data: any[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data.find((product) => product.handle === params);
}

export async function getProductsBanner() {
  const querySnapshot = await getDocs(collection(db, 'products-banner'));
  const data = querySnapshot.docs.map((doc) => doc.data().items);

  return data;
}

export async function setCartUser(id: string, data: any) {
  await setDoc(doc(db, 'users-cart', id), data);
}

export async function getCart() {
  const querySnapshot = await getDocs(collection(db, 'cart'));
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function updateProductCart(quantity: number, id: string) {
  await updateDoc(doc(db, 'cart', id), {
    quantity: quantity,
  });
}

export async function deleteProductCart(id: string) {
  await deleteDoc(doc(db, 'cart', id));
}

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

export async function getUserCart(id: string) {
  const querySnapshot = await getDoc(doc(db, 'users-cart', id));
  const data = querySnapshot.data()?.cart;

  return data;
}

export async function addItemCart(id: string, item: any) {
  await updateDoc(doc(db, 'users-cart', id), {
    cart: arrayUnion(item),
  });
}

export async function deleteItemCart(id: string, item: any) {
  await updateDoc(doc(db, 'users-cart', id), {
    cart: arrayRemove(item),
  });
}

export async function updateItemCart(id: string, item: any) {
  await updateDoc(doc(db, 'users-cart', id), {
    cart: item,
  });
}

export async function addOrderItems(id: string, items: any) {
  await setDoc(doc(db, 'order-items', id), items);
}

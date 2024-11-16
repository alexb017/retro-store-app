import { db } from './firebase-admin';
import { type OrderItems } from './types';

// Get the user's cart
export async function getCartItems(userId: string) {
  try {
    const cartRef = db.collection('users').doc(userId).collection('cart');
    const cartSnapshot = await cartRef.get();
    const cart = cartSnapshot.docs.map((doc) => doc.data());

    return cart;
  } catch (error: any) {
    throw new Error('Failed to get cart items');
  }
}

// Delete the user's cart items
export async function deleteCartItems(userId: string) {
  try {
    const cartRef = db.collection('users').doc(userId).collection('cart');
    const cartSnapshot = await cartRef.get();

    // Create a new batch of writes to delete the cart items from the user's cart collection
    // This is more efficient than deleting each document individually
    // See: https://firebase.google.com/docs/firestore/manage-data/delete-data#collections
    const batchSize = cartSnapshot.size;
    if (batchSize === 0) {
      // When there are no documents left, we are done
      return;
    }

    // Delete documents in a batch
    const batch = db.batch();
    cartSnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    // Recurse on the next process tick, to avoid exceeding the maximum stack call size
    process.nextTick(() => deleteCartItems(userId));
  } catch (error: any) {
    throw new Error('Failed to delete cart items');
  }
}

// Store the order in the database
export async function createOrder(userId: string, order: OrderItems) {
  try {
    await db.collection('users').doc(userId).collection('orders').add(order);
  } catch (error: any) {
    throw new Error('Failed to create order');
  }
}

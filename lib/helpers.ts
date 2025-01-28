import { db } from './firebase-admin';
import { type OrderItems } from './types';
import { getAuth } from 'firebase-admin/auth';

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

// Delete the user's orders
export async function deleteOrders(userId: string) {
  try {
    const ordersRef = db.collection('users').doc(userId).collection('orders');
    const ordersSnapshot = await ordersRef.get();

    // Create a new batch of writes to delete the orders from the user's orders collection
    // This is more efficient than deleting each document individually
    // See: https://firebase.google.com/docs/firestore/manage-data/delete-data#collections
    const batchSize = ordersSnapshot.size;
    if (batchSize === 0) {
      // When there are no documents left, we are done
      return;
    }

    // Delete documents in a batch
    const batch = db.batch();
    ordersSnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    // Recurse on the next process tick, to avoid exceeding the maximum stack call size
    process.nextTick(() => deleteOrders(userId));
  } catch (error: any) {
    throw new Error('Failed to delete orders');
  }
}

// Delete the user's favorites
export async function deleteFavorites(userId: string) {
  try {
    const favoritesRef = db
      .collection('users')
      .doc(userId)
      .collection('favorites');
    const favoritesSnapshot = await favoritesRef.get();

    // Create a new batch of writes to delete the favorites from the user's favorites collection
    // This is more efficient than deleting each document individually
    // See: https://firebase.google.com/docs/firestore/manage-data/delete-data#collections
    const batchSize = favoritesSnapshot.size;
    if (batchSize === 0) {
      // When there are no documents left, we are done
      return;
    }

    // Delete documents in a batch
    const batch = db.batch();
    favoritesSnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    // Recurse on the next process tick, to avoid exceeding the maximum stack call size
    process.nextTick(() => deleteFavorites(userId));
  } catch (error: any) {
    throw new Error('Failed to delete favorites');
  }
}

// Delete the user's account
export async function deleteAccount(userId: string) {
  try {
    // Delete the user's account
    await db.collection('users').doc(userId).delete();
  } catch (error: any) {
    throw new Error('Failed to delete account');
  }
}

// Delete the user's account from the firebase authentication
export async function deleteAccountAuth(userId: string) {
  try {
    await getAuth().deleteUser(userId);
  } catch (error: any) {
    throw new Error(
      'Failed to delete account from the firebase authentication'
    );
  }
}

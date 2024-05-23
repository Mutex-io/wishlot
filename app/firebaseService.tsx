import { FIRESTORE_DB } from '../firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  FirestoreError,
} from 'firebase/firestore';

import { WishItemType, WishListType } from '../constants/types';

const FIRESTORE_COLLECTION =
  process.env.EXPO_FIRESTORE_COLLECTION || 'wishlist';

/**
 * Add a new wish item to the Firestore database.
 * @param wishItem The wish item to add.
 * @returns A promise that resolves with the document ID of the added item.
 */
export const addWishItem = async (wishItem: WishItemType): Promise<string> => {
  try {
    const docRef = await addDoc(
      collection(FIRESTORE_DB, FIRESTORE_COLLECTION),
      wishItem,
    );
    return docRef.id;
  } catch (error) {
    const firestoreError = error as FirestoreError;
    throw new Error(firestoreError.message);
  }
};

/**
 * Fetch all wish items from the Firestore database.
 * @returns all items in wishlist
 */
export const fetchWishItems = async (): Promise<WishListType> => {
  const wishlistRef = collection(FIRESTORE_DB, FIRESTORE_COLLECTION);
  const snapshot = await getDocs(wishlistRef);
  const loadedWishItems: WishListType = snapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title as string,
    desc: doc.data().desc as string,
    rate: doc.data().rate as number,
  }));
  return loadedWishItems;
};

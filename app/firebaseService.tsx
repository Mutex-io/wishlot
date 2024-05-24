import { FIRESTORE_DB } from '../firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  FirestoreError,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from 'firebase/firestore';

import { WishItemType, WishListType } from '../constants/types';

const FIRESTORE_COLLECTION =
  process.env.EXPO_FIRESTORE_COLLECTION || 'wishlists';

export const addWishItemToUserWishlist = async (
  userId: string,
  wishItem: Omit<WishItemType, 'id'>,
) => {
  const wishlistRef = doc(FIRESTORE_DB, FIRESTORE_COLLECTION, userId);

  try {
    // Attempt to fetch the document to check if it exists
    const docSnap = await getDoc(wishlistRef);

    if (!docSnap.exists()) {
      // If the document does not exist, initialize it with the first wish item
      await updateDoc(wishlistRef, { wishItems: [wishItem] });
    } else {
      // If the document exists, append the new wish item to the 'wishItems' array
      await updateDoc(wishlistRef, {
        wishItems: arrayUnion(wishItem),
      });
    }
  } catch (error) {
    console.error('Failed to add wish item: ', error);
    throw new Error('Failed to update wishlist.');
  }
};

// Fetch all wish items from a user's wishlist in Firestore
export const fetchWishItemsFromUserWishlist = async (
  userId: string,
): Promise<WishListType> => {
  const wishlistRef = doc(FIRESTORE_DB, 'wishlists', userId);
  try {
    const docSnap = await getDoc(wishlistRef);

    if (docSnap.exists() && docSnap.data().wishItems) {
      return docSnap.data().wishItems;
    } else {
      console.log('No wish items found or no such document!');
      return [];
    }
  } catch (error) {
    console.error('Error fetching wish items: ', error);
    throw new Error('Failed to fetch wish items.');
  }
};

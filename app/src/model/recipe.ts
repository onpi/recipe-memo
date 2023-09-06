import { db, collection, addDoc } from './firebase';
import { Recipe } from '@/types/recipe';

export const create = async (recipe: Recipe) => {
  try {
    const docRef = await addDoc(collection(db, 'recipes'), recipe);
    console.log('Document written with ID: ', docRef.id);
    return true;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};

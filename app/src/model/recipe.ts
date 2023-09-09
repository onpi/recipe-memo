import { db, collection, addDoc, getDocs, query, where } from './firebase';
import { Recipe } from '@/types/recipe';

export const create = async (recipe: Recipe) => {
  try {
    const docRef = await addDoc(collection(db, 'recipes'), recipe);
    console.log('Document written with ID: ', docRef.id);
    return true;
  } catch (error: any) {
    console.error('Error adding document: ', error);
    throw error;
  }
};

export const getList = async (userId: string) => {
  try {
    const recipes: Recipe[] = [];

    // クエリを作成: user_id が一致し、is_publish が true のもの
    const recipeQuery = query(
      collection(db, 'recipes'),
      where('user_id', '==', userId),
      where('is_publish', '==', true)
    );

    const querySnapshot = await getDocs(recipeQuery);
    querySnapshot.forEach((doc: { data: () => Recipe; id: string }) => {
      const recipeData = doc.data() as Recipe;
      recipeData.id = doc.id; // ドキュメントIDを追加
      recipes.push(recipeData);
    });

    console.log('recipes', recipes);

    return recipes;
  } catch (error: any) {
    throw error;
  }
};

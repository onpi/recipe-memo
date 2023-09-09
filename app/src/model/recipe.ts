import {
  db,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from './firebase';
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

    return recipes;
  } catch (error: any) {
    throw error;
  }
};

export const getById = async (recipeId: string) => {
  try {
    const recipeRef = doc(db, 'recipes', recipeId); // ドキュメントの参照を取得
    const docSnap = await getDoc(recipeRef); // ドキュメントのスナップショットを取得

    if (docSnap.exists()) {
      // ドキュメントが存在するかどうかを確認
      const recipeData = docSnap.data() as Recipe; // ドキュメントのデータを取得
      recipeData.id = docSnap.id; // ドキュメントIDを追加
      return recipeData;
    } else {
      // ドキュメントが存在しない場合の処理
      console.warn('No such document!');
      return null;
    }
  } catch (error: any) {
    throw error;
  }
};

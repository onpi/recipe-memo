import { create, getList, getById } from '@/model/recipe';
import { Recipe } from '@/types/recipe';

class RecipeHandlers {
  static async createRecipe(recipe: Recipe) {
    console.log('createRecipe', recipe);
    try {
      const result = await create(recipe);
      return { success: true, data: result };
    } catch (error: any) {
      console.log(error);
      return { success: false, message: error.message };
    }
  }
  static async getRecipes(userId: string) {
    try {
      const list = await getList(userId); // ここで await を使います。
      return { success: true, data: list };
    } catch (error: any) {
      console.error('Error getting documents: ', error);

      return { success: false, message: error.message };
    }
  }
  static async getRecipeById(recipeId: string) {
    try {
      const recipe = await getById(recipeId);
      return { success: true, data: recipe };
    } catch (error: any) {
      console.error('Error getting documents: ', error);

      return { success: false, message: error.message };
    }
  }
}
export default RecipeHandlers;

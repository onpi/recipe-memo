import { create, getList, getById, update, remove } from '@/model/recipe';
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
  static async getRecipeById(user_id: string, recipeId: string) {
    try {
      const recipe = await getById(user_id, recipeId);
      return { success: true, data: recipe };
    } catch (error: any) {
      console.error('Error getting documents: ', error);

      return { success: false, message: error.message };
    }
  }

  static async updateRecipe(user_id: string, recipe: Recipe) {
    console.log('updateRecipe', recipe);
    try {
      const result = await update(user_id, recipe);
      return { success: true, data: result };
    } catch (error: any) {
      console.log(error);
      return { success: false, message: error.message };
    }
  }

  static async deleteRecipe(user_id: string, recipeId: string) {
    console.log('deleteRecipe', recipeId);
    console.log('deleteRecipe', user_id);

    try {
      const result = await remove(user_id, recipeId);
      return { success: true, data: result };
    } catch (error: any) {
      console.error('Error getting documents: ', error);

      return { success: false, message: error.message };
    }
  }
}
export default RecipeHandlers;

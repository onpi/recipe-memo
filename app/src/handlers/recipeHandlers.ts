import { create } from '@/model/recipe';
import { Recipe } from '@/types/recipe';

class RecipeHandlers {
  static async createRecipe(recipe: Recipe) {
    console.log('createRecipe', recipe);
    try {
      const result = await create(recipe);
      return { success: true };
    } catch (error: unknown) {
      console.log(error);
      return { success: false, message: error.message };
    }
  }
}
export default RecipeHandlers;

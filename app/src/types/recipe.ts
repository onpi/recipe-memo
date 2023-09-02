export interface Ingredient {
  ingredients_title: string;
  ingredients_contents: string;
}

export interface Recipe {
  user_id: string;
  title: string;
  ingredients: Ingredient[];
  memo: string;
  is_publish: boolean;
}

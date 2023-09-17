export interface Ingredient {
  ingredients_title: string;
  ingredients_contents: string;
}

export interface Recipe {
  id?: string; // FirestoreのドキュメントID。オプションにしている理由は、新規レシピ作成時にはまだIDが未確定の場合があるからです。
  user_id?: string;
  title: string;
  ingredients: Ingredient[];
  memo: string;
  is_publish: boolean;
  created_at: any;
  updated_at: any;
}

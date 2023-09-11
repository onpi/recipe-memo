import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from 'react';
import { Recipe } from '@/types/recipe';
import RecipeHandlers from '@/handlers/recipeHandlers';

interface RecipeContextProps {
  recipeList: Recipe[];
  setRecipeList: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

const RecipeContext = createContext<RecipeContextProps | undefined>(undefined);

interface RecipeProviderProps {
  children: ReactNode;
  userId: string | null; // AuthContextから取得する想定
  fetchAll: boolean; // トップページでは全件取得、詳細ページでは1件のみ取得する
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({
  children,
  userId,
  fetchAll,
}) => {
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        if (!userId) return;
        if (!fetchAll) return;
        const recipes = await RecipeHandlers.getRecipes(userId);
        if (recipes.success && recipes.data) {
          // この行を追加
          setRecipeList(recipes.data);
        }
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      }
    };

    fetchRecipes();
  }, [userId, fetchAll]);
  const value = useMemo(() => ({ recipeList, setRecipeList }), [recipeList]);

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
  // return (
  //   <RecipeContext.Provider value={{ recipeList, setRecipeList }}>
  //     {children}
  //   </RecipeContext.Provider>
  // );
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);

  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};

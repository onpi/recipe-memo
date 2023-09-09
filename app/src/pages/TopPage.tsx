import BottomNavigation from '../components/BottomNavigation';
import ThemeToggle from '../components/ThemeToggle';
import authHandlers from '../handlers/authHandlers';
import RecipeHandlers from '../handlers/recipeHandlers';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { Recipe } from '@/types/recipe';

const TopPage = () => {
  const navigate = useNavigate();
  const { uid } = useAuth();
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (uid) {
        try {
          const recipes = await RecipeHandlers.getRecipes(uid);
          if (recipes.success && recipes.data) {
            // この行を追加
            setRecipeList(recipes.data);
          }
        } catch (error) {
          console.error('Failed to fetch recipes:', error);
          // エラーハンドリングの追加処理が必要であればここに記述
        }
      }
    };

    fetchRecipes();
  }, [uid]);
  return (
    <>
      <ThemeToggle />

      <a
        href="#"
        onClick={async (e) => {
          e.preventDefault();
          const result = await authHandlers.signOut();
          console.log(result);

          // ログアウトが成功したら/loginへリダイレクト
          navigate('/login');
        }}
      >
        <div className="image_wrap">サインアウト</div>
      </a>
      <BottomNavigation />
    </>
  );
};

export default TopPage;

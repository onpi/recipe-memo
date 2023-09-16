import BottomNavigation from '../components/organism/BottomNavigation';
import RecipeHandlers from '../handlers/recipeHandlers';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Recipe } from '@/types/recipe';
import { useRecipes } from '../context/RecipeContext';
import Header from '../components/organism/Header';
import BaseHeadTitle from '@/components/atoms/BaseHeadTitle';
import { useAuth } from '@/context/AuthContext';
import { useBase } from '@/context/BaseContext';
import { successMessages } from '@/consts/Messages';

const DetailPage = () => {
  const { uid } = useAuth();
  const { id } = useParams(); // URLからレシピIDを取得
  const { recipeList } = useRecipes();
  const { showSnackbar } = useBase();

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    // セッションストレージからフラグを読み出す
    const operationType = sessionStorage.getItem('operationType');
    const operationResult = sessionStorage.getItem('operationResult');
    if (operationType === 'create' && operationResult === 'true') {
      // フラグがtrueならSnackbarを表示

      showSnackbar(successMessages.successToCreateRecipe, 'success');
    }
    if (operationType === 'edit' && operationResult === 'true') {
      // フラグがfalseならSnackbarを表示（エラー表示）
      showSnackbar(successMessages.successToUpdateRecipe, 'success');
    }

    if (recipeList.length > 0) {
      const foundRecipe = recipeList.find((recipe) => recipe.id === id);
      if (foundRecipe) {
        setRecipe(foundRecipe);
      }
    } else {
      const fetchRecipe = async () => {
        console.log(id);
        console.log(uid);

        if (!uid) return;

        const result = await RecipeHandlers.getRecipeById(uid, id);

        if (result.success && result.data) {
          setRecipe(result.data);
        }
      };

      fetchRecipe();
    }
  }, [uid, id, recipeList]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <>
      <Header title={recipe.title} />

      <div className="container mx-auto px-4 mt-[72px] pb-[104px]">
        <div className="content">
          {recipe.created_at && recipe.created_at.seconds && (
            <p className="base_text text-sm">
              作成日:{' '}
              {new Date(recipe.created_at.seconds * 1000).toDateString()}
            </p>
          )}
          {recipe.updated_at && recipe.updated_at.seconds && (
            <p className="base_text text-sm">
              更新日:{' '}
              {new Date(recipe.updated_at.seconds * 1000).toDateString()}
            </p>
          )}
        </div>
        <div className="content mt-2">
          <BaseHeadTitle title="材料" />
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="mt-4">
              <h2 className="base_text text-lg font-bold">
                {ingredient.ingredients_title}
              </h2>
              <p className="base_text text-base whitespace-pre-line">
                {ingredient.ingredients_contents}
              </p>
            </div>
          ))}
        </div>
        <div className="content mt-6">
          <BaseHeadTitle title="メモ" />
          <div className="base_text text-base mt-4 whitespace-pre-line">
            {recipe.memo}
          </div>
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default DetailPage;

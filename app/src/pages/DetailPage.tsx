import BottomNavigation from '../components/organism/BottomNavigation';
import RecipeHandlers from '../handlers/recipeHandlers';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Recipe } from '@/types/recipe';
import { useRecipes } from '../context/RecipeContext';
import Header from '../components/organism/Header';
import BaseHeadTitle from '@/components/atoms/BaseHeadTitle';

const DetailPage = () => {
  const { id } = useParams(); // URLからレシピIDを取得
  const { recipeList } = useRecipes();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  console.log(recipe);

  useEffect(() => {
    if (recipeList.length > 0) {
      const foundRecipe = recipeList.find((recipe) => recipe.id === id);
      if (foundRecipe) {
        setRecipe(foundRecipe);
      }
    } else {
      const fetchRecipe = async () => {
        const result = await RecipeHandlers.getRecipeById(id);

        if (result.success && result.data) {
          setRecipe(result.data);
        }
      };

      fetchRecipe();
    }
  }, [id, recipeList]);

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

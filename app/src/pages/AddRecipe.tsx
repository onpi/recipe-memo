import BaseHeadTitle from '../components/atoms/BaseHeadTitle';
import BottomNavigation from '../components/organism/BottomNavigation';

import TitleAndInput from '../components/molecules/TitleAndInput';
import InputAndTextarea from '../components/molecules/InputAndTextarea';
import Header from '../components/organism/Header';
import BaseBtn from '../components/atoms/BaseBtn';
import TitleAndTextarea from '../components/molecules/TitleAndTextarea';
import { useState, useEffect } from 'react';
import { Recipe, Ingredient } from '@/types/recipe';
import { useAuth } from '../context/AuthContext';
import RecipeHandlers from '@/handlers/recipeHandlers';
import { useNavigate } from 'react-router-dom';
import CloseSvg from '@/components/atoms/CloseSvg';
import { useBase } from '@/context/BaseContext';
import { useTranslation } from 'react-i18next';

const AddRecipe = () => {
  const { t } = useTranslation(['ui', 'error']);

  const navigate = useNavigate();
  const { uid } = useAuth();
  const { showSnackbar } = useBase();
  const [recipe, setRecipe] = useState<Recipe>({
    user_id: '',
    title: '',
    ingredients: [
      {
        ingredients_title: '',
        ingredients_contents: '',
      },
    ],
    memo: '',
    is_publish: true,
    created_at: null,
    updated_at: null,
  });
  const handleChangeContents = (key: string, newValue: any) => {
    setRecipe({ ...recipe, [key]: newValue });
  };
  const handleChangeIngredients = (
    key: 'ingredients_title' | 'ingredients_contents',
    index: number,
    newValue: string
  ) => {
    // 1. 現在のingredients配列をコピー。
    const newIngredients = [...recipe.ingredients];

    // 2. 配列内の特定のオブジェクトをアップデート。
    const updatedIngredient = { ...newIngredients[index], [key]: newValue };
    newIngredients[index] = updatedIngredient;

    // 3. 新しい配列で元のrecipeオブジェクトをアップデート。
    setRecipe({ ...recipe, ingredients: newIngredients });
  };
  const addIngredients = () => {
    // 新しいIngredientオブジェクトを作成
    const newIngredient: Ingredient = {
      ingredients_title: '',
      ingredients_contents: '',
    };

    // 現在のingredients配列に新しい要素を追加
    const newIngredients = [...recipe.ingredients, newIngredient];

    // 新しいingredients配列でステートを更新
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const create = () => {
    // ここでバリデーションチェック(料理名さえ入力されていればOK)
    if (recipe.title === '') {
      alert(t('error:invailedRecipeName'));
      return;
    }
    if (recipe.user_id === '') {
      alert(t('error:userIdNotFound'));
      return;
    }
    const updatedRecipe = {
      ...recipe,
      created_at: new Date(),
      updated_at: new Date(),
    };

    RecipeHandlers.createRecipe(updatedRecipe).then((result) => {
      if (result.success) {
        sessionStorage.setItem('operationType', 'create');
        sessionStorage.setItem('operationResult', 'true');
        result.data && navigate(`/recipe/${result.data}`);
      } else {
        // 失敗時のSnackbar

        showSnackbar(t('errorMessages.failedToCreateRecipe'), 'error');
      }
    });
  };

  const deleteIngredient = (index: number) => {
    console.log('delete', index);
    recipe.ingredients.splice(index, 1);
    setRecipe({ ...recipe });
  };

  useEffect(() => {
    if (uid) {
      handleChangeContents('user_id', uid);
    }
  }, [uid]);
  return (
    <>
      <Header title={t('header.create')} />
      <div className="container mx-auto px-4 mt-[72px] pb-[104px]">
        <div className="mt-6">
          <TitleAndInput
            title={t('recipe.name')}
            placeholder={t('recipe.name.placeholder')}
            value={recipe.title}
            onChange={(newValue) => handleChangeContents('title', newValue)}
          />
        </div>
        <div className="mt-6">
          <BaseHeadTitle title={t('recipe.ingredients')} />

          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredients flex flex-col mt-4">
              <button
                className="delete ml-auto p-2"
                onClick={() => deleteIngredient(index)}
              >
                <CloseSvg />
              </button>
              <InputAndTextarea
                inputPlaceholder={t('recipe.ingredients.name.placeholder')}
                inputValue={ingredient.ingredients_title}
                onChangeInput={(newValue) =>
                  handleChangeIngredients('ingredients_title', index, newValue)
                }
                textareaPlaceholder={t(
                  'recipe.ingredients.contents.placeholder'
                )}
                textareaValue={ingredient.ingredients_contents}
                onChangeTextarea={(newValue) =>
                  handleChangeIngredients(
                    'ingredients_contents',
                    index,
                    newValue
                  )
                }
              />
            </div>
          ))}

          <div className="btn_wrap flex flex-col items-center mt-6">
            <BaseBtn
              label={t('recipe.addIngredients')}
              type="submit"
              className="w-[160px]"
              onClick={() => addIngredients()}
            />
          </div>
        </div>
        <div className="mt-6">
          <TitleAndTextarea
            title={t('recipe.memo')}
            placeholder=""
            value={recipe.memo}
            onChange={(newValue) => handleChangeContents('memo', newValue)}
          />
        </div>
        <div className="btn_wrap flex flex-col items-center mt-6">
          <BaseBtn
            label={t('button.create')}
            type="submit"
            className="w-full"
            onClick={() => create()}
          />
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default AddRecipe;

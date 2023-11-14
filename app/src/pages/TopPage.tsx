import BottomNavigation from '../components/organism/BottomNavigation';
import { useNavigate } from 'react-router-dom';
import DotSvg from '@/components/atoms/DotSvg';
import { useRecipes } from '../context/RecipeContext';
import { useEffect, useState } from 'react';
import Modal from '@/components/molecules/BaseModal';
import RecipeHandlers from '@/handlers/recipeHandlers';
import { useAuth } from '@/context/AuthContext';
import { useBase } from '@/context/BaseContext';
import { useTranslation } from 'react-i18next';
import SeatchItem from '@/components/molecules/SearchItem';
import { Recipe } from '@/types/recipe';

const TopPage = () => {
  const { t } = useTranslation(['ui', 'error']);
  const navigate = useNavigate();
  const { recipeList, removeRecipeById } = useRecipes(); // マスターデータの取得
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]); // 表示するレシピのリスト
  const { uid } = useAuth();
  const { showSnackbar } = useBase();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setFilteredRecipes(recipeList);
  }, [recipeList]);

  const goToDetails = (id: string | undefined) => {
    // 詳細ページへの遷移処理（idはレシピのID）
    navigate(`/recipe/${id}`);
  };
  const editRecipe = () => {
    closeModal();
    if (!selectedRecipeId) return;
    navigate(`/recipe/edit/${selectedRecipeId}`);
  };

  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleOptions = (recipeId: any) => {
    setSelectedRecipeId(recipeId);
    setShowPopup(true);
  };

  const closeModal = () => {
    setSelectedRecipeId(null);
    setShowDeleteConfirm(false);
    setShowPopup(false);
  };

  const deleteRecipe = async () => {
    if (!uid || !selectedRecipeId) return;
    const result = await RecipeHandlers.deleteRecipe(uid, selectedRecipeId);
    if (result.success) {
      showSnackbar(t('error:successToDeleteRecipe'), 'success');
      removeRecipeById(selectedRecipeId);
    } else {
      showSnackbar(t('error:failedToDeleteRecipe'), 'error');
    }
    closeModal();
  };

  const getResipeTitleById = (id: string | undefined | null) => {
    if (!id) return;
    return recipeList.find((recipe) => recipe.id === id)?.title;
  };
  const filterRecipe = (val: any) => {
    setSearchValue(val);
    if (val) {
      const filtered = recipeList.filter((recipe) =>
        recipe.title.includes(val)
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(recipeList);
    }
  };

  return (
    <>
      <div className="page-wrap container mx-auto px-4 pb-[104px]">
        <div className="mt-6">
          <SeatchItem onChange={filterRecipe} value={searchValue} />
        </div>
        <div className="recipe_list mt-6">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="recipe_item flex justify-between items-center py-3 px-2 shadow-md mt-4"
            >
              <button
                onClick={() => goToDetails(recipe.id)}
                className="recipe_list_item_title base_text flex-grow text-base text-left"
              >
                {recipe.title}
              </button>
              <button
                className="recipe_list_item_options w-6"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOptions(recipe.id);
                }}
              >
                <DotSvg />
              </button>
            </div>
          ))}
          <Modal show={showPopup} onClose={closeModal}>
            {showDeleteConfirm ? (
              <div className="">
                <div className="my-4">
                  <p className="base_text">
                    {t('recipe.deleteConfirmation', {
                      recipeName: getResipeTitleById(selectedRecipeId),
                    })}
                  </p>
                </div>
                <button
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  onClick={deleteRecipe}
                >
                  {t('common.delete')}
                </button>
                <button
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="">
                <div className="my-4">
                  <p className="base_text">
                    {getResipeTitleById(selectedRecipeId)}
                  </p>
                </div>
                <button
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  onClick={() => {
                    setShowDeleteConfirm(true);
                  }}
                >
                  {t('common.delete')}
                </button>
                <button
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={editRecipe}
                >
                  {t('common.edit')}
                </button>
              </div>
            )}
          </Modal>
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default TopPage;
